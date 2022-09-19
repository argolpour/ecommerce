import { Link, Outlet } from "react-router-dom"
import './navigation.styles.scss'
import { ReactComponent as Crown } from "../../assests/svg/crown.svg"
const Navigation = () => {
  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to='/'>
          <Crown />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link " to='/shop'>
            Shop
          </Link>
          <Link className="nav-link " to='/sign-in'>
            Sign in
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default Navigation