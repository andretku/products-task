import React, { useEffect } from "react"
import { Button, Layout, Space } from "antd"
import { Outlet, useNavigate } from "react-router-dom"
import { PAGE_CREATE, PAGE_PRODUCTS } from "../common/constants"
import HeaderNavLink from "../Components/NavLink"
import { useSelector } from "react-redux"
import { RootState } from "../store"
import { useAppDispatch } from "../hooks/store"
import { logout } from "../features/auth/authSlice"

const { Header, Content, Footer } = Layout

const Main: React.FC = () => {
  const navigate = useNavigate()
  const token = useSelector(
    (state: RootState) => state.persistedReducer.auth.token
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
  }, [navigate, token])

  return (
    <Layout
      style={{
        display: "grid",
        gridTemplateRows: "70px auto 70px",
        minHeight: "97vh",
      }}
    >
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Space size={"middle"}>
          <HeaderNavLink to={"."} title="Home"></HeaderNavLink>
          <HeaderNavLink
            to={`/${PAGE_PRODUCTS}`}
            title="Products"
          ></HeaderNavLink>
          <HeaderNavLink
            to={`/${PAGE_CREATE}`}
            title="Add Product"
          ></HeaderNavLink>
        </Space>
        <Button
          onClick={() => {
            dispatch(logout())
          }}
        >
          Logout
        </Button>
      </Header>
      <Content style={{ padding: "0 50px", height: "100%" }}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: "center" }}>Andrey Tkachuk 2023</Footer>
    </Layout>
  )
}

export default Main
