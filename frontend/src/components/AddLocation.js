import React from 'react'
import axios from 'axios'
// import auth from '../lib/auth'
// import { Link } from 'react-router-dom'

class AddLocation extends React.Component {

  constructor() {
    super()
    this.state = {
      countries: []
    }
  }

  componentDidMount() {
    axios.get('http://restcountries.eu/rest/v2/all')
      .then(res => {
        this.setState({ countries: res.data })
        console.log(res.data)
      })
      .catch(err => console.log(err))
  }

  render() {
    return <>
      <section className="hero is-medium is-primary is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              Add Location
            </h1>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="field has-addons">
            <div className="control is-expanded">
              <input className="input" type="text" placeholder="Find a repository">
              </input>
            </div>
            <div className="control">
              <a className="button is-info">
                Search
              </a>
            </div>
          </div>
        </div>
        
        <section className="section">
          <div className="container">
            <div className="columns is-mobile is-multiline">
              {this.state.countries.map(country => {
                return <div key={country._id} className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
                  <div className="card">
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img src={country.flag} alt="Placeholder image" />
                      </figure>
                    </div>
                    <div className="card-content">
                      <h1 className="subtitle">{country.name}</h1>
                      <p className="">
                        {country.alpha3Code}<br />
                    lat {country.latlng[0]}<br />
                    long {country.latlng[1]}
                      </p>
                      <button className="button is-normal">
                        Add Location
                      </button>
                    </div>
                  </div>
                </div>
              })}
            </div>
          </div>
        </section>

      </section>
    </>
  }

}

export default AddLocation