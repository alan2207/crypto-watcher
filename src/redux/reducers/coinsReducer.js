import {UPDATE_COINS} from '../types';

export default function(state = [{id: 'coin_default'}], action) {
  switch(action.type) {
    case UPDATE_COINS:
      return action.payload;

    default:
      return state;
  }
}
