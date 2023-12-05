import img1 from '../assets/images/home/1.png';
import useFetch from '../hooks/useFetch';
import '../styles/home.css';
import Category from './Category';
import BlogList from './blog/BlogList';



const Home = () => {


    const {fetched: blogs, isPending} = useFetch('https://fullstackfooddeliveryserver-production.up.railway.app/api/blogs/')
    return (
        <div className="container">
            <div className="firstSection">
                <div className="findLocal">
                    <div className="findLeft">
                        <h1>Find the best local restaurants near you!</h1>
                        <h3>Search for your favorite cuisine or dish!</h3>
                        </div>
                    <div className="findRight">
                        <img src={img1} alt="homeImage"/>
                    </div>
                </div>
            </div>

            <div className="secondSection">
                <h1 style={{paddingTop: 100}}>Categories</h1>
                <Category/>
            </div>

            <div className="blogSection">
                {!isPending && <BlogList blogs={blogs.slice(0,6)}/>}
            </div>
        </div>
    )
}

export default Home;