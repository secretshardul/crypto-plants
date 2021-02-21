import React, { Fragment, useEffect, useState } from 'react'
import { utils } from "web3"
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import ButtonAppBar from "./AppBar"
import PlantCard from './components/PlantCard'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { getUserPlants, getMetadataFromCovalent, getMetadataFromWeb3 } from './getPlants'

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
                const networkId = await web3.eth.net.getId()
                const plantData = await getUserPlants(networkId, cryptoPlantContract, account)
                console.log('Got plant balance', plantData)
                setUserTokens(plantData)
            } catch (error) {
                console.error(error)
            }
        }
        getTokenData()
    }, [])

    return (
        <Fragment>
            <ButtonAppBar />
            <Container align="center" justify="center" >
                {
                    userTokens.length === 0
                        ? <div style={{marginTop: 300}}>Your garden is empty! Go purchase some plants</div>
                        : undefined
                }

                <Grid container spacing={10}
                    style={{ padding: '24px' }}
                >
                    {
                        userTokens.map(tokenData =>
                            <Grid key={tokenData.name} item xs={12} sm={6} md={4} lg={4} xl={3}>
                                <PlantCard name={tokenData.name} description={tokenData.description} image={tokenData.image} />
                            </Grid>
                        )
                    }
                </Grid>
            </Container>
        </Fragment>
    )
}
