import React, { useState } from "react";

import { FormInput } from "../_components/FormInput";
import { useDispatch, useSelector } from "react-redux";
import { verifyCard } from "../_actions/depositMoneyActions";


export const AddCard = () => {
    const [addCardInputs, setAddCardInputs] = useState({
        cardNumber: "",
        expareDate: "",
        csv: ""
    });
    const [submitted, setSubmitted] = useState(false);
    const { cardNumber, expareDate, csv } = addCardInputs;
    const dispatch = useDispatch();
    const formFields = [
        {
            id: "cardNumber",
            type: "text",
            label: "Card Number"
        },
        {
            id: "expareDate",
            type: "text",
            label: "ExpiryDate"
        },
        {
            id: "csv",
            type: "text",
            label: "CSV"
        },
    ]

    const handleSubmit = (e) => {
        console.log("ENTERING SUMBIT")
        e.preventDefault();

        setSubmitted(true);
        if (cardNumber && expareDate && csv) {
            // get return url from location state or default to home page
            // const { from } = location.state || { from: { pathname: "/" } };
            dispatch(verifyCard({ cardNumber, expareDate, csv }));
        }
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setAddCardInputs((previousValue) => {
            return {
                ...previousValue,
                [name]: value
            }
        })
    }
    return (
        <div className="card">
            <div className="card-header">
                ADD CARD
            </div>
            <div className="card-body">
                <FormInput
                    formFields={formFields}
                    isCard={true}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    )
}