import { useRef, useState, useEffect, useContext } from "react";
import axios from '../../api/axios';
import AuthContext from "../../auth/AuthProvider";

const LOGIN_URL = 'https://fullstackfooddeliveryserver-production.up.railway.app/api/users/login'

const Login = ({toggleModal, setIsRegistered}) => {
    
    const { auth, setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify({
                  username: user,
                  password: pwd,
                }),
                {
                    headers: ({'Content-Type': 'application/json'}),
                    withCredentials: true
                }
              );
                console.log(response)
              if(response.status === 200){
                console.log(response.data)
                const accessToken = response?.data?.accessToken;

                setAuth({ user, pwd, accessToken });
                setUser('');
                setPwd('');
                setSuccess(true);
                console.log(auth);

              } else {
                setErrMsg(response.statusText)
              }

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    function handleChange(){
        setIsRegistered(true)
    }
    
    
    return (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">{success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <button className="btn-primary" onClick={toggleModal}>Yay!</button>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h3 style={{marginBottom:0, fontWeight: 300, fontSize: '1.3em'}}>Welcome again!</h3>
                    <h2 style={{marginTop:0}}>Sign In</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button className="btn-primary">Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line" style={{marginTop: '2vh'}}>
                            <button className='btn-primary' onClick={handleChange}>Sign Up</button>
                        </span>
                    </p>
                </section>
            )}
          </div>
      </div>
    )
}

export default Login;