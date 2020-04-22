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
      .then(res => this.setState({ countries: res.data }))
      .catch(err => console.log(err))
  }

  render() {
    return <section className="section">
      <div className="container">
        <div className="columns is-mobile is-multiline">
          {this.state.countries.map(country => {
            return <div key={country._id} className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={country.image} alt="Placeholder image" />
                  </figure>
                </div>
                <div className="card-content">
                  {country.name}
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
  }

}

export default AddLocation