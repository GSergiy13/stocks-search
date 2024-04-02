import { useEffect, useRef, useState } from 'react';
import {useQuery} from 'react-query';
import stocksApi from '../../api/stocksApi.js';

import { filterStocks } from '../../helpers/filterStocks.js';

import style from './style.module.css';

export default function SerchStocks({addSToFavorites}) {
  const { data } = useQuery("getStocks", () => stocksApi["getStocks"]());
  const [value, setValue] = useState('');
  const [stocks, setStocks] = useState([]);
  const [focus, setFocus] = useState(false);

  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (!data) return;

    const filteredStocks = filterStocks(data, value);

    setStocks(filteredStocks);
  }, [data, value])

  const onBlurHandler = (e) => {
    setTimeout(() => {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(e.target)
      ) {
        setFocus(false);
      }
    }, 100);
  };


  const selectStock = (stock) => {
    setValue(stock.description)
    addSToFavorites(stock)
  }



  return (
    <div className={style.searchBlock}>
      <div className={style.inputContainer}>
        <input 
        className={style.input} 
        value={value} 
        onChange={(e) => setValue(e.target.value)} 
        onFocus={() => setFocus(true)}
        onBlur={onBlurHandler}
        type="text" />

        <span onClick={() => setValue('')}>
          x
        </span>
      </div>

     { focus && stocks.length ? <ul ref={autocompleteRef} className={style.autocomplete}>
        { stocks.map(stock => {
            return <li onClick={() => selectStock(stock)} className={style.item} key={stock.figi}>{stock.symbol}</li>
          }) 
        }
      </ul> : null}
    </div>
  )
}