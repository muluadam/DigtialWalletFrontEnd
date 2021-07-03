import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    verify,
    getTransactions,
    delete: _delete
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiUrl}/api/v1/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log("JSON USER ", user);
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    let user = JSON.parse(localStorage.getItem('user'));

    const requestOptions = {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + user.token,
            'Access-Control-Allow-Origin': "*",
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }),
        // mode: "no-cors",
    };

    return fetch(`${config.apiUrl}/api/v1/welcom`, requestOptions)
        .then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/api/v1/register`, requestOptions)
        .then(resp => {
            return resp.text().then(text => {
                const data = text && JSON.stringify(text);
                console.log("data ", data);
            })
        }
        );
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
}

function verify(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/api/v1/registration/confirm`, requestOptions)
        .then(resp => {
            return resp.text().then(text => {
                const data = text && JSON.stringify(text);
                console.log("data ", data);
            })
        }
        );
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function getTransactions(walletID) {
    let user = JSON.parse(localStorage.getItem('user'));

    const requestOptions = {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + user.token,
            'Access-Control-Allow-Origin': "*",
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }),
        // mode: "no-cors",
    };

    return fetch(`${config.apiUrl}/api/v1/wallet/${walletID}/transactions`, requestOptions)
        .then(handleResponse);
}