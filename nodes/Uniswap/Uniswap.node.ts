import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { swappingDescription } from './resources/swapping';
import { utilitiesDescription } from './resources/utilities';
import { liquidityProvisioningDescription } from './resources/liquidity-provisioning';
import { swapBatchingDescription } from './resources/swap-batching';
import { chainedSwappingDescription } from './resources/chained-swapping';

export class Uniswap implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'uniswap',
		name: 'N8nDevUniswap',
		icon: { light: 'file:./uniswap.svg', dark: 'file:./uniswap.dark.svg' },
		group: ['input'],
		version: 1,
		subtitle: '={{\$parameter["operation"] + ": " + \$parameter["resource"]}}',
		description: 'Uniswap decentralized trading protocol for automated liquidity provision and token swaps across multiple blockchains',
		defaults: { name: 'uniswap' },
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'N8nDevUniswapApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{\$credentials.url}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
		{
			"displayName": "Resource",
			"name": "resource",
			"type": "options",
			"noDataExpression": true,
			"options": [
				{
					"name": "Swapping",
					"value": "Swapping",
					"description": ""
				},
				{
					"name": "Utilities",
					"value": "Utilities",
					"description": ""
				},
				{
					"name": "Liquidity Provisioning",
					"value": "Liquidity Provisioning",
					"description": ""
				},
				{
					"name": "Swap Batching",
					"value": "Swap Batching",
					"description": ""
				},
				{
					"name": "Chained Swapping",
					"value": "Chained Swapping",
					"description": ""
				}
			],
			"default": ""
		},
		...swappingDescription,
		...utilitiesDescription,
		...liquidityProvisioningDescription,
		...swapBatchingDescription,
		...chainedSwappingDescription
		],
	};
}
