import StocksItem from './StocksItem/StocksItem';
import style from './style.module.css'

const StocksList = ({stocks, deleteFromFavorites}) => {
  return (
    <ul className={style.list}>
      {
        stocks.map(stock => {
          return <StocksItem key={stock.symbol} stock={stock} deleteFromFavorites={deleteFromFavorites} /> 
        })
      }
    </ul>
  )
}

export default StocksList;