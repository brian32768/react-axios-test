import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GeocodeInput, Geocoder } from './geocoder'
import './App.css'

class PrimaryLayout extends Component {
    state = {}

    handleInput = (evt, done) => {
        //console.log("handleInput", evt, done);

        // Unpack EVERYTHING we get from the form into our state!
        // It will get sent to the geocoder component
        // unchanged; we don't have to know what's inside it!

        this.setState(Object.assign({}, evt));
        return true;
    }

    render() {
        return (
            <>
                <h1>Axios Geocoding test</h1>

                Fill in any or all fields.
                I will show the top 10 results sorted by score.

                <GeocodeInput onInput={ this.handleInput } />
                <Geocoder query={ this.state } />
            </>
        );
    }
}

const App = () => (
    <PrimaryLayout/>
)
export default App;
