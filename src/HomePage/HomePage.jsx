import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TransactionModal from './modals/TransactionModal';
import { userActions } from '../_actions';
import { DepositMoney } from '../DepositMoney/DepositMoney';
import { TransferFunds } from '../TransferFunds/TransferFunds';
import { AddCard } from '../AddCard/AddCard';
import UserProfile from './modals/UserProfile';
import TransactionList from "./TransactionList";
import Addcard from './modals/Addcard';
import Deposit from './modals/Deposit';
import Transfer from './modals/Transfer';

function HomePage() {
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const [showBalance, setShowBalance] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(userActions.getAll());

    }, []);

    const handleClick = useCallback(() => {
        dispatch(userActions.getAll());
    }, []);


    return (

        <div>
            <div style={{ width: "100%", backgroundColor: "#00008B", height: '100px' }}>
                <div data-toggle="modal" data-target="#userProfile"
                    style={{ display: "flex", justifyContent: "flex-end", padding: 10, alignItems: "center" }}>
                    <div style={{
                        border: "2px solid grey", borderRadius: 50,
                        height: 60, width: 60, marginTop: 10, backgroundColor: "#fff",
                        display: "flex", justifyContent: "center", alignItems: "center",
                    }}>
                        <h4 style={{ textAlign: "center" }}>MS</h4>
                    </div>
                </div>
                {users.loading && <em>Loading...</em>}

                {/*User Modal Trigger */}
                <div className="modal fade" id="userProfile" tabindex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="depositMoneyLabel">USER PROFILE</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                    <h5 style={{ textAlign: "center" }}>
                                        YOUR TAG TO RECEIVE MONEY IS:
                                    </h5>

                                    <button className="btn" style={{
                                        marginTop: 30, backgroundColor: "#00008B",
                                        width: 300, alignSelf: "center", padding: 15,
                                        color: "#fff"
                                    }}>
                                        {
                                            users.items &&
                                            <h6>{users.items.wallets[0].tag}</h6>
                                        }
                                    </button>

                                    {/* <Link to='/login' style={{ alignSelf: "center" }}>
                                        <button className="btn btn-outline-danger" style={{ marginTop: 60, width: 300, alignSelf: "center" }}>
                                            LOGOUT
                                        </button>
                                    </ Link> */}


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <center>
                {/* available balance */}
                <div className="card col-md-6" style={{
                    borderRadius: 15,
                    border: "3px solid #E5E5E5",
                    marginTop: 10
                }}>
                    <div className="card-body" onClick={() => setShowBalance(!showBalance)}>
                        <h2 style={{
                            textDecorationLine: "underline",
                            fontFamily: "Raleway", fontWeight: "bolder"
                        }}>
                            Available Balance
                        </h2>

                        {users.items &&
                            <>
                                {console.log("WALLET DETAILS ", users.items.wallets[0])}
                                <h1 style={{ fontWeight: "bolder" }}>
                                    {showBalance ? "********" : `$${Number(users.items.wallets[0].amount).toLocaleString()}`}
                                </h1>
                            </>
                        }
                    </div>

                </div>
                {/* available balance */}

                {/* buttons */}
                <div className="col-md-6" style={{
                    display: "flex", flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: 20
                }}>
                    <button className="btn col-md-3" data-toggle="modal" data-target="#transferFunds" style={{
                        height: 100, backgroundColor: "#3DB86E", color: "#fff"
                        , fontWeight: "bolder"
                    }}>
                        TRANSFER
                    </button>
                    <button className="btn col-md-4" data-toggle="modal" data-target="#depositMoney"
                        style={{
                            backgroundColor: "#00008B", color: "#fff",
                            height: 100, fontWeight: "bolder"
                        }}>
                        DEPOSIT
                    </button>

                    <button className="btn col-md-3 btn-outline-danger" data-toggle="modal" data-target="#addCard"
                        style={{
                            height: 100, fontWeight: "bolder"
                        }}>
                        ADD CARD
                    </button>

                    {/*Deposit money Modal Trigger */}
                    <div className="modal fade" id="transferFunds" tabindex="-1" role="dialog" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="depositMoneyLabel">Transfer Funds</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClick}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {users.items &&
                                        <Transfer walletId={users.items.wallets[0].walletId} />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*Deposit money Modal Trigger */}
                    <div className="modal fade" id="depositMoney" tabindex="-1" role="dialog" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="depositMoneyLabel">Deposit money</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClick}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {users.items &&
                                        <Deposit walletId={users.items.wallets[0].walletId} />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*Add Card Modal Trigger */}
                    <div className="modal fade" id="addCard" tabindex="-1" role="dialog" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="depositMoneyLabel">Add Card</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <Addcard />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* buttons */}

                {/* Transactions */}
                <div className="col-md-6" style={{ marginTop: 50 }}>
                    <h4 style={{ textAlign: "left" }}>TRANSACTIONS</h4>

                    {users.items &&
                        <TransactionList walletId={users.items.wallets[0].walletId} />
                    }



                </div>
            </center>

            {/* MODAL TRIGGERS */}


        </div>
    );
}

export { HomePage };