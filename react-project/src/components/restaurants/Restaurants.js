import '../../styles/restaurants.css';
import '@fortawesome/free-solid-svg-icons';
import '@fortawesome/free-regular-svg-icons';
import useFetch from '../../hooks/useFetch';
import RestaurantList from './RestaurantList';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const Restaurants = () => {
    const {fetched: restaurants, isPending} = useFetch('http://localhost:5000/api/restaurants/');
    const starC = <svg xmlns="http://www.w3.org/2000/svg" className="starIcon" height="1.4em" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
    const starU = <svg xmlns="http://www.w3.org/2000/svg" className="starIcon" height="1.4em" viewBox="0 0 576 512"><path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/></svg>

    const [selectedCategory, setSelectedCategory] = useState(null)
    const [query, setQuery] = useState("");
    const [categories, setCategories] = useState([]);
    const [rating, setRating] = useState(0);
    const [priceRange, setPriceRange] = useState([0,1000]);
    const [starIcons, setStarIcons] = useState([starU, starU, starU, starU, starU]);
    const [showFilters, setShowFilters] = useState(false);

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };
    
    //----------Search Filter----------
    const handleInputChange = (event) => {
        setQuery(event.target.value);
    }
    
    //----------Radio Filter----------
    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    //----------Query search filter-----------
    const filteredItems = restaurants?.filter((restaurant) => restaurant.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);


    //----------Data filtering function----------
    function filteredData(restaurants, selected, query, selRating, priceRange){
        let filteredRestaurants = restaurants;
        if(query){
            filteredRestaurants = filteredItems;
        }

        if(selected){
            filteredRestaurants = filteredRestaurants.filter(
                ({category}) =>
                category === selected 
            );
        }

        if(selRating){
            filteredRestaurants = filteredRestaurants.filter(
                (restaurant) =>
                restaurant.rating >= selRating 
            );
        }

        if (priceRange) {
            filteredRestaurants = filteredRestaurants.filter(
                (restaurant) =>
                    restaurant.minDelivery > priceRange[0] &&
                    restaurant.minDelivery < priceRange[1]
            );
        }

        return filteredRestaurants;
    }

    //----------Rating stars management----------
    const handleClick = (event) => {
        const clickedStarId = parseInt(event.target.id);

        // Update the star icons based on the clicked star
        const updatedStarIcons = starIcons.map((icon, index) => {
            if (index < clickedStarId) {
                return starC;
            } else {
                return starU;
            }
        });

        setStarIcons(updatedStarIcons);
        setRating(clickedStarId);
    };

    const handlePriceChange = (event) => {
        const checkboxId = parseInt(event.target.id);

        switch (checkboxId) {
            case 0:
                setPriceRange([0, 15]);
                break;
            case 1:
                setPriceRange([15, 25]);
                break;
            case 2:
                setPriceRange([25, 1000]);
                break;
            case -1:
                setPriceRange([0, 1000]); // Clear price range
                break;
            default:
                setPriceRange([0, 1000]);
        }
    };

    const result = filteredData(restaurants, selectedCategory, query, rating, priceRange);

    useEffect(() => {
        if (!isPending && restaurants.length > 0) {
          setCategories(Array.from(new Set(restaurants.map(restaurant => restaurant.category))));
        }
      }, [isPending, restaurants]);

    return (
        <div className="containerRestaurants">
            <button className='filtersBtn btn-primary' onClick={toggleFilters}>Filters</button>
            <div className={`filters ${showFilters ? 'showFilters' : ''}`}>
                    <div className="filter" style={{paddingTop: 0}}><label>Search:</label><input type="search" className='searchBar' placeholder='Find restaurant' onChange={handleInputChange} style={{width:'100%', margin: 'auto', marginTop: '2vh'}}></input></div>
                        <div className="filter">Minimum order amount:
                        <div className="filterSmall" style={{marginTop: '2vh'}}>
                            <input type='radio' id={0} name="priceRange" onChange={handlePriceChange}></input>
                            <label htmlFor={0}>Less than 15zł</label>
                        </div>
                        <div className="filterSmall">
                            <input type='radio' id={1} name="priceRange" onChange={handlePriceChange}></input>
                            <label htmlFor={1}>15-25zł</label>
                        </div>
                        <div className="filterSmall">
                            <input type='radio' id={2} name="priceRange" onChange={handlePriceChange}></input>
                            <label htmlFor={2}>More than 25zl</label>
                        </div>
                        <div className="filterSmall">
                            <input type='radio' id={-1} name="priceRange" onChange={handlePriceChange}></input>
                            <label htmlFor={-1}>Clear</label>
                        </div>
                    </div>
                    <div className="filter" style={{marginBottom: 0, paddingBottom: 0}}>Rating:</div>
                        <div className="stars">
                            {starIcons.map((icon, index) => (
                                <button key={index} className="star" id={index + 1} onClick={handleClick}>
                                    {icon}
                                </button>
                             ))}
                        </div>
                    <div className="filter">
                        Categories:
                        <div className="filter-buttons">
                            {!isPending && categories.map((category) => (
                                <button className='btn-primary' value={category} onClick={handleChange}>{category}</button>
                            ))}
                            <button className='btn-primary' value={''} onClick={handleChange}>Clear</button>
                        </div>
                    </div>
            </div>
            <div className="restaurants">
                {isPending && <div>Loading...</div>}
                {!isPending && <RestaurantList restaurants={result}/>}
                </div> 
            </div>
    )
}

export default Restaurants;