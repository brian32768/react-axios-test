import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from "axios"
import './App.css'

// We're querying the Nomiatim geocoder (OpenStreetMap) via Axios
// to find addresses in Clatsop county.

const geocodeServer = "https://nominatim.openstreetmap.org/search?format=json"
const defaultCounty = "Clatsop County"
const defaultState = "Oregon"
const defaultCountry = "US"

export class GeocodeInput extends Component {
    // This component renders a form for entering geocoding information.

    state = {
        street: '',
        city: '',
        county: defaultCounty,
        state: defaultState,
        postalcode: '',
        countrycodes: defaultCountry
    }

    static propTypes = {
        onInput: PropTypes.func.isRequired
    };

    onChange = (e) => {
        const {
            target: { value, name }
        } = e;
        console.log("onSelectionChange", name, value)
        this.setState({
            [ name ]: value
        });
        this.props.onInput(
            Object.assign(this.state, {[name]: value}),
            false
        )
        e.preventDefault();
    }

    onFormSubmit = (e) => {
        console.log("onFormSubmit", e.target)
        this.props.onInput(
            this.state,
            true
        )
        e.preventDefault();
    }

    render() {
        // Using "value = " here turns these into "controlled components" which means
        // I have to handle the data myself including the onChange handlers
        return (
            <>
            <form onSubmit={ this.onFormSubmit }>
                <input name="street" type="text" value={ this.state.street } placeholder='Address' onChange={ this.onChange } />

                <select name="city" value={ this.state.city } onChange={ this.onChange } >
                <option value="">city</option>
                <option value="Arch Cape">Arch Cape</option>
                <option value="Astoria">Astoria</option>
                <option value="Cannon Beach">Cannon Beach</option>
                <option value="Gearhart">Gearhart</option>
                <option value="Hammond">Hammond</option>
                <option value="Jeffers Garden">Jeffers Garden</option>
                <option value="Jewell">Jewell</option>
                <option value="Miles Crossing">Miles Crossing</option>
                <option value="Seaside">Seaside</option>
                <option value="Warrenton">Warrenton</option>
                </select>

                <select name="postalcode" value={ this.state.postalcode } onChange={ this.onChange } >
                <option value="">zip code</option>
                <option value="97102">97102</option>
                <option value="97103">97103</option>
                <option value="97110">97110</option>
                <option value="97121">97121</option>
                <option value="97138">97138</option>
                <option value="97146">97146</option>
                </select>

                <input type="submit" value="?"/>
            </form>
            </>
        );
    }
}

export class Geocoder extends Component {
    // This component performs geocoding and renders the results.

    state = {
        results : []
    }
    static propTypes = {
        query: PropTypes.object.isRequired
    };

    geocode = (s) => {

        // Gather all the fields together into a query
        let q = '';
        for (let k in s) {
            let v = s[k]
            if (v.length) q += '&' + k + '=' + v;
        }
        if (!q) return;
        //console.log('q => ', q);

        axios.get(geocodeServer + q).then(
            response => {
                if (response.data.length) {
                    this.setState({ results: response.data })
                    //console.log("Response: ", response.data);
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
            console.log("geocoder did update", oldProps, this.props);
            this.geocode(this.props.query);
        }
    }

    render() {
        return (
            <table border="1"><tbody>
                <tr><th>score</th><th>name</th></tr>
                { this.state.results.map(gc =>
                    <tr key={ gc.place_id }><td>{ Math.round(gc.importance*100) }</td><td>{ gc.display_name }</td></tr>
                )}
            </tbody>
            </table>
        );
    }
}
