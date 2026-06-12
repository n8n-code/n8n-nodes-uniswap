import type {
        IAuthenticateGeneric,
        Icon,
        ICredentialType,
        INodeProperties,
} from 'n8n-workflow';

export class UniswapApi implements ICredentialType {
        name = 'N8nDevUniswapApi';

        displayName = 'Uniswap API';

        icon: Icon = { light: 'file:../nodes/Uniswap/uniswap.svg', dark: 'file:../nodes/Uniswap/uniswap.dark.svg' };

        documentationUrl = '';

        properties: INodeProperties[] = [
          {
                        displayName: 'Base URL',
                        name: 'url',
                        type: 'string',
                        default: 'https://trade-api.gateway.uniswap.org/v1',
                        required: true,
                        placeholder: 'https://trade-api.gateway.uniswap.org/v1',
                        description: 'The base URL of your Uniswap API server',
                },
                {
                        displayName: 'API Key',
                        name: 'apiKey',
                        type: 'string',
                        typeOptions: { password: true },
                        default: '',
                        required: false,
                },
        
        ];

  authenticate: IAuthenticateGeneric = {
                type: 'generic',
                properties: {
                        headers: {
                                'x-api-key': '={{$credentials.apiKey}}',
                        },
                },
        };


}
