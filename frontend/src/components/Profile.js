import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'

class MyProfile extends React.Component {

  constructor() {
    super()
    this.state = {
      myProfile: []
    }
  }

  componentDidMount() {
    axios.get('/api/profile',
      { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => this.setState({ myProfile: res.data }))
      .catch(err => console.error(err))
    console.log(this.state.data)

  }

  render() {
    return <>
      <section className="section">
        <div className="container">
          <div className="columns is-multiline">
            {this.state.myProfile.map((profile) => {
              return <div className="weclomeUser" key={profile._id}>
                <h1>Welcome {profile.user}</h1>
              </div>
            })}
          </div>
        </div>
      </section>
    </>
  }



}

export default MyProfile

