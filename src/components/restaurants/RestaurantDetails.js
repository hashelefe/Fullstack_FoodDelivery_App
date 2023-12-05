import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useContext } from "react";
import useFetch from "../../hooks/useFetch";
import '../../styles/restaurants.css';
import AuthContext from "../../auth/AuthProvider";
import useCart from "../../hooks/useCart";

function RestaurantDetails() {
    const {id} = useParams();
    const {auth} = useContext(AuthContext);
    const {addProduct} = useCart();

    const star = <svg xmlns="http://www.w3.org/2000/svg" className="star" height="0.5em" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
    const { fetched: restaurantInfo, isPending: restaurantPending } = useFetch('http://localhost:5000/api/restaurants/' + id);
    const { fetched: menu, isPending: menuPending } = useFetch('http://localhost:5000/api/restaurants/menus/' + id);
    console.log(menu);
    console.log(restaurantInfo)
    return (
        <>
            {!restaurantPending && 
                <div className="restaurantInfo"> 
                    <div className="info">
                        <h1 style={{marginTop: 0}}>{restaurantInfo.name}</h1>
                        <h3>{restaurantInfo.description}</h3>
                        <small>{restaurantInfo.category}, {restaurantInfo.openHour}-{restaurantInfo.closeHour}</small>
                        <p>{restaurantInfo.rating} {star} | Minimum delivery: {restaurantInfo.minDelivery}$</p>
                    </div>     
                    <div className="img">
                        <img src={restaurantInfo.img} style={{borderRadius:'0 12px 12px 0'}} alt={restaurantInfo.name}/>
                    </div>
                </div>}

            {menuPending && <div>Loading...</div>}
            {!menuPending && <div className="menuList">
                {menu?.dishes.map(dish => (
                    <div className="dishCard" key={dish.id}>
                        <div className="leftCard">
                            <p style={{fontSize: 22, fontWeight: 600, margin: 0}}>{dish.name}</p>
                            <small>{dish.description}</small>    
                        </div>
                        <div className="rightCard">
                            <p>{dish.price}$</p>
                            {auth ? (<button className="btn-primary" onClick={() => addProduct(dish)}>Add</button>) : 
                            (<button disabled className="btn-primary btn-disabled">Add</button>)}    
                        </div>
                    </div>
                ))}
            </div>}

        </>
    );
}

export default RestaurantDetails;