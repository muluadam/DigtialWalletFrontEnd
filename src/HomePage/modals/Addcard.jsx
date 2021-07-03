import React, { useState, useEffect } from 'react'
import axios from 'axios';


function Addcard() {
    const [state, setState] = useState({
        cardNumber: "",
        expareDate: "",
        csv: ""
    });
    const [showAlert, setShowAlert] = useState(false);

    const handleSubmit = (e) => {
        console.log("ENTERING SUMBIT")
        e.preventDefault();
        const { cardNumber, expareDate, csv } = state;
        const user = JSON.parse(localStorage.getItem('user'));
        if (cardNumber && expareDate && csv) {
            axios.post(
                `http://127.0.0.1:9090/api/v1/add/card`, { cardNumber, expareDate, csv }, {
                headers: {
                    'Authorization': 'Bearer ' + user.token,
                    'Access-Control-Allow-Origin': "*",
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },

            })
                .then(res => {
                    if (res.status == 200) {
                        setShowAlert(true);
                    }
                })
                .catch(err => console.log("ERROR ", err))
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
                    ADD CARD
                </div>
                {
                    showAlert &&
                    <div class="alert alert-success" role="alert">
                        Card has been added successfully
                    </div>
                }
                <div className="card-body">
                    <form name="form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Card Number</label>
                            <div className="input-group">
                                <input type="text"
                                    name="cardNumber"
                                    className="form-control"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Expiry Date</label>
                            <div className="input-group">
                                <input type="text"
                                    name="expareDate"
                                    className="form-control"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>CSV</label>
                            <div className="input-group">
                                <input type="password"
                                    name="csv"
                                    className="form-control"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
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

export default Addcard
