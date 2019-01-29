import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GeocodeInput, Geocoder } from './geocoder'
import { transform } from 'ol/proj'
import { Map, View, Feature, control, geom, interaction, layer, VERSION } from '@map46/ol-react'

import './App.css'

const wgs84 = "EPSG:4326";
const wm = "EPSG:3857";

export default class App extends Component {
    state = {
        center: transform([-124,46], wgs84,wm),
        zoom: 9,
    }

    handleInput = (e, updateMap) => {
    /*    const {
            target: {}
        } = e;
*/
        console.log("handleInput", e, updateMap);

        // Unpack EVERYTHING we get from the form into our state!
        // It will get sent to the geocoder component
        // unchanged; we don't have to know what's inside it!

        this.setState(Object.assign({}, e));

        return true;
    }

    handleUpdateMap = (e) => {
        console.log("Updating map", e);
        this.setState({
            zoom: 10,
            center: [0,0]
        });

    }

    render() {
        return (
            <>
                <h1>Axios Geocoding test</h1>

                Fill in any or all fields.
                I will show the top 10 results sorted by score.

                <GeocodeInput onInput={ this.handleInput } />

                <Map view=<View zoom={ this.state.zoom } center={ this.state.center }/>
                    useDefaultControls={true}>

                    <Geocoder query={ this.state } onUpdateMap={ this.handleUpdateMap } />

                    <layer.Tile name="OpenStreetMap"
                        source="OSM"
                    />
                </Map>
            </>
        );
    }
}
