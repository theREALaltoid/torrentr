import React from "react";
import PropTypes from "prop-types";
import checkboxes from "./checkboxesData";
import Checkbox from "./checkboxTemplate";
var ReactDOM = require("react-dom");
var urlArr = [];

export default class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      IPAddress : '',
      Twilionumber: '',
      phoneNumber:'',
      AuthID:'',
      authToken:''


    };
  }
  componentDidMount() {
    fetch('/api/settings')
    .then(response => response.json())

.then(user => {
    console.log(user.IPAddress);
this.setState({
    Twilionumber: user.Twilionumber,
    phoneNumber: user.phoneNumber,
    AuthID: user.AuthID,
    authToken: user.authToken


  })
});


  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    console.log(this.state);
    event.preventDefault();
    fetch('/api/settings', {
      method: 'PUT',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include'

      }
    })
  }


  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Enter Settings Below!</h1>
        <input
          type="Twilionumber"
          name="Twilionumber"
          placeholder="Enter Twilio Number"
          value={this.state.Twilionumber}
          onChange={this.handleInputChange}
          required
        />
        <br/>
          <br/>
        <input
          type="phoneNumber"
          name="phoneNumber"
          placeholder="Enter Phone Number"
          value={this.state.phoneNumber}
          onChange={this.handleInputChange}
          required
        />
        <br/>
          <br/>
        <input
          type="AuthID"
          name="AuthID"
          placeholder="Enter AuthID"
          value={this.state.AuthID}
          onChange={this.handleInputChange}
          required
        />
        <br/>
          <br/>
        <input
          type="authToken"
          name="authToken"
          placeholder="Enter authToken"
          value={this.state.authToken}
          onChange={this.handleInputChange}
          required
        />
        <br/>
          <br/>

        <input id="button" type="submit" value="Submit"/>
      </form>
    );
  }
}
