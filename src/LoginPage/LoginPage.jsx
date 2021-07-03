import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

function LoginPage() {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { username, password } = inputs;
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();
    const location = useLocation();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (username && password) {
            // get return url from location state or default to home page
            const { from } = location.state || { from: { pathname: "/" } };
            dispatch(userActions.login(username, password, from));
        }
    }

    return (
        <div className="container">
            <div className="col-lg-8 offset-lg-2">
                <div className="col-lg-8 offset-lg-2">
                    <center style={{ marginTop: "20%", color: "#00008B" }}>
                        <h4>Login</h4>
                    </center>
                    <div style={{
                        // border: "0.5px solid grey",
                        marginTop: "10%",
                        borderRadius: 10,
                        padding: 20,
                        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                        transition: "0.3s"
                    }}>
                        <form name="form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label style={{ fontFamily: 'Raleway' }}>Email</label>
                                <input type="text" name="username" value={username}
                                    onChange={handleChange}
                                    className={'form-control' + (submitted && !username ? ' is-invalid' : '')} />
                                {submitted && !username &&
                                    <div className="invalid-feedback">Email is required</div>
                                }
                            </div>
                            <div className="form-group">
                                <label style={{ fontFamily: 'Raleway' }}>Password</label>
                                <input type="password" name="password"
                                    value={password} onChange={handleChange}
                                    className={'form-control' + (submitted && !password ? ' is-invalid' : '')} />
                                {submitted && !password &&
                                    <div className="invalid-feedback">Password is required</div>
                                }
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary btn-block" style={{
                                    backgroundColor: "#00008B",
                                    marginTop: "10%",
                                }}>
                                    {loggingIn &&
                                        <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                    <center style={{ marginTop: "8%" }}>
                        <Link to="/register" style={{
                            fontFamily: 'Raleway',
                            textDecoration: "none",
                            color: "black"
                        }}>Don't have an account? Sign up here </Link>
                    </center>

                </div>
            </div>
        </div>

    );
}

export { LoginPage };