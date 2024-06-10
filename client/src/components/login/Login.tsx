import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import type { UserData } from "../../app/services/auth"
import { useLoginMutation } from "../../app/services/auth"

import { Checkbox, Form, Input } from "antd"
import CustomButton from "../ui/button"

import { isErrorWithMessage } from "../../utils/isErrorWithMsg"

import styles from "./Login.module.scss"

type Props = {
  onSwitch: () => void
}

const Login: React.FC<Props> = ({ onSwitch }) => {
  const navigate = useNavigate()
  const [loginUser] = useLoginMutation()
  const [error, setError] = useState<string>("")

  const onLogin = async (data: UserData) => {
    try {
      await loginUser(data).unwrap()
      setError("")
      navigate("/dashboard")
    } catch (err) {
      const maybeError = isErrorWithMessage(err)
      maybeError ? setError(err.data.message) : setError("Unknown error")
      console.error(err)
    }
  }

  return (
    <div className={styles.container}>
      <p className={styles.title}>Вход в Sirius Future</p>
      <Form onFinish={onLogin} className={styles.form}>
        <Form.Item
          name={"email"}
          rules={[{ required: true, message: "Обязательное поле" }]}
          style={{ margin: 0, padding: 0 }}
        >
          <Input className={styles.email} placeholder="E-mail" />
        </Form.Item>
        <Form.Item
          name={"password"}
          rules={[{ required: true, message: "Обязательное поле" }]}
          style={{ margin: 0, padding: 0 }}
        >
          <Input.Password className={styles.password} placeholder="Пароль" />
        </Form.Item>
        <Checkbox className={styles.checkbox}>Запомнить меня</Checkbox>
        {error && <p className={styles.error}>{error}</p>}
        <Form.Item>
          <CustomButton
            size="L"
            color="dark-puprle"
            extraClass={styles.button}
            type="submit"
          >
            Войти
          </CustomButton>
        </Form.Item>

        <div className={styles.desc}>
          <Link to={"/404"}>Я забыл пароль</Link>
          <Link to={"/404"}>Войти как тренер</Link>
        </div>
        <p className={styles.question}>Нет аккаунта?</p>
        <button className={styles.register} onClick={onSwitch}>
          Зарегистрироваться
        </button>
      </Form>
    </div>
  )
}

export default Login
