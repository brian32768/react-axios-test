import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Field, reduxForm} from 'redux-form'

// This is the form to gather input on geocoding.

const defaultCounty = "Clatsop County"
const defaultState = "Oregon"
const defaultCountry = "US"

GeocodeInput = props => {
    // This component renders a form for entering geocoding information.

    const onChange = (e) => {
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
    const onFormSubmit = (e) => {
        console.log("onFormSubmit", e.target)
        this.props.onInput(
            this.state,
            true
        )
        e.preventDefault();
    }

    return (
        <>
        <form onSubmit={ this.onFormSubmit }>
            <label htmlFor="street" component="input" type="text">Street</label>
            <Field name="street" type="text" value={ this.state.street } placeholder='Address' onChange={ this.onChange } />

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

GeocodeInput = reduxForm({
    form: 'geocodeinput',
})(GeocodeInput)

export default GeocodeInput
