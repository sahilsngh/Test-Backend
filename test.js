// default libraries that make all of this possible
import { ImmutableXClient, MintableERC721TokenType } from '@imtbl/imx-sdk';
import { AlchemyProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';

// parsing .env
import dotenv from 'dotenv'
dotenv.config()

const ENV_CHECK = [
    'MINTER_PRIVATE_KEY',
    'ALCHEMY_API_KEY',
    'TOKEN_CONTRACT_ADDRESS',
    'TOKEN_RECEIVER_ADDRESS',
    'ROYALTY_RECEIVER_ADDRESS'
]

for(let [k, v] of Object.entries(process.env)){
    if(!ENV_CHECK.includes(k)) continue
    if(v.startsWith('<') && v.endsWith('>')){
        console.error(`[ERROR] Replace ${k} value in .env with a valid one!`)
        process.exit(0)
    }
}


const provider = new AlchemyProvider('ropsten', process.env.ALCHEMY_API_KEY);
const waitForTransaction = async (promise) => {
    const txId = await promise;
    console.info('Waiting for transaction', 'TX id', txId);
    const receipt = await provider.waitForTransaction(txId);
    if (receipt.status === 0) {
        throw new Error('Transaction containing user registration rejected');
    }
    console.info('Transaction containing user registration TX mined: ' + receipt.blockNumber);
    return receipt;
};

const main = async()=> {
    const signer = new Wallet(process.env.MINTER_PRIVATE_KEY).connect(provider);
    console.log('At first sign')
    const client = await ImmutableXClient.build({
        publicApiUrl: 'https://api.ropsten.x.immutable.com/v1',
        signer,
        starkContractAddress: '0x4527BE8f31E2ebFbEF4fCADDb5a17447B27d2aef',
        registrationContractAddress: '0x6C21EC8DE44AE44D0992ec3e2d9f1aBb6207D864'
    });

    const registerImxResult = await client.registerImx({
        etherKey: client.address.toLowerCase(),
        starkPublicKey: client.starkPublicKey,
    });

    if (registerImxResult.tx_hash === '') {
        console.info('Minter registered, continuing...');
    } else {
        console.info('Waiting for minter registration...');
        await waitForTransaction(Promise.resolve(registerImxResult.tx_hash));
    }
    // for (let i = 2; i < 103; i++) {
        try {
            console.log('at first mint')
            const result = await client.mint({
                mints: [
                    {
                        etherKey: process.env.TOKEN_RECEIVER_ADDRESS.toLowerCase(),
                        tokens: [
                            {
                                type: MintableERC721TokenType.MINTABLE_ERC721,
                                data: {
                                    tokenAddress: process.env.TOKEN_CONTRACT_ADDRESS.toLowerCase(),
                                    id: '1001',
                                    blueprint: 'http://metadataapi-env.eba-jpgmysdm.us-east-2.elasticbeanstalk.com/1001',
                                },
                            }
                        ],
                        nonce: '' + Math.floor(Math.random() * 10000),
                        authSignature: '',
                    },
                ],
            });

            console.log('Minting success!', result);
            console.log(await signer._signingKey());
            console.log(await signer.auth_signature)
        } catch (err) {
            console.error('Minting failed. Make sure the asset you\'re trying to mint doesn\'t already exist!')
            console.error('The following error was provided', err)
        }
    }
// }
main()