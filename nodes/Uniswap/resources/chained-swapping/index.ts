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
			"description": "A margin quote echoed back verbatim, in place of `quote`. Exactly one of the two is accepted. Decoded strictly: an unknown field, an unrecognised enum string, a wrongly typed value, or a `slippageTolerance` or `funding.slippageTolerance` with more than two decimal places is a 400 `RequestValidationError`. Every bound and the route are re-derived from the venue and the chain's pools at plan create, and a re-derived `maxDebtIn` or `maxCollateralIn` is never looser than the one echoed, since that is the bound the caller agreed to.\n\nRefused with a 400 `MARGIN_PLAN_OPERATION_UNSUPPORTED`: a `legs[].subId` on `open`, which the service allocates; an amount or `subId` that is not a non-negative integer string in range; a `funding` block without its `slippageTolerance`. Refused with a 422: `MARGIN_PRICE_DRIFT`, the leverage leg now costs more than the echoed `maxDebtIn` (or sells more than the echoed `maxCollateralIn`), so re-quote; `MARGIN_SWAP_PRICE_IMPACT`, the leverage leg now crosses the quote's 150bps ceiling; `MARGIN_SWAP_PRICE_IMPACT_UNMEASURABLE`, its impact can no longer be measured; `MARGIN_SWAP_ALL_IN_COST`, the re-derived leverage leg's expected fill now costs more than 300bps over the venue's mark; `MARGIN_POOL_MANAGER_INVENTORY`, the v4 PoolManager no longer holds the re-derived input bound of the token the router flash-borrows plus 10% headroom (the bound alone on a `close`), or on a buy no longer holds the collateral a close of the resulting position would flash-borrow; when `PATCH /plan/{planId}` rebuilds the margin step it requires only the bound itself, with no headroom, since the funding swap may already have run, and when the PoolManager holds less than that it answers 200 with the step left unbuilt in `NOT_READY` rather than serving fresh calldata; `MARGIN_NO_ELIGIBLE_VENUE`, the service no longer serves the market on the venue, or its state now refuses the supply or borrow the plan makes, as `POST /margin/quote` refuses it: a paused, frozen or inactive reserve, borrowing disabled on the debt, an Aave v4 hub halt, or too little room under the supply or add cap for the equity and the bought collateral the plan supplies, either cap's room held back by the interest the collateral's borrowers can accrue before the plan's deadline and one more block, and on Aave v3 also since the reserve last updated; `MARGIN_VENUE_WITHDRAWALS_UNAVAILABLE`, on a `close`, a decrease or a withdrawal, the venue now will not let the collateral out or take the repay, as `POST /margin/quote` refuses it, with a decrease counted at its echoed `maxCollateralIn` together with any withdrawal beside it; `MARGIN_POSITION_CHANGED`, on a decrease, the position now owes less than the echoed `debtToRepay`, as after a liquidation since the quote, so re-quote. A `close` is never refused for impact, but it is refused with the 422 `MARGIN_PRICE_DRIFT` when its re-priced fill now sells more than the echoed `maxCollateralIn`, since the router would revert it. A 503 `MARGIN_MARKET_READ_UNAVAILABLE`, including when the PoolManager balance or the venue's state cannot be read, means the plan was not created. On an `open`, a 409 `MARGIN_SUBID_UNAVAILABLE` means no sub-account is free for the wallet, and a 429 `MARGIN_SUBID_CLAIMS_PER_OWNER_EXCEEDED` means the calling session already holds 4 outstanding sub-account claims on it, or 8 live ones whose plans are not `COMPLETED`; neither creates a plan.\n\nThe wallet-side funding swap runs at `funding.slippageTolerance`, the tolerance its floor was derived at, and routes over V2, V3 and V4 pools without hooks, never UniswapX. When the swap re-quoted at plan create no longer floors at the equity, it is rebuilt at the narrower tolerance whose floor covers it, which its step's `slippage` reports, but never below half of `funding.slippageTolerance`: with less headroom over the equity than that, or an expected output below it, the plan is refused with a 422 `MARGIN_FUNDING_BELOW_EQUITY`, so re-quote. `PATCH /plan/{planId}` and a `forceRefresh` read answer the same 422 when the funding swap they rebuild is expected to deliver less than the equity; a rebuild left with less headroom than that floor keeps the funding step already served. The `MARGIN_EXECUTE` step's `slippage` is the leverage leg's tolerance its bounds were derived at, and is absent on `addEquity` and `withdrawEquity`, which price no leverage swap. An `open` on a market or venue `GET /margin/markets` does not list is refused with a 422 `MARGIN_NO_ELIGIBLE_VENUE`.",
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
