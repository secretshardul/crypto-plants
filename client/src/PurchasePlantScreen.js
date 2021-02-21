import React, { Fragment } from 'react'
import { utils } from "web3"
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import SuperfluidSDK from '@superfluid-finance/js-sdk'
import PlantCard from './components/PlantCard'
import ButtonAppBar from "./AppBar"
import { Typography } from '@material-ui/core'
import CharityCard from './components/CharityCard'

export default function PurchasePlantScreen ({ web3, cryptoPlantContract, account }) {
    async function purchaseSeed () {
        console.log('Purchasing seed')

        try {
            const purchaseSeed = await cryptoPlantContract.methods
                .purchaseSeed()
                // .sendEther()
                .send({
                    from: account,
                    gas: 1500000,
                    gasPrice: '80000000000',
                    value: utils.toWei('0.00001', 'ether')
                })

            console.log('Seed purchase response', purchaseSeed)
        } catch (error) {
            console.log(error)
        }
    }

    async function purchaseSubscription () {
        const fUSDC = '0x8aE68021f6170E5a766bE613cEA0d75236ECCa9a'
        const charityAddress = '0x42F323c617c0a6d18547B8a2AaF8BcD1Abe617c9'

        const sf = new SuperfluidSDK.Framework({
            web3,
            tokens: ['fUSDC']
        })
        await sf.initialize()
        const carol = sf.user({
            address: account,
            token: fUSDC
        })

        await carol.flow({
            recipient: '0x42F323c617c0a6d18547B8a2AaF8BcD1Abe617c9',
            flowRate: '0'
        })

        const details = await carol.details()
        console.log(details)
    };

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
                            purchaseHandler={purchaseSeed}
                            subscribeHandler={purchaseSubscription}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                        <CharityCard
                            name="Australian Wildfires Refief Fund"
                            description="Wild Animal Preservation Fund is organizing this fundraiser to help restore the forest homes koalas and other animals"
                            image="https://www.arabnews.com/sites/default/files/styles/n_670_395/public/2020/08/02/2213616-839355943.jpg"
                            purchaseHandler={purchaseSeed}
                            comingSoon
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                        <CharityCard
                            name="Doctors without borders (MSF)"
                            description="MSF treats people where the need is greatest. Support healthcase in conflict zones and in countries affected by endemic diseases"
                            image="https://economictimes.indiatimes.com/thumb/msid-75850485,width-1200,height-900,resizemode-4,imgsize-312507/doctor-without-borders-afp.jpg"
                            purchaseHandler={purchaseSeed}
                            comingSoon
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                        <CharityCard
                            name="World Food Program (WFP)"
                            description="We are a global movement to achieve Zero Hunger. Support those people facing global emergencies like conflict and climate change."
                            image="https://upload.wikimedia.org/wikipedia/commons/5/59/World_Food_Programme_Logo_Simple.svg"
                            purchaseHandler={purchaseSeed}
                            comingSoon
                        />
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    )
}