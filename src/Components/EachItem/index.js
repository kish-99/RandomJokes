// Write your code here
import {useState} from 'react'
import './index.css'

const EachItem = props => {
  const {item} = props
  const capitalized = item.charAt(0).toUpperCase() + item.slice(1)
  const paragraph = 'Unlimited Jokes On '.concat(capitalized)

  const [isLoading, setIsLoading] = useState(false)
  const [currentjoke, upDateJoke] = useState('')

  const ontoggle = () => {
    setIsLoading(current => !current)
  }

  const getNewJoke = async () => {
    const url = 'https://api.chucknorris.io/jokes/random?category='.concat(item)
    const response = await fetch(url)
    const data = await response.json()
    if (!isLoading) {
      setIsLoading(current => !current)
    }
    const joke = data.value
    upDateJoke(joke)
  }

  console.log(isLoading)
  return (
    <>
      <button
        className={`cardItem ${isLoading && 'blur'}`}
        type="button"
        onClick={getNewJoke}
        disabled={isLoading}
      >
        <h1 className="cardTitle">{capitalized}</h1>
        <p className="cardDescription">{paragraph}</p>
      </button>
      {isLoading && (
        <div className="popup">
          <div className="popup-header">
            <h1 className="popup-title">{capitalized}</h1>
            <button type="button" className="popupbutton" onClick={ontoggle}>
              X
            </button>
          </div>
          {currentjoke === undefined ? (
            <div>
              <p>Loading...</p>
              {getNewJoke()}
            </div>
          ) : (
            <div className="popup-bottom">
              <h1 className="popup-joketext">{`" ${currentjoke} "`}</h1>
              <button
                type="button"
                onClick={getNewJoke}
                className="nextJokeBtn"
              >
                Next Joke
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default EachItem
