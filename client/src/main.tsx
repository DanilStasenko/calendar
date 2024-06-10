import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"

import { store } from "./app/store"
import Auth from "./app/features/auth/auth"

import Layout from "./components/layout/Layout"
import PrivateRoute from "./components/privateRoute/PrivateRoute"
import CalendarPage from "./pages/CalendarPage/CalendarPage"
import DashboardPage from "./pages/DashboardPage/DashboardPage"
import AuthPage from "./pages/AuthPage/AuthPage"

import "./index.css"

const container = document.getElementById("root")

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" />,
      },
      {
        path: "calendar",
        element: <PrivateRoute element={<CalendarPage />} />,
      },
      {
        path: "dashboard",
        element: <PrivateRoute element={<DashboardPage />} />,
      },
    ],
  },
])

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <Auth>
          <RouterProvider router={router} />
        </Auth>
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
