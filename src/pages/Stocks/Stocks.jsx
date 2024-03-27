import SerchStocks from '../../components/SerchStocks/SerchStocks'
import style from './style.module.css'

export default function Stocks() {
  return(
    <section className={style.main}>
      <h2>Stocks Found to:</h2>

      <SerchStocks />
    </section>
  )
}