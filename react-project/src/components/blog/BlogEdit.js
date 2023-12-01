import { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import AuthContext from "../../auth/AuthProvider";
import axios from "../../api/axios";

const BlogEdit = () => {
    const history = useHistory();
    const { auth } = useContext(AuthContext);
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [content, setContent] = useState('');
    
    useEffect(() => {
        // Fetch the blog data when the component mounts
        axios.get(`http://localhost:5000/api/blogs/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth?.accessToken}`
            },
        }) 
        .then(response => {
            // Set state with the fetched blog data
            const { data } = response;
            setTitle(data.title);
            setDesc(data.desc);
            setContent(data.content);
        })
        .catch(error => {
            // Handle errors, e.g., redirect if blog not found
            console.error('Error fetching blog:', error);
            history.push("/blogs");
        });
    }, [id, auth, history]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedBlog = { title, desc, content };
        
        fetch(`http://localhost:5000/api/blogs/${id}`, {
            method: 'PUT',
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth?.accessToken}` 
            },
            body: JSON.stringify(updatedBlog)
        })
        .then(() => {
            window.alert("Blog edited!");
            history.push("/blogs");
        })
        .catch(error => {
            console.error('Error updating blog:', error);
            // Handle error state or user notification
        });
    }

    return (
        <>
            <div className="createBlog">
                <form onSubmit={handleSubmit}>
                    <h2>Edit a blog!</h2>
                    <div className="form">
                        <label htmlFor="title">Blog title</label>
                        <input id="title" className="formInput" required value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="form">
                        <label htmlFor="desc">Description</label>
                        <input id="desc" className="formInput" placeholder="Description..." required value={desc} onChange={(e) => setDesc(e.target.value)} />
                    </div>
                    <div className="form">
                        <label htmlFor="content">Content</label>
                        <textarea id="content" className="formInput" style={{ minHeight: 250 }} placeholder="Your text here..." required value={content} onChange={(e) => setContent(e.target.value)} />
                    </div>

                    <input className="btn-primary" style={{ marginTop: 40 }} type="submit" value={"Update"} />
                </form>
            </div>
        </>
    );
}

export default BlogEdit;
