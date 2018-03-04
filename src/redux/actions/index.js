import {API_URL} from '../../config';
import { UPDATE_COINS } from '../types';

export const fetchCoins = (searchTerm) => {
  return (dispatch) => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (searchTerm) {
          return data.filter((coin) => {
            return coin.id.match(new RegExp(searchTerm, "i")) ||
                   coin.name.match(new RegExp(searchTerm, "i")) ||
                   coin.symbol.match(new RegExp(searchTerm, "i"));
          });
        }
        return data;
      })
      .then((data) => {
        dispatch({type: UPDATE_COINS, payload: data})
      })
  };
};
