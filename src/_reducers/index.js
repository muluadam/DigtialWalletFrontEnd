import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { depositMoneyReducer, verifyPinReducer } from './depositMoney.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    alert,
    depositMoneyReducer,
    verifyPinReducer
});

export default rootReducer;