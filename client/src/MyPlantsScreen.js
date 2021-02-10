import React, { Fragment, useEffect, useState } from 'react'
import { utils } from "web3"
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import ButtonAppBar from "./AppBar"
import PlantCard from './PlantCard'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        textAlign: 'center'
    },
}))

export default function MyPlants ({ web3, cryptoPlantContract, account }) {
    const classes = useStyles()
    const [userTokens, setUserTokens] = useState([])
    useEffect(() => {
        async function getTokenData () {
            try {
                const baseURI = await cryptoPlantContract.methods.baseURI().call()
                console.log('Base URI', baseURI)

                const tokenCount = await cryptoPlantContract.methods.balanceOf(account).call()
                console.log('Got balance', tokenCount)

                let tokenDataList = []
                for (let tokenIndex = 0; tokenIndex < tokenCount; tokenIndex++) {
                    const token = await cryptoPlantContract.methods
                        .tokenOfOwnerByIndex(account, tokenIndex)
                        .call()
                    console.log(`Token ${tokenIndex}: ${token}`)

                    const tokenURI = await cryptoPlantContract.methods
                        .tokenURI(tokenIndex)
                        .call()
                    console.log('Got token URI', tokenURI)

                    const tokenDataResponse = await fetch(baseURI + token)
                    const tokenData = await tokenDataResponse.json()
                    console.log('Token data', tokenData)
                    if (tokenData) {
                        tokenDataList.push(tokenData)
                    }
                }
                console.log('got token data list', tokenDataList)
                setUserTokens(tokenDataList)
            } catch (error) {
                console.error(error)
            }
        }
        getTokenData()

    }, [])

    return (
        <Fragment>
            <ButtonAppBar />
            <Container align="center" justify="center" alignItems="center">

                <Grid container spacing={10}
                    style={{ padding: '24px' }}
                >
                    {
                        userTokens.map(tokenData =>

                            <Grid key={tokenData.name} item xs={12} sm={6} md={4} lg={4} xl={3}>
                                <PlantCard name={tokenData.name} description={tokenData.description} image={tokenData.image} />
                            </Grid>
                        )
                        // tileData.map(tile =>
                        //     <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                        //         <PlantCard />
                        //     </Grid>)
                    }
                </Grid>
            </Container>
        </Fragment>
    )
}