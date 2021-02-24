import React, { Fragment, useState } from 'react'
import { utils } from "web3"
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { Biconomy } from "@biconomy/mexa"
import SuperfluidSDK from '@superfluid-finance/js-sdk'
import PlantCard from './components/PlantCard'
import ButtonAppBar from "./AppBar"
import { Typography } from '@material-ui/core'
import CharityCard from './components/CharityCard'
import PurchaseDialog from './components/PurchaseDialog'
import CryptoPlantJson from "./contracts/CryptoPlant.json"

export default function PurchasePlantScreen ({ web3, cryptoPlantContract, account }) {
    const [showDialog, setDialogState] = useState(false)

    // const BICONOMY_KEY = 'B40ctU1aB.49214ae3-c3eb-49d6-b65b-26abfb704736' // Matic
    const BICONOMY_KEY = 'OdeDpkSjS.20b4987e-42ee-450e-bd85-075f81b51f4f'

    const biconomy = new Biconomy(window.ethereum, {
        apiKey: BICONOMY_KEY,
        debug: true,
        // strictMode: true,
    })
    let ercForwarderClient
    let permitClient;

    biconomy.onEvent(biconomy.READY, () => {
        console.log('Biconomy ready')
        ercForwarderClient = biconomy.erc20ForwarderClient
        permitClient = biconomy.permitClient
    }).onEvent(biconomy.ERROR, (error, message) => {
        // Handle error while initializing mexa
    });

    async function purchaseSeed () {
        setDialogState(false)
        console.log('Purchasing seed')
        try {
            const purchaseSeed = await cryptoPlantContract.methods
                .purchaseSubscription()
                // .purchaseSeed()
                // .sendEther()
                // .setTrustedForwarder('0x58697867383da03CBA35617BFbb3c0f6f91074d8')
                .send({
                    from: account,
                    gas: 1500000,
                    gasPrice: '80000000000',
                    // value: utils.toWei('0.00001', 'ether')
                })

            console.log('Seed purchase response', purchaseSeed)
        } catch (error) {
            console.log(error)
        }
    }

    async function payWithTokens() {
        console.log("getting user's permit to spend dai")
        await permitClient.daiPermit({
            expiry: Math.floor(Date.now() / 1000 + 3600),
            allowed: true
        });

        const callData = cryptoPlantContract.methods
            .purchaseSubscription()
            // .setTrustedForwarder('0x58697867383da03CBA35617BFbb3c0f6f91074d8')
            .encodeABI()
        console.log('Call data', callData)

        // const gasLimit = await cryptoPlantContract.methods
        //     .purchaseSeed()
        //     .estimateGas({ from: account })

        // console.log('Got gas limit', gasLimit)

        const cryptoPlantAddress = CryptoPlantJson.networks[4].address
        console.log('Plant address', cryptoPlantAddress)

        const builtTx = await ercForwarderClient.buildTx({
            to: cryptoPlantAddress,
            token: biconomy.daiTokenAddress,
            txGas: 150000000,
            data: callData
        });
        console.log('ERC forwarder transaction', builtTx)

        const txResponse = await ercForwarderClient.sendTxPersonalSign({
            req: builtTx.request
        });
        const txHash = txResponse.txHash;
        console.log(txHash);

        //for EIP712 signature type
        // const txHash = await ercForwarderClient.sendTxEIP712(builtTx.request);
    }

    async function purchaseSubscription () {
        setDialogState(false)
        const fUSDC = '0x8aE68021f6170E5a766bE613cEA0d75236ECCa9a'
        const charityAddress = '0x42F323c617c0a6d18547B8a2AaF8BcD1Abe617c9'

        const sf = new SuperfluidSDK.Framework({
            web3,
            tokens: ['fUSDC']
        })
        await sf.initialize()
        const currentUser = sf.user({
            address: account,
            token: fUSDC
        })

        await currentUser.flow({
            recipient: '0x42F323c617c0a6d18547B8a2AaF8BcD1Abe617c9',
            flowRate: '100000'
        })

        const details = await currentUser.details()
        console.log(details)

        // TODO issue token using super contract
        const purchaseSeed = await cryptoPlantContract.methods
            .purchaseSubscription()
            .send({
                from: account,
                gas: 1500000,
                gasPrice: '80000000000',
            })
    };

    function donateHandler() {
        setDialogState(true)
    }

    return (
        <Fragment>
            <ButtonAppBar />
            <Container align="center" justify="center" maxWidth="lg">

                <Typography variant="h4" style={{ marginTop: 20 }}>
                    Select a seed
                </Typography>

                <Grid container spacing={3} style={{ marginTop: 10 }}>
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                        <CharityCard
                            name="World Wildlife Fund (WWF)"
                            description="Support WWF's groundbreaking work in protecting biodiversity. The funds will be used towards endangered species protection."
                            image="https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/wwf-512.png"
                            // purchaseHandler={donateHandler}
                            purchaseHandler={payWithTokens}
                            // purchaseHandler={purchaseSeed}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                        <CharityCard
                            name="Australian Wildfires Refief Fund"
                            description="Wild Animal Preservation Fund is organizing this fundraiser to help restore the forest homes koalas and other animals"
                            image="https://www.arabnews.com/sites/default/files/styles/n_670_395/public/2020/08/02/2213616-839355943.jpg"
                            purchaseHandler={donateHandler}
                            comingSoon
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                        <CharityCard
                            name="Doctors without borders (MSF)"
                            description="MSF treats people where the need is greatest. Support healthcase in conflict zones and in countries affected by endemic diseases"
                            image="https://economictimes.indiatimes.com/thumb/msid-75850485,width-1200,height-900,resizemode-4,imgsize-312507/doctor-without-borders-afp.jpg"
                            purchaseHandler={donateHandler}
                            comingSoon
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                        <CharityCard
                            name="World Food Program (WFP)"
                            description="We are a global movement to achieve Zero Hunger. Support those people facing global emergencies like conflict and climate change."
                            image="https://upload.wikimedia.org/wikipedia/commons/5/59/World_Food_Programme_Logo_Simple.svg"
                            purchaseHandler={donateHandler}
                            comingSoon
                        />
                    </Grid>
                </Grid>
                {/* <PurchaseDialog open={showDialog} setDialogState={setDialogState} handlePurchase={purchaseSeed} handleSubscribe={purchaseSubscription} /> */}
            </Container>
        </Fragment>
    )
}