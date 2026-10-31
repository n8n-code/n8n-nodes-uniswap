import type { INodeProperties } from 'n8n-workflow';

export const defaultDescription: INodeProperties[] = [
                {
			"displayName": "Operation",
			"name": "operation",
			"type": "options",
			"noDataExpression": true,
			"displayOptions": {
				"show": {
					"resource": [
						"Default"
					]
				}
			},
			"options": [
				{
					"name": "Margin Markets",
					"value": "Margin Markets",
					"action": "Discover the margin markets a chain can trade",
					"description": "The market picker's feed. One row per `(exposureToken, counterToken, direction)`.\n\n**Indicative by construction, and that is the point.** Rates move every block, so no listing agrees with a quote taken seconds later. The quote re-reads on chain and stamps its bounds into router calldata, so a stale row costs a re-quote and never a bad execution. That is what makes this endpoint cacheable.\n\n**The ceiling is policy, not a promise.** `maxLeverage` comes from the same policy function the quote refuses on, applied to the same liquidation LTV the support check read and the LTV the venue lends at, so the quote never refuses a leverage under it for the ceiling alone. The router checks health at the leverage swap's fill, though, which pays the pool's price up to its slippage bound rather than the oracle mark, so an `open` or `increaseLeverage` near the ceiling buys only as much as keeps its worst-case fill under it, and `display.leverage` reports the leverage at that fill, while the composite keys refuse it with a 422 `MARGIN_LEVERAGE_EXCEEDS_MAX`. Never recompute it client-side from `lltv`: the LTV cliff buffer SCALES the ceiling rather than subtracting from it, so 86% at 400bps is 82.56% and not 82%.\n\n**Each market yields BOTH readings.** A venue market is a (collateral, debt) pair, and the same on-chain position is a long of its collateral and a short of its debt. Shorting a token is only expressible as a market whose debt it is, so emitting one reading would leave a caller unable to find the side they wanted.\n\n**Always paginated**, on the same contract as `GET /orders` and `GET /plans`: `limit` (default and max 20) plus an opaque `cursor` in, `nextCursor` out. There is no unbounded response. Not user-scoped, so there is no `swapper`.\n\n`borrowRate` and `availableBorrowLiquidity` are best-effort per venue and absent rather than zero when unread, since a zero rate and an unread rate are different facts. A venue the quote would refuse (its adapter disallowed on the router, its market identity unreadable, nothing lent against the collateral, or its reserves refusing every open at the block read: a collateral or debt reserve paused, frozen or no longer active, borrowing disabled on the debt, the Aave v4 hub halting the spoke, or the collateral at its supply cap or Aave v4 add cap) is left off the row, and so is an Aave v3 venue whose reserve LTV did not read, since its ceiling cannot be built without it. A row with no venue left is not served.\n\nA failed discovery read is a 503 `MARGIN_MARKET_READ_UNAVAILABLE`, never a 200 with an empty page, and so is a page that a failed Aave v3 reserve read leaves empty.",
					"routing": {
						"request": {
							"method": "GET",
							"url": "=/margin/markets"
						}
					}
				},
				{
					"name": "Margin Assets",
					"value": "Margin Assets",
					"action": "List the token pairs a chain can trade on margin",
					"description": "The asset pickers' feed: every pair the margin market catalogue opens on the chain, read the same way as `GET /margin/markets` and gated by the same switch.\n\nEach catalogue market yields one entry in `longs` (exposure is the collateral, counter the debt) and one in `shorts` (exposure is the debt, counter the collateral), with the venues the catalogue opens it on. A venue whose market is close-only, hard-triggered or stale is left off, and a pair no venue opens is not listed. A listed venue can still be refused on live reserve or router state (paused, frozen, inactive, borrowing disabled, a cap reached, nothing lent against the collateral, or an adapter the router does not allow), so a pair can come back from `GET /margin/markets` without that venue or without a row; that endpoint and `POST /margin/quote` are authoritative for what opens. Both lists are ordered by `exposureToken` address, then `counterToken` address, and addresses are lowercase.\n\nNo economics: leverage ceilings, rates and liquidity are read per pair from `GET /margin/markets`. A chain whose catalogue opens no market answers 200 with both lists empty, while a failed catalogue read is a 503 `MARGIN_MARKET_READ_UNAVAILABLE`.",
					"routing": {
						"request": {
							"method": "GET",
							"url": "=/margin/assets"
						}
					}
				},
				{
					"name": "Margin Positions",
					"value": "Margin Positions",
					"action": "A wallet's margin positions on a chain",
					"description": "The positions tab's feed. One row per position: a margin account (`swapper`, `subId`) on one venue and market. Each open allocates its own `subId`, so a wallet's positions in the same pair are separate rows, each with its own risk and its own actions.\n\n**Balances and risk are read on chain, per request.** Position accounts are a pure CREATE2 function of `(swapper, subId)`, so the addresses are known offchain for free and the only question the chain answers is which of them hold anything. That is what makes the feed correct from a device that has never seen this wallet before, and correct in the same block an open lands. A health factor is the one number a caller must not act on stale, which is why none of this is cached.\n\n**Markets walked:** the served catalogue plus the market of each `ACTIVE` position the store indexed for this wallet, so an indexed position stays listed after its pair leaves the catalogue. A position on a pair its venue's adapter no longer supports is not listed. **A venue whose position read reverts is skipped, not fatal:** the page serves every other venue's rows and omits that venue's until it reads again. When no readable venue holds a position, the page answers 503 rather than an empty list, and an RPC failure still answers 503.\n\n**Risk is in TRADER terms.** `oraclePrice` and `liquidationPrice` are both reciprocated on a SHORT, so the price distance to liquidation equals `healthFactor` in either direction: `oraclePrice / liquidationPrice` on a LONG, `liquidationPrice / oraclePrice` on a SHORT. A row that mixed frames would still satisfy every type check and be wrong by a factor of the price.\n\n**`maxWithdrawable` is bounded by the BUFFERED ceiling, not the raw LLTV.** The withdraw plan asserts that ceiling on chain, and this figure sits just inside it so a withdraw of the full amount still clears it when it lands. Never recompute it client-side from `lltv`.\n\n**Always paginated**, oldest `subId` first: `limit` (default and max 20) plus an opaque `cursor` in, `nextCursor` out.\n\nCost-basis fields (`entryPrice`, `openedAt`, and the PnL fields) come from the position store and are ABSENT rather than zero for a position the store has not indexed: a zero PnL is a claim, an absent one is not. Finished `statuses` are served from the store, newest first, on one opaque `cursor` over the whole requested set; echo `nextCursor` back with the same `statuses` to page. Use a cursor only with the `statuses` that returned it.",
					"routing": {
						"request": {
							"method": "GET",
							"url": "=/margin/positions"
						}
					}
				},
				{
					"name": "Margin Position Activity",
					"value": "Margin Position Activity",
					"action": "Every event of one margin position's lifecycle",
					"description": "The history behind a row of `GET /margin/positions`: one entry per event the position store folded for the row's lifecycle (the open, each buy, sale, deposit, withdrawal and liquidation, and the close), oldest first. Ask with the row's `activityId`; a row without one has no history to serve.\n\nAmounts are raw token units the event moved. `price` and `entryPrice` are in the same terms as the row's `entryPrice`. `collateralAfter`, `debtAfter` and `entryPrice` are the position as the event left it, so a chart can draw each event at its fill and the entry line between them.\n\n**Always paginated**: `limit` (default and max 50) plus an opaque `cursor` in, `nextCursor` out.",
					"routing": {
						"request": {
							"method": "GET",
							"url": "=/margin/positions/activity"
						}
					}
				}
			],
			"default": ""
		},
		{
			"displayName": "GET /margin/markets",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"Default"
					],
					"operation": [
						"Margin Markets"
					]
				}
			}
		},
		{
			"displayName": "Chain ID",
			"name": "chainId",
			"required": true,
			"description": "The chain the markets live on.",
			"default": 1,
			"type": "options",
			"options": [
				{
					"name": "1",
					"value": 1
				},
				{
					"name": "10",
					"value": 10
				},
				{
					"name": "56",
					"value": 56
				},
				{
					"name": "130",
					"value": 130
				},
				{
					"name": "137",
					"value": 137
				},
				{
					"name": "143",
					"value": 143
				},
				{
					"name": "196",
					"value": 196
				},
				{
					"name": "324",
					"value": 324
				},
				{
					"name": "480",
					"value": 480
				},
				{
					"name": "1868",
					"value": 1868
				},
				{
					"name": "4217",
					"value": 4217
				},
				{
					"name": "4326",
					"value": 4326
				},
				{
					"name": "4663",
					"value": 4663
				},
				{
					"name": "5042",
					"value": 5042
				},
				{
					"name": "8453",
					"value": 8453
				},
				{
					"name": "10143",
					"value": 10143
				},
				{
					"name": "42161",
					"value": 42161
				},
				{
					"name": "42220",
					"value": 42220
				},
				{
					"name": "43114",
					"value": 43114
				},
				{
					"name": "57073",
					"value": 57073
				},
				{
					"name": "59144",
					"value": 59144
				},
				{
					"name": "81457",
					"value": 81457
				},
				{
					"name": "7777777",
					"value": 7777777
				},
				{
					"name": "1301",
					"value": 1301
				},
				{
					"name": "84532",
					"value": 84532
				},
				{
					"name": "11155111",
					"value": 11155111
				}
			],
			"routing": {
				"send": {
					"type": "query",
					"property": "chainId",
					"value": "={{ $value }}",
					"propertyInDotNotation": false
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Default"
					],
					"operation": [
						"Margin Markets"
					]
				}
			}
		},
		{
			"displayName": "Exposure Token",
			"name": "exposureToken",
			"description": "Narrows to rows whose exposure is this token, in TRADER terms: it is the market's collateral on a LONG row and its debt on a SHORT one.",
			"default": "",
			"type": "string",
			"routing": {
				"send": {
					"type": "query",
					"property": "exposureToken",
					"value": "={{ $value }}",
					"propertyInDotNotation": false
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Default"
					],
					"operation": [
						"Margin Markets"
					]
				}
			}
		},
		{
			"displayName": "Counter Token",
			"name": "counterToken",
			"description": "Narrows to rows whose counter side is this token.",
			"default": "",
			"type": "string",
			"routing": {
				"send": {
					"type": "query",
					"property": "counterToken",
					"value": "={{ $value }}",
					"propertyInDotNotation": false
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Default"
					],
					"operation": [
						"Margin Markets"
					]
				}
			}
		},
		{
			"displayName": "Direction",
			"name": "direction",
			"description": "Narrows to one side.",
			"default": "LONG",
			"type": "options",
			"options": [
				{
					"name": "LONG",
					"value": "LONG"
				},
				{
					"name": "SHORT",
					"value": "SHORT"
				}
			],
			"routing": {
				"send": {
					"type": "query",
					"property": "direction",
					"value": "={{ $value }}",
					"propertyInDotNotation": false
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Default"
					],
					"operation": [
						"Margin Markets"
					]
				}
			}
		},
		{
			"displayName": "Venues",
			"name": "venues",
			"description": "Comma-separated LENDING allowlist, e.g. `MORPHO,AAVE_V3`. A named subset also re-decides `headlineVenue` over that subset, so it filters the answer and not only the search. An unrecognised value is a 400 rather than a silent drop, since answering over a different set than was asked for is undetectable by the caller.",
			"default": "",
			"type": "string",
			"routing": {
				"send": {
					"type": "query",
					"property": "venues",
					"value": "={{ $value }}",
					"propertyInDotNotation": false
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Default"
					],
					"operation": [
						"Margin Markets"
					]
				}
			}
		},
		{
			"displayName": "Cursor",
			"name": "cursor",
			"description": "Opaque. Echo `nextCursor` back verbatim to get the following page. A KEYSET cursor over the row order, not an offset: the catalogue is rebuilt on a timer, and an offset taken against one build silently skips or repeats rows against the next. A cursor that is not base64 is a 400 `RequestValidationError`; one that is base64 but does not parse is a 400 `MARGIN_INVALID_CURSOR`. Neither restarts at page one, which would loop a client forever.",
			"default": "",
			"type": "string",
			"routing": {
				"send": {
					"type": "query",
					"property": "cursor",
					"value": "={{ $value }}",
					"propertyInDotNotation": false
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Default"
					],
					"operation": [
						"Margin Markets"
					]
				}
			}
		},
		{
			"displayName": "Limit",
			"name": "limit",
			"description": "Rows per page. Defaults to 20 and caps at 20, matching `GET /orders` and `GET /plans`, so a client that already pages those needs no second set of rules. **Every** response is bounded whether or not a caller asks: nothing about this endpoint limits its own size, and the row count grows whenever the service starts serving a market.",
			"default": 20,
			"type": "number",
			"routing": {
				"send": {
					"type": "query",
					"property": "limit",
					"value": "={{ $value }}",
					"propertyInDotNotation": false
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Default"
					],
					"operation": [
						"Margin Markets"
					]
				}
			}
		},
		{
			"displayName": "X Agent Info",
			"name": "x-agent-info",
			"description": "Optional attribution hint for AI-agent traffic; send it if an AI agent built or operates your integration. The value is a JSON object with up to three fields: `decision_origin` (required, exactly `autonomous` or `human_mediated`, case-sensitive), `integration_name` (optional string naming your integration, e.g. `my-trading-bot`), and `version` (optional string identifying your integration's version). Any other key is dropped, never rejected. The raw value must be at most 1024 bytes of printable US-ASCII (`0x20`-`0x7E`), so send non-ASCII text as JSON `\\u` escapes; `integration_name` and `version` are each limited to 256 UTF-16 code units and may not contain control characters, U+2028, U+2029, or U+FFFD. Send the header once: repeated header lines are joined with `, ` and the joined string is what gets parsed, so two complete objects fail as invalid JSON while a single object split across two lines still parses. The header is analytics-only and never affects the request: omitting it, sending it, or sending a value that fails these rules never changes the response status, body, or swap behavior. A value that fails to parse is dropped and reported by the `x-agent-info-status` response header. Never put a user ID, wallet address, email, session token, or API key in these fields.",
			"default": "{\"decision_origin\":\"autonomous\",\"integration_name\":\"my-trading-bot\",\"version\":\"1.4.0\"}",
			"type": "string",
			"routing": {
				"request": {
					"headers": {
						"x-agent-info": "={{ $value }}"
					}
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Default"
					],
					"operation": [
						"Margin Markets"
					]
				}
			}
		},
		{
			"displayName": "API Key (Header)",
			"name": "security_apikey",
			"type": "string",
			"default": "",
			"description": "API key for apiKey (header: x-api-key)",
			"required": false,
			"routing": {
				"request": {
					"headers": {
						"x-api-key": "={{ $value }}"
					}
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Default"
					],
					"operation": [
						"Margin Markets"
					]
				}
			}
		},
		{
			"displayName": "GET /margin/assets",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"Default"
					],
					"operation": [
						"Margin Assets"
					]
				}
			}
		},
		{
			"displayName": "Chain ID",
			"name": "chainId",
			"required": true,
			"description": "The chain the pairs live on.",
			"default": 1,
			"type": "options",
			"options": [
				{
					"name": "1",
					"value": 1
				},
				{
					"name": "10",
					"value": 10
				},
				{
					"name": "56",
					"value": 56
				},
				{
					"name": "130",
					"value": 130
				},
				{
					"name": "137",
					"value": 137
				},
				{
					"name": "143",
					"value": 143
				},
				{
					"name": "196",
					"value": 196
				},
				{
					"name": "324",
					"value": 324
				},
				{
					"name": "480",
					"value": 480
				},
				{
					"name": "1868",
					"value": 1868
				},
				{
					"name": "4217",
					"value": 4217
				},
				{
					"name": "4326",
					"value": 4326
				},
				{
					"name": "4663",
					"value": 4663
				},
				{
					"name": "5042",
					"value": 5042
				},
				{
					"name": "8453",
					"value": 8453
				},
				{
					"name": "10143",
					"value": 10143
				},
				{
					"name": "42161",
					"value": 42161
				},
				{
					"name": "42220",
					"value": 42220
				},
				{
					"name": "43114",
					"value": 43114
				},
				{
					"name": "57073",
					"value": 57073
				},
				{
					"name": "59144",
					"value": 59144
				},
				{
					"name": "81457",
					"value": 81457
				},
				{
					"name": "7777777",
					"value": 7777777
				},
				{
					"name": "1301",
					"value": 1301
				},
				{
					"name": "84532",
					"value": 84532
				},
				{
					"name": "11155111",
					"value": 11155111
				}
			],
			"routing": {
				"send": {
					"type": "query",
					"property": "chainId",
					"value": "={{ $value }}",
					"propertyInDotNotation": false
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Default"
					],
					"operation": [
						"Margin Assets"
					]
				}
			}
		},
		{
			"displayName": "X Agent Info",
			"name": "x-agent-info",
			"description": "Optional attribution hint for AI-agent traffic; send it if an AI agent built or operates your integration. The value is a JSON object with up to three fields: `decision_origin` (required, exactly `autonomous` or `human_mediated`, case-sensitive), `integration_name` (optional string naming your integration, e.g. `my-trading-bot`), and `version` (optional string identifying your integration's version). Any other key is dropped, never rejected. The raw value must be at most 1024 bytes of printable US-ASCII (`0x20`-`0x7E`), so send non-ASCII text as JSON `\\u` escapes; `integration_name` and `version` are each limited to 256 UTF-16 code units and may not contain control characters, U+2028, U+2029, or U+FFFD. Send the header once: repeated header lines are joined with `, ` and the joined string is what gets parsed, so two complete objects fail as invalid JSON while a single object split across two lines still parses. The header is analytics-only and never affects the request: omitting it, sending it, or sending a value that fails these rules never changes the response status, body, or swap behavior. A value that fails to parse is dropped and reported by the `x-agent-info-status` response header. Never put a user ID, wallet address, email, session token, or API key in these fields.",
			"default": "{\"decision_origin\":\"autonomous\",\"integration_name\":\"my-trading-bot\",\"version\":\"1.4.0\"}",
			"type": "string",
			"routing": {
				"request": {
					"headers": {
						"x-agent-info": "={{ $value }}"
					}
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Default"
					],
					"operation": [
						"Margin Assets"
					]
				}
			}
		},
		{
			"displayName": "API Key (Header)",
			"name": "security_apikey",
			"type": "string",
			"default": "",
			"description": "API key for apiKey (header: x-api-key)",
			"required": false,
			"routing": {
				"request": {
					"headers": {
						"x-api-key": "={{ $value }}"
					}
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Default"
					],
					"operation": [
						"Margin Assets"
					]
				}
			}
		},
		{
			"displayName": "GET /margin/positions",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"Default"
					],
					"operation": [
						"Margin Positions"
					]
				}
			}
		},
		{
			"displayName": "Swapper",
			"name": "swapper",
			"required": true,
			"description": "The wallet whose positions to read. Not taken from the session: a caller may legitimately read another address, and every number here is public on chain.",
			"default": "",
			"type": "string",
			"routing": {
				"send": {
					"type": "query",
					"property": "swapper",
					"value": "={{ $value }}",
					"propertyInDotNotation": false
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Default"
					],
					"operation": [
						"Margin Positions"
					]
				}
			}
		},
		{
			"displayName": "Chain ID",
			"name": "chainId",
			"required": true,
			"description": "The chain the positions live on.",
			"default": 1,
			"type": "options",
			"options": [
				{
					"name": "1",
					"value": 1
				},
				{
					"name": "10",
					"value": 10
				},
				{
					"name": "56",
					"value": 56
				},
				{
					"name": "130",
					"value": 130
				},
				{
					"name": "137",
					"value": 137
				},
				{
					"name": "143",
					"value": 143
				},
				{
					"name": "196",
					"value": 196
				},
				{
					"name": "324",
					"value": 324
				},
				{
					"name": "480",
					"value": 480
				},
				{
					"name": "1868",
					"value": 1868
				},
				{
					"name": "4217",
					"value": 4217
				},
				{
					"name": "4326",
					"value": 4326
				},
				{
					"name": "4663",
					"value": 4663
				},
				{
					"name": "5042",
					"value": 5042
				},
				{
					"name": "8453",
					"value": 8453
				},
				{
					"name": "10143",
					"value": 10143
				},
				{
					"name": "42161",
					"value": 42161
				},
				{
					"name": "42220",
					"value": 42220
				},
				{
					"name": "43114",
					"value": 43114
				},
				{
					"name": "57073",
					"value": 57073
				},
				{
					"name": "59144",
					"value": 59144
				},
				{
					"name": "81457",
					"value": 81457
				},
				{
					"name": "7777777",
					"value": 7777777
				},
				{
					"name": "1301",
					"value": 1301
				},
				{
					"name": "84532",
					"value": 84532
				},
				{
					"name": "11155111",
					"value": 11155111
				}
			],
			"routing": {
				"send": {
					"type": "query",
					"property": "chainId",
					"value": "={{ $value }}",
					"propertyInDotNotation": false
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Default"
					],
					"operation": [
						"Margin Positions"
					]
				}
			}
		},
		{
			"displayName": "Statuses",
			"name": "statuses",
			"description": "Selects the tab: comma-separated (`statuses=COMPLETED,LIQUIDATED,PARTIALLY_LIQUIDATED`) or repeated (`statuses=COMPLETED&statuses=LIQUIDATED`). Unset means `ACTIVE`. `ACTIVE` is read on chain and the finished statuses from the position store, which page differently, so `ACTIVE` must be sent alone; any set of finished statuses is served in one page, newest first, each row carrying its own status. The Active tab sends `ACTIVE`, the Completed tab `COMPLETED,LIQUIDATED,PARTIALLY_LIQUIDATED`. A 400 `RequestValidationError` for `ACTIVE` with any other status, a status named twice, an empty value, or a value outside the enum. Any query key the endpoint does not take, such as the retired `status` or a bracketed `statuses[]`, is refused the same way rather than ignored.",
			"default": "[\n  \"COMPLETED\",\n  \"LIQUIDATED\",\n  \"PARTIALLY_LIQUIDATED\"\n]",
			"type": "json",
			"routing": {
				"send": {
					"type": "query",
					"property": "statuses",
					"value": "={{ $value }}",
					"propertyInDotNotation": false
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Default"
					],
					"operation": [
						"Margin Positions"
					]
				}
			}
		},
		{
			"displayName": "Cursor",
			"name": "cursor",
			"description": "Opaque. Echo `nextCursor` back verbatim. A KEYSET cursor over the row order (`subId`, then venue and market). A cursor that is not base64 is a 400 `RequestValidationError`; one that is base64 but does not parse is a 400 `MARGIN_INVALID_CURSOR`. Neither restarts at page one, which would loop a client forever.",
			"default": "",
			"type": "string",
			"routing": {
				"send": {
					"type": "query",
					"property": "cursor",
					"value": "={{ $value }}",
					"propertyInDotNotation": false
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Default"
					],
					"operation": [
						"Margin Positions"
					]
				}
			}
		},
		{
			"displayName": "Limit",
			"name": "limit",
			"description": "Rows per page. Defaults to 20 and caps at 20, matching `GET /margin/markets`, `GET /orders` and `GET /plans`.",
			"default": 0,
			"type": "number",
			"routing": {
				"send": {
					"type": "query",
					"property": "limit",
					"value": "={{ $value }}",
					"propertyInDotNotation": false
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Default"
					],
					"operation": [
						"Margin Positions"
					]
				}
			}
		},
		{
			"displayName": "X Agent Info",
			"name": "x-agent-info",
			"description": "Optional attribution hint for AI-agent traffic; send it if an AI agent built or operates your integration. The value is a JSON object with up to three fields: `decision_origin` (required, exactly `autonomous` or `human_mediated`, case-sensitive), `integration_name` (optional string naming your integration, e.g. `my-trading-bot`), and `version` (optional string identifying your integration's version). Any other key is dropped, never rejected. The raw value must be at most 1024 bytes of printable US-ASCII (`0x20`-`0x7E`), so send non-ASCII text as JSON `\\u` escapes; `integration_name` and `version` are each limited to 256 UTF-16 code units and may not contain control characters, U+2028, U+2029, or U+FFFD. Send the header once: repeated header lines are joined with `, ` and the joined string is what gets parsed, so two complete objects fail as invalid JSON while a single object split across two lines still parses. The header is analytics-only and never affects the request: omitting it, sending it, or sending a value that fails these rules never changes the response status, body, or swap behavior. A value that fails to parse is dropped and reported by the `x-agent-info-status` response header. Never put a user ID, wallet address, email, session token, or API key in these fields.",
			"default": "{\"decision_origin\":\"autonomous\",\"integration_name\":\"my-trading-bot\",\"version\":\"1.4.0\"}",
			"type": "string",
			"routing": {
				"request": {
					"headers": {
						"x-agent-info": "={{ $value }}"
					}
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Default"
					],
					"operation": [
						"Margin Positions"
					]
				}
			}
		},
		{
			"displayName": "API Key (Header)",
			"name": "security_apikey",
			"type": "string",
			"default": "",
			"description": "API key for apiKey (header: x-api-key)",
			"required": false,
			"routing": {
				"request": {
					"headers": {
						"x-api-key": "={{ $value }}"
					}
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Default"
					],
					"operation": [
						"Margin Positions"
					]
				}
			}
		},
		{
			"displayName": "GET /margin/positions/activity",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"Default"
					],
					"operation": [
						"Margin Position Activity"
					]
				}
			}
		},
		{
			"displayName": "Activity ID",
			"name": "activityId",
			"required": true,
			"description": "A `MarginPositionRow.activityId`. Anything else, or none, is a 400 `RequestValidationError`; a well-formed id the store holds nothing for serves an empty `activity`.",
			"default": "",
			"type": "string",
			"routing": {
				"send": {
					"type": "query",
					"property": "activityId",
					"value": "={{ $value }}",
					"propertyInDotNotation": false
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Default"
					],
					"operation": [
						"Margin Position Activity"
					]
				}
			}
		},
		{
			"displayName": "Cursor",
			"name": "cursor",
			"description": "Opaque. Echo `nextCursor` back verbatim with the same `activityId`. A cursor that is not base64 is a 400 `RequestValidationError`; one from another `activityId`, or that does not parse, is a 400 `MARGIN_INVALID_CURSOR`.",
			"default": "",
			"type": "string",
			"routing": {
				"send": {
					"type": "query",
					"property": "cursor",
					"value": "={{ $value }}",
					"propertyInDotNotation": false
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Default"
					],
					"operation": [
						"Margin Position Activity"
					]
				}
			}
		},
		{
			"displayName": "Limit",
			"name": "limit",
			"description": "Entries per page. Defaults to 50 and caps at 50.",
			"default": 0,
			"type": "number",
			"routing": {
				"send": {
					"type": "query",
					"property": "limit",
					"value": "={{ $value }}",
					"propertyInDotNotation": false
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Default"
					],
					"operation": [
						"Margin Position Activity"
					]
				}
			}
		},
		{
			"displayName": "X Agent Info",
			"name": "x-agent-info",
			"description": "Optional attribution hint for AI-agent traffic; send it if an AI agent built or operates your integration. The value is a JSON object with up to three fields: `decision_origin` (required, exactly `autonomous` or `human_mediated`, case-sensitive), `integration_name` (optional string naming your integration, e.g. `my-trading-bot`), and `version` (optional string identifying your integration's version). Any other key is dropped, never rejected. The raw value must be at most 1024 bytes of printable US-ASCII (`0x20`-`0x7E`), so send non-ASCII text as JSON `\\u` escapes; `integration_name` and `version` are each limited to 256 UTF-16 code units and may not contain control characters, U+2028, U+2029, or U+FFFD. Send the header once: repeated header lines are joined with `, ` and the joined string is what gets parsed, so two complete objects fail as invalid JSON while a single object split across two lines still parses. The header is analytics-only and never affects the request: omitting it, sending it, or sending a value that fails these rules never changes the response status, body, or swap behavior. A value that fails to parse is dropped and reported by the `x-agent-info-status` response header. Never put a user ID, wallet address, email, session token, or API key in these fields.",
			"default": "{\"decision_origin\":\"autonomous\",\"integration_name\":\"my-trading-bot\",\"version\":\"1.4.0\"}",
			"type": "string",
			"routing": {
				"request": {
					"headers": {
						"x-agent-info": "={{ $value }}"
					}
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Default"
					],
					"operation": [
						"Margin Position Activity"
					]
				}
			}
		},
		{
			"displayName": "API Key (Header)",
			"name": "security_apikey",
			"type": "string",
			"default": "",
			"description": "API key for apiKey (header: x-api-key)",
			"required": false,
			"routing": {
				"request": {
					"headers": {
						"x-api-key": "={{ $value }}"
					}
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Default"
					],
					"operation": [
						"Margin Position Activity"
					]
				}
			}
		},
];
