import type { INodeProperties } from 'n8n-workflow';

export const chainedSwappingDescription: INodeProperties[] = [
                {
			"displayName": "Operation",
			"name": "operation",
			"type": "options",
			"noDataExpression": true,
			"displayOptions": {
				"show": {
					"resource": [
						"Chained Swapping"
					]
				}
			},
			"options": [
				{
					"name": "Create Plan",
					"value": "Create Plan",
					"action": "Create an execution plan",
					"description": "Creates a multi-step execution plan for chained transactions. The plan breaks down complex multi-chain or multi-transaction flows into sequential steps that can be executed by the client. Each step includes the method (transaction, message signature, or batch calls), payload, and current status. The response includes the current step index to track progress through the plan.",
					"routing": {
						"request": {
							"method": "POST",
							"url": "=/plan"
						}
					}
				},
				{
					"name": "Get Plan",
					"value": "Get Plan",
					"action": "Get an execution plan",
					"description": "Retrieves an existing execution plan by its ID. Returns the full plan with current status and all steps. If forceRefresh is set to true, step statuses are re-checked and, while no step is IN_PROGRESS, the steps not yet proved are re-quoted, which can replace the payload of an AWAITING_ACTION step; a transaction built from an earlier payload may then not prove that step, so build it from the latest response. Note: Completed plans cannot be refreshed.",
					"routing": {
						"request": {
							"method": "GET",
							"url": "=/plan/{{$parameter[\"planId\"]}}"
						}
					}
				},
				{
					"name": "Update Plan",
					"value": "Update Plan",
					"action": "Update an execution plan",
					"description": "Updates an existing execution plan by submitting proof of completed plan steps (transaction hashes or signatures). The endpoint retrieves the existing plan, attaches proofs to specified steps, verifies the proofs, and potentially regenerates remaining steps if needed. Returns the full updated plan with current status. Note: Order IDs are not accepted in requests; they are system-generated after receiving a signature. A transaction proves a step only if the step's call took effect. When the swapper sent the step's call and it did not take effect, because the transaction reverted, every user operation from the swapper in an ERC-4337 bundle reverted, or a smart wallet or batch made the call and it reverted inside an otherwise successful transaction, the step is recorded as `STEP_ERROR` with its proof. A successful transaction that never made the step's call is refused with 400, and a proof already recorded as pending turns the step to `STEP_ERROR`. A batch in which a call other than an approval took effect while another of its calls reverted is refused the same way. A margin step's proof is refused the same way when the swapper never called the margin router, as an EIP-7702 self-call from a wallet that is not delegated does. On a margin plan, when the transaction or its trace cannot be read from the chain (an RPC failure, as opposed to a node answering that it does not know the hash), a new proof is refused with a retryable 503 and a proof already recorded stays `IN_PROGRESS` for the next poll; a hash the node does not know yet is recorded `IN_PROGRESS` rather than refused with 404, until 300 seconds past the plan's execute deadline.",
					"routing": {
						"request": {
							"method": "PATCH",
							"url": "=/plan/{{$parameter[\"planId\"]}}"
						}
					}
				}
			],
			"default": ""
		},
		{
			"displayName": "POST /plan",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"Chained Swapping"
					],
					"operation": [
						"Create Plan"
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
						"Chained Swapping"
					],
					"operation": [
						"Create Plan"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Routing",
			"name": "routing",
			"type": "options",
			"default": "CHAINED",
			"description": "The routing type for the plan. Currently only CHAINED is supported for multi-step execution plans.",
			"options": [
				{
					"name": "CHAINED",
					"value": "CHAINED"
				}
			],
			"routing": {
				"send": {
					"property": "routing",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Chained Swapping"
					],
					"operation": [
						"Create Plan"
					]
				}
			}
		},
		{
			"displayName": "Quote",
			"name": "quote",
			"type": "json",
			"default": "{\n  \"input\": {\n    \"maximumAmount\": {}\n  },\n  \"output\": {\n    \"amount\": {},\n    \"minimumAmount\": {}\n  },\n  \"tokenInChainId\": 1,\n  \"tokenOutChainId\": {},\n  \"tradeType\": \"EXACT_INPUT\",\n  \"gasEstimates\": [\n    null\n  ],\n  \"protocols\": [\n    null\n  ],\n  \"gasStrategies\": [\n    {}\n  ],\n  \"steps\": [\n    {\n      \"tokenIn\": {},\n      \"tokenInChainId\": {},\n      \"tokenOut\": {},\n      \"tokenOutChainId\": {}\n    }\n  ],\n  \"slippageTolerance\": {},\n  \"earnIntent\": {\n    \"chainId\": {},\n    \"underlyingAsset\": {},\n    \"requestedAssets\": {},\n    \"preview\": {\n      \"depositAssets\": [\n        {\n          \"token\": {},\n          \"chainId\": {},\n          \"amount\": {}\n        }\n      ],\n      \"estimatedSharesOut\": {}\n    }\n  },\n  \"earnPreview\": {},\n  \"bridgeProviders\": [\n    {}\n  ]\n}",
			"description": "A quote for a chained transaction flow that spans multiple steps, potentially across multiple chains.",
			"routing": {
				"send": {
					"property": "quote",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ JSON.parse($value) }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Chained Swapping"
					],
					"operation": [
						"Create Plan"
					]
				}
			}
		},
		{
			"displayName": "Wallet Execution Context",
			"name": "walletExecutionContext",
			"type": "json",
			"default": "{\n  \"properties\": {\n    \"walletInfo\": {}\n  }\n}",
			"description": "Wallet execution context based on CAIP-25 Standard. Provides information about wallet capabilities and scopes.",
			"routing": {
				"send": {
					"property": "walletExecutionContext",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ JSON.parse($value) }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Chained Swapping"
					],
					"operation": [
						"Create Plan"
					]
				}
			}
		},
		{
			"displayName": "Urgency",
			"name": "urgency",
			"type": "string",
			"default": "",
			"description": "The urgency impacts the estimated gas price of the transaction. The higher the urgency, the higher the gas price, and the faster the transaction is likely to be selected from the mempool. Send the bare string form (e.g. `\"normal\"`) for the common case, or the object form `{ level, overrides }` to supply caller caps for `maxPriorityFeePerGas`, `maxFeePerGas`, and `gasLimit`.",
			"routing": {
				"send": {
					"property": "urgency",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Chained Swapping"
					],
					"operation": [
						"Create Plan"
					]
				}
			}
		},
		{
			"displayName": "Earn Intent",
			"name": "earnIntent",
			"type": "json",
			"default": "{\n  \"chainId\": 1\n}",
			"description": "Earn vault intent supplied on /quote and repeated on /plan. Earn currently supports the allowlisted Mainnet Morpho vaults.",
			"routing": {
				"send": {
					"property": "earnIntent",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ JSON.parse($value) }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Chained Swapping"
					],
					"operation": [
						"Create Plan"
					]
				}
			}
		},
		{
			"displayName": "Margin Quote",
			"name": "marginQuote",
			"type": "json",
			"default": "{}",
			"description": "A margin quote echoed back verbatim, in place of `quote`. Exactly one of the two is accepted. Decoded strictly: an unknown field, an unrecognised enum string, a wrongly typed value, or a `slippageTolerance` or `funding.slippageTolerance` with more than two decimal places is a 400 `RequestValidationError`. Every bound and the route are re-derived from the venue and the chain's pools at plan create, and a re-derived `maxDebtIn` or `maxCollateralIn` is never looser than the one echoed, since that is the bound the caller agreed to.\n\nRefused with a 400 `MARGIN_MIRRORED_READING`: an `open` whose `direction`, `exposureToken` and `counterToken` read its market as one `GET /margin/markets` does not list, as `POST /margin/quote` refuses it. Refused with a 400 `MARGIN_PLAN_OPERATION_UNSUPPORTED`: a `legs[].subId` on `open`, which the service allocates; a `legs[].marketId` missing on `open`, present on any other key, or not 0x-prefixed 32-byte hex; an amount or `subId` that is not a non-negative integer string in range; a `funding` block without its `slippageTolerance`. Refused with a 422: `MARGIN_PRICE_DRIFT`, the leverage leg now costs more than the echoed `maxDebtIn` (or sells more than the echoed `maxCollateralIn`), so re-quote; `MARGIN_SWAP_PRICE_IMPACT`, the leverage leg now crosses the quote's 150bps ceiling; `MARGIN_SWAP_PRICE_IMPACT_UNMEASURABLE`, its impact can no longer be measured; `MARGIN_SWAP_ALL_IN_COST`, the re-derived leverage leg's expected fill now costs more than 300bps over the venue's mark; `MARGIN_POOL_MANAGER_INVENTORY`, the v4 PoolManager no longer holds the re-derived input bound of the token the router flash-borrows plus 10% headroom (the bound alone on a `close`), or on a buy no longer holds the collateral a close of the resulting position would flash-borrow; when `PATCH /plan/{planId}` rebuilds the margin step it requires only the bound itself, with no headroom, since the funding swap may already have run, and when the PoolManager holds less than that it answers 200 with the step left unbuilt in `NOT_READY` rather than serving fresh calldata; `MARGIN_NO_ELIGIBLE_VENUE`, the service no longer serves the market on the venue, or its state now refuses the supply or borrow the plan makes, as `POST /margin/quote` refuses it: a paused, frozen or inactive reserve, borrowing disabled on the debt, an Aave v4 hub halt, or too little room under the supply or add cap for the equity and the bought collateral the plan supplies, either cap's room held back by the interest the collateral's borrowers can accrue in the 1,200 s after plan create (the 900 s its margin step has to be served in, then the 300 s its call stays sendable) and one more block, and on Aave v3 also since the reserve last updated (a plan funded from another chain can be served later than that, and its caps are not checked again when the funds land); `MARGIN_VENUE_WITHDRAWALS_UNAVAILABLE`, on a `close`, a decrease or a withdrawal, the venue now will not let the collateral out or take the repay, as `POST /margin/quote` refuses it, with a decrease counted at its echoed `maxCollateralIn` together with any withdrawal beside it; `MARGIN_POSITION_CHANGED`, on a decrease, the position now owes less than the echoed `debtToRepay`, as after a liquidation since the quote, so re-quote. A `close` is never refused for impact, but it is refused with the 422 `MARGIN_PRICE_DRIFT` when its re-priced fill now sells more than the echoed `maxCollateralIn`, since the router would revert it. A 503 `MARGIN_MARKET_READ_UNAVAILABLE`, including when the PoolManager balance or the venue's state cannot be read, means the plan was not created. On an `open`, a 409 `MARGIN_SUBID_UNAVAILABLE` means no sub-account is free for the wallet, and a 429 `MARGIN_SUBID_CLAIMS_PER_OWNER_EXCEEDED` means the calling session already holds 4 outstanding sub-account claims on it, or 8 live ones whose plans are not `COMPLETED`; neither creates a plan. These are checked at plan create without taking a claim: the sub-account is reserved, and the margin call built with a deadline 300 s out, when the `MARGIN_EXECUTE` step is served, at plan create when it is the plan's first step and otherwise once every step before it has completed; when the same refusals meet that later serve, `PATCH /plan/{planId}` and `GET /plan/{planId}` answer 200 with the step left `NOT_READY` for a later update to serve.\n\nThe wallet-side funding swap runs at `funding.slippageTolerance`, the tolerance its floor was derived at, and routes over V2, V3 and V4 pools without hooks, never UniswapX. When the swap re-quoted at plan create no longer floors at the equity, it is rebuilt at the narrower tolerance whose floor covers it, which its step's `slippage` reports, but never below half of `funding.slippageTolerance`: with less headroom over the equity than that, or an expected output below it, the plan is refused with a 422 `MARGIN_FUNDING_BELOW_EQUITY`, so re-quote. `PATCH /plan/{planId}` and a `forceRefresh` read answer the same 422 when the funding swap they rebuild is expected to deliver less than the equity; a rebuild left with less headroom than that floor keeps the funding step already served. The `MARGIN_EXECUTE` step's `slippage` is the leverage leg's tolerance its bounds were derived at, and is absent on `addEquity` and `withdrawEquity`, which price no leverage swap. An `open` is planned on the market its `legs[0].marketId` names, the one the quote priced: an id naming no market `GET /margin/markets` lists on `positionChainId` is refused with a 422 `MARGIN_MARKET_NOT_FOUND`, a market that is not the echo's pair on the side `direction` puts it, or not on the leg's `venue`, with a 400 `MARGIN_MARKET_MISMATCH`, and a market closed to new positions with a 422 `MARGIN_NO_ELIGIBLE_VENUE`. When the catalogue is served from the margin market index, an `open`, `increaseLeverage`, `addEquityAndIncreaseLeverage`, `withdrawEquity`, `withdrawEquityAndIncreaseLeverage`, `withdrawEquityAndDecreaseLeverage`, and any other leg that borrows or withdraws, also has its market re-read from the index, uncached, when the plan is created and again when `PATCH /plan/{planId}` or `GET /plan/{planId}` serves the margin step, which builds it then: a market the index does not report open is a 422 `MARGIN_NO_ELIGIBLE_VENUE` on create and fails the step on an update, and a read that fails or takes longer than 300 ms is a 503 `MARGIN_MARKET_READ_UNAVAILABLE` on create and leaves the step in `NOT_READY` on an update.\n\nFunding from another chain, a `funding.tokenInChainId` other than `positionChainId`, is planned only on `open`, `addEquity` and the two add-equity composites; on any other key it is refused with a 400 `MARGIN_PLAN_OPERATION_UNSUPPORTED` (`: cross-chain funding`). A `funding.minBridgeOut` absent or other than `funding.output.minimumAmount` is the same 400 with `: invalid funding.minBridgeOut`. A `funding.tokenInChainId` Across does not bridge from, or a collateral no corridor from it reaches, is a 422 `MARGIN_CROSS_CHAIN_FUNDING_ROUTE_UNSUPPORTED`. The plan routes over Across alone: the optional swap on the source chain, the bridge, a `WRAP` on the position's chain when the collateral is the wrapped native token and the swapper's wallet there has no code or an EIP-7702 delegation (Across pays such a wallet native currency; a 503 `MARGIN_POSITION_CHAIN_READ_UNAVAILABLE` means that code could not be read), then the position chain's approvals and `MARGIN_EXECUTE`. A contract wallet there (code that is not an EIP-7702 delegation) is planned only while it holds a Permit2 allowance for the margin router on the collateral covering the equity past the plan's outer deadline, since a permit it signed would be an EIP-1271 signature the permit step cannot verify; otherwise the plan is refused with a 422 `MARGIN_CROSS_CHAIN_CONTRACT_WALLET_PERMIT_UNSUPPORTED` before anything is served, whatever its `walletExecutionContext`, EIP-5792 included, as on `POST /margin/quote`, and a 503 `MARGIN_POSITION_CHAIN_READ_UNAVAILABLE` means that allowance could not be read. Only this plan's equity is checked against that allowance, which each margin step spends down unless it is the maximum. The equity is `funding.output.minimumAmount`. At plan create the bridge is re-priced at the source swap's own minimum, or at `funding.input.amount` when the route starts with the bridge, and Across's output there below the equity, a relay fee that rose by more than the 10 bps `funding.minBridgeOut` holds back, is a 422 `MARGIN_FUNDING_BELOW_EQUITY` whether or not the creation guards are switched off; a re-price no bridge quote answers is a 422 `MARGIN_SWAP_INSUFFICIENT_LIQUIDITY`, and one whose bridge timed out a 503 `MARGIN_FUNDING_QUOTE_UNAVAILABLE`, as on `POST /margin/quote`. The Across deposit's output is the larger of the equity and Across's output for the amount deposited less those 10 bps, so the fill lands at least the equity and the relayer keeps the rest of its fee move; a `PATCH /plan/{planId}` or `forceRefresh` read that re-prices the bridge before it is sent and finds Across's output below the equity ends the plan `FAILED`, so re-quote. Once the bridge fills, the next `PATCH /plan/{planId}` or `forceRefresh` read rebuilds the steps after it once, from the amount that landed: a landing below the equity ends `MARGIN_EXECUTE` in `STEP_ERROR` and the plan `FAILED`, with the funds left in the wallet on the position's chain. The funds must land within 3,600 s of plan create: the Across deposit's `fillDeadline` is capped there, so a deposit still unfilled then expires, Across refunds it on the source chain, and the plan ends `FAILED`; a rebuild before the bridge that would leave the deposit less than 600 s to fill ends the plan `FAILED` the same way, with the funds left in the wallet on the source chain. The rebuild once the funds land gives `MARGIN_EXECUTE` 1,800 s from that update to be served, and never more than 1,800 s past the time the funds had to land by; its call, once served, is sendable for 300 s and never past that outer deadline; the plan ends `FAILED` if the step is not served, or its call not sent, by then.",
			"routing": {
				"send": {
					"property": "marginQuote",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ JSON.parse($value) }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Chained Swapping"
					],
					"operation": [
						"Create Plan"
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
						"Chained Swapping"
					],
					"operation": [
						"Create Plan"
					]
				}
			}
		},
		{
			"displayName": "GET /plan/{planId}",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"Chained Swapping"
					],
					"operation": [
						"Get Plan"
					]
				}
			}
		},
		{
			"displayName": "Plan ID",
			"name": "planId",
			"required": true,
			"description": "The unique identifier of the plan to retrieve.",
			"default": "",
			"type": "string",
			"displayOptions": {
				"show": {
					"resource": [
						"Chained Swapping"
					],
					"operation": [
						"Get Plan"
					]
				}
			}
		},
		{
			"displayName": "Force Refresh",
			"name": "forceRefresh",
			"description": "Whether to re-check step statuses and re-quote the steps not yet proved. Defaults to false. Completed plans cannot be refreshed.",
			"default": true,
			"type": "boolean",
			"routing": {
				"send": {
					"type": "query",
					"property": "forceRefresh",
					"value": "={{ $value }}",
					"propertyInDotNotation": false
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Chained Swapping"
					],
					"operation": [
						"Get Plan"
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
						"Chained Swapping"
					],
					"operation": [
						"Get Plan"
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
						"Chained Swapping"
					],
					"operation": [
						"Get Plan"
					]
				}
			}
		},
		{
			"displayName": "PATCH /plan/{planId}",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"Chained Swapping"
					],
					"operation": [
						"Update Plan"
					]
				}
			}
		},
		{
			"displayName": "Plan ID",
			"name": "planId",
			"required": true,
			"description": "The unique identifier of the plan to update.",
			"default": "",
			"type": "string",
			"displayOptions": {
				"show": {
					"resource": [
						"Chained Swapping"
					],
					"operation": [
						"Update Plan"
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
						"Chained Swapping"
					],
					"operation": [
						"Update Plan"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Steps",
			"name": "steps",
			"type": "json",
			"default": "[\n  {\n    \"proof\": {}\n  }\n]",
			"description": "Array of steps with proofs to attach. Only steps being updated need to be included.",
			"routing": {
				"send": {
					"property": "steps",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ JSON.parse($value) }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Chained Swapping"
					],
					"operation": [
						"Update Plan"
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
						"Chained Swapping"
					],
					"operation": [
						"Update Plan"
					]
				}
			}
		},
];
