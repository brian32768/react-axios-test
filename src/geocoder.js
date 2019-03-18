import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from "axios"
import { Container, Row, Col } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

// We're querying the Nomiatim geocoder (OpenStreetMap) via Axios
// to find addresses in Clatsop county.

const geocodeServer = "https://nominatim.openstreetmap.org/search?format=json"

export default class Geocoder extends Component {
    // This component performs geocoding and renders the results.

    state = {
        results : [],
        center: []
    }
    static propTypes = {
        query: PropTypes.object.isRequired,
        onUpdateMap: PropTypes.func
    };

    geocode = (s) => {

        // Gather all the fields together into a query
        let q = '&addressdetails=1';
        for (let k in s) {
            let v = s[k]
            if (v.length) q += '&' + k + '=' + v;
        }
        if (!q) return;
        //console.log('q => ', q);

        axios.get(geocodeServer + q).then(
            response => {
                if (response.data.length) {
                    this.setState({
                        results: response.data
                    })
                    console.log("geocode() response: ", this.state.results);
                } else {
                    this.setState({
                        results: [{
                            place_id: "none",
                            importance: 0,
                            display_name: "No results for '" + s.street + "'."
                        }]
                    });
                }
            },
            error => {
                console.log(response.error.message + response.error.details);
                this.setState({
                    results: [{
                        place_id: "error",
                        importance: 0,
                        display_name: response.error.message
                    }]
                });
            }
        );
    }

    componentDidUpdate(oldProps) {
        if (oldProps.query != this.props.query) {
            console.log("Geocoder() componentDidUpdate", this.props);
            this.geocode(this.props.query);
            //this.props.onUpdateMap(this.state.center)
        }
    }

    componentWillUnmount() {
        console.log("Geocoder() We need to stop doing something here.");
    }

    render() {
        return (
            <Container>
                { this.state.results.map(gc =>
                    <Row key={ gc.place_id }><Col>{ Math.round(gc.importance*100) }:{ gc.display_name }</Col></Row>
                )}
            </Container>
        );
    }
}
