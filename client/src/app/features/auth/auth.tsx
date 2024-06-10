import { useCurrentQuery } from "../../services/auth"
import { Spin } from "antd"

interface IAuth {
  children: JSX.Element
}

const Auth = ({ children }: IAuth) => {
  const { isLoading } = useCurrentQuery()

  if (isLoading)
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </div>
    )

  return <>{children}</>
}

export default Auth
