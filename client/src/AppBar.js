import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Icon from '@material-ui/core/Icon'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'
import appLogo from './images/leaf.svg'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    logo: {
        maxHeight: 20,
        marginRight: 5
    }
}))

export default function ButtonAppBar () {
    const classes = useStyles()
    const history = useHistory()

    function navigate (route) {
        console.log('navigating to', route)
        history.push(route)
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" color="inherit">
                <Toolbar>
                    <img src={appLogo} alt="logo" className={classes.logo} />
                    <Typography variant="h6" className={classes.title}>
                        CryptoPlants
                    </Typography>
                    <Button color="inherit" onClick={() => navigate('/')}>My plants</Button>
                    <Button color="inherit" onClick={() => navigate('/buy')}>Purchase</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}
