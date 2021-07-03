import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

function RegisterPage() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (user.firstName && user.lastName && user.email && user.password) {
            dispatch(userActions.register(user));
        }
    }

    return (
        <div className="container">
            <div className="col-lg-8 offset-lg-2">
                <div className="col-lg-8 offset-lg-2">
                    <center style={{ marginTop: "20%", color: "#00008B" }}>
                        <h4>Register</h4>
                    </center>
                    <div style={{
                        // border: "0.5px solid grey",
                        marginTop: "10%",
                        borderRadius: 10,
                        padding: 20,
                        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                        transition: "0.3s"
                    }}>
                        <form name="form" onSubmit={handleSubmit} autocomplete="off">
                            <div className="form-group">
                                <label style={{ fontFamily: 'Raleway' }}>First Name</label>
                                <input type="text" name="firstName" value={user.firstName} onChange={handleChange}
                                    className={'form-control' + (submitted && !user.firstName ? ' is-invalid' : '')} />
                                {submitted && !user.firstName &&
                                    <div className="invalid-feedback">First Name is required</div>
                                }
                            </div>
                            <div className="form-group">
                                <label style={{ fontFamily: 'Raleway' }}>Last Name</label>
                                <input type="text" name="lastName" value={user.lastName} onChange={handleChange}
                                    className={'form-control' + (submitted && !user.lastName ? ' is-invalid' : '')} />
                                {submitted && !user.lastName &&
                                    <div className="invalid-feedback">Last Name is required</div>
                                }
                            </div>
                            <div className="form-group">
                                <label style={{ fontFamily: 'Raleway' }}>Email</label>
                                <input type="text" name="email" value={user.email} onChange={handleChange}
                                    className={'form-control' + (submitted && !user.email ? ' is-invalid' : '')} />
                                {submitted && !user.email &&
                                    <div className="invalid-feedback">Email is required</div>
                                }
                            </div>
                            <div className="form-group">
                                <label style={{ fontFamily: 'Raleway' }}>Password</label>
                                <input type="password" name="password" value={user.password} onChange={handleChange}
                                    className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')} />
                                {submitted && !user.password &&
                                    <div className="invalid-feedback">Password is required</div>
                                }
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary btn-block" style={{
                                    backgroundColor: "#00008B",
                                    marginTop: "10%",
                                }}>
                                    {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Register
                                </button>
                                {/* <Link to="/login" className="btn btn-link">Cancel</Link> */}
                            </div>
                        </form>
                    </div>
                    <center style={{ marginTop: "8%" }}>
                        <Link to="/login" style={{
                            fontFamily: 'Raleway',
                            textDecoration: "none",
                            color: "black"
                        }}>Have an account? Login</Link>
                    </center>
                </div>
            </div>
        </div>
    );
}

export { RegisterPage };