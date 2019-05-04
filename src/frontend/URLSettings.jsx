import React from "react";
import PropTypes from "prop-types";
import checkboxes from "./checkboxesData";
import Checkbox from "./checkboxTemplate";
var ReactDOM = require("react-dom");
var urlArr = [];

class URLSettings extends React.Component {
  constructor(props) {
    super(props);
//Check For Local Storage of URLSettings. Create a New Map to Store Checkbox State if there isn't a LS.
    if (localStorage.getItem("rememberCheckStatus") === null) {
      var checkBoxState = new Map();
    } else {
      checkBoxState = new Map([
        ...new Map(),
        ...new Map(JSON.parse(localStorage.rememberCheckStatus))
      ]);
    }
    this.state = {
      checkedItems: checkBoxState
    };
    this.handleChange = this.handleChange.bind(this);
  }


  //Handle Checkbox Events
  handleChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    var index = urlArr.indexOf(e.target.value);

    this.setState(prevState => ({
      checkedItems: prevState.checkedItems.set(item, isChecked)
    }));
    localStorage.rememberCheckStatus = JSON.stringify(
      Array.from(this.state.checkedItems.entries())
    );
//If a Box is Selected We Need To Push Its URL to an Array and Push That Updated Array to LS
    if (isChecked) {
      urlArr.push(e.target.value);
      localStorage.setItem("urlArray", JSON.stringify(urlArr));
    }
//If a Box is Unselected We Need To Push Its URL to an Array and Push That Updated Array to LS
    else if (index > -1) {
      urlArr.splice(index, 1);
      localStorage.setItem("urlArray", JSON.stringify(urlArr));
    }
  }
  //Save Our URLs to Our Server
  save() {
    var urlArr = localStorage.getItem("urlArray");
    urlArr = { urlArr };
    fetch("/api/urls", {
      method: "PATCH",
       credentials: 'include',
      body: JSON.stringify(urlArr),
      headers: {
        "Content-Type": "application/json"

      }
    });

  }


  render() {
    return (

      <div>
  <body>
      <div id="urlSettingCheckboxes">
          {checkboxes.map(item => (
            <label key={item.key}>
              {item.name}
              <Checkbox
                name={item.name}
                checked={this.state.checkedItems.get(item.name)}
                onChange={this.handleChange}
                value={item.value}
              />
            </label>

          ))}
</div>
    <div>
        <br />

          <input
            id="button"
            type="button"
            value="Save URLSettings"
            onClick={(e) =>{ this.save();this.handleChange(e)}}
          />

  </div>
</body>
        </div>

    );
  }
}
export default URLSettings;
