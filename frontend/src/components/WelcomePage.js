import React from 'react'
import { Link } from 'react-router-dom'

const WelcomePage = () => {
  return <>
  <section className="welcome-page-hero hero is-fullheight">
    <div className="hero-body">
      <div className="container has-text-centered">
        <h1 className="title has-text-centered homepage-text">
          Travel Log<small>™</small>
        </h1>
        <button className="button is-normal">
          <Link to={'/login'}>
            {'Login'}
          </Link>
        </button>
        <button className="button is-normal">
          <Link to={'/register'}>
            {'Register'}
          </Link>
        </button>
      </div>
    </div>
  </section>
  </>
}

export default WelcomePage