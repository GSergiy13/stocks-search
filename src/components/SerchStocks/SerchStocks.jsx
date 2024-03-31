import { useEffect, useRef, useState } from 'react';
import {useQuery} from 'react-query';
import stocksApi from '../../api/stocksApi.js';

import { filterStocks } from '../../helpers/filterStocks.js';

import style from './style.module.css';

export default function SerchStocks() {
  const { data } = useQuery("getStocks", () => stocksApi["getStocks"]());
  const [value, setValue] = useState('');
  const [stocks, setStocks] = useState([]);
  const [focus, setForus] = useState(false);

  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (!data) return;

    const filteredStocks = filterStocks(data, value);

    setStocks(filteredStocks);
  }, [data, value])

  const onBlurHendel = (e) => {
    setTimeout(() => {
      if(autocompleteRef.current && !autocompleteRef.current.contains(e.target)) {
        setForus(false)
      }

      console.log(autocompleteRef.current, e.target);
    }, 100)
  }


  return (
    <div className={style.searchBlock}>
      <input 
      className={style.input} 
      value={value} 
      onChange={(e) => setValue(e.target.value)} 
      onFocus={() => setForus(true)}
      onBlur={onBlurHendel}
      type="text" />

     { focus && stocks.length > 0 ? <ul className={style.autocomplete}>
        { stocks.map(stock => {
            return <li ref={autocompleteRef} onClick={() => console.log(stock.symbol)} className={style.item} key={stock.figi}>{stock.symbol}</li>
          }) 
        }
      </ul> : null}
    </div>
  )
}