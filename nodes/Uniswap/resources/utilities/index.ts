import type { INodeProperties } from 'n8n-workflow';

export const utilitiesDescription: INodeProperties[] = [
                {
			"displayName": "Operation",
			"name": "operation",
			"type": "options",
			"noDataExpression": true,
			"displayOptions": {
				"show": {
					"resource": [
						"Utilities"
					]
				}
			},
			"options": [
				{
					"name": "Permissions",
					"value": "Permissions",
					"action": "Check token KYC permissions",
					"description": "For each token in the request, reports whether the token requires a permissioned adapter and whether the supplied `walletAddress` is allowlisted to trade it. If the token is permissioned but the wallet is not allowlisted, the response includes a `kycUrl` the wallet holder must complete to gain access. The request supports a maximum of 2 tokens.",
					"routing": {
						"request": {
							"method": "POST",
							"url": "=/permissions"
						}
					}
				},
				{
					"name": "Get Swappable Tokens",
					"value": "Get Swappable Tokens",
					"action": "Get bridgable tokens",
					"description": "Returns the list of destination bridge chains for a given token on a given chain.",
					"routing": {
						"request": {
							"method": "GET",
							"url": "=/swappable_tokens"
						}
					}
				},
				{
					"name": "Get Supported Chains",
					"value": "Get Supported Chains",
					"action": "Get supported chains",
					"description": "Returns the list of chains supported by the Trading API, including protocol contract addresses and the protocols and actions available on each chain.",
					"routing": {
						"request": {
							"method": "GET",
							"url": "=/supported_chains"
						}
					}
				},
				{
					"name": "Pool Info",
					"value": "Pool Info",
					"action": "Get pool state",
					"description": "Fetches detailed information about one or more liquidity pools across Uniswap V2, V3, and V4. Returns pool state including token addresses, reserves, liquidity, current tick, sqrtRatioX96, fee tier, tick spacing, and hook addresses (V4).\n\nProvide one of `poolParameters` or `poolReferences` (not both):\n- `poolParameters`: Look up pools by token pair. Provide token addresses and optional fee/tickSpacing/hooks to find matching pools.\n- `poolReferences`: Look up specific known pools by their reference identifier (pool address for V3, pool ID for V4, pair address for V2). Limited to 20 references per request; larger batches are rejected with a 400 RequestValidationError.\n\nPool reserves (`token0Reserves`/`token1Reserves`) are returned for V2 pools and, best-effort, for V4 pools. V4 reserves are the fee-excluded core principal computed from on-chain pool state: uncollected LP fees, donations, and hook-held assets are excluded, and for pools whose hooks perform custom accounting the value approximates swappable reserves.",
					"routing": {
						"request": {
							"method": "POST",
							"url": "=/lp/pool_info"
						}
					}
				},
				{
					"name": "Wallet Check Delegation",
					"value": "Wallet Check Delegation",
					"action": "Get wallet delegations",
					"description": "Gets the current delegation status and message for a smart contract wallet across different chains. Returns delegation information for each chain ID in the request.",
					"routing": {
						"request": {
							"method": "POST",
							"url": "=/wallet/check_delegation"
						}
					}
				},
				{
					"name": "Encode 4337",
					"value": "Encode 4337",
					"action": "Encode ERC-4337 UserOperation",
					"description": "Builds and returns a fully-populated ERC-4337 v0.8 UserOperation for the given batch of calls. When a `paymasterUrl` is provided the endpoint attempts gas sponsorship via the paymaster; the response indicates whether sponsorship was granted and includes sponsor metadata when available.",
					"routing": {
						"request": {
							"method": "POST",
							"url": "=/wallet/encode_4337"
						}
					}
				}
			],
			"default": ""
		},
		{
			"displayName": "POST /permissions",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"Utilities"
					],
					"operation": [
						"Permissions"
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
			"description": "The wallet address which will be used to send the token.",
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
						"Utilities"
					],
					"operation": [
						"Permissions"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Tokens",
			"name": "tokens",
			"type": "json",
			"default": "[\n  null\n]",
			"description": "Tokens to check permissions for. Maximum of 2 per request.",
			"routing": {
				"send": {
					"property": "tokens",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ JSON.parse($value) }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Utilities"
					],
					"operation": [
						"Permissions"
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
					"property": "chainId",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Utilities"
					],
					"operation": [
						"Permissions"
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
						"Utilities"
					],
					"operation": [
						"Permissions"
					]
				}
			}
		},
		{
			"displayName": "GET /swappable_tokens",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"Utilities"
					],
					"operation": [
						"Get Swappable Tokens"
					]
				}
			}
		},
		{
			"displayName": "Token In",
			"name": "tokenIn",
			"required": true,
			"default": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
			"type": "string",
			"routing": {
				"send": {
					"type": "query",
					"property": "tokenIn",
					"value": "={{ $value }}",
					"propertyInDotNotation": false
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Utilities"
					],
					"operation": [
						"Get Swappable Tokens"
					]
				}
			}
		},
		{
			"displayName": "Token In Chain ID",
			"name": "tokenInChainId",
			"required": true,
			"default": 1,
			"type": "options",
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
					"property": "tokenInChainId",
					"value": "={{ $value }}",
					"propertyInDotNotation": false
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Utilities"
					],
					"operation": [
						"Get Swappable Tokens"
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
						"Utilities"
					],
					"operation": [
						"Get Swappable Tokens"
					]
				}
			}
		},
		{
			"displayName": "GET /supported_chains",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"Utilities"
					],
					"operation": [
						"Get Supported Chains"
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
						"Utilities"
					],
					"operation": [
						"Get Supported Chains"
					]
				}
			}
		},
		{
			"displayName": "POST /lp/pool_info",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"Utilities"
					],
					"operation": [
						"Pool Info"
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
						"Utilities"
					],
					"operation": [
						"Pool Info"
					]
				}
			}
		},
		{
			"displayName": "Pool Parameters",
			"name": "poolParameters",
			"type": "json",
			"default": "{}",
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
						"Utilities"
					],
					"operation": [
						"Pool Info"
					]
				}
			}
		},
		{
			"displayName": "Pool References",
			"name": "poolReferences",
			"type": "json",
			"default": "[\n  {\n    \"chainId\": 1\n  }\n]",
			"description": "Array of pool reference identifiers to query. Each reference should include the protocol, chainId, and either the pool address (V3), pool id (V4), or pair address (V2). At most 20 references may be provided per request; requests exceeding this limit are rejected with a 400 RequestValidationError.",
			"routing": {
				"send": {
					"property": "poolReferences",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ JSON.parse($value) }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Utilities"
					],
					"operation": [
						"Pool Info"
					]
				}
			}
		},
		{
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
					"property": "chainId",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Utilities"
					],
					"operation": [
						"Pool Info"
					]
				}
			}
		},
		{
			"displayName": "Page Size",
			"name": "pageSize",
			"type": "number",
			"default": 0,
			"routing": {
				"send": {
					"property": "pageSize",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Utilities"
					],
					"operation": [
						"Pool Info"
					]
				}
			}
		},
		{
			"displayName": "Current Page",
			"name": "currentPage",
			"type": "number",
			"default": 0,
			"routing": {
				"send": {
					"property": "currentPage",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Utilities"
					],
					"operation": [
						"Pool Info"
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
						"Utilities"
					],
					"operation": [
						"Pool Info"
					]
				}
			}
		},
		{
			"displayName": "POST /wallet/check_delegation",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"Utilities"
					],
					"operation": [
						"Wallet Check Delegation"
					]
				}
			}
		},
		{
			"displayName": "Wallet Addresses",
			"name": "walletAddresses",
			"type": "json",
			"default": "[\n  null\n]",
			"description": "Array of wallet addresses to check delegation status for.",
			"routing": {
				"send": {
					"property": "walletAddresses",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ JSON.parse($value) }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Utilities"
					],
					"operation": [
						"Wallet Check Delegation"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Chain Ids",
			"name": "chainIds",
			"type": "json",
			"default": "[\n  1\n]",
			"description": "Array of chain IDs to check delegation status for.",
			"routing": {
				"send": {
					"property": "chainIds",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ JSON.parse($value) }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Utilities"
					],
					"operation": [
						"Wallet Check Delegation"
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
						"Utilities"
					],
					"operation": [
						"Wallet Check Delegation"
					]
				}
			}
		},
		{
			"displayName": "POST /wallet/encode_4337",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"Utilities"
					],
					"operation": [
						"Encode 4337"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Calls",
			"name": "calls",
			"type": "json",
			"default": "[\n  {}\n]",
			"description": "Batch of transactions to encode into the UserOperation.",
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
						"Utilities"
					],
					"operation": [
						"Encode 4337"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Sender",
			"name": "sender",
			"type": "string",
			"default": "",
			"description": "Smart account address that will execute the operation.",
			"routing": {
				"send": {
					"property": "sender",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Utilities"
					],
					"operation": [
						"Encode 4337"
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
					"property": "chainId",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Utilities"
					],
					"operation": [
						"Encode 4337"
					]
				}
			}
		},
		{
			"displayName": "Paymaster URL",
			"name": "paymasterUrl",
			"type": "string",
			"default": "",
			"description": "JSON-RPC URL of a paymaster service for gas sponsorship.",
			"routing": {
				"send": {
					"property": "paymasterUrl",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Utilities"
					],
					"operation": [
						"Encode 4337"
					]
				}
			}
		},
		{
			"displayName": "Paymaster Service Context",
			"name": "paymasterServiceContext",
			"type": "json",
			"default": "{}",
			"description": "Opaque context forwarded to the paymaster (e.g. `{ \"policyId\": \"...\" }`).",
			"routing": {
				"send": {
					"property": "paymasterServiceContext",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ JSON.parse($value) }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Utilities"
					],
					"operation": [
						"Encode 4337"
					]
				}
			}
		},
		{
			"displayName": "Eip 7702 Auth",
			"name": "eip7702Auth",
			"type": "json",
			"default": "{}",
			"description": "Signed EIP-7702 authorization tuple.",
			"routing": {
				"send": {
					"property": "eip7702Auth",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ JSON.parse($value) }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Utilities"
					],
					"operation": [
						"Encode 4337"
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
						"Utilities"
					],
					"operation": [
						"Encode 4337"
					]
				}
			}
		},
];
