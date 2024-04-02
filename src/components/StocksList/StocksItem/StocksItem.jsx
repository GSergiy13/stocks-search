import { useQuery } from 'react-query';
import stockApi from '../../../api/stocksApi';
import style from './style.module.css';

const featchStock = async (symbol) => {
  const getPrice = await stockApi['getPrice'](symbol);
  const getProfile = await stockApi['getProfile'](symbol);

  return {
    ...(getProfile?.data || {}),
    price: getPrice?.data.c
  }
}

const StocksItem = ({stock, deleteFromFavorites}) => {
  const { data } = useQuery(`getStock/${stock.symbol}`, () => featchStock(stock.symbol));

  console.log(data);

  return <li className={style.item}>
    {data ? 
      <div className={style.info}>
        { data.logo ? <img className={style.logo} src={data.logo} alt={data.name}/> : <div className={style.logo}></div>}
        <div style={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
          <p>{data.name}</p>
          <p>{data.ticker}</p>
          <p>{data.price} {data.currency}</p>
        </div>
      </div>      
    : <div>..loading</div>}
    <p>
    {stock.description}
    </p>
    <p className={style.deleteButton}
       onClick={() => deleteFromFavorites(stock.symbol)} 
        >
      delete
    </p>
  </li>
}


export default StocksItem;