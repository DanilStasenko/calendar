import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useAppSelector } from "../../app/hooks"
import { selectUser } from "../../app/features/auth/authSlice"

import Login from "../../components/login/Login"
import Register from "../../components/register/Register"

import logo from "../../assets/Logomark.png"

import styles from "./Auth.module.scss"

const AuthPage = () => {
  const [selected, setSelected] = useState<"login" | "register">("login")
  const navigate = useNavigate()
  const user = useAppSelector(selectUser)

  useEffect(() => {
    if (user) {
      navigate("/dashboard")
    }
  }, [user, navigate])

  return (
    <div className={styles.container}>
      <img src={logo} alt="logo" />
      {selected === "login" ? (
        <Login onSwitch={() => setSelected("register")} />
      ) : (
        <Register onSwitch={() => setSelected("login")} />
      )}
    </div>
  )
}

export default AuthPage
