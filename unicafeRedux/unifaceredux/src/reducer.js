import { createStore } from 'redux'

const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  let nro = 0
  switch (action.type) {
    case 'GOOD':
      nro = state.good + 1
      const goodState = Object.assign({}, state, { good: nro })
      return goodState
    case 'OK':
      nro = state.ok + 1
      const okState = Object.assign({}, state, { ok: nro })
      return okState
    case 'BAD':
      nro = state.bad + 1
      const badState = Object.assign({}, state, { bad: nro })
      return badState
    case 'ZERO':
      state.bad = 0
      state.good = 0
      state.ok = 0
      return state
  }
  return state
}

export default counterReducer