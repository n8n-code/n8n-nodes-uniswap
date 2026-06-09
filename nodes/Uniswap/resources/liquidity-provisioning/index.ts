import type { INodeProperties } from 'n8n-workflow';

export const liquidityProvisioningDescription: INodeProperties[] = [
		{
			"displayName": "Operation",
			"name": "operation",
			"type": "options",
			"noDataExpression": true,
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					]
				}
			},
			"options": [
				{
					"name": "Check Lp Approval",
					"value": "Check Lp Approval",
					"action": "Check LP token approvals",
					"description": "Checks whether the wallet has the required token approvals to perform an LP action (create, increase, decrease, or migrate). Returns any needed approval transactions. If `simulateTransaction` is set to `true`, the response will include gas fees for the approval transactions.\n\nThe `action` field specifies which LP operation the approval is for. Different actions may require different approvals (e.g., V2 decrease requires approval of the LP token, V3 migrate requires approval of the V3 NFT).",
					"routing": {
						"request": {
							"method": "POST",
							"url": "=/lp/check_approval"
						}
					}
				},
				{
					"name": "Create Position",
					"value": "Create Position",
					"action": "Create a V3 or V4 LP position",
					"description": "Creates a new LP position in a V3 or V4 pool (including full-range positions). You can create a position in an existing pool by providing `existingPool` parameters, or create a new pool by providing `newPool` parameters (fee, tick spacing, initial price, and optionally hooks for V4). The position's price range is specified via either `priceBounds` or `tickBounds`. The server computes the dependent token amount. If `simulateTransaction` is set to `true`, the response will include the gas fee.",
					"routing": {
						"request": {
							"method": "POST",
							"url": "=/lp/create"
						}
					}
				},
				{
					"name": "Increase Position",
					"value": "Increase Position",
					"action": "Increase an LP position",
					"description": "Increases liquidity in an existing position. Specify the independent token and amount; the server derives the dependent token amount from the current pool state. Supports V2 (by token pair), V3, and V4 (by NFT token ID). If `simulateTransaction` is set to `true`, the response will include the gas fee.",
					"routing": {
						"request": {
							"method": "POST",
							"url": "=/lp/increase"
						}
					}
				},
				{
					"name": "Decrease Position",
					"value": "Decrease Position",
					"action": "Decrease an LP position",
					"description": "Decreases liquidity in an existing position by a specified percentage. The server derives all position state (liquidity, fees, ticks) from on-chain data. Supports V2 (by token pair), V3, and V4 (by NFT token ID). If `simulateTransaction` is set to `true`, the response will include the gas fee.",
					"routing": {
						"request": {
							"method": "POST",
							"url": "=/lp/decrease"
						}
					}
				},
				{
					"name": "Claim Fees",
					"value": "Claim Fees",
					"action": "Claim LP position fees",
					"description": "Claims accumulated trading fees from a V3 or V4 LP position. If `simulateTransaction` is set to `true`, the response will include the gas fee for the claim transaction.\n\nNote: V2 positions do not have claimable fees. V2 trading fees are automatically added to your LP token balance.",
					"routing": {
						"request": {
							"method": "POST",
							"url": "=/lp/claim_fees"
						}
					}
				},
				{
					"name": "Create Classic Position",
					"value": "Create Classic Position",
					"action": "Create a classic (V2) LP position",
					"description": "Creates a full-range liquidity position in a Uniswap V2 pool. Specify the independent token and amount; the server computes the dependent token amount based on the current pool ratio. If `simulateTransaction` is set to `true`, the response will include the gas fee for the creation transaction.",
					"routing": {
						"request": {
							"method": "POST",
							"url": "=/lp/create_classic"
						}
					}
				}
			],
			"default": ""
		},
		{
			"displayName": "POST /lp/check_approval",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Check Lp Approval"
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
						"Liquidity Provisioning"
					],
					"operation": [
						"Check Lp Approval"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Protocol",
			"name": "protocol",
			"type": "options",
			"default": "V2",
			"description": "The protocol of the pool.",
			"options": [
				{
					"name": "v2",
					"value": "V2"
				},
				{
					"name": "v3",
					"value": "V3"
				},
				{
					"name": "v4",
					"value": "V4"
				}
			],
			"routing": {
				"send": {
					"property": "protocol",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Check Lp Approval"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Chain ID",
			"name": "chainId",
			"type": "options",
			"default": 1,
			"description": "The unique ID of the blockchain. For a list of supported chains see the [FAQ](https://api-docs.uniswap.org/guides/faqs).",
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
					"property": "chainId",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Check Lp Approval"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Lp Tokens",
			"name": "lpTokens",
			"type": "json",
			"default": "[\n  {}\n]",
			"description": "The tokens requiring approval, each with address and amount.",
			"routing": {
				"send": {
					"property": "lpTokens",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ JSON.parse($value) }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Check Lp Approval"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Action",
			"name": "action",
			"type": "options",
			"default": "CREATE",
			"description": "The LP operation that the approval is needed for.",
			"options": [
				{
					"name": "CREATE",
					"value": "CREATE"
				},
				{
					"name": "INCREASE",
					"value": "INCREASE"
				},
				{
					"name": "DECREASE",
					"value": "DECREASE"
				},
				{
					"name": "MIGRATE",
					"value": "MIGRATE"
				}
			],
			"routing": {
				"send": {
					"property": "action",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Check Lp Approval"
					]
				}
			}
		},
		{
			"displayName": "Include Gas Info",
			"name": "includeGasInfo",
			"type": "boolean",
			"default": true,
			"description": "If true, the response will include gas fee estimates for each approval transaction.",
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
						"Liquidity Provisioning"
					],
					"operation": [
						"Check Lp Approval"
					]
				}
			}
		},
		{
			"displayName": "Simulate Transaction",
			"name": "simulateTransaction",
			"type": "boolean",
			"default": true,
			"description": "If true, approval transactions will be simulated to verify they succeed.",
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
						"Liquidity Provisioning"
					],
					"operation": [
						"Check Lp Approval"
					]
				}
			}
		},
		{
			"displayName": "Generate Permit As Transaction",
			"name": "generatePermitAsTransaction",
			"type": "boolean",
			"default": true,
			"description": "If true, permits are returned as on-chain transactions rather than off-chain signatures.",
			"routing": {
				"send": {
					"property": "generatePermitAsTransaction",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Check Lp Approval"
					]
				}
			}
		},
		{
			"displayName": "Urgency",
			"name": "urgency",
			"type": "options",
			"default": "NORMAL",
			"description": "The urgency level for gas price estimation. Higher urgency results in higher gas price and faster transaction inclusion. Defaults to URGENT if not provided.",
			"options": [
				{
					"name": "NORMAL",
					"value": "NORMAL"
				},
				{
					"name": "FAST",
					"value": "FAST"
				},
				{
					"name": "URGENT",
					"value": "URGENT"
				}
			],
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
						"Liquidity Provisioning"
					],
					"operation": [
						"Check Lp Approval"
					]
				}
			}
		},
		{
			"displayName": "v3 Nft Token ID",
			"name": "v3NftTokenId",
			"type": "number",
			"default": 0,
			"description": "The V3 NFT position token ID. Required when approving a V3 position for migration.",
			"routing": {
				"send": {
					"property": "v3NftTokenId",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Check Lp Approval"
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
						"Liquidity Provisioning"
					],
					"operation": [
						"Check Lp Approval"
					]
				}
			}
		},
		{
			"displayName": "POST /lp/create",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Create Position"
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
						"Liquidity Provisioning"
					],
					"operation": [
						"Create Position"
					]
				}
			}
		},
		{
			"displayName": "Existing Pool",
			"name": "existingPool",
			"type": "json",
			"default": "{\n  \"token1Address\": {}\n}",
			"description": "Parameters for creating a position in an existing pool.",
			"routing": {
				"send": {
					"property": "existingPool",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ JSON.parse($value) }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Create Position"
					]
				}
			}
		},
		{
			"displayName": "New Pool",
			"name": "newPool",
			"type": "json",
			"default": "{\n  \"token1Address\": {},\n  \"hooks\": {}\n}",
			"description": "Parameters for creating a new pool along with a position.",
			"routing": {
				"send": {
					"property": "newPool",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ JSON.parse($value) }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Create Position"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Chain ID",
			"name": "chainId",
			"type": "options",
			"default": 1,
			"description": "The unique ID of the blockchain. For a list of supported chains see the [FAQ](https://api-docs.uniswap.org/guides/faqs).",
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
					"property": "chainId",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Create Position"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Protocol",
			"name": "protocol",
			"type": "options",
			"default": "V2",
			"description": "The protocol of the pool.",
			"options": [
				{
					"name": "v2",
					"value": "V2"
				},
				{
					"name": "v3",
					"value": "V3"
				},
				{
					"name": "v4",
					"value": "V4"
				}
			],
			"routing": {
				"send": {
					"property": "protocol",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Create Position"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Independent Token",
			"name": "independentToken",
			"type": "json",
			"default": "{}",
			"description": "A token address and amount used in position creation.",
			"routing": {
				"send": {
					"property": "independentToken",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ JSON.parse($value) }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Create Position"
					]
				}
			}
		},
		{
			"displayName": "Dependent Token",
			"name": "dependentToken",
			"type": "json",
			"default": "{}",
			"description": "A token address and amount used in position creation.",
			"routing": {
				"send": {
					"property": "dependentToken",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ JSON.parse($value) }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Create Position"
					]
				}
			}
		},
		{
			"displayName": "Price Bounds",
			"name": "priceBounds",
			"type": "json",
			"default": "{}",
			"description": "Price bounds for a concentrated liquidity position.",
			"routing": {
				"send": {
					"property": "priceBounds",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ JSON.parse($value) }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Create Position"
					]
				}
			}
		},
		{
			"displayName": "Tick Bounds",
			"name": "tickBounds",
			"type": "json",
			"default": "{}",
			"description": "Tick bounds for a concentrated liquidity position.",
			"routing": {
				"send": {
					"property": "tickBounds",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ JSON.parse($value) }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Create Position"
					]
				}
			}
		},
		{
			"displayName": "Slippage Tolerance",
			"name": "slippageTolerance",
			"type": "number",
			"default": 0,
			"description": "Slippage tolerance as a decimal (e.g., 0.5 for 0.5%).",
			"routing": {
				"send": {
					"property": "slippageTolerance",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Create Position"
					]
				}
			}
		},
		{
			"displayName": "Deadline",
			"name": "deadline",
			"type": "number",
			"default": 0,
			"description": "Unix timestamp after which the transaction will revert.",
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
						"Liquidity Provisioning"
					],
					"operation": [
						"Create Position"
					]
				}
			}
		},
		{
			"displayName": "Simulate Transaction",
			"name": "simulateTransaction",
			"type": "boolean",
			"default": true,
			"description": "If true, the response will include the gas fee.",
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
						"Liquidity Provisioning"
					],
					"operation": [
						"Create Position"
					]
				}
			}
		},
		{
			"displayName": "Urgency",
			"name": "urgency",
			"type": "options",
			"default": "NORMAL",
			"description": "The urgency level for gas price estimation. Higher urgency results in higher gas price and faster transaction inclusion. Defaults to URGENT if not provided.",
			"options": [
				{
					"name": "NORMAL",
					"value": "NORMAL"
				},
				{
					"name": "FAST",
					"value": "FAST"
				},
				{
					"name": "URGENT",
					"value": "URGENT"
				}
			],
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
						"Liquidity Provisioning"
					],
					"operation": [
						"Create Position"
					]
				}
			}
		},
		{
			"displayName": "Batch Permit Data",
			"name": "batchPermitData",
			"type": "json",
			"default": "{}",
			"description": "the permit2 message object for the customer to sign to permit spending by the permit2 contract.",
			"routing": {
				"send": {
					"property": "batchPermitData",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ JSON.parse($value) }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Create Position"
					]
				}
			}
		},
		{
			"displayName": "Signature",
			"name": "signature",
			"type": "string",
			"default": "",
			"description": "The signed permit.",
			"routing": {
				"send": {
					"property": "signature",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Create Position"
					]
				}
			}
		},
		{
			"displayName": "Native Token Balance",
			"name": "nativeTokenBalance",
			"type": "string",
			"default": "",
			"description": "The wallet's native token balance, used for wrapping calculations when one of the tokens is the native token.",
			"routing": {
				"send": {
					"property": "nativeTokenBalance",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Create Position"
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
						"Liquidity Provisioning"
					],
					"operation": [
						"Create Position"
					]
				}
			}
		},
		{
			"displayName": "POST /lp/increase",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Increase Position"
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
						"Liquidity Provisioning"
					],
					"operation": [
						"Increase Position"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Chain ID",
			"name": "chainId",
			"type": "options",
			"default": 1,
			"description": "The unique ID of the blockchain. For a list of supported chains see the [FAQ](https://api-docs.uniswap.org/guides/faqs).",
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
					"property": "chainId",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Increase Position"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Protocol",
			"name": "protocol",
			"type": "options",
			"default": "V2",
			"description": "The protocol of the pool.",
			"options": [
				{
					"name": "v2",
					"value": "V2"
				},
				{
					"name": "v3",
					"value": "V3"
				},
				{
					"name": "v4",
					"value": "V4"
				}
			],
			"routing": {
				"send": {
					"property": "protocol",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Increase Position"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Token 0 Address",
			"name": "token0Address",
			"type": "string",
			"default": "",
			"routing": {
				"send": {
					"property": "token0Address",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Increase Position"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Token 1 Address",
			"name": "token1Address",
			"type": "string",
			"default": "",
			"routing": {
				"send": {
					"property": "token1Address",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Increase Position"
					]
				}
			}
		},
		{
			"displayName": "Nft Token ID",
			"name": "nftTokenId",
			"type": "string",
			"default": "",
			"description": "The NFT token ID for V3/V4 positions. Not required for V2.",
			"routing": {
				"send": {
					"property": "nftTokenId",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Increase Position"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Independent Token",
			"name": "independentToken",
			"type": "json",
			"default": "{}",
			"description": "A token with its address and amount, used in LP operations.",
			"routing": {
				"send": {
					"property": "independentToken",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ JSON.parse($value) }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Increase Position"
					]
				}
			}
		},
		{
			"displayName": "Slippage Tolerance",
			"name": "slippageTolerance",
			"type": "number",
			"default": 0,
			"description": "Slippage tolerance as a decimal (e.g., 0.5 for 0.5%).",
			"routing": {
				"send": {
					"property": "slippageTolerance",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Increase Position"
					]
				}
			}
		},
		{
			"displayName": "Deadline",
			"name": "deadline",
			"type": "number",
			"default": 0,
			"description": "Unix timestamp after which the transaction will revert.",
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
						"Liquidity Provisioning"
					],
					"operation": [
						"Increase Position"
					]
				}
			}
		},
		{
			"displayName": "Simulate Transaction",
			"name": "simulateTransaction",
			"type": "boolean",
			"default": true,
			"description": "If true, the response will include the gas fee.",
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
						"Liquidity Provisioning"
					],
					"operation": [
						"Increase Position"
					]
				}
			}
		},
		{
			"displayName": "v4 Batch Permit Data",
			"name": "v4BatchPermitData",
			"type": "json",
			"default": "{}",
			"description": "the permit2 message object for the customer to sign to permit spending by the permit2 contract.",
			"routing": {
				"send": {
					"property": "v4BatchPermitData",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ JSON.parse($value) }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Increase Position"
					]
				}
			}
		},
		{
			"displayName": "Signature",
			"name": "signature",
			"type": "string",
			"default": "",
			"description": "The signed permit.",
			"routing": {
				"send": {
					"property": "signature",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Increase Position"
					]
				}
			}
		},
		{
			"displayName": "Urgency",
			"name": "urgency",
			"type": "options",
			"default": "NORMAL",
			"description": "The urgency level for gas price estimation. Higher urgency results in higher gas price and faster transaction inclusion. Defaults to URGENT if not provided.",
			"options": [
				{
					"name": "NORMAL",
					"value": "NORMAL"
				},
				{
					"name": "FAST",
					"value": "FAST"
				},
				{
					"name": "URGENT",
					"value": "URGENT"
				}
			],
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
						"Liquidity Provisioning"
					],
					"operation": [
						"Increase Position"
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
						"Liquidity Provisioning"
					],
					"operation": [
						"Increase Position"
					]
				}
			}
		},
		{
			"displayName": "POST /lp/decrease",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Decrease Position"
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
						"Liquidity Provisioning"
					],
					"operation": [
						"Decrease Position"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Chain ID",
			"name": "chainId",
			"type": "options",
			"default": 1,
			"description": "The unique ID of the blockchain. For a list of supported chains see the [FAQ](https://api-docs.uniswap.org/guides/faqs).",
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
					"property": "chainId",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Decrease Position"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Protocol",
			"name": "protocol",
			"type": "options",
			"default": "V2",
			"description": "The protocol of the pool.",
			"options": [
				{
					"name": "v2",
					"value": "V2"
				},
				{
					"name": "v3",
					"value": "V3"
				},
				{
					"name": "v4",
					"value": "V4"
				}
			],
			"routing": {
				"send": {
					"property": "protocol",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Decrease Position"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Token 0 Address",
			"name": "token0Address",
			"type": "string",
			"default": "",
			"routing": {
				"send": {
					"property": "token0Address",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Decrease Position"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Token 1 Address",
			"name": "token1Address",
			"type": "string",
			"default": "",
			"routing": {
				"send": {
					"property": "token1Address",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Decrease Position"
					]
				}
			}
		},
		{
			"displayName": "Nft Token ID",
			"name": "nftTokenId",
			"type": "string",
			"default": "",
			"description": "The NFT token ID for V3/V4 positions. Not required for V2.",
			"routing": {
				"send": {
					"property": "nftTokenId",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Decrease Position"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Liquidity Percentage To Decrease",
			"name": "liquidityPercentageToDecrease",
			"type": "number",
			"default": 0,
			"description": "The percentage of liquidity to remove (1-100).",
			"routing": {
				"send": {
					"property": "liquidityPercentageToDecrease",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Decrease Position"
					]
				}
			}
		},
		{
			"displayName": "Slippage Tolerance",
			"name": "slippageTolerance",
			"type": "number",
			"default": 0,
			"description": "Slippage tolerance as a decimal (e.g., 0.5 for 0.5%).",
			"routing": {
				"send": {
					"property": "slippageTolerance",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Decrease Position"
					]
				}
			}
		},
		{
			"displayName": "Deadline",
			"name": "deadline",
			"type": "number",
			"default": 0,
			"description": "Unix timestamp after which the transaction will revert.",
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
						"Liquidity Provisioning"
					],
					"operation": [
						"Decrease Position"
					]
				}
			}
		},
		{
			"displayName": "Simulate Transaction",
			"name": "simulateTransaction",
			"type": "boolean",
			"default": true,
			"description": "If true, the response will include the gas fee.",
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
						"Liquidity Provisioning"
					],
					"operation": [
						"Decrease Position"
					]
				}
			}
		},
		{
			"displayName": "Withdraw As Weth",
			"name": "withdrawAsWeth",
			"type": "boolean",
			"default": true,
			"description": "If true, native tokens will be withdrawn as WETH instead of unwrapping to ETH.",
			"routing": {
				"send": {
					"property": "withdrawAsWeth",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Decrease Position"
					]
				}
			}
		},
		{
			"displayName": "Urgency",
			"name": "urgency",
			"type": "options",
			"default": "NORMAL",
			"description": "The urgency level for gas price estimation. Higher urgency results in higher gas price and faster transaction inclusion. Defaults to URGENT if not provided.",
			"options": [
				{
					"name": "NORMAL",
					"value": "NORMAL"
				},
				{
					"name": "FAST",
					"value": "FAST"
				},
				{
					"name": "URGENT",
					"value": "URGENT"
				}
			],
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
						"Liquidity Provisioning"
					],
					"operation": [
						"Decrease Position"
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
						"Liquidity Provisioning"
					],
					"operation": [
						"Decrease Position"
					]
				}
			}
		},
		{
			"displayName": "POST /lp/claim_fees",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Claim Fees"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Protocol",
			"name": "protocol",
			"type": "options",
			"default": "V2",
			"description": "The protocol of the pool.",
			"options": [
				{
					"name": "v2",
					"value": "V2"
				},
				{
					"name": "v3",
					"value": "V3"
				},
				{
					"name": "v4",
					"value": "V4"
				}
			],
			"routing": {
				"send": {
					"property": "protocol",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Claim Fees"
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
						"Liquidity Provisioning"
					],
					"operation": [
						"Claim Fees"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Chain ID",
			"name": "chainId",
			"type": "options",
			"default": 1,
			"description": "The unique ID of the blockchain. For a list of supported chains see the [FAQ](https://api-docs.uniswap.org/guides/faqs).",
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
					"property": "chainId",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Claim Fees"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Token ID",
			"name": "tokenId",
			"type": "string",
			"default": "",
			"description": "The NFT token ID identifying the position.",
			"routing": {
				"send": {
					"property": "tokenId",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Claim Fees"
					]
				}
			}
		},
		{
			"displayName": "Simulate Transaction",
			"name": "simulateTransaction",
			"type": "boolean",
			"default": true,
			"description": "If true, the response will include the gas fee.",
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
						"Liquidity Provisioning"
					],
					"operation": [
						"Claim Fees"
					]
				}
			}
		},
		{
			"displayName": "Collect As Weth",
			"name": "collectAsWeth",
			"type": "boolean",
			"default": true,
			"description": "If true, native tokens will be collected as WETH instead of unwrapping to ETH.",
			"routing": {
				"send": {
					"property": "collectAsWeth",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Claim Fees"
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
						"Liquidity Provisioning"
					],
					"operation": [
						"Claim Fees"
					]
				}
			}
		},
		{
			"displayName": "POST /lp/create_classic",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Create Classic Position"
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
						"Liquidity Provisioning"
					],
					"operation": [
						"Create Classic Position"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Pool Parameters",
			"name": "poolParameters",
			"type": "json",
			"default": "{\n  \"token1Address\": {},\n  \"chainId\": 1\n}",
			"description": "Parameters identifying a V2 pool.",
			"routing": {
				"send": {
					"property": "poolParameters",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ JSON.parse($value) }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Create Classic Position"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Independent Token",
			"name": "independentToken",
			"type": "json",
			"default": "{}",
			"description": "A token with its address and amount, used in LP operations.",
			"routing": {
				"send": {
					"property": "independentToken",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ JSON.parse($value) }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Create Classic Position"
					]
				}
			}
		},
		{
			"displayName": "Dependent Token",
			"name": "dependentToken",
			"type": "json",
			"default": "{}",
			"description": "A token with its address and amount, used in LP operations.",
			"routing": {
				"send": {
					"property": "dependentToken",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ JSON.parse($value) }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Create Classic Position"
					]
				}
			}
		},
		{
			"displayName": "Slippage Tolerance",
			"name": "slippageTolerance",
			"type": "number",
			"default": 0,
			"description": "Slippage tolerance as a decimal (e.g., 0.5 for 0.5%).",
			"routing": {
				"send": {
					"property": "slippageTolerance",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Create Classic Position"
					]
				}
			}
		},
		{
			"displayName": "Deadline",
			"name": "deadline",
			"type": "number",
			"default": 0,
			"description": "Transaction deadline in seconds.",
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
						"Liquidity Provisioning"
					],
					"operation": [
						"Create Classic Position"
					]
				}
			}
		},
		{
			"displayName": "Simulate Transaction",
			"name": "simulateTransaction",
			"type": "boolean",
			"default": true,
			"description": "If true, the response will include the gas fee.",
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
						"Liquidity Provisioning"
					],
					"operation": [
						"Create Classic Position"
					]
				}
			}
		},
		{
			"displayName": "Urgency",
			"name": "urgency",
			"type": "options",
			"default": "NORMAL",
			"description": "The urgency level for gas price estimation. Higher urgency results in higher gas price and faster transaction inclusion. Defaults to URGENT if not provided.",
			"options": [
				{
					"name": "NORMAL",
					"value": "NORMAL"
				},
				{
					"name": "FAST",
					"value": "FAST"
				},
				{
					"name": "URGENT",
					"value": "URGENT"
				}
			],
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
						"Liquidity Provisioning"
					],
					"operation": [
						"Create Classic Position"
					]
				}
			}
		},
		{
			"displayName": "Include Approval Simulation",
			"name": "includeApprovalSimulation",
			"type": "boolean",
			"default": true,
			"description": "If true, the response will include approval simulation data.",
			"routing": {
				"send": {
					"property": "includeApprovalSimulation",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Liquidity Provisioning"
					],
					"operation": [
						"Create Classic Position"
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
						"Liquidity Provisioning"
					],
					"operation": [
						"Create Classic Position"
					]
				}
			}
		},
];
