import {useContext, useState} from 'react';
import logo from '../assets/images/navbar/paw.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCartShopping, faUser, faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Login  from './auth/Login';
import Register from './auth/Register';
import AuthContext from '../auth/AuthProvider';
import { CartContext } from '../context/CartProvider';


const Navbar = () => {

    const { auth, setAuth } = useContext(AuthContext);
    const { products, clearCart } = useContext(CartContext);
    const [isActive, setIsActive] = useState(false);
    const toggleMenu = event => {
        setIsActive(current => !current);
        event.currentTarget.classList.toggle('change');
    }

    const [isRegistered, setIsRegistered] = useState(true);

    const [modal, setModal] = useState(false);


    const handleLogout = async () => {
      try {
<<<<<<< Updated upstream
        const response = await fetch('https://fullstackfooddeliveryserver-production.up.railway.app/logout', {
=======
        const response = await fetch('https://fooddelivery-api.onrender.com/logout', {
>>>>>>> Stashed changes
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          });
          if(response.status === 204){
            console.log(response)
          }
      setAuth(null);
      clearCart();
      window.alert('Logged out successfully!');
    } catch(err) {
      console.log(err.status)
    }
  }

    const toggleModal = () => {
      setModal(!modal);
    };
  
    if(modal) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }

    return (
<>
    <nav className="navbar">
        <a href="/"><img src={logo} alt="logo" style={{width: 40}}/></a>
        <div className="menu-button" onClick={toggleMenu}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
        </div>
            <div className={isActive ? 'show' : 'nav-tabs'} id="tabs">
                <Link to="/" className='tab'>HOME</Link>
                <Link to="/restaurants" className='tab'>RESTAURANTS</Link>
                <Link to="/blogs" className='tab'>BLOG</Link>
                {auth && <Link to='/orders' className='tab'>ORDERS</Link> }
                {auth ? (<Link to="/cart"><button className="tab"><FontAwesomeIcon className='cart-icon' icon={faCartShopping} size="l" />
                            {products.length > 0 && (
                              <div className="cart-badge">{products.length}</div>
                            )}</button></Link>) :
                        (<button disabled className="tab"><FontAwesomeIcon icon={faCartShopping} className='cart-icon' /></button>)}
                {auth ? (<button onClick={handleLogout} className='tab'><FontAwesomeIcon icon={faRightFromBracket}/></button>) : 
                        (<button onClick={toggleModal} className='tab'><FontAwesomeIcon icon={faUser} size="" /></button>)}
            </div>
    </nav>

    {modal && !isRegistered && <Login modal={modal} toggleModal={toggleModal} setIsRegistered={setIsRegistered} />}
    {modal && isRegistered && <Register toggleModal={toggleModal} setIsRegistered={setIsRegistered} isRegistered={isRegistered} />}
</> )
}

export default Navbar;