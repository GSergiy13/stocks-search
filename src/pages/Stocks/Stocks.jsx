import { useState } from 'react'
import SerchStocks from '../../components/SerchStocks/SerchStocks'
import style from './style.module.css'
import StocksList from '../../components/StocksList/StocksList';

export default function Stocks() {
  const [favorites, setFavorites] = useState([]);

  const addSToFavorites = stoks => {
    const favoriteIs = favorites.find(item => item.figi === stoks.figi)
    if (favoriteIs) return null;

    // const storeg = localStorage.getItem('favorite');

    // if(storeg) {
    //   localStorage.setItem('favorite', JSON.stringify([stoks.symbol, ...JSON.stringify(storeg)]))
    // } else {
    //   localStorage.setItem('favorite', JSON.stringify([stoks.symbol]))
    // }

    setFavorites(prev => [...prev, stoks]);
  }

  const deleteFromFavorites = (symbol) => {
    const filterStocks = favorites.filter(favorite => favorite.symbol !== symbol);

    setFavorites(filterStocks);
  }

  return(
    <section className={style.main}>
      <h2>Stocks Found to:</h2>

      <SerchStocks addSToFavorites={addSToFavorites}/>

      <StocksList stocks={favorites}  deleteFromFavorites={deleteFromFavorites} />
    </section>
  )
}