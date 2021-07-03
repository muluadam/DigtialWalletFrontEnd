import React from "react";
import PinInput from "react-pin-input";


const InputWrapper = ({field, handleChange}) => { 
    return (
            <input type={field.type}
                   name={field.name}
                   value={field.value}
                   className="form-control"
                   onChange={handleChange}
                   required
            />
    )
}

const PinWrapper = ({ setPin}) => {
    const handleChange = (value) => {
        setPin(value);
    }
    return (
        <div className="form-group">
            <label>PIN</label>
            <PinInput
            length={4}
            focus
            type="numeric"
            onChange={handleChange}
            />
        </div>
    )
}
export const FormInput = ({
                              formFields,
                              handleSubmit,
                              isCard,
                              handleChange,
                              transferFunds,
                              setPin
}) => {
    return(
        <form name="form" onSubmit={handleSubmit}>
            {formFields.map((field) => (
                <div className="form-group" key = {field.id}>
                    <label>{field.label}</label>
                    <div className="input-group has-validation">
                        {field.name === "recipient" &&
                            <span className="input-group-text" >$</span>
                        }
                        <InputWrapper
                            field={field}
                            handleChange={handleChange}
                        />
                    </div>
                </div>
            ))}
            {!isCard && <PinWrapper
                setPin={setPin}
            /> }
            <div className="form-group">
                <button className="btn btn-primary">
                    {transferFunds ? 'SUBMIT' : 'VERIFY' }
                </button>
            </div>
        </form>
    )
}