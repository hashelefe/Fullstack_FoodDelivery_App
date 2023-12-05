import { useContext, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AuthContext from "../../auth/AuthProvider";
import axios from "../../api/axios";

const BlogCreate = () => {
    const {auth} = useContext(AuthContext);
    const history = useHistory();

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const date = new Date();
        const blog = { title, desc, content, date };
    
        axios.post('https://fooddelivery-api.onrender.com/api/blogs/', blog, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth?.accessToken}`
            }
        }).then((response) => {
            console.log(response);
            if (response.status === 201) {
                window.alert("New blog added");
                history.push("/blogs");
            } else if (response.status === 403) {
                window.alert("Unauthorized");
            }
        }).catch((error) => {
            console.error("Error:", error);
            // Handle other error cases here
        });
    };

    return (
        <>
            <div className="createBlog">
                <form onSubmit={handleSubmit}>
                    <h2>
                        Create a blog!
                    </h2>
                    <div className="form">
                        <label style={{margin: 20}} id="title">Blog title</label>
                        <input  id='title' className="formInput" placeholder="Title..." required value={title} onChange={(e) => setTitle(e.target.value)}></input>
                    </div>
                    <div className="form">
                        <label id='desc' style={{margin: 20}}>Description</label>
                        <input id='desc' className="formInput" placeholder="Description..." required value={desc} onChange={(e) => setDesc(e.target.value)}></input>
                    </div>
                    <div className="form">
                        <label id='content' style={{margin: 20}}>Content</label>
                        <textarea id='content' className="formInput" style={{minHeight: 250}} placeholder="Your text here..." required onChange={(e) => setContent(e.target.value)}></textarea>
                    </div>

                    <input className="btn-primary" style={{marginTop:40}}type="submit" value={"Create"}></input>
                </form>
            </div>
        </>
    )
}

export default BlogCreate;