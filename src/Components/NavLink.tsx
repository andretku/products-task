import { Button } from "antd"
import { FC } from "react"
import { NavLink } from "react-router-dom"

const HeaderNavLink: FC<{ to: string; title: string }> = ({ to, title }) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <Button type={isActive ? "primary" : "default"}>{title}</Button>
      )}
    </NavLink>
  )
}

export default HeaderNavLink
