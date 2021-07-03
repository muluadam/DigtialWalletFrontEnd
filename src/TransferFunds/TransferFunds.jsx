import React, { useState } from "react";

import { FormInput } from "../_components/FormInput";
import { useDispatch, useSelector } from "react-redux";
import { depositMoney, verifyPin } from "../_actions/depositMoneyActions";


export const TransferFunds = () => {
    const [transferFundsInputs, setTransferFundsInputs] = useState({
        tag: "",
        amount: "",
        reason:"",
    });
    const [submitted, setSubmitted] = useState(false);
    const [pin, setPin] = useState("");
    const { tag, amount, reason } = transferFundsInputs;
    const dispatch = useDispatch();
    const formFields = [
        {
            id: "recipient",
            type: "text",
            label: "Recipient",
            name: 'recipient',
        },
        {
            id: "amount",
            type: "text",
            label: "Amount",
            name: 'amount',
        },
        {
            id: "reason",
            type: "text",
            label: "Description",
            name: 'reason',
        },
    ]
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (amount && pin) {
            dispatch(verifyPin(pin));
            dispatch(depositMoney(amount));
        }

    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setTransferFundsInputs((previousValue) => {
            return {
                ...previousValue,
                [name]: value
            }
        })
    }
    return (
        <div className="card">
            <div className="card-body">
                {submitted && !parseInt(amount,10) && !parseInt(pin,10) && (
                    <div className="">
                        Please enter a  valid pin or amount
                    </div>
                )}
                <FormInput
                    formFields={formFields}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    transferFunds={true}
                    setPin={setPin}
                />
            </div>
        </div>
    )
}