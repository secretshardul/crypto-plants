import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 300,
    },
    purchaseButton: {
        paddingLeft: 40,
        paddingRight: 40
    }
})

export default function CharityCard ({
    name, image, description, purchaseHandler, subscribeHandler, comingSoon = false
}) {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={image}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions align="center" justify="center">
                <Container align="center" justify="center">
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={comingSoon}
                        startIcon={<ShoppingCartIcon />}
                        onClick={purchaseHandler}
                        className={classes.purchaseButton}
                    >
                        Donate
                    </Button>
                </Container>

            </CardActions>
        </Card>
    )
}