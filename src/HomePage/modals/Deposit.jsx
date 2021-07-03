import React, { useState, useEffect } from 'react'
import PinInput from "react-pin-input";
import axios from "axios";

function Deposit(props) {
    const [state, setState] = useState({
        amount: "",
    });
    const [pin, setPin] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const { amount } = state;
        const user = JSON.parse(localStorage.getItem('user'));
        console.log("AMNT ", amount, pin);
        if (amount && pin) {
            axios.post(
                `http://127.0.0.1:9090/api/v1/wallet/${props.walletId}/topUp?amount=${amount}&pin=${pin}`, {}, {
                headers: {
                    'Authorization': 'Bearer ' + user.token,
                    'Access-Control-Allow-Origin': "*",
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },

            })
                .then(res => {
                    if (res.status == 200) {
                        setError(false);
                        setShowAlert(true);
                    }
                })
                .catch(err => {
                    setError(true);
                    setErrorMsg(err.message)
                })
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState({
            ...state,
            [name]: value
        })
    }


    return (
        <div>
            <div className="card">
                <div className="card-header">
                    DEPOSIT
                </div>
                {
                    showAlert &&
                    <div className="alert alert-success" role="alert">
                        Wallet has been funded successfully
                    </div>
                }
                {
                    error &&
                    <div className="alert alert-danger" role="alert">
                        {errorMsg}
                    </div>
                }
                <div className="card-body">
                    <form name="form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Amount</label>
                            <div className="input-group">
                                <input type="text"
                                    name="amount"
                                    className="form-control"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>PIN</label>
                            <PinInput
                                length={4}
                                focus
                                secret
                                name="pin"
                                type="numeric"
                                onChange={(text) => setPin(text)}
                            />
                        </div>

                        <button className="btn btn-primary">
                            VERIFY
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Deposit
