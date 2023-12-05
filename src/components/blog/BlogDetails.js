import {useHistory, Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "../../hooks/useFetch";
import '../../styles/blog.css';
import { useContext } from "react";
import AuthContext from "../../auth/AuthProvider";

const BlogDetails = () => {
    const {id} = useParams();
    const history = useHistory();
    const {auth} = useContext(AuthContext);
    const {fetched: blog, isPending} = useFetch('https://fooddelivery-api.onrender.com/api/blogs/'+id)
    
    const handleDelete = () => {
      fetch(`https://fooddelivery-api.onrender.com/api/blogs/${id}`, {
          method: 'DELETE',
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${auth?.accessToken}`
          }
      })
      .then((response) => {
          if (response.status === 200) {
              window.alert('Blog deleted successfully');
              history.push("/blogs");
          } else if (response.status === 404) {
              console.log('Blog not found');
          }
      })
      .catch((error) => {
          console.error('Error deleting item', error);
      });
  };

    return (
        <div className="blogDetails">
            {isPending && <div>Loading...</div>}
            {blog.message && <div>{blog.message}</div>}
            {blog && (
                <article>
                    <h1 className="blogTitle">{blog.title}</h1>
                    <h3 className="blogDesc">{blog.desc}</h3>
                    <p className="blogContent">{blog.content}</p>
                    {auth && <div className="buttons">
                            <Link to={`/blogs/edit/${id}`}><div className="btn-primary" >Edit</div></Link>
                            <div className="btn-primary" onClick={handleDelete}>Delete</div>
                        </div>
                    }
                </article>
            )}

        </div>
    )
}

export default BlogDetails;