import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Category = () => {
    const {fetched: restaurants, isPending} = useFetch('https://fullstackfooddeliveryserver-production.up.railway.app/api/restaurants/');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (!isPending && restaurants.length > 0) {
          setCategories(Array.from(new Set(restaurants.map(restaurant => restaurant.category))));
        }
    }, [isPending, restaurants]);

    return (
        <div className="catTiles">
            {categories.map((category) => (    
                <Link to={`/restaurants`} key={category}>
                    <div className="catTile" key={category}>
                        <h3>{category}</h3>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Category;
