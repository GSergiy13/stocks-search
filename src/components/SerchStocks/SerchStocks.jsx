import { useEffect, useState } from 'react';
import {useQuery} from 'react-query';
import stocksApi from '../../api/stocksApi.js';

import style from './style.module.css';

export default function SerchStocks() {
  const { data } = useQuery("getStocks", () => stocksApi["getStocks"]());
  const [value, setValue] = useState('');
  const [stocks, setStocks] = useState([])

  useEffect(() => {
    if (!data) return;

      const filteredStocks = data.filter(stock => {

        return stock.description.toLowerCase().includes(value.toLocaleLowerCase())
      }).slice(0, 9)

      setStocks(filteredStocks)
  }, [data, value])


  return (
    <div className={style.searchBlock}>
      <input 
      className={style.input} 
      value={value} 
      onChange={(e) => setValue(e.target.value)} 
      type="text" />

      <ul className={style.autocomplete}>
        { stocks.map(stock => {
            return <li className={style.item} key={stock.figi}>{stock.symbol}</li>
          })
        }
      </ul>
    </div>
  )
}