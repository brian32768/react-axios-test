import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './App.css'

import axios from "axios"

class GeocodeInput extends Component {
    state = {
        value: '',
        sval:  ''
    }
    static propTypes = {
        onInput: PropTypes.func.isRequired
    };

    onTextChange = (e) => {
        this.setState({value: e.target.value});
        console.log("onTextChange", e.target.value)
        console.log("state=",this.state)
        this.props.onInput({
                street: this.state.value,
                city: '',
                county: 'Clatsop County',
                state: 'Oregon',
                postalcode: '',
                countrycodes: 'US'
            }, false)

        return true;
    }

    onTextSubmit = (e) => {
        if (e.key == 'Enter') {
            console.log("onTextSubmit", this.state);
            this.props.onInput({
                    street: this.state.value,
                    city: '',
                    county: 'Clatsop County',
                    state: 'Oregon',
                    postalcode: '',
                    countrycodes: 'US'
                }, true)
            return true; // key handled!
        }
        return false;
    }

    componentDidUpdate(oldProps) {
        console.log("GeocodeInput.componentDidUpdate", this.state)
    }

    render() {
        return (
            <form onSubmit={ this.onTextSubmit }>
                <select value={ this.state.sval }>
                    <option value="Banana">Nanner</option>
                </select>
                <input name="street" type="text" value={ this.state.value } placeholder='Address' onChange={ this.onTextChange } />
                <input type="submit" value="?"/>
            </form>
        );
    }
}

class Geocoder extends Component {
    state = {
        geocodeResults: []
    }
    static propTypes = {
        query: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("geocoder did mount", this.props);
    }

    componentDidUpdate(oldProps) {
        console.log("geocoder did update");
        if (oldProps.query != this.props.query) {
            this.geocode(this.props.query);
        }
    }

    geocode = (s) => {
        const geocodeServer = "https://nominatim.openstreetmap.org/search?format=json"

        // Gather all the fields together into a query
        let q = '';
        for (let k in s) {
            let v = s[k]
            if (v.length) q += '&' + k + '=' + v;
        }
        if (!q) return;
        console.log('q => ', q);

        axios.get(geocodeServer + q).then(
            response => {
                if (response.data.length) {
                    this.setState({ geocodeResults: response.data })
                    console.log("Response: ", response.data);
                } else {
                    this.setState({
                        geocodeResults: [{
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
                    geocodeResults: [{
                        place_id: "error",
                        importance: 0,
                        display_name: response.error.message
                    }]
                });
            }
        );
    }

    render() {
        return (
            <table border="1"><tbody>
                <tr><th>score</th><th>name</th></tr>
                { this.state.geocodeResults.map(gc =>
                    <tr key={ gc.place_id }><td>{ Math.round(gc.importance*100) }</td><td>{ gc.display_name }</td></tr>
                )}
            </tbody>
            </table>
        );
    }
}

class PrimaryLayout extends Component {
    state = {}

    handleInput = (evt, done) => {
        console.log("handleInput", evt, done);

        // Unpack EVERYTHING we get from the form into our state!
        // It will get sent to the geocoder component
        // We don't have to know what's inside it!

        this.setState(Object.assign({}, evt));
        return true;
    }

    render() {
        return (
            <>
                <h1>Axios test</h1>

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
