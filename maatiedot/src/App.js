import React, { Component } from 'react';
import './App.css';
import countryService from './services/countries'
import img from 'react-image'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      country: [],
      haku: '',
      data: [],
      placeholder_liikaa: [{
        name: 'lista on liian pitkä. kirjoita lisää'
      }, {name: ''}],
      placeholder_nolla: [{
        name: 'WE WENT TOO FAR'
      }, {name: ''}]
    }
  }
  componentWillMount() {
    countryService
      .getAll()
      .then(response => {
        this.setState({ data: response.data })
      })
  }
  handleCountryChange = (event) => {
    //  console.log('typed ', event.target.value)
    this.setState({ haku: event.target.value })
  }

  Maahaku = () => {
    let search = this.maahakuLogiikka()
    // return (this.setCountry(search))
    // console.log('final ', this.state.country)
    // if (this.state.country.length > 1) {
    //   return this.state.country
    // }
    // console.log('eka ', search[0])
    if (search.length > 10) {
      return this.state.placeholder_liikaa

    }
    if (search.length < 1) {
      return this.state.placeholder_nolla

    }
    if (search.length < 10) {
      return search
    }
    return search
  }

  /*   setCountry = (search) => {
      console.log('setting ', search)
      return () => {
        this.setState({
          country: search
        })
      }
      console.log(this.state.country)
      if (search.length > 10) {
        return () => {
          this.setState({
            country: this.state.placeholder_liikaa
          })
        }
      }
      if (search.length < 1) {
        return () => {
          this.setState({
            country: this.state.placeholder_nolla
          })
        }
  
      }
      if (search.length < 10) {
        return () => {
          this.setState({
            country: search
          })
        }
      }
  
    } */

  countryInfo = (country) => {

  }

  maahakuLogiikka() {
    let search = this.state.country;
    if (this.state.data !== '') {
      search = this.state.data.filter(n => n.name.toLowerCase().match(this.state.haku.toLowerCase()));
    }
    //console.log('hakuehto', search);
    //this.setCountry(search)
    return (search)
  }

  render() {


    const MaaLista = ({ maa }) => {
      return (
        <ul>{maa.name}</ul>
      )
    }
    const MaaTiedot = ({ maa }) => {

      return (
        <div>
          <h2>{maa.name} </h2>
          <ul>Populaatio {maa.population}</ul>
          <ul>Pääkaupunki {maa.capital}</ul>
          <img
          src={maa.flag}
          alt="IÄ IÄ SHUB-NIGGURATH" />
        </div>
      )
    }

    console.log('maahaku ', this.Maahaku()[0].name)
    console.log('placeholderi', this.state.placeholder_liikaa)
    if (this.Maahaku().length !== 1) {
      return (
        <div>
          <h1>Maantietoa</h1>
          <form>
            <div>
              maa: <input value={this.state.haku}
                onChange={this.handleCountryChange} />
            </div>
          </form>
          <div>
            {this.Maahaku().map(maa =>
              <MaaLista
                key={maa.name}
                maa={maa}
              />
            )
            }
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Maantietoa</h1>
          <form>
            <div>
              maa: <input value={this.state.haku}
                onChange={this.handleCountryChange} />
            </div>
          </form>
          <div>
            {this.Maahaku().map(maa =>
              <MaaTiedot
                key={maa.name}
                maa={maa}
              />
            )
            }
          </div>
        </div>
      );
    }
  }
}

export default App;
