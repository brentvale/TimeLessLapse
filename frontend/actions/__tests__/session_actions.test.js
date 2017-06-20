import * as actions from '../session_actions.js'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect from 'expect'

describe('actions', () => {
  it('should create an action to receive current user', () => {
    const currentUser = {id: 1, name: "Brent Vale"}
    const expectedAction = {
      type: actions.RECEIVE_CURRENT_USER,
      currentUser
    }
    expect(actions.receiveCurrentUser(currentUser)).toEqual(expectedAction)
  })
})

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates RECEIVE_CURRENT_USER when fetching current user has been done', () => {
    nock('http://example.com/')
      .get('/users/current_user')
      .reply(200, { body: { current_user: {id: 1, name: "Brent Vale"} }})

    const expectedActions = [
      { type: actions.FETCH_CURRENT_USER_REQUEST },
      { type: actions.FETCH_CURRENT_USER_REQUEST, body: { current_user: {id: 1, name: "Brent Vale"} } }
    ]
    const store = mockStore({ current_user: {} })

    return store.dispatch(actions.fetchCurrentUser())
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})