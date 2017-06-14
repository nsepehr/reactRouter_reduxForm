import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function(state={}, action) {
  switch (action.type) {
    case FETCH_POST:
    /* this is the old ES5 way of doing things
      const post = action.payload.data;
      const newState = { ...state };
      newState[post.id] = post;
      return newState;
    */
    // New ES6 format of the same code above
    return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id');
      // Check this playground JS site
      // https://stephengrider.github.io/JSPlaygrounds/
    case DELETE_POST:
      // omit looks at the state object and if it has the argument passed to it, it will
      // remove that key from object. And it returns a new object 
      return _.omit(state, action.payload);
    default:
      return state
  }
}
