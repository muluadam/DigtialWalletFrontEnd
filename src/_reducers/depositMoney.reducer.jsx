import { depositMoneyConstants } from '../_constants';

const initialState={
    loading: "false",
    amount: 0,
    error:""
}
export function depositMoneyReducer(state = initialState, action) {
    switch (action.type) {
        case depositMoneyConstants.DEPOSIT_MONEY_REQUEST:
            return { ...state,
                loading: true
            };
        case depositMoneyConstants.DEPOSIT_MONEY_SUCCESS:
            return {
                ...state,
                loading: false,
                amount: action.data.amount
            };
        case depositMoneyConstants.DEPOSIT_MONEY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}

const verifyInitialState = {
    loading: false,
    verify: false,
    error: ''
}
export function verifyPinReducer(state = verifyInitialState, action) {
    switch (action.type) {
        case depositMoneyConstants.VERIFY_PIN_REQUEST:
            return { ...state,
                loading: true
            };
        case depositMoneyConstants.VERIFY_PIN_SUCCESS:
            return {
                ...state,
                loading: false,
                verify: true
            };
        case depositMoneyConstants.VERIFY_PIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}