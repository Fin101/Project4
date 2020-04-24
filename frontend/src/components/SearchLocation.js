import React from 'react'
import axios from 'axios'

class SearchLocation extends React.Component {

  constructor() {
    super()
    this.state = {
      countries: [],
      filteredCountries: []
      // selectedCountries: []
    }
  }

  componentDidMount() {
    axios.get('http://restcountries.eu/rest/v2/all')
      .then(res => {
        this.setState({ countries: res.data, filteredCountries: res.data })
      })
      .catch(err => console.log(err))
  }

  updateSearch(event) {
    const re = new RegExp(event.target.value, 'i')
    if (event.target.value === '') {
      this.setState({ filteredCountries: this.state.countries })
    } else {
      const newCountries = this.state.countries.filter((country) => {
        return re.test(country.name)
      })
      this.setState({ filteredCountries: newCountries })
    }

  }

  handleClick(event) {

    console.log(event.target)

    const filteredCountry = this.state.countries.filter(country => {
      return country.name === event.target.id
    })[0]
    console.log(filteredCountry)

    const countryObj = {
      name: filteredCountry.name,
      countryCode: filteredCountry.alpha3Code,
      lat: filteredCountry.latlng[0],
      long: filteredCountry.latlng[1]
    }

    console.log(countryObj)

  }

  render() {

    return <>
      <section className="hero is-medium is-primary is-bold">
        <div className="hero-body search-hero">
          <div className="container">
            <h1 className="title">
              Add Location
            </h1>
            <h2 className="subtitle">
              Your journey starts here
            </h2>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="field has-addons">
            <div className="control is-expanded">
              <input className="input"
                type="text"
                onChange={() => this.updateSearch(event)}
                placeholder="Find a repository"
              >
              </input>
            </div>
            <div className="control">
              <a className="button is-info">
                Search
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="columns is-mobile is-multiline">
            {this.state.filteredCountries.map((country, i) => {
              return <div key={i} className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img src={country.flag} alt="Placeholder image" />
                    </figure>
                  </div>
                  <div className="card-content">
                    <h1 className="subtitle">{country.name}</h1>
                    <p>
                      {country.alpha3Code}<br />
                            lat {country.latlng[0]}<br />
                            long {country.latlng[1]}
                    </p>
                    {/* <input
                      className="is-checkradio is-info"
                      id={country.name}
                      type="checkbox"
                      name={country.name}
                      value={country.name}
                      onChange={this.handleCheck}
                      // checked={console.log(country.name)}
                    >
                    </input> */}
                    <button className="button is-normal"
                      id={country.name}
                      onClick={(event) => this.handleClick(event)}
                    >
                      Add Location
                    </button>
                  </div>
                </div>
              </div>
            })}
          </div>
        </div>
      </section>

    </>
  }

}

export default SearchLocation