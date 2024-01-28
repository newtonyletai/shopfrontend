import { ShoppingCartOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { logoutUser } from '../features/authSlice';
import { toast } from 'react-toastify';


const Navbar = () => {
  const dispatch = useDispatch()
  const { cartQuantityTotal } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  return (
    <nav className='nav-bar'>
      <Link to = "/">
        <h2>CakeShop</h2>
      </Link>
      <Link to = '/cart'>
        <div className="nav-bag">
          <ShoppingCartOutlined />
          <span className="bag-quantity">
            <span>{ cartQuantityTotal }</span>
          </span>
        </div>
      </Link>
      {
        auth._id ? (
          <Links>
          { auth.isAdmin ? (
          <div>
            <Link to="admin/summary" >Admin</Link>
          </div>
          ) : null }
        <div onClick={() => { 
          dispatch(logoutUser(null));
          toast.warning("Logged out!", { position: "bottom-left" });
          }}>
          Logout
        </div> 
        </Links>
        ) : 
        <AuthLinks>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </AuthLinks>
      }
    </nav>
  )
}

export default Navbar;

const AuthLinks = styled.div`
  a {
    &:last-child {
      margin-left: 2rem;
    }
  }
`

const Links = styled.div`
    color: white;
    display: flex;

    div {
      cursor: pointer;

      &: last-child {
        margin-left: 2rem;
      }
    }
`