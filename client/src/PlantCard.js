import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 200,
    },
})

export default function PlantCard () {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Pescia%2C_museo_del_bonsai%2C_punica_granatum%2C_stile_moyogi_%28eretto_informale%29%2C_con_frutti.jpg/527px-Pescia%2C_museo_del_bonsai%2C_punica_granatum%2C_stile_moyogi_%28eretto_informale%29%2C_con_frutti.jpg"
                    title="Plant"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Plant
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Offsets 80kg CO2 per year
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions >
                <Button size="small" color="primary">
                    Share
                </Button>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    )
}