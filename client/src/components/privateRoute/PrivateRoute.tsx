import { Navigate } from "react-router-dom"

import { useCurrentQuery } from "../../app/services/auth"

import { Spin } from "antd"

interface PrivateRouteProps {
  element: JSX.Element
}

const PrivateRoute = ({ element }: PrivateRouteProps) => {
  const { data, isLoading } = useCurrentQuery()

  if (isLoading) {
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
  }

  if (!data) {
    return <Navigate to="/auth" />
  }

  return element
}

export default PrivateRoute
