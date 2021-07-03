import React, {useState} from "react";

import { FormInput } from "../_components/FormInput";
import {useDispatch, useSelector} from "react-redux";
import {depositMoney, verifyPin} from "../_actions/depositMoneyActions";


export const DepositMoney = () => {
    const [amount, setAmount] = useState("");
    const [pin, setPin] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch();
    const formFields =[
        {
            id: "amount",
            type: "text",
            label: "Amount",
            name: 'amount',
        },
    ]
    
    const handleSubmit = (e) =>  {
        e.preventDefault();
        setSubmitted(true);
        
        if (amount && pin) {
            dispatch(verifyPin(pin));
            dispatch(depositMoney(amount));
        }

    }
    const handleChange = (event) => {
        const { value } = event.target;
        setAmount(value);
    }

    return(
        <div className="card">
            <div className="card-body">
                {submitted && !amount && !pin && (
                    <div>
                        Please enter a  valid pin or amount
                    </div>
                )}
                <FormInput
                    formFields={formFields}
                    setPin={setPin}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    )
}