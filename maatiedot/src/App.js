import React, { Component } from 'react';
import './App.css';
import countryService from './services/countries'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      country: [],
      haku: ''
    }
  }
  componentWillMount() {

  }
  handleCountryChange = (event) => {
    // console.log(event.target.value)
    this.setState({ haku: event.target.value })
  }

  render() {

    const Maa = (name) => {
      if (name !== '') {
        countryService.findCountry(name).then(response => {
          console.log('response', response.data)
          if (Array.isArray(response.data)) {
            this.setState({
              country: response.data
            })
          }
        })
        if (this.state.country === undefined) {
          return ([])
        } else {
          return (this.state.country)
        }
      }
    }
    const maaLIsta = ({ maa }) => {
      return (
        <li>{maa.name}</li>
      )
    }
    return (
      <div>
        <form>
          <div>
            maa: <input value={this.state.haku}
              onChange={this.handleCountryChange} />
          </div>
          <div>
            <button type="submit">etsi</button>
          </div>
        </form>
        <div>
          {Maa(this.state.haku).map(maa =>
            <maaLIsta
              key={maa.name}
              maa={maa}
            />)}
        </div>
        <div>poo</div>
      </div>
    );
  }
}

export default App;
