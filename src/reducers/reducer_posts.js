import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST } from '../actions';

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
    default:
      return state
  }
}
