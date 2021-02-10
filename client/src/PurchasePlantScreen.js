import React, { Fragment } from 'react'
import { utils } from "web3"
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import PlantCard from './PlantCard'
import ButtonAppBar from "./AppBar"
import { Typography } from '@material-ui/core'
import CharityCard from './CharityCard'

export default function PurchasePlantScreen ({ web3, cryptoPlantContract, account }) {
    async function purchaseSeed () {
        console.log('Purchasing seed')

        try {
            const purchaseSeed = await cryptoPlantContract.methods
                .purchaseSeed()
                .send({
                    from: account,
                    gas: 1500000,
                    gasPrice: '30000',
                    value: utils.toWei('0.1', 'ether')
                })

            console.log('Seed purchase response', purchaseSeed)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Fragment>
            <ButtonAppBar />
            <Container align="center" justify="center" alignItems="center" maxWidth="md">

                <Typography variant="h4">
                    Select a seed
                </Typography>

                <Grid container spacing={5} style={{ marginTop: 10 }}>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                        <CharityCard
                            name="World Wildlife Fund (WWF) seed"
                            description="Support WWF's groundbreaking work in protecting biodiversity. The funds will be used towards endangered species protection."
                            image="https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/wwf-512.png"
                            purchaseHandler={purchaseSeed}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                        <CharityCard
                            name="Australian Wildfires Refief Fund seed"
                            description="Wild Animal Preservation Fund is organizing this fundraiser to help restore the forest homes koalas and other animals"
                            image="https://www.economist.com/img/b/1280/720/90/sites/default/files/images/print-edition/20180804_STP001_0.jpg"
                            purchaseHandler={purchaseSeed}
                            comingSoon
                        />
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    )
}