import React, { Fragment } from 'react'
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
        // width: 500,
        // height: 450,
        // height: 800,
        textAlign: 'center'
    },
}))

export default function MyPlants ({ web3, cryptoPlantContract, account }) {
    const classes = useStyles()

    const tileData = [
        {
            img: 'https://material-ui.com/static/sponsors/doit-intl.png',
            title: 'Image',
            author: 'author',
            cols: 2,
        },
        {
            img: 'https://material-ui.com/static/sponsors/doit-intl.png',
            title: 'Image',
            author: 'author',
        },
        {
            img: 'https://material-ui.com/static/sponsors/doit-intl.png',
            title: 'Image',
            author: 'author',
        },
        {
            img: 'https://material-ui.com/static/sponsors/doit-intl.png',
            title: 'Image',
            author: 'author',
        },
        {
            img: 'https://material-ui.com/static/sponsors/doit-intl.png',
            title: 'Image',
            author: 'author',
        }
    ]

    return (
        <Fragment>
            <ButtonAppBar />
            <Container align="center" justify="center" alignItems="center">

                <Grid container spacing={10}
                    style={{ padding: '24px' }}
                >
                    {
                        tileData.map(tile =>
                            <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                                <PlantCard />
                            </Grid>)
                    }
                </Grid>
            </Container>
        </Fragment>
    )
}