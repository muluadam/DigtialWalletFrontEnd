import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

const VerificationPage = () => {
    const [user, setUser] = useState({
        token: '',
        pin: '',
    });
    const [retypePin, setRetypePin] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => {
        // dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (user.token && user.pin) {
            dispatch(userActions.verification(user));
        }
    }

    return (
        <div className="container">
            <div className="col-lg-8 offset-lg-2">
                <div className="col-lg-8 offset-lg-2">
                    <center style={{ marginTop: "20%", color: "#00008B" }}>
                        <h4>Verification</h4>

                    </center>
                    <p className="lead" style={{ textAlign: "center", fontWeight: "bolder", fontFamily: "Raleway" }}>Please enter the verification code sent to you in your mail inbox</p>

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
                                <label style={{ fontFamily: 'Raleway' }}>Verification Token</label>
                                <input type="password" name="token" value={user.token} onChange={handleChange}
                                    className={'form-control' + (submitted && !user.pin ? ' is-invalid' : '')} />
                                {submitted && !user.token &&
                                    <div className="invalid-feedback">Verification token is required</div>
                                }
                            </div>
                            <div className="form-group">
                                <label style={{ fontFamily: 'Raleway' }}>Create a 4 digit pin</label>
                                <input type="password" name="pin" value={user.pin} onChange={handleChange}
                                    className={'form-control' + (submitted && !user.pin ? ' is-invalid' : '')} />
                                {submitted && !user.pin &&
                                    <div className="invalid-feedback">Pin is required</div>
                                }
                            </div>
                            <div className="form-group">
                                <label style={{ fontFamily: 'Raleway' }}>Retype Pin</label>
                                <input type="password" name="retypePin" value={retypePin} onChange={e => setRetypePin(e.target.value)}
                                    className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')} />
                                {user.pin !== retypePin &&
                                    <div className="invalid-feedback">Pins do not match</div>
                                }
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary btn-block" style={{
                                    backgroundColor: "#00008B",
                                    marginTop: "10%",
                                }}>
                                    {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Verify
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

export { VerificationPage }
