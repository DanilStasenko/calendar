import { useState } from "react"

import { useLoginMutation, useRegisterMutation } from "../../app/services/auth"
import type { User } from "@prisma/client"

import { Checkbox, Form, Input } from "antd"
import CustomButton from "../ui/button"

import { isErrorWithMessage } from "../../utils/isErrorWithMsg"

import styles from "./Register.module.scss"

type Props = {
  onSwitch: () => void
}

type RegisterData = Omit<User, "id"> & { confirmPassword: string }

const Register: React.FC<Props> = ({ onSwitch }) => {
  const [error, setError] = useState<string>("")
  const [registerUser] = useRegisterMutation()
  const [loginUser] = useLoginMutation()

  const onRegister = async (data: RegisterData) => {
    try {
      await registerUser(data).unwrap()
      await loginUser({
        email: data.email,
        password: data.password,
        name: data.name,
      }).unwrap()
      setError("")
    } catch (err) {
      const maybeError = isErrorWithMessage(err)
      maybeError ? setError(err.data.message) : setError("Unknown error")
    }
  }

  return (
    <div className={styles.container}>
      <p className={styles.title}>Регистрация в Sirius Future</p>
      <Form onFinish={onRegister} className={styles.form}>
        <Form.Item
          name={"name"}
          rules={[{ required: true, message: "Обязательное поле" }]}
          style={{ margin: 0, padding: 0 }}
        >
          <Input className={styles.name} placeholder="Имя" />
        </Form.Item>
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
            type="submit"
            size="L"
            color="dark-puprle"
            extraClass={styles.button}
          >
            Зарегистрироваться
          </CustomButton>
        </Form.Item>

        <p className={styles.question}>Уже есть аккаунт?</p>
        <button className={styles.signin} onClick={onSwitch}>
          Войти
        </button>
        {error && <p>{error}</p>}
      </Form>
    </div>
  )
}

export default Register
