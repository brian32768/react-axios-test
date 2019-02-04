import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GeocodeInput from './geocodeform'
import Geocoder from './geocoder'
import { transform } from 'ol/proj'
import { createStore } from 'redux'
import { Container, Row, Col,
         Button } from 'reactstrap'
import { Map, View, Feature,
         control, geom, interaction, layer, VERSION } from '@map46/ol-react'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'


import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const wgs84 = "EPSG:4326";
const wm = "EPSG:3857";
const astoria_wm = transform([-123.834,46.187], wgs84,wm)
let transformfn = (coordinates) => {
    for (let i = 0; i < coordinates.length; i+=2) {
        coordinates[i]   += astoria_wm[0];
        coordinates[i+1] += astoria_wm[1];
    }
    return coordinates
}
const rootReducer = combineReducers({
  // ...your other reducers here
  // you have to pass formReducer under 'form' key,
  // for custom keys look up the docs for 'getFormState'
  form: formReducer
})
let store = createStore(rootReducer);

class App extends Component {
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
            center: [0,0],
            zoom: 10
        });
    }

    componentDidUpdate() {
        console.log("state now", this.state);
    }

    render() {
        //  currently this draws a blue 5 pointed star
        const pointMarker = {
            image: {
                type: 'regularShape',
                points: 5,
                radius: 5,
                radius1: 5,
                radius2: 2,
                stroke: { color: 'blue', width: 1.5 }
            }
        }
        const pointStyle = {
            image: {
                type: 'circle',
                radius: 4,
                fill: { color: [100,100,100, 0.5] },
                stroke: { color: 'green', width: 1 }
            }
        };

        return (
            <Container>
            <Row>
                <Col>
                    <h1 id="title">react-axios-test</h1>
                </Col>
            </Row>
            <Row>
                <Col sm={8}>
                    Fill in any or all fields.
                    I will show the top 10 results sorted by score.
                    <GeocodeInput onInput={ this.handleInput } />

                    <button onClick={this.handleUpdateMap}>update</button>
                    <Map useDefaultControls={true}
                        view=<View zoom={ this.state.zoom } center={ this.state.center }/>
                    >
                        <layer.Tile name="OpenStreetMap" source="OSM"/>

                        <layer.Vector style={ pointMarker }>

                        <Feature id="test-point" style={ pointStyle }>
                            <geom.Point transform={ transformfn } modify={ this.state.enableModify } >
                                {[1835, -910]}
                            </geom.Point>
                        </Feature>
                        </layer.Vector>

                    </Map>
                </Col>

                <Col sm={4}>
                    Geocode results
                    <Geocoder query={ this.state } onUpdateMap={ this.handleUpdateMap } />
                </Col>

              </Row>
            </Container>
        );
    }
}

export default App;
