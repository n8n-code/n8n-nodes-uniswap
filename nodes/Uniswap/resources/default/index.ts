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
					"description": "The market picker's feed. One row per `(exposureToken, counterToken, direction)`.\n\n**Indicative by construction, and that is the point.** Rates move every block, so no listing agrees with a quote taken seconds later. The quote re-reads on chain and stamps its bounds into router calldata, so a stale row costs a re-quote and never a bad execution. That is what makes this endpoint cacheable.\n\n**The ceiling is NOT indicative.** `maxLeverage` comes from the same policy function the quote refuses on, applied to the same `maxLtv` the support check read, so a picker cannot offer a leverage the quote will reject. Never recompute it client-side from `lltv`: the LTV cliff buffer SCALES the ceiling rather than subtracting from it, so 86% at 400bps is 82.56% and not 82%.\n\n**Each market yields BOTH readings.** A venue market is a (collateral, debt) pair, and the same on-chain position is a long of its collateral and a short of its debt. Shorting a token is only expressible as a market whose debt it is, so emitting one reading would leave a caller unable to find the side they wanted.\n\n**Always paginated**, on the same contract as `GET /orders` and `GET /plans`: `limit` (default and max 20) plus an opaque `cursor` in, `nextCursor` out. There is no unbounded response. Not user-scoped, so there is no `swapper`.\n\n`borrowRate`, `availableBorrowLiquidity`, `oraclePrice` and `feeBps` are not populated yet and are absent rather than zero, since a zero rate and an unread rate are different facts.",
					"routing": {
						"request": {
							"method": "GET",
							"url": "=/margin/markets"
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
			"description": "Opaque. Echo `nextCursor` back verbatim to get the following page. A KEYSET cursor over the row order, not an offset: the catalogue is rebuilt on a timer, and an offset taken against one build silently skips or repeats rows against the next. A cursor that does not decode is a 400 `MARGIN_INVALID_CURSOR` rather than a silent restart, which would loop a client forever.",
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
			"description": "Rows per page. Defaults to 20 and caps at 20, matching `GET /orders` and `GET /plans`, so a client that already pages those needs no second set of rules. **Every** response is bounded whether or not a caller asks: nothing about this endpoint limits its own size, and the row count grows whenever governance allows a market.",
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
];
