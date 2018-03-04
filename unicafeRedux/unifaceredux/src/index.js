import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const Statistiikka = () => {
  const palautteita = store.getState().good + store.getState().bad + store.getState().ok

  const positiiviset = store.getState().good / (store.getState().bad + store.getState().ok + store.getState().good) * 100
  const keskiarvo = (store.getState().good - store.getState().bad) / (store.getState().bad + store.getState().ok + store.getState().good)

  if (palautteita === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{store.getState().good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{store.getState().ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{store.getState().bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{keskiarvo}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positiiviset}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={e => store.dispatch({type: 'ZERO'})}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = (nappi) => () => {
    if (nappi === 'GOOD') {
      store.dispatch({ type: 'GOOD' })
      console.log(store.getState().good)
    } else if (nappi === 'OK') {
      store.dispatch({ type: 'OK' })
    } else if (nappi === 'BAD') {
      store.dispatch({ type: 'BAD' })
    }
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}
const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

render()
store.subscribe(render)