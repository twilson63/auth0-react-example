import React from 'react'
import fetch from 'isomorphic-fetch'

class Protected extends React.Component {
  constructor() {
    super()
    this.state = {
      items: []
    }
  }
  componentDidMount() {
    fetch('http://localhost:5000/authorized', {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('access_token')
      }
    })
      .then(res => res.json())
      .then(items => this.setState({ items }))
  }
  render() {
    const li = item => <li key={item.id}>{item.name}</li>
    return (
      <div>
        <h1>Protected Data</h1>
        <ul>{this.state.items.map(li)}</ul>
      </div>
    )
  }
}

export default Protected
