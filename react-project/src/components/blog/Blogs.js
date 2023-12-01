import useFetch from "../../hooks/useFetch";
import BlogList from "./BlogList";
import '../../styles/blog.css';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useContext } from "react";
import AuthContext from "../../auth/AuthProvider";

const Blogs = () => {
    const {fetched: blogs, isPending} = useFetch('http://localhost:5000/api/blogs/');
    const {auth} = useContext(AuthContext);
    console.log(auth)
    return (
        <>
            {auth && <div className="nav" style={{margin: 'auto', marginTop: '5vh', alignContent: 'center', justifyContent: 'center'}}>
                    <div className="addBlog">
                        <Link to={'/blogs/create'}><button className="btn-primary">Add blog +</button></Link>
                    </div>
                </div> 
            }

            <div className="blogList">
                {isPending && <div>Loading...</div>}
                {blogs.length !== 0 && <BlogList blogs={blogs}/>}
            </div>
        </>
    )
}

export default Blogs;