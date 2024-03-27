import { NavLink } from 'react-router-dom';
import style from './style.module.css';

export default function HeaderMenu() {
  return (
      <nav>
        <ul className={style.nav}>
          <NavLink className={({isActive}) => isActive ? style.active : null} to='/'>
            Main
          </NavLink>
          <NavLink className={({isActive}) => isActive ? style.active : null}  to='/stocks'>
            Stocks
          </NavLink> 
        </ul>
      </nav>
  )
}