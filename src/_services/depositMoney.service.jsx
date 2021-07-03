import config from 'config';

const dummyData = [
    { id: 1, amount: 3000, pin: 1234 },
    { id: 2, amount: 2000, pin: 1230 },
    { id: 3, amount: 1000, pin: 1224 }
]

export const depositMoneyService = {
    deposit,
    verifyPin,
    verifyCard
};

function deposit(walletId, amount, pin) {
    const requestOptions = {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + user.token,
            'Access-Control-Allow-Origin': "*",
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }),
        // body: JSON.stringify({ amount })
    };
    // return dummyData;
    return fetch(`${config.apiUrl}/api/v1/wallet/${walletId}/topUp?amount=${amount}&pin=${pin}`, requestOptions)
        .then(response => response.json())
        .then(data => dummyData)
        .catch(error => error);
}

function verifyPin(amount, receiverTag, comment, pin, senderId) {
    const requestOptions = {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + user.token,
            'Access-Control-Allow-Origin': "*",
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({ amount, receiverTag, comment, pin })
        // mode: "no-cors",
    };


    return fetch(`${config.apiUrl}/api/v1/wallet/${senderId}/transfer`, requestOptions)
        .then(response => response.json())
        .then(data => true)
        .catch(error => error);
}

function verifyCard({ cardNumber, expareDate, csv }) {
    let user = JSON.parse(localStorage.getItem('user'));

    const requestOptions = {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + user.token,
            'Access-Control-Allow-Origin': "*",
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({ cardNumber, expareDate, csv })
        // mode: "no-cors",
    };

    // return true;
    return fetch(`${config.apiUrl}/api/v1/wallet/add/card`, requestOptions)
        .then(resp => {
            return resp.text().then(text => {
                const data = text && JSON.stringify(text);
                console.log("data ", data);
            })
        }
        )
        .then(data => true)
        .catch(error => error);
}
