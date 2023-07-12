import {Component} from 'react'
import EachItem from '../EachItem'
import './index.css'

class Home extends Component {
  state = {
    categories: [],
  }

  componentDidMount() {
    this.getCategories()
  }

  getCategories = async () => {
    const response = await fetch('https://api.chucknorris.io/jokes/categories')
    const data = await response.json()
    this.setState({
      categories: data,
    })
  }

  render() {
    const {categories} = this.state
    return (
      <div className="background_container">
        <h1 className="title">Chuck Norries</h1>
        <div className="cardsContainer">
          {categories.map(each => (
            <EachItem key={each} item={each} />
          ))}
        </div>
      </div>
    )
  }
}

export default Home
