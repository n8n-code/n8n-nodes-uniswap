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
					"description": "Retrieves an existing execution plan by its ID. Returns the full plan with current status and all steps. If forceRefresh is set to true, the plan will be refreshed to check for any updates to step statuses. Note: Completed plans cannot be refreshed.",
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
					"description": "Updates an existing execution plan by submitting proof of completed plan steps (transaction hashes or signatures). The endpoint retrieves the existing plan, attaches proofs to specified steps, verifies the proofs, and potentially regenerates remaining steps if needed. Returns the full updated plan with current status. Note: Order IDs are not accepted in requests; they are system-generated after receiving a signature.",
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
			"required": true,
			"displayName": "Quote",
			"name": "quote",
			"type": "json",
			"default": "{\n  \"input\": {\n    \"maximumAmount\": {}\n  },\n  \"output\": {\n    \"amount\": {},\n    \"minimumAmount\": {}\n  },\n  \"tokenInChainId\": 1,\n  \"tokenOutChainId\": {},\n  \"tradeType\": \"EXACT_INPUT\",\n  \"gasEstimates\": [\n    null\n  ],\n  \"protocols\": [\n    null\n  ],\n  \"gasStrategies\": [\n    {}\n  ],\n  \"steps\": [\n    {\n      \"tokenIn\": {},\n      \"tokenInChainId\": {},\n      \"tokenOut\": {},\n      \"tokenOutChainId\": {}\n    }\n  ],\n  \"slippageTolerance\": {},\n  \"earnIntent\": {\n    \"chainId\": {},\n    \"underlyingAsset\": {},\n    \"requestedAssets\": {},\n    \"preview\": {\n      \"depositAssets\": [\n        {\n          \"token\": {},\n          \"chainId\": {},\n          \"amount\": {}\n        }\n      ],\n      \"estimatedSharesOut\": {}\n    }\n  },\n  \"earnPreview\": {}\n}",
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
			"description": "Whether to force refresh the plan status. Defaults to false. Completed plans cannot be refreshed.",
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
