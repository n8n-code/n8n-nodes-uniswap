import type { INodeProperties } from 'n8n-workflow';

export const marginDescription: INodeProperties[] = [
                {
			"displayName": "Operation",
			"name": "operation",
			"type": "options",
			"noDataExpression": true,
			"displayOptions": {
				"show": {
					"resource": [
						"Margin"
					]
				}
			},
			"options": [
				{
					"name": "Margin Quote",
					"value": "Margin Quote",
					"action": "Get a margin quote",
					"description": "Prices a margin action (opening, closing, or managing a leveraged position) and returns both the execution subtree `POST /plan` consumes and the projections a confirmation modal renders.\n\nOne endpoint prices every action, in either direction. The market is addressed in TRADER terms (`exposureToken`, `counterToken`, `direction`), never in venue terms: `direction` alone decides which side is collateral and which is debt, so a client never sends a collateral/debt pair and never reorders the pair to mean short.\n\nThe body is a shared block plus exactly one of ten action keys. Two shared blocks are required-or-forbidden per key rather than optional: the wallet block (`walletToken`, `walletChainId`, `swapConfig`) is forbidden on `increaseLeverage` and `decreaseLeverage` and required on the other eight, and the top-level `slippageTolerance` is forbidden on `addEquity` and `withdrawEquity` and required on the other eight. See `MarginQuoteRequest` for the per-key rules.\n\nTwo tolerances, neither defaulting from the other: the top-level `slippageTolerance` bounds the LEVERAGE leg, the flash-accounted debt-funded swap inside the router, and is always an explicit percentage because it derives the calldata bounds that act as the MEV backstop. `swapConfig` bounds the WALLET-side swap and is the only place `autoSlippage` is accepted.\n\nUnits: amounts are decimal strings in the token's native decimals, leverage is a decimal string, and prices, the liquidation health factors and borrow rates are unsuffixed 18-decimal fixed point. Every response enum is serialized, including at its default value.\n\n**All ten action keys are served.**\n\n`close` is the one with nothing to solve and a risk none of the others carry: the debt it must clear KEEPS GROWING between the read and the router repaying it, so `debtToRepay` deliberately EXCEEDS what the position owes. The over-buy is the projected accrual over the inclusion window plus a small safety margin, and a trailing `SWEEP` returns whatever the buffer did not need. A close therefore reports `debtRepaid` (the debt itself) and `collateralReturned`, and reports NO leverage, liquidation price or health factor, because the position it describes will not exist. A position whose collateral cannot cover buying its debt back within the slippage-padded cap is refused with a 422 `MARGIN_CLOSE_UNFUNDABLE` rather than answered with a negative payout.\n\nA composite populates MORE than one operation, in the order they execute, and the equity side sits on opposite ends depending on which way it moves. A supply goes FIRST, because it strictly lowers LTV, so the borrow that follows is the only step raising it. A withdrawal goes LAST, matching what the router does. Both withdraw composites currently pay out ONLY in the position's collateral token, for the same reason the bare `withdrawEquity` does.\n\nWhich direction an action swaps in is decided by the SOLVE, not by the key. A target above what the position already holds buys collateral with borrowed funds and emits `INCREASE_POSITION` with `collateralToBuy` and `maxDebtIn`; a target below it sells collateral to repay debt and emits `DECREASE_POSITION` with `debtToRepay` and `maxCollateralIn`. `addEquityAndDecreaseLeverage` does BOTH depending on the numbers: deleveraging does not imply selling, it implies the equity grew faster than the size, so a modest target still buys while an aggressive one sells. The bound is always on the side the router gives up.\n\nAll six leverage-target keys (`increaseLeverage`, `decreaseLeverage` and the four equity composites) price whichever leg the solve's sign calls for, through the same v4 quoter: a target the position reaches by buying prices a leverage leg, and one it can only reach by selling prices a deleverage leg. So `addEquityAndDecreaseLeverage` normally still BUYS, and a target low enough to need a sale is priced as a `DECREASE_POSITION` rather than refused. What IS refused is a target that leaves the position exactly where it is with no equity moving, which is a `MARGIN_INTENT_MISMATCH` rather than an empty operation.\n\n`increaseLeverage` and `decreaseLeverage` hold EQUITY and move only the debt, which is the mirror of the equity keys. Both price a leverage-side leg, so both require the top-level `slippageTolerance`, and both forbid the wallet rail entirely: nothing crosses the wallet boundary, so neither serves a `funding` block. The key is an ASSERTION about which way leverage moves, checked before the leverage leg is priced (on the two add composites the wallet-side funding swap is priced first, since the target is measured against the equity it actually delivers, so a funding refusal precedes an intent mismatch there): a target on the wrong side of the position's current leverage is refused with `MARGIN_INTENT_MISMATCH` naming the key that fits (an `increaseLeverage` aimed below current leverage names `decreaseLeverage`, and the composites are corrected on their leverage axis only), while a target exactly at the current leverage satisfies either key. A target past the buffered LTV ceiling is refused with a 422 `MARGIN_LEVERAGE_EXCEEDS_MAX`.\n\nThe two equity keys hold size, so they borrow nothing, swap nothing on the leverage side and move no debt: their whole effect is on the collateral, which makes leverage fall on an add and rise on a withdrawal. Neither serves an `effectivePrice`, because there is no swap for one to describe, and their single operation is `ADD_COLLATERAL` or `WITHDRAW`.\n\n`withdrawEquity` currently pays out ONLY in the position's collateral token: its `walletToken` must equal that collateral, and any other value is refused with `MARGIN_FUNDING_SWAP_UNSUPPORTED`, because the swap that would sell the proceeds is not priced yet. A withdrawal is also held back from the venue's liquidation threshold by the LTV cliff buffer, so a request that would land the position on the edge is refused with a 422 `MARGIN_LEVERAGE_EXCEEDS_MAX` even when it is under the venue's own limit.",
					"routing": {
						"request": {
							"method": "POST",
							"url": "=/margin/quote"
						}
					}
				}
			],
			"default": ""
		},
		{
			"displayName": "POST /margin/quote",
			"name": "operation",
			"type": "notice",
			"typeOptions": {
				"theme": "info"
			},
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"Margin"
					],
					"operation": [
						"Margin Quote"
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
						"Margin"
					],
					"operation": [
						"Margin Quote"
					]
				}
			}
		},
		{
			"displayName": "POST /margin/quote<br/><br/>There's no body available for request, kindly use HTTP Request node to send body",
			"name": "operation",
			"type": "notice",
			"default": "",
			"displayOptions": {
				"show": {
					"resource": [
						"Margin"
					],
					"operation": [
						"Margin Quote"
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
						"Margin"
					],
					"operation": [
						"Margin Quote"
					]
				}
			}
		},
];
