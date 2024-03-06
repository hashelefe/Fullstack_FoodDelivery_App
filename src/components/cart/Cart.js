import '../../styles/cart.css';
import useCart from '../../hooks/useCart';
import { useContext, useState } from 'react';
import AuthContext from '../../auth/AuthProvider';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Cart = () => {
    const history = useHistory();
    
    const {products, value, increaseProductCount, decreaseProductCount, clearCart, onProductRemove} = useCart();
    const {auth} = useContext(AuthContext);
    const user = auth?.user;

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [info, setInfo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const order = { name, user, address, city, info, products, value };
        fetch('https://fullstack-food-delivery-server.vercel.app/api/orders', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth?.accessToken}`
            },
            body: JSON.stringify(order)
        })
        .then((response) => {
            console.log(response.status)
            if (response.status === 201) {
                window.alert("Order created");
                clearCart();
                history.push("/");
            } else if (response.status === 403) {
                window.alert("Forbidden");
            } else if (response.status === 401) {
                window.alert("Unauthorized");
            } else {
                console.log('Unexpected error:', response.statusText);
            }
        })
        .catch((error) => {
            console.error('Error creating order:', error);
        });
    };
    
    
    return (
    <>
        {auth && (
        <div className="cart">
            <div className="cartList">
                <h2 style={{marginBottom: 30, padding: 10, width: '60%', margin: 'auto', borderBottom: "1px solid rgba(157, 157, 157, 0.223)"}}>Cart of user: {auth.user}</h2>
                {products.map((dish) => 
                    (
                    <div className="dish" key={dish.id}>
                        <div className="leftDish">
                            <h3 style={{fontSize: 22, marginBottom: 6}}>{dish.name}</h3>
                            <small style={{fontSize: 16}}>{dish.description}</small>
                        </div>
                        <div className="rightDish">
                            <button style={{cursor: 'pointer'}} onClick={(e) => onProductRemove(dish)}>X</button>
                            <p style={{fontSize: 14, fontWeight: 600, marginBottom: 0}}>{(dish.price * dish.count).toFixed(2)}$</p>
                            <small style={{fontSize: 12}}>Qty: {dish.count}</small>
                            <div className="buttonsDish">
                                <button style={{fontSize: 10}} className="btn-primary btn-quantity" onClick={() => decreaseProductCount(dish.id)}>-</button>
                                <button style={{fontSize: 10}} className="btn-primary btn-quantity" onClick={() => increaseProductCount(dish.id)}>+</button>
                            </div>
                        </div>
                    </div>
                ))}

                <p>
                    Total: {value.toFixed(2)}$
                </p>

                
            </div>

            <div className="cartForm">
                <form onSubmit={handleSubmit}>
                    <label htmlFor='name'>Name:</label>
                    <input required type="text" id='name' className='orderInput' value ={name} onChange={(e) => setName(e.target.value)}></input>
                    <label htmlFor='address'>Address:</label>
                    <input required type="text" id='address' className='orderInput' value ={address} onChange={(e) => setAddress(e.target.value)}></input>
                    <label htmlFor='city'>City:</label>
                    <input required type="text" id='city' className='orderInput'value ={city} onChange={(e) => setCity(e.target.value)}></input>
                    <label htmlFor='info'>Additional info:</label>
                    <textarea id='info' style={{resize: 'none'}} value ={info} onChange={(e) => setInfo(e.target.value)}></textarea>
                    <input type="submit" value="Order" className="btn-primary" style={{marginTop: 35}}></input>
                </form>
            </div>
        </div>
        )}
    </>
    )
}

export default Cart;