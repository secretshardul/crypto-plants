import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import PersonIcon from '@material-ui/icons/Person'
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'
import { blue } from '@material-ui/core/colors'

const emails = ['username@gmail.com', 'user02@gmail.com']
const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
})

export default function PurchaseDialog ({open, setDialogState, handlePurchase, handleSubscribe}) {
    const classes = useStyles()

    return (
        <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={() => setDialogState(false)}>
            <DialogTitle id="simple-dialog-title">Support this charity</DialogTitle>
            <List>
                <ListItem button onClick={handlePurchase}>
                    <ListItemText primary="Purchase plant: $5" />
                </ListItem>
                <ListItem button onClick={handleSubscribe}>
                    <ListItemText primary="Subscribe: $50 yearly" />
                </ListItem>
            </List>
        </Dialog>
    )
}
