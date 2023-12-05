import { Link } from "react-router-dom";

const BlogList = ({blogs}) => {
    return (
        <div className="blogList">
                {console.log(blogs)}
                {blogs.map(blog => (
                <Link to={`/blogs/${blog.id}`}>
                    <div className="blogCard" key={blog.id} id="card">
                        <h3 className="noUnderline" style={{textDecoration: 'none'}}>{blog.title}</h3>
                        <small className="noUnderline">{blog.desc}</small>
                    </div>
                </Link>
                ))}
            </div>
    );
}

export default BlogList;
