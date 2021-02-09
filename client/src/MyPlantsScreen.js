import React, { Fragment } from 'react'
import { utils } from "web3"

import ButtonAppBar from "./AppBar"

export default function MyPlants ({ web3, cryptoPlantContract, account }) {
    return (
        <Fragment>
            <ButtonAppBar />
            <div> Plant</div>
        </Fragment>
    )
}