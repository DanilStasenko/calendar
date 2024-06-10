import Button from "../ui/button"

import { NavLink, useLocation } from "react-router-dom"

import logo from "../../assets/logo.png"
import gift from "../../assets/gift.png"
import homeIcon from "../../assets/sidebar-icons/Home.svg"
import scheduleIcon from "../../assets/sidebar-icons/Schedule.svg"
import walletIcon from "../../assets/sidebar-icons/Wallet.svg"
import cupIcon from "../../assets/sidebar-icons/Cup.svg"
import puzzleIcon from "../../assets/sidebar-icons/puzzle.svg"
import folderIcon from "../../assets/sidebar-icons/folder-open.svg"
import supportIcon from "../../assets/sidebar-icons/support.svg"
import settingsIcon from "../../assets/sidebar-icons/Settings.svg"
import questionIcon from "../../assets/sidebar-icons/question.svg"

import styles from "./Sidebar.module.scss"

const sidebarList = [
  {
    icon: homeIcon,
    text: "Главная",
    path: "/dashboard",
  },
  {
    icon: scheduleIcon,
    text: "Расписание",
    path: "/calendar",
  },
  {
    icon: walletIcon,
    text: "Оплата",
    path: "/404",
  },
  {
    icon: cupIcon,
    text: "Достижения",
    path: "/404",
  },
  {
    icon: puzzleIcon,
    text: "Тренажеры",
    path: "/404",
  },
  {
    icon: folderIcon,
    text: "Библиотека",
    path: "/404",
  },
  {
    icon: supportIcon,
    text: "Проверка связи",
    path: "/404",
  },
  {
    icon: settingsIcon,
    text: "Настройки",
    path: "/404",
  },
  {
    icon: questionIcon,
    text: "Вопросы",
    path: "/404",
  },
]

const Sidebar = () => {
  const location = useLocation()
  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <aside className={styles.sidebar}>
      <img src={logo} alt="logo" className={styles.logo} />
      <nav className={styles.nav}>
        <ul>
          {sidebarList.map(item => (
            <NavLink to={item.path} key={item.text}>
              <li className={isActive(item.path) ? styles.active : ""}>
                <img src={item.icon} alt={item.text} />
                <span>{item.text}</span>
              </li>
            </NavLink>
          ))}
        </ul>
      </nav>
      <div className={styles.referral}>
        <p className={styles.referral__title}>Учитесь бесплатно</p>
        <p className={styles.referral__text}>
          Приводите друзей с детьми заниматься в Sirius Future и получайте
          подарки!
        </p>
        <Button size="S" color="blue">
          Узнать
        </Button>
        <img src={gift} alt="gift" />
      </div>
    </aside>
  )
}

export default Sidebar
