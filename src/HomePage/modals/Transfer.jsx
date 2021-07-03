import React, { useState, useEffect } from 'react'
import PinInput from "react-pin-input";
import axios from "axios";

function Transfer(props) {
    const [state, setState] = useState({
        amount: "",
        recepient: "",
        description: ""
    });
    const [pin, setPin] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const { amount, recepient, description } = state;
        const user = JSON.parse(localStorage.getItem('user'));
        console.log("AMNT ", amount, pin, recepient, description);
        if (amount && pin && recepient && description) {
            axios.post(
                `http://127.0.0.1:9090/api/v1/wallet/${props.walletId}/transfer`, {
                amount,
                recieverTag: recepient,
                comment: description,
                pin
            }, {
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
                    TRANSFER
                </div>
                {
                    showAlert &&
                    <div className="alert alert-success" role="alert">
                        Transfer executed successfully
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
                            <label>Recepient</label>
                            <div className="input-group">
                                <span className="input-group-text" >@</span>
                                <input type="text"
                                    name="recepient"
                                    className="form-control"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Amount</label>
                            <div className="input-group">
                                <span className="input-group-text" >$</span>
                                <input type="text"
                                    name="amount"
                                    className="form-control"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <div className="input-group">
                                <input type="text"
                                    name="description"
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
                                secret
                                focus
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

export default Transfer
