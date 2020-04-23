import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'
import { Link } from 'react-router-dom'

class MyProfile extends React.Component {

  constructor() {
    super()
    this.state = {
      myProfile: {}
    }
  }

  componentDidMount() {
    axios.get('/api/profile',
      { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        this.setState({ myProfile: res.data })
        console.log(res.data)
      })
      .catch(err => console.error(err))

  }

  render() {
    return <>
      <section className="hero is-medium is-primary is-bold">
        <div className="hero-body profile-hero">
          <div className="container">
            <h1 className="title">
              Welcome {this.state.myProfile.username}
            </h1>
            <h2 className="subtitle">
              Your journey starts here
            </h2>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <button className="button is-normal">
            <Link to={'/searchlocation'}>
              Add Location
            </Link>
          </button>
        </div>
      </section>
    </>
  }

}

export default MyProfile

