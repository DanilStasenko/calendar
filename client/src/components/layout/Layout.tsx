import { Outlet, useLocation } from "react-router-dom"

import Sidebar from "../sidebar/Sidebar"
import Header from "../header/Header"

import styles from "./Layout.module.scss"

const Layout = () => {
  const location = useLocation()

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.wrapper}>
        <Header hasGreetings={location.pathname === "/dashboard"} />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
