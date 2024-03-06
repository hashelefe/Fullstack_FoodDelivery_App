import { useContext, useEffect, useState } from "react";
import AuthContext from "../auth/AuthProvider";
import axios from "../api/axios";



const Orders = () => {
    const {auth} = useContext(AuthContext)
    const [orders, setOrders] = useState(null)
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://fullstack-food-delivery-server-git-demo-hashelefes-projects.vercel.app/api/orders/', {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${auth?.accessToken}`
                    }
                });
                setOrders(response.data); // Set orders data from API response
                setIsPending(false); // Update isPending to false
            } catch (error) {
                console.error("Error fetching orders:", error);
                setIsPending(false); // Update isPending even if there's an error
            }
        };

        if (auth) {
            fetchData(); // Fetch data only if auth is available
        }
    }, [auth]);

    return (
        <>
            <h2>Orders table:</h2>
            {!isPending && orders && (
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer Name</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Value</th>
                            {/* Add other table headers as needed */}
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.orderId}>
                                <td>{order.orderId}</td>
                                <td>{order.name}</td>
                                <td>{order.address}</td>
                                <td>{order.city}</td>
                                <td>{order.value.toFixed(2)}</td>
                                {/* Add other table data as needed */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            
        </>
    )
}

export default Orders;