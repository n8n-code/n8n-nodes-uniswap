import type { INodeProperties } from 'n8n-workflow';

export const swapBatchingDescription: INodeProperties[] = [
                {
			"displayName": "Operation",
			"name": "operation",
			"type": "options",
			"noDataExpression": true,
			"displayOptions": {
				"show": {
					"resource": [
						"Swap Batching"
					]
				}
			},
			"options": [
				{
					"name": "Wallet Encode 7702",
					"value": "Wallet Encode 7702",
					"action": "Encode wallet transactions",
					"description": "Encodes a list of transactions into a single transaction for an EIP-7702 delegated smart contract wallet. All transactions must have the same chainId.",
					"routing": {
						"request": {
							"method": "POST",
							"url": "=/wallet/encode_7702"
						}
					}
				},
				{
					"name": "Create Swap 5792 Transaction",
					"value": "Create Swap 5792 Transaction",
					"action": "Create swap EIP 5792 calldata",
					"description": "Create the EIP 5792 calldata for a swap transaction (including wrap/unwrap and bridging) against the Uniswap Protocols. If the `quote` parameter includes the fee parameters, then the calldata will include the fee disbursement. The gas estimates will be **more precise** when the response calldata would be valid if submitted on-chain.",
					"routing": {
						"request": {
							"method": "POST",
							"url": "=/swap_5792"
						}
					}
				},
				{
					"name": "Create Swap 7702 Transaction",
					"value": "Create Swap 7702 Transaction",
					"action": "Create swap EIP 7702 calldata",
					"description": "Create the EIP 7702 calldata for a swap transaction (including wrap/unwrap and bridging) against the Uniswap Protocols. If the `quote` parameter includes the fee parameters, then the calldata will include the fee disbursement. The gas estimates will be **more precise** when the the response calldata would be valid if submitted on-chain.\n\nNative ETH / UniswapX setup: When `x-erc20eth-enabled` is `true` and the input token is native ETH, the response may include an additional native approval call (e.g. an `approveNative` step) to enable ERC20-ETH (EIP-7914) spending for the wallet. This native allowance is a prerequisite for native ETH input on UniswapX (`/quote` then `/order`) for supported wallets.",
					"routing": {
						"request": {
							"method": "POST",
							"url": "=/swap_7702"
						}
					}
				}
			],
			"default": ""
		},
		{
			"displayName": "POST /wallet/encode_7702",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"Swap Batching"
					],
					"operation": [
						"Wallet Encode 7702"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Calls",
			"name": "calls",
			"type": "json",
			"default": "[\n  {\n    \"chainId\": 1\n  }\n]",
			"description": "Array of transaction requests to be encoded. All transactions must have the same chainId.",
			"routing": {
				"send": {
					"property": "calls",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ JSON.parse($value) }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swap Batching"
					],
					"operation": [
						"Wallet Encode 7702"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Smart Contract Delegation Address",
			"name": "smartContractDelegationAddress",
			"type": "string",
			"default": "",
			"description": "The address of the smart contract delegation implementation to use.",
			"routing": {
				"send": {
					"property": "smartContractDelegationAddress",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swap Batching"
					],
					"operation": [
						"Wallet Encode 7702"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Wallet Address",
			"name": "walletAddress",
			"type": "string",
			"default": "",
			"description": "The address of the wallet for which the transactions will be encoded.",
			"routing": {
				"send": {
					"property": "walletAddress",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swap Batching"
					],
					"operation": [
						"Wallet Encode 7702"
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
						"Swap Batching"
					],
					"operation": [
						"Wallet Encode 7702"
					]
				}
			}
		},
		{
			"displayName": "POST /swap_5792",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"Swap Batching"
					],
					"operation": [
						"Create Swap 5792 Transaction"
					]
				}
			}
		},
		{
			"displayName": "X Universal Router Version",
			"name": "x-universal-router-version",
			"description": "The version of the Universal Router to use for the swap journey. *MUST* be consistent throughout the API calls.",
			"default": "2.0",
			"type": "options",
			"options": [
				{
					"name": "1 2",
					"value": "1.2"
				},
				{
					"name": "2 0",
					"value": "2.0"
				},
				{
					"name": "2 1 1",
					"value": "2.1.1"
				}
			],
			"routing": {
				"request": {
					"headers": {
						"x-universal-router-version": "={{ $value }}"
					}
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swap Batching"
					],
					"operation": [
						"Create Swap 5792 Transaction"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Quote",
			"name": "quote",
			"type": "json",
			"default": "{\n  \"input\": {\n    \"maximumAmount\": {}\n  },\n  \"output\": {\n    \"amount\": {},\n    \"minimumAmount\": {}\n  },\n  \"chainId\": 1,\n  \"tradeType\": \"EXACT_INPUT\",\n  \"route\": [\n    [\n      {\n        \"type\": \"v2-pool\",\n        \"tokenIn\": {\n          \"address\": {},\n          \"chainId\": {},\n          \"sellFeeBps\": {}\n        },\n        \"tokenOut\": {},\n        \"reserve0\": {\n          \"token\": {}\n        },\n        \"reserve1\": {},\n        \"amountIn\": {},\n        \"amountOut\": {}\n      }\n    ]\n  ],\n  \"txFailureReasons\": [\n    null\n  ],\n  \"aggregatedOutputs\": [\n    {\n      \"token\": {},\n      \"amount\": {},\n      \"recipient\": {}\n    }\n  ],\n  \"swapSteps\": [\n    {\n      \"path\": [\n        null\n      ],\n      \"minHopPriceX36\": [\n        null\n      ]\n    }\n  ]\n}",
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
						"Swap Batching"
					],
					"operation": [
						"Create Swap 5792 Transaction"
					]
				}
			}
		},
		{
			"displayName": "Permit Data",
			"name": "permitData",
			"type": "json",
			"default": "{}",
			"description": "the permit2 message object for the customer to sign to permit spending by the permit2 contract.",
			"routing": {
				"send": {
					"property": "permitData",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ JSON.parse($value) }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swap Batching"
					],
					"operation": [
						"Create Swap 5792 Transaction"
					]
				}
			}
		},
		{
			"displayName": "Deadline",
			"name": "deadline",
			"type": "number",
			"default": 0,
			"description": "The unix timestamp at which the order will be reverted if not filled.",
			"routing": {
				"send": {
					"property": "deadline",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swap Batching"
					],
					"operation": [
						"Create Swap 5792 Transaction"
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
						"Swap Batching"
					],
					"operation": [
						"Create Swap 5792 Transaction"
					]
				}
			}
		},
		{
			"displayName": "Sponsorship Info",
			"name": "sponsorshipInfo",
			"type": "json",
			"default": "{\n  \"campaign\": {},\n  \"sponsorMetadata\": {}\n}",
			"description": "Gas sponsorship information for the quoted swap. When `sponsored` is `true`, gas fees for executing this swap will be covered by the sponsor described in `sponsorMetadata`, under the campaign described in `campaign`. When `sponsored` is `false`, `rejectionReason` describes why sponsorship was not granted.",
			"routing": {
				"send": {
					"property": "sponsorshipInfo",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ JSON.parse($value) }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swap Batching"
					],
					"operation": [
						"Create Swap 5792 Transaction"
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
						"Swap Batching"
					],
					"operation": [
						"Create Swap 5792 Transaction"
					]
				}
			}
		},
		{
			"displayName": "POST /swap_7702",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"Swap Batching"
					],
					"operation": [
						"Create Swap 7702 Transaction"
					]
				}
			}
		},
		{
			"displayName": "X Universal Router Version",
			"name": "x-universal-router-version",
			"description": "The version of the Universal Router to use for the swap journey. *MUST* be consistent throughout the API calls.",
			"default": "2.0",
			"type": "options",
			"options": [
				{
					"name": "1 2",
					"value": "1.2"
				},
				{
					"name": "2 0",
					"value": "2.0"
				},
				{
					"name": "2 1 1",
					"value": "2.1.1"
				}
			],
			"routing": {
				"request": {
					"headers": {
						"x-universal-router-version": "={{ $value }}"
					}
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swap Batching"
					],
					"operation": [
						"Create Swap 7702 Transaction"
					]
				}
			}
		},
		{
			"displayName": "X Erc 20 Eth Enabled",
			"name": "x-erc20eth-enabled",
			"description": "Enable native ETH input support for UniswapX via ERC20-ETH (EIP-7914). When set to true and `tokenIn` is the native currency address (e.g. `0x0000000000000000000000000000000000000000`), the API may return UniswapX routes that spend native ETH for supported wallets.",
			"default": false,
			"type": "boolean",
			"routing": {
				"request": {
					"headers": {
						"x-erc20eth-enabled": "={{ $value }}"
					}
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swap Batching"
					],
					"operation": [
						"Create Swap 7702 Transaction"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Quote",
			"name": "quote",
			"type": "json",
			"default": "{\n  \"input\": {\n    \"maximumAmount\": {}\n  },\n  \"output\": {\n    \"amount\": {},\n    \"minimumAmount\": {}\n  },\n  \"chainId\": 1,\n  \"tradeType\": \"EXACT_INPUT\",\n  \"route\": [\n    [\n      {\n        \"type\": \"v2-pool\",\n        \"tokenIn\": {\n          \"address\": {},\n          \"chainId\": {},\n          \"sellFeeBps\": {}\n        },\n        \"tokenOut\": {},\n        \"reserve0\": {\n          \"token\": {}\n        },\n        \"reserve1\": {},\n        \"amountIn\": {},\n        \"amountOut\": {}\n      }\n    ]\n  ],\n  \"txFailureReasons\": [\n    null\n  ],\n  \"aggregatedOutputs\": [\n    {\n      \"token\": {},\n      \"amount\": {},\n      \"recipient\": {}\n    }\n  ],\n  \"swapSteps\": [\n    {\n      \"path\": [\n        null\n      ],\n      \"minHopPriceX36\": [\n        null\n      ]\n    }\n  ]\n}",
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
						"Swap Batching"
					],
					"operation": [
						"Create Swap 7702 Transaction"
					]
				}
			}
		},
		{
			"displayName": "Permit Data",
			"name": "permitData",
			"type": "json",
			"default": "{}",
			"description": "the permit2 message object for the customer to sign to permit spending by the permit2 contract.",
			"routing": {
				"send": {
					"property": "permitData",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ JSON.parse($value) }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swap Batching"
					],
					"operation": [
						"Create Swap 7702 Transaction"
					]
				}
			}
		},
		{
			"displayName": "Smart Contract Delegation Address",
			"name": "smartContractDelegationAddress",
			"type": "string",
			"default": "",
			"routing": {
				"send": {
					"property": "smartContractDelegationAddress",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swap Batching"
					],
					"operation": [
						"Create Swap 7702 Transaction"
					]
				}
			}
		},
		{
			"displayName": "Include Gas Info",
			"name": "includeGasInfo",
			"type": "boolean",
			"default": false,
			"routing": {
				"send": {
					"property": "includeGasInfo",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swap Batching"
					],
					"operation": [
						"Create Swap 7702 Transaction"
					]
				}
			}
		},
		{
			"displayName": "Deadline",
			"name": "deadline",
			"type": "number",
			"default": 0,
			"description": "The unix timestamp at which the order will be reverted if not filled.",
			"routing": {
				"send": {
					"property": "deadline",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swap Batching"
					],
					"operation": [
						"Create Swap 7702 Transaction"
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
						"Swap Batching"
					],
					"operation": [
						"Create Swap 7702 Transaction"
					]
				}
			}
		},
		{
			"displayName": "Simulate Transaction",
			"name": "simulateTransaction",
			"type": "boolean",
			"default": true,
			"routing": {
				"send": {
					"property": "simulateTransaction",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swap Batching"
					],
					"operation": [
						"Create Swap 7702 Transaction"
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
						"Swap Batching"
					],
					"operation": [
						"Create Swap 7702 Transaction"
					]
				}
			}
		},
];
