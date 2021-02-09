import React, { Fragment } from 'react'
import { utils } from "web3"

import ButtonAppBar from "./AppBar"

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
            <button onClick={purchaseSeed}>Purchase</button>
        </Fragment>
    )
}