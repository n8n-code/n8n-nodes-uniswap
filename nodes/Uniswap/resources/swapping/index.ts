import type { INodeProperties } from 'n8n-workflow';

export const swappingDescription: INodeProperties[] = [
                {
			"displayName": "Operation",
			"name": "operation",
			"type": "options",
			"noDataExpression": true,
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					]
				}
			},
			"options": [
				{
					"name": "Check Approval",
					"value": "Check Approval",
					"action": "Check swap approvals",
					"description": "Allows the requestor to check if the `walletAddress` has the required approval to transact the `token` up to the `amount` specified. If the `walletAddress` does not have the required approval, the response will include a transaction to approve the token spend. If the `walletAddress` has the required approval, the response will return the approval with a `null` value. If the parameter `includeGasInfo` is set to `true` and an approval is needed, then the response will include both the transaction and the gas fee for the approval transaction.\n\nCertain tokens may require that approval be reset before approving a new spend amount. If this condition is detected for the `walletAddress` and `token`, the response will include the necessary approval cancellation in the `cancel` paragraph. When `cancel` is not applicable, the paragraph will have a `null` value.",
					"routing": {
						"request": {
							"method": "POST",
							"url": "=/check_approval"
						}
					}
				},
				{
					"name": "Aggregator Quote",
					"value": "Aggregator Quote",
					"action": "Get a quote",
					"description": "Requests a quote according to the specified swap parameters. This endpoint may be used to get a quote for a swap, a bridge, or a wrap/unwrap. The resulting response includes a quote for the swap and the proposed route by which the quote was achieved. The response will also include estimated gas fees for the proposed quote route. If the proposed route is via a Uniswap Protocol pool, the response may include a permit2 message for the swapper to sign prior to making a /swap request. The proposed route will also be simulated. If the simulation fails, the response will include an error message or `txFailureReason`.\n\nCertain routing options may be whitelisted by the requestor through the use of the `protocols` field. Further, the requestor may ask for the best price route or for the fastest price route through the 'routingPreference' field. Note that the fastest price route refers to the speed with which a quote is returned, not the number of transactions that may be required to get from the input token and chain to the output token and chain. Further note that all `routingPreference` values except for `FASTEST` and `BEST_PRICE` are deprecated. For more information on the `protocols` and `routingPreference` fields, see the [Token Trading Workflow](https://uniswap-docs.readme.io/reference/trading-flow#swap-routing) explanation of Swap Routing.\n\nAPI integrators using this API for the benefit of customer end users may request a service fee be taken from the output token and deposited to a fee collection address. To request this, please reach out to your Uniswap Labs contact. This optional fee is associated to the API key and is always taken from the output token. Note if there is a fee and the `type` is `EXACT_INPUT`, the output amount quoted will **not** include the fee subtraction. If there is a fee and the `type` is `EXACT_OUTPUT`, the input amount quoted will **not** include the fee addition. Instead, in both cases, the fee will be recorded in the `aggregatedOutputs` field.\n\nNative ETH on UniswapX: UniswapX routes (e.g. `DUTCH_V2`, `DUTCH_V3`, `PRIORITY`) can use native ETH as the input token by setting `tokenIn` to the native currency address (e.g. `0x0000000000000000000000000000000000000000`) and passing `x-erc20eth-enabled: true`. Native ETH input on UniswapX requires wallet support for EIP-7914, a smart wallet activated on your desired network, and a sufficient native allowance (set via /swap_7702 if x-erc20eth-enabled header is set to `true`). If these requirements are not met, UniswapX quotes for native input may be omitted and the response may fall back to `CLASSIC` routing instead.",
					"routing": {
						"request": {
							"method": "POST",
							"url": "=/quote"
						}
					}
				},
				{
					"name": "Post Order",
					"value": "Post Order",
					"action": "Create a gasless order",
					"description": "The order endpoint is used to submit a UniswapX intent. If the `routing` field in the response to a quote is any of `DUTCH_V2`, `DUTCH_V3`, `LIMIT_ORDER`, or `PRIORITY` this endpoint is used to submit your order to the UniswapX protocol to be filled by the filler network. These orders are gasless because the filler will pay the gas to complete the transaction.\n\nThe order will be validated and, if valid, will be submitted to the filler network. The network will try to fill the order at the quoted `startAmount`. If the order is not filled at the `startAmount` by the `deadline`, the amount will start decaying until the `endAmount` is reached. The order will remain `open` until it is either filled, canceled, or has expired by remaining unfilled beyond the `decayEndTime`.\n\nFor simplicity, the order request is identical to the quote response except for the addition of the signed permit.\n\nNative ETH on UniswapX: If the quote you are submitting uses native ETH as the input token (e.g. `tokenIn` is `0x0000000000000000000000000000000000000000`), include `x-erc20eth-enabled: true`. Native ETH input on UniswapX requires wallet support for EIP-7914 and sufficient native allowance. For 7702-delegated smart contract wallets, you can generate the required approval call(s) via `/swap_7702` when needed.",
					"routing": {
						"request": {
							"method": "POST",
							"url": "=/order"
						}
					}
				},
				{
					"name": "Get Order",
					"value": "Get Order",
					"action": "Get gasless order status",
					"description": "Retrieve one or more gasless orders filtered, optionally filered by query param(s). The request must at minimum include one of the following parameters: `orderId`, `orderIds`, `orderStatus`, `swapper`, or `filler`.",
					"routing": {
						"request": {
							"method": "GET",
							"url": "=/orders"
						}
					}
				},
				{
					"name": "Create Swap Transaction",
					"value": "Create Swap Transaction",
					"action": "Create swap calldata",
					"description": "Create the calldata for a swap transaction (including wrap/unwrap) against the Uniswap Protocols. If the `quote` parameter includes the fee parameters, then the calldata will include the fee disbursement. The gas estimates will be **more precise** when the the response calldata would be valid if submitted on-chain.",
					"routing": {
						"request": {
							"method": "POST",
							"url": "=/swap"
						}
					}
				},
				{
					"name": "Get Swaps",
					"value": "Get Swaps",
					"action": "Get swap status",
					"description": "Get the status of swap or bridge transactions. Accepts on-chain transaction hashes (`txHashes`), ERC-4337 userOperation hashes (`userOpHashes`), or both. At least one of the two must contain at least one item.",
					"routing": {
						"request": {
							"method": "GET",
							"url": "=/swaps"
						}
					}
				},
				{
					"name": "Get Limit Order Quote",
					"value": "Get Limit Order Quote",
					"action": "Get a limit order quote",
					"description": "Get a quote for a limit order according to the provided configuration.",
					"routing": {
						"request": {
							"method": "POST",
							"url": "=/limit_order_quote"
						}
					}
				},
				{
					"name": "Create Swap 4337 Transaction",
					"value": "Create Swap 4337 Transaction",
					"action": "Create swap ERC-4337 UserOperation",
					"description": "Builds and returns a partially-populated ERC-4337 v0.8 UserOperation for executing a swap (including wrap/unwrap and bridging) against the Uniswap Protocols. The response includes any required ERC-20 approval and Permit2 calls bundled into the UserOperation's `callData`. Paymaster fields are left empty for the wallet to populate via `pm_sponsorUserOperation` before signing and submitting to the bundler. The `signature` field contains a dummy value that the wallet must replace before submission.",
					"routing": {
						"request": {
							"method": "POST",
							"url": "=/swap_4337"
						}
					}
				},
				{
					"name": "Check Approval 4337",
					"value": "Check Approval 4337",
					"action": "Create approval ERC-4337 UserOperation",
					"description": "Builds and returns an ERC-4337 v0.8 UserOperation that performs the ERC-20 approval (and any required allowance reset) needed before a swap. Paymaster fields and `signature` are left for the client to populate. When `sponsorshipInfo.sponsored` is `true`, the approval is tagged for sponsorship and a `paymasterServiceContext` envelope is returned for the client to forward to the paymaster.",
					"routing": {
						"request": {
							"method": "POST",
							"url": "=/check_approval_4337"
						}
					}
				}
			],
			"default": ""
		},
		{
			"displayName": "POST /check_approval",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Check Approval"
					]
				}
			}
		},
		{
			"displayName": "X Permit 2 Disabled",
			"name": "x-permit2-disabled",
			"description": "Disables the Permit2 approval flow. When set to `true`, `permitData` is returned as `null` and the header is forwarded to the routing layer for correct gas simulation against the Proxy Universal Router contract. When `false` or omitted, the standard Permit2 approval flow is used. This header is intended for integrators whose infrastructure uses a direct approval-then-swap pattern without Permit2.",
			"default": false,
			"type": "boolean",
			"routing": {
				"request": {
					"headers": {
						"x-permit2-disabled": "={{ $value }}"
					}
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Check Approval"
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
						"Swapping"
					],
					"operation": [
						"Check Approval"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Token",
			"name": "token",
			"type": "string",
			"default": "",
			"description": "The token which will be sent, specified by its token address. For a list of supported tokens, see the [FAQ](https://api-docs.uniswap.org/guides/faqs).",
			"routing": {
				"send": {
					"property": "token",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Check Approval"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Amount",
			"name": "amount",
			"type": "string",
			"default": "",
			"description": "The quantity of tokens denominated in the token's base units. (For example, for an ERC20 token one token is 1x10^18 base units. For one USDC token one token is 1x10^6 base units.) This value must be greater than 0.",
			"routing": {
				"send": {
					"property": "amount",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Check Approval"
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
						"Swapping"
					],
					"operation": [
						"Check Approval"
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
						"Swapping"
					],
					"operation": [
						"Check Approval"
					]
				}
			}
		},
		{
			"displayName": "Include Gas Info",
			"name": "includeGasInfo",
			"type": "boolean",
			"default": false,
			"description": "If set to `true`, the response will include the estimated gas fee for the proposed transaction.",
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
						"Swapping"
					],
					"operation": [
						"Check Approval"
					]
				}
			}
		},
		{
			"displayName": "Token Out",
			"name": "tokenOut",
			"type": "string",
			"default": "",
			"description": "The token which will be received, specified by its token address. For a list of supported tokens, see the [FAQ](https://api-docs.uniswap.org/guides/faqs).",
			"routing": {
				"send": {
					"property": "tokenOut",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Check Approval"
					]
				}
			}
		},
		{
			"displayName": "Token Out Chain ID",
			"name": "tokenOutChainId",
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
					"property": "tokenOutChainId",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Check Approval"
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
						"Swapping"
					],
					"operation": [
						"Check Approval"
					]
				}
			}
		},
		{
			"displayName": "POST /quote",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Aggregator Quote"
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
					"name": "2 0",
					"value": "2.0"
				},
				{
					"name": "2 1 1",
					"value": "2.1.1"
				},
				{
					"name": "2 2 0",
					"value": "2.2.0"
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
						"Swapping"
					],
					"operation": [
						"Aggregator Quote"
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
						"Swapping"
					],
					"operation": [
						"Aggregator Quote"
					]
				}
			}
		},
		{
			"displayName": "X Permit 2 Disabled",
			"name": "x-permit2-disabled",
			"description": "Disables the Permit2 approval flow. When set to `true`, `permitData` is returned as `null` and the header is forwarded to the routing layer for correct gas simulation against the Proxy Universal Router contract. When `false` or omitted, the standard Permit2 approval flow is used. This header is intended for integrators whose infrastructure uses a direct approval-then-swap pattern without Permit2.",
			"default": false,
			"type": "boolean",
			"routing": {
				"request": {
					"headers": {
						"x-permit2-disabled": "={{ $value }}"
					}
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Aggregator Quote"
					]
				}
			}
		},
		{
			"displayName": "X Universal Router Swapsteps",
			"name": "x-universal-router-swapsteps",
			"description": "Opts the request into Universal Router SwapSteps mode. Additive and opt-in: when set to `true`, the response's `ClassicQuote` may include a `swapSteps[]` array describing the Universal Router step sequence (the inputs to `SwapRouter.encodeSwaps`). The field is only populated when the GuideStar quoter wins the hybrid quote race (currently `EXACT_INPUT`; broader coverage will follow once UniRoute's transformer ships). Omitting or setting `false` preserves the existing response shape.",
			"default": false,
			"type": "boolean",
			"routing": {
				"request": {
					"headers": {
						"x-universal-router-swapsteps": "={{ $value }}"
					}
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Aggregator Quote"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Type",
			"name": "type",
			"type": "options",
			"default": "EXACT_INPUT",
			"description": "The handling of the `amount` field. `EXACT_INPUT` means the requester will send the specified `amount` of input tokens and get a quote with a variable quantity of output tokens. `EXACT_OUTPUT` means the requester will receive the specified `amount` of output tokens and get a quote with a variable quantity of input tokens.",
			"options": [
				{
					"name": "EXACT INPUT",
					"value": "EXACT_INPUT"
				},
				{
					"name": "EXACT OUTPUT",
					"value": "EXACT_OUTPUT"
				}
			],
			"routing": {
				"send": {
					"property": "type",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Aggregator Quote"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Amount",
			"name": "amount",
			"type": "string",
			"default": "",
			"description": "The quantity of tokens denominated in the token's base units. (For example, for an ERC20 token one token is 1x10^18 base units. For one USDC token one token is 1x10^6 base units.) This value must be greater than 0.",
			"routing": {
				"send": {
					"property": "amount",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Aggregator Quote"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Token In Chain ID",
			"name": "tokenInChainId",
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
					"property": "tokenInChainId",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Aggregator Quote"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Token Out Chain ID",
			"name": "tokenOutChainId",
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
					"property": "tokenOutChainId",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Aggregator Quote"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Token In",
			"name": "tokenIn",
			"type": "string",
			"default": "",
			"description": "The token which will be sent, specified by its token address. For a list of supported tokens, see the [FAQ](https://api-docs.uniswap.org/guides/faqs).",
			"routing": {
				"send": {
					"property": "tokenIn",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Aggregator Quote"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Token Out",
			"name": "tokenOut",
			"type": "string",
			"default": "",
			"description": "The token which will be received, specified by its token address. For a list of supported tokens, see the [FAQ](https://api-docs.uniswap.org/guides/faqs).",
			"routing": {
				"send": {
					"property": "tokenOut",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Aggregator Quote"
					]
				}
			}
		},
		{
			"displayName": "Generate Permit As Transaction",
			"name": "generatePermitAsTransaction",
			"type": "boolean",
			"default": false,
			"description": "Indicates whether you want to receive a permit2 transaction to sign and submit onchain, or a permit message to sign. When set to `true`, the quote response returns the Permit2 as a calldata which the user signs and broadcasts. When set to `false` (the default), the quote response returns the Permit2 as a message which the user signs but does not need to broadcast. When using a 7702-delegated wallet, set this field to `true`. Except for this scenario, it is recommended that this field is set to false. Note that a Permit2 calldata (e.g. `true`), will provide indefinite permission for Permit2 to spend a token, in contrast to a Permit2 message (e.g. `false`) which is only valid for 30 days. Further, a Permit2 calldata (e.g. `true`) requires the user to pay gas to submit the transaction, whereas the Permit2 message (e.g. `false` ) does not require the user to submit a transaction and requires no gas.",
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
						"Swapping"
					],
					"operation": [
						"Aggregator Quote"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Swapper",
			"name": "swapper",
			"type": "string",
			"default": "",
			"description": "The wallet address which will be used to send the token.",
			"routing": {
				"send": {
					"property": "swapper",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Aggregator Quote"
					]
				}
			}
		},
		{
			"displayName": "Slippage Tolerance",
			"name": "slippageTolerance",
			"type": "number",
			"default": 0,
			"description": "The slippage tolerance as a percentage up to a maximum of two decimal places. This is the maximum acceptable output loss as a percentage: for exact-input trades, the minimum received is expectedOut × (1 - slippageTolerance); for exact-output trades, the maximum input is expectedIn × (1 + slippageTolerance).\n\nWhen submitting a quote, note that slippage tolerance works differently in UniswapX swaps where it does not set a limit on the Spread in an order. See [here](https://api-docs.uniswap.org/guides/faqs#why-do-uniswapx-quotes-have-more-slippage-than-the-tolerance-i-set) for more information.\n\nNote that if the trade type is `EXACT_INPUT`, then the slippage is in terms of the output token. If the trade type is `EXACT_OUTPUT`, then the slippage is in terms of the input token.\n\nWhen submitting a request, `slippageTolerance` may not be set when `autoSlippage` is defined. One of `slippageTolerance` or `autoSlippage` must be defined.",
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
						"Swapping"
					],
					"operation": [
						"Aggregator Quote"
					]
				}
			}
		},
		{
			"displayName": "Auto Slippage",
			"name": "autoSlippage",
			"type": "options",
			"default": "DEFAULT",
			"description": "The auto slippage strategy to employ. For Uniswap Protocols (v2, v3, v4) the auto slippage will be automatically calculated when this field is set to `DEFAULT`. Auto slippage cannot be calculated for UniswapX swaps.\n\nNote that if the trade type is `EXACT_INPUT`, then the slippage is in terms of the output token. If the trade type is `EXACT_OUTPUT`, then the slippage is in terms of the input token.\n\nWhen submitting a request, `autoSlippage` may not be set when `slippageTolerance` is defined. One of `slippageTolerance` or `autoSlippage` must be defined.",
			"options": [
				{
					"name": "DEFAULT",
					"value": "DEFAULT"
				}
			],
			"routing": {
				"send": {
					"property": "autoSlippage",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Aggregator Quote"
					]
				}
			}
		},
		{
			"displayName": "Routing Preference",
			"name": "routingPreference",
			"type": "options",
			"default": "BEST_PRICE",
			"description": "The `routingPreference` specifies the preferred strategy to determine the quote. If the `routingPreference` is `BEST_PRICE`, then the quote will propose a route through the specified whitelisted protocols (or all, if none are specified) that provides the best price. When the `routingPreference` is `FASTEST`, the quote will propose the first route which is found to complete the swap.",
			"options": [
				{
					"name": "BEST PRICE",
					"value": "BEST_PRICE"
				},
				{
					"name": "FASTEST",
					"value": "FASTEST"
				}
			],
			"routing": {
				"send": {
					"property": "routingPreference",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Aggregator Quote"
					]
				}
			}
		},
		{
			"displayName": "Protocols",
			"name": "protocols",
			"type": "json",
			"default": "[\n  null\n]",
			"description": "The protocols to use for the swap/order. If the `protocols` field is defined, then you can only set the `routingPreference` to `BEST_PRICE`. Note that the value `UNISWAPX` is deprecated and will be removed in a future release.",
			"routing": {
				"send": {
					"property": "protocols",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ JSON.parse($value) }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Aggregator Quote"
					]
				}
			}
		},
		{
			"displayName": "Hooks Options",
			"name": "hooksOptions",
			"type": "options",
			"default": "V4_HOOKS_INCLUSIVE",
			"description": "The hook options to use for V4 pool quotes. `V4_HOOKS_INCLUSIVE` will get quotes for V4 pools with or without hooks. `V4_HOOKS_ONLY` will only get quotes for V4 pools with hooks. `V4_NO_HOOKS` will only get quotes for V4 pools without hooks. Defaults to `V4_HOOKS_INCLUSIVE` if `V4` is included in `protocols` and `hookOptions` is not set. This field is ignored if `V4` is not passed in `protocols`.",
			"options": [
				{
					"name": "v4 HOOKS INCLUSIVE",
					"value": "V4_HOOKS_INCLUSIVE"
				},
				{
					"name": "v4 HOOKS ONLY",
					"value": "V4_HOOKS_ONLY"
				},
				{
					"name": "v4 NO HOOKS",
					"value": "V4_NO_HOOKS"
				}
			],
			"routing": {
				"send": {
					"property": "hooksOptions",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Aggregator Quote"
					]
				}
			}
		},
		{
			"displayName": "Spread Optimization",
			"name": "spreadOptimization",
			"type": "options",
			"default": "EXECUTION",
			"description": "For UniswapX swaps, when set to `EXECUTION`, quotes optimize for looser spreads at higher fill rates. When set to `PRICE`, quotes optimize for tighter spreads at lower fill rates. This field is not applicable to Uniswap Protocols (v2, v3, v4), bridging, or wrapping/unwrapping and will be ignored if set.",
			"options": [
				{
					"name": "EXECUTION",
					"value": "EXECUTION"
				},
				{
					"name": "PRICE",
					"value": "PRICE"
				}
			],
			"routing": {
				"send": {
					"property": "spreadOptimization",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Aggregator Quote"
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
						"Swapping"
					],
					"operation": [
						"Aggregator Quote"
					]
				}
			}
		},
		{
			"displayName": "Permit Amount",
			"name": "permitAmount",
			"type": "options",
			"default": "FULL",
			"description": "For Uniswap Protocols (v2, v3, v4) swaps, specify the input token spend allowance (e.g. quantity) to be set in the permit. `FULL` can be used to specify an unlimited token quantity, and may prevent the wallet from needing to sign another permit for the same token in the future. `EXACT` can be used to specify the exact input token quantity for this request. Defaults to `FULL`.",
			"options": [
				{
					"name": "FULL",
					"value": "FULL"
				},
				{
					"name": "EXACT",
					"value": "EXACT"
				}
			],
			"routing": {
				"send": {
					"property": "permitAmount",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Aggregator Quote"
					]
				}
			}
		},
		{
			"displayName": "Recipient",
			"name": "recipient",
			"type": "string",
			"default": "",
			"description": "(optional) The wallet address which will receive the output of the swap. If not provided, the output is returned to the `swapper`.",
			"routing": {
				"send": {
					"property": "recipient",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Aggregator Quote"
					]
				}
			}
		},
		{
			"displayName": "Integrator Fees",
			"name": "integratorFees",
			"type": "json",
			"default": "[\n  {}\n]",
			"description": "Optional integrator fee configuration. When provided, the specified fee is applied to the swap instead of the default partner fee service. Only one fee entry is currently supported.",
			"routing": {
				"send": {
					"property": "integratorFees",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ JSON.parse($value) }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Aggregator Quote"
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
						"Swapping"
					],
					"operation": [
						"Aggregator Quote"
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
						"Swapping"
					],
					"operation": [
						"Aggregator Quote"
					]
				}
			}
		},
		{
			"displayName": "Include Route Candidates",
			"name": "includeRouteCandidates",
			"type": "boolean",
			"default": true,
			"description": "When true, uniroute-backed classic quotes include routeCandidates — the top alternative routes considered, each with its whole-route amounts.",
			"routing": {
				"send": {
					"property": "includeRouteCandidates",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Aggregator Quote"
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
						"Swapping"
					],
					"operation": [
						"Aggregator Quote"
					]
				}
			}
		},
		{
			"displayName": "POST /order",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Post Order"
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
						"Swapping"
					],
					"operation": [
						"Post Order"
					]
				}
			}
		},
		{
			"required": true,
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
						"Swapping"
					],
					"operation": [
						"Post Order"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Quote",
			"name": "quote",
			"type": "json",
			"default": "{\n  \"orderInfo\": {\n    \"chainId\": 1,\n    \"additionalValidationContract\": \"0x0000000000000000000000000000000000000000\",\n    \"additionalValidationData\": \"0x\",\n    \"input\": {},\n    \"outputs\": [\n      {\n        \"startAmount\": {},\n        \"endAmount\": {},\n        \"recipient\": {}\n      }\n    ]\n  },\n  \"input\": {\n    \"token\": {},\n    \"maximumAmount\": {}\n  },\n  \"output\": {\n    \"amount\": {},\n    \"token\": {},\n    \"recipient\": {},\n    \"minimumAmount\": {}\n  },\n  \"aggregatedOutputs\": [\n    {\n      \"token\": {},\n      \"amount\": {},\n      \"recipient\": {}\n    }\n  ]\n}",
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
						"Swapping"
					],
					"operation": [
						"Post Order"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Routing",
			"name": "routing",
			"type": "options",
			"default": "CLASSIC",
			"description": "The routing for the proposed transaction.",
			"options": [
				{
					"name": "CLASSIC",
					"value": "CLASSIC"
				},
				{
					"name": "DUTCH LIMIT",
					"value": "DUTCH_LIMIT"
				},
				{
					"name": "DUTCH v2",
					"value": "DUTCH_V2"
				},
				{
					"name": "DUTCH v3",
					"value": "DUTCH_V3"
				},
				{
					"name": "BRIDGE",
					"value": "BRIDGE"
				},
				{
					"name": "LIMIT ORDER",
					"value": "LIMIT_ORDER"
				},
				{
					"name": "PRIORITY",
					"value": "PRIORITY"
				},
				{
					"name": "WRAP",
					"value": "WRAP"
				},
				{
					"name": "UNWRAP",
					"value": "UNWRAP"
				},
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
						"Swapping"
					],
					"operation": [
						"Post Order"
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
						"Swapping"
					],
					"operation": [
						"Post Order"
					]
				}
			}
		},
		{
			"displayName": "GET /orders",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Get Order"
					]
				}
			}
		},
		{
			"displayName": "Order Type",
			"name": "orderType",
			"description": "The UniswapX order type to retrieve.",
			"default": "Dutch_V2",
			"type": "options",
			"options": [
				{
					"name": "Dutch v2",
					"value": "Dutch_V2"
				},
				{
					"name": "Dutch v3",
					"value": "Dutch_V3"
				},
				{
					"name": "Limit",
					"value": "Limit"
				},
				{
					"name": "Priority",
					"value": "Priority"
				}
			],
			"routing": {
				"send": {
					"type": "query",
					"property": "orderType",
					"value": "={{ $value }}",
					"propertyInDotNotation": false
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Get Order"
					]
				}
			}
		},
		{
			"displayName": "Order ID",
			"name": "orderId",
			"description": "A transaction hash for an order. `orderId` or `orderIds` must be provided, but not both.",
			"default": "",
			"type": "string",
			"routing": {
				"send": {
					"type": "query",
					"property": "orderId",
					"value": "={{ $value }}",
					"propertyInDotNotation": false
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Get Order"
					]
				}
			}
		},
		{
			"displayName": "Order Ids",
			"name": "orderIds",
			"description": "A list of comma separated orderIds (transaction hashes). `orderId` or `orderIds` must be provided, but not both.",
			"default": "",
			"type": "string",
			"routing": {
				"send": {
					"type": "query",
					"property": "orderIds",
					"value": "={{ $value }}",
					"propertyInDotNotation": false
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Get Order"
					]
				}
			}
		},
		{
			"displayName": "Limit",
			"name": "limit",
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
						"Swapping"
					],
					"operation": [
						"Get Order"
					]
				}
			}
		},
		{
			"displayName": "Order Status",
			"name": "orderStatus",
			"description": "Filter by order status.",
			"default": "open",
			"type": "options",
			"options": [
				{
					"name": "Open",
					"value": "open"
				},
				{
					"name": "Expired",
					"value": "expired"
				},
				{
					"name": "Error",
					"value": "error"
				},
				{
					"name": "Cancelled",
					"value": "cancelled"
				},
				{
					"name": "Filled",
					"value": "filled"
				},
				{
					"name": "Unverified",
					"value": "unverified"
				},
				{
					"name": "Insufficient Funds",
					"value": "insufficient-funds"
				}
			],
			"routing": {
				"send": {
					"type": "query",
					"property": "orderStatus",
					"value": "={{ $value }}",
					"propertyInDotNotation": false
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Get Order"
					]
				}
			}
		},
		{
			"displayName": "Swapper",
			"name": "swapper",
			"description": "Filter by swapper address.",
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
						"Swapping"
					],
					"operation": [
						"Get Order"
					]
				}
			}
		},
		{
			"displayName": "Sort Key",
			"name": "sortKey",
			"description": "Order the query results by the sort key.",
			"default": "createdAt",
			"type": "options",
			"options": [
				{
					"name": "Created At",
					"value": "createdAt"
				}
			],
			"routing": {
				"send": {
					"type": "query",
					"property": "sortKey",
					"value": "={{ $value }}",
					"propertyInDotNotation": false
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Get Order"
					]
				}
			}
		},
		{
			"displayName": "Sort",
			"name": "sort",
			"description": "Sort query. For example: `sort=gt(UNIX_TIMESTAMP)`, `sort=between(1675872827, 1675872930)`, or `lt(1675872930)`.",
			"default": "",
			"type": "string",
			"routing": {
				"send": {
					"type": "query",
					"property": "sort",
					"value": "={{ $value }}",
					"propertyInDotNotation": false
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Get Order"
					]
				}
			}
		},
		{
			"displayName": "Filler",
			"name": "filler",
			"description": "Filter by filler address.",
			"default": "",
			"type": "string",
			"routing": {
				"send": {
					"type": "query",
					"property": "filler",
					"value": "={{ $value }}",
					"propertyInDotNotation": false
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Get Order"
					]
				}
			}
		},
		{
			"displayName": "Cursor",
			"name": "cursor",
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
						"Swapping"
					],
					"operation": [
						"Get Order"
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
						"Swapping"
					],
					"operation": [
						"Get Order"
					]
				}
			}
		},
		{
			"displayName": "POST /swap",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Create Swap Transaction"
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
					"name": "2 0",
					"value": "2.0"
				},
				{
					"name": "2 1 1",
					"value": "2.1.1"
				},
				{
					"name": "2 2 0",
					"value": "2.2.0"
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
						"Swapping"
					],
					"operation": [
						"Create Swap Transaction"
					]
				}
			}
		},
		{
			"displayName": "X Permit 2 Disabled",
			"name": "x-permit2-disabled",
			"description": "Disables the Permit2 approval flow. When set to `true`, `permitData` is returned as `null` and the header is forwarded to the routing layer for correct gas simulation against the Proxy Universal Router contract. When `false` or omitted, the standard Permit2 approval flow is used. This header is intended for integrators whose infrastructure uses a direct approval-then-swap pattern without Permit2.",
			"default": false,
			"type": "boolean",
			"routing": {
				"request": {
					"headers": {
						"x-permit2-disabled": "={{ $value }}"
					}
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Create Swap Transaction"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Quote",
			"name": "quote",
			"type": "json",
			"default": "{\n  \"input\": {\n    \"maximumAmount\": {}\n  },\n  \"output\": {\n    \"amount\": {},\n    \"minimumAmount\": {}\n  },\n  \"chainId\": 1,\n  \"tradeType\": \"EXACT_INPUT\",\n  \"route\": [\n    [\n      {\n        \"type\": \"v2-pool\",\n        \"tokenIn\": {\n          \"address\": {},\n          \"chainId\": {},\n          \"sellFeeBps\": {}\n        },\n        \"tokenOut\": {},\n        \"reserve0\": {\n          \"token\": {}\n        },\n        \"reserve1\": {},\n        \"amountIn\": {},\n        \"amountOut\": {}\n      }\n    ]\n  ],\n  \"txFailureReasons\": [\n    null\n  ],\n  \"aggregatedOutputs\": [\n    {\n      \"token\": {},\n      \"amount\": {},\n      \"recipient\": {}\n    }\n  ],\n  \"swapSteps\": [\n    {\n      \"path\": [\n        null\n      ],\n      \"minHopPriceX36\": [\n        null\n      ]\n    }\n  ],\n  \"routeCandidates\": [\n    {}\n  ]\n}",
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
						"Swapping"
					],
					"operation": [
						"Create Swap Transaction"
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
						"Swapping"
					],
					"operation": [
						"Create Swap Transaction"
					]
				}
			}
		},
		{
			"displayName": "Include Gas Info",
			"name": "includeGasInfo",
			"type": "boolean",
			"default": false,
			"description": "Use `refreshGasPrice` instead.",
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
						"Swapping"
					],
					"operation": [
						"Create Swap Transaction"
					]
				}
			}
		},
		{
			"displayName": "Refresh Gas Price",
			"name": "refreshGasPrice",
			"type": "boolean",
			"default": false,
			"description": "If true, the gas price will be re-fetched from the network.",
			"routing": {
				"send": {
					"property": "refreshGasPrice",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Create Swap Transaction"
					]
				}
			}
		},
		{
			"displayName": "Simulate Transaction",
			"name": "simulateTransaction",
			"type": "boolean",
			"default": false,
			"description": "If true, the transaction will be simulated. If the simulation results on an onchain error, endpoint will return an error.",
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
						"Swapping"
					],
					"operation": [
						"Create Swap Transaction"
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
						"Swapping"
					],
					"operation": [
						"Create Swap Transaction"
					]
				}
			}
		},
		{
			"displayName": "Safety Mode",
			"name": "safetyMode",
			"type": "options",
			"default": "SAFE",
			"description": "Swap safety mode will automatically sweep the transaction for the native token and return it to the sender wallet address. This is to prevent accidental loss of funds in the event that the token amount is set in the transaction value instead of as part of the calldata.",
			"options": [
				{
					"name": "SAFE",
					"value": "SAFE"
				}
			],
			"routing": {
				"send": {
					"property": "safetyMode",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Create Swap Transaction"
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
						"Swapping"
					],
					"operation": [
						"Create Swap Transaction"
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
						"Swapping"
					],
					"operation": [
						"Create Swap Transaction"
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
						"Swapping"
					],
					"operation": [
						"Create Swap Transaction"
					]
				}
			}
		},
		{
			"displayName": "GET /swaps",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Get Swaps"
					]
				}
			}
		},
		{
			"displayName": "Tx Hashes",
			"name": "txHashes",
			"description": "On-chain transaction hashes. At least one of `txHashes` or `userOpHashes` must be provided.",
			"default": "[\n  \"0xc286f0adc6a9d6d26d6114df251d9b09d8bfafb2e00af5953193f6af92e110db\"\n]",
			"type": "json",
			"routing": {
				"send": {
					"type": "query",
					"property": "txHashes",
					"value": "={{ $value }}",
					"propertyInDotNotation": false
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Get Swaps"
					]
				}
			}
		},
		{
			"displayName": "User Op Hashes",
			"name": "userOpHashes",
			"description": "ERC-4337 UserOperation hashes. At least one of `txHashes` or `userOpHashes` must be provided.",
			"default": "[\n  \"0xd47b609961a02483c9516d1f326244357e7e0b1d91569ebb4d119dff17e47330\"\n]",
			"type": "json",
			"routing": {
				"send": {
					"type": "query",
					"property": "userOpHashes",
					"value": "={{ $value }}",
					"propertyInDotNotation": false
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Get Swaps"
					]
				}
			}
		},
		{
			"displayName": "Chain ID",
			"name": "chainId",
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
					"property": "chainId",
					"value": "={{ $value }}",
					"propertyInDotNotation": false
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Get Swaps"
					]
				}
			}
		},
		{
			"displayName": "Swapper",
			"name": "swapper",
			"description": "Filter by swapper address.",
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
						"Swapping"
					],
					"operation": [
						"Get Swaps"
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
						"Swapping"
					],
					"operation": [
						"Get Swaps"
					]
				}
			}
		},
		{
			"displayName": "POST /limit_order_quote",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Get Limit Order Quote"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Swapper",
			"name": "swapper",
			"type": "string",
			"default": "",
			"description": "(optional) The wallet address which will receive the output of the swap. If not provided, the output is returned to the `swapper`.",
			"routing": {
				"send": {
					"property": "swapper",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Get Limit Order Quote"
					]
				}
			}
		},
		{
			"displayName": "Limit Price",
			"name": "limitPrice",
			"type": "string",
			"default": "",
			"routing": {
				"send": {
					"property": "limitPrice",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Get Limit Order Quote"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Amount",
			"name": "amount",
			"type": "string",
			"default": "",
			"description": "The quantity of tokens denominated in the token's base units. (For example, for an ERC20 token one token is 1x10^18 base units. For one USDC token one token is 1x10^6 base units.) This value must be greater than 0.",
			"routing": {
				"send": {
					"property": "amount",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Get Limit Order Quote"
					]
				}
			}
		},
		{
			"displayName": "Order Deadline",
			"name": "orderDeadline",
			"type": "number",
			"default": 0,
			"routing": {
				"send": {
					"property": "orderDeadline",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Get Limit Order Quote"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Type",
			"name": "type",
			"type": "options",
			"default": "EXACT_INPUT",
			"description": "The handling of the `amount` field. `EXACT_INPUT` means the requester will send the specified `amount` of input tokens and get a quote with a variable quantity of output tokens. `EXACT_OUTPUT` means the requester will receive the specified `amount` of output tokens and get a quote with a variable quantity of input tokens.",
			"options": [
				{
					"name": "EXACT INPUT",
					"value": "EXACT_INPUT"
				},
				{
					"name": "EXACT OUTPUT",
					"value": "EXACT_OUTPUT"
				}
			],
			"routing": {
				"send": {
					"property": "type",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Get Limit Order Quote"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Token In",
			"name": "tokenIn",
			"type": "string",
			"default": "",
			"description": "The token which will be sent, specified by its token address. For a list of supported tokens, see the [FAQ](https://api-docs.uniswap.org/guides/faqs).",
			"routing": {
				"send": {
					"property": "tokenIn",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Get Limit Order Quote"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Token Out",
			"name": "tokenOut",
			"type": "string",
			"default": "",
			"description": "The token which will be received, specified by its token address. For a list of supported tokens, see the [FAQ](https://api-docs.uniswap.org/guides/faqs).",
			"routing": {
				"send": {
					"property": "tokenOut",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Get Limit Order Quote"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Token In Chain ID",
			"name": "tokenInChainId",
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
					"property": "tokenInChainId",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Get Limit Order Quote"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Token Out Chain ID",
			"name": "tokenOutChainId",
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
					"property": "tokenOutChainId",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Get Limit Order Quote"
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
						"Swapping"
					],
					"operation": [
						"Get Limit Order Quote"
					]
				}
			}
		},
		{
			"displayName": "POST /swap_4337",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Create Swap 4337 Transaction"
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
					"name": "2 0",
					"value": "2.0"
				},
				{
					"name": "2 1 1",
					"value": "2.1.1"
				},
				{
					"name": "2 2 0",
					"value": "2.2.0"
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
						"Swapping"
					],
					"operation": [
						"Create Swap 4337 Transaction"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Quote",
			"name": "quote",
			"type": "json",
			"default": "{\n  \"input\": {\n    \"maximumAmount\": {}\n  },\n  \"output\": {\n    \"amount\": {},\n    \"minimumAmount\": {}\n  },\n  \"chainId\": 1,\n  \"tradeType\": \"EXACT_INPUT\",\n  \"route\": [\n    [\n      {\n        \"type\": \"v2-pool\",\n        \"tokenIn\": {\n          \"address\": {},\n          \"chainId\": {},\n          \"sellFeeBps\": {}\n        },\n        \"tokenOut\": {},\n        \"reserve0\": {\n          \"token\": {}\n        },\n        \"reserve1\": {},\n        \"amountIn\": {},\n        \"amountOut\": {}\n      }\n    ]\n  ],\n  \"txFailureReasons\": [\n    null\n  ],\n  \"aggregatedOutputs\": [\n    {\n      \"token\": {},\n      \"amount\": {},\n      \"recipient\": {}\n    }\n  ],\n  \"swapSteps\": [\n    {\n      \"path\": [\n        null\n      ],\n      \"minHopPriceX36\": [\n        null\n      ]\n    }\n  ],\n  \"routeCandidates\": [\n    {}\n  ]\n}",
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
						"Swapping"
					],
					"operation": [
						"Create Swap 4337 Transaction"
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
			"description": "Smart account address that will execute the UserOperation.",
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
						"Swapping"
					],
					"operation": [
						"Create Swap 4337 Transaction"
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
						"Swapping"
					],
					"operation": [
						"Create Swap 4337 Transaction"
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
						"Swapping"
					],
					"operation": [
						"Create Swap 4337 Transaction"
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
						"Swapping"
					],
					"operation": [
						"Create Swap 4337 Transaction"
					]
				}
			}
		},
		{
			"displayName": "Sponsorship Info",
			"name": "sponsorshipInfo",
			"type": "json",
			"default": "{\n  \"campaign\": {\n    \"allowances\": [\n      {}\n    ],\n    \"eligibleChains\": [\n      null\n    ]\n  },\n  \"sponsorMetadata\": {}\n}",
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
						"Swapping"
					],
					"operation": [
						"Create Swap 4337 Transaction"
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
						"Swapping"
					],
					"operation": [
						"Create Swap 4337 Transaction"
					]
				}
			}
		},
		{
			"displayName": "POST /check_approval_4337",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Check Approval 4337"
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
			"description": "Smart account address that will execute the UserOperation.",
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
						"Swapping"
					],
					"operation": [
						"Check Approval 4337"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Token",
			"name": "token",
			"type": "string",
			"default": "",
			"description": "The token which will be sent, specified by its token address. For a list of supported tokens, see the [FAQ](https://api-docs.uniswap.org/guides/faqs).",
			"routing": {
				"send": {
					"property": "token",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Check Approval 4337"
					]
				}
			}
		},
		{
			"required": true,
			"displayName": "Amount",
			"name": "amount",
			"type": "string",
			"default": "",
			"description": "The quantity of tokens denominated in the token's base units. (For example, for an ERC20 token one token is 1x10^18 base units. For one USDC token one token is 1x10^6 base units.) This value must be greater than 0.",
			"routing": {
				"send": {
					"property": "amount",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Check Approval 4337"
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
						"Swapping"
					],
					"operation": [
						"Check Approval 4337"
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
						"Swapping"
					],
					"operation": [
						"Check Approval 4337"
					]
				}
			}
		},
		{
			"displayName": "Token Out",
			"name": "tokenOut",
			"type": "string",
			"default": "",
			"description": "The token which will be received, specified by its token address. For a list of supported tokens, see the [FAQ](https://api-docs.uniswap.org/guides/faqs).",
			"routing": {
				"send": {
					"property": "tokenOut",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Check Approval 4337"
					]
				}
			}
		},
		{
			"displayName": "Token Out Chain ID",
			"name": "tokenOutChainId",
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
					"property": "tokenOutChainId",
					"propertyInDotNotation": false,
					"type": "body",
					"value": "={{ $value }}"
				}
			},
			"displayOptions": {
				"show": {
					"resource": [
						"Swapping"
					],
					"operation": [
						"Check Approval 4337"
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
						"Swapping"
					],
					"operation": [
						"Check Approval 4337"
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
						"Swapping"
					],
					"operation": [
						"Check Approval 4337"
					]
				}
			}
		},
		{
			"displayName": "Sponsorship Info",
			"name": "sponsorshipInfo",
			"type": "json",
			"default": "{\n  \"campaign\": {\n    \"allowances\": [\n      {}\n    ],\n    \"eligibleChains\": [\n      null\n    ]\n  },\n  \"sponsorMetadata\": {}\n}",
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
						"Swapping"
					],
					"operation": [
						"Check Approval 4337"
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
						"Swapping"
					],
					"operation": [
						"Check Approval 4337"
					]
				}
			}
		},
];
