import React,{Fragment} from 'react'
import {Switch,Route} from 'react-router-dom'
import HomePage from './HomePage'
import Categories from '../views/categories/Categories'



const DisplayContents = () => {
    return (
        <Fragment>
 {/* Will contain all pages  eg financial, members, cell  etc */}
            <Switch>
                <Route exact path="/"  component={HomePage} />
                <Route exact path="/categories"  component={Categories} />
            </Switch>
        </Fragment>
    )
}

export default DisplayContents
