import HeaderMenu from '../HeaderMenu/HeaderMenu';
import style from './style.module.css';

export default function Header() {
  return (
    <header className={style.header}>
      <div className={style.logo}>
        LOGO
      </div>

      <HeaderMenu />
    </header>
  )
}