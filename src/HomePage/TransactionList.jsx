import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TransactionModal from './modals/TransactionModal';
import { userActions } from '../_actions';
import axios from "axios";

function TransactionList(props) {

    const users = useSelector(state => state.transactions);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);

    const user = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        axios.get(`http://127.0.0.1:9090/api/v1/wallet/${props.walletId}/transactions`, {
            headers: {
                'Authorization': 'Bearer ' + user.token,
                'Access-Control-Allow-Origin': "*",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => setData(res.data))

    }, []);


    return (
        <div>
            {/* transaction cards */}
            <div className="card col-md-12" style={{
                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                borderRadius: 10,
                marginTop: 20,
                transition: "0.3s"
            }}>
                {/* {users.loading && <em>Loading...</em>} */}
                {console.log("TRAZZZ ", data)}

                {
                    data.length > 0 &&
                    data.map((item, index) => {

                        return (
                            <div key={index} style={{
                                display: "flex", flexDirection: "row",
                                justifyContent: "space-between", padding: 10
                            }}
                                data-toggle="modal" data-target="#exampleModal">
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <div style={{ width: 50, height: 50, backgroundColor: "#00008B", borderRadius: 50 }}>
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column"
                                    }}>
                                        <h5 style={{ marginLeft: 5, fontFamily: "Raleway", fontWeight: "bolder" }}>
                                            {item.comment}
                                        </h5>
                                        <h6 style={{ marginLeft: 5, fontFamily: "Raleway", textAlign: "left" }}>
                                            {item.transactionDate}
                                        </h6>
                                    </div>
                                </div>

                                <div style={{
                                    display: "flex", justifyContent: "center",
                                    alignItems: "center", textAlign: "center"
                                }}>
                                    <h6 style={{ fontWeight: "bolder", color: "#000" }}>${Number(item.amount).toFixed(2)}</h6>
                                </div>

                                {/*Transaction Modal Trigger */}
                                <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Transaction Details</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <TransactionModal reference={(Math.random() * 9000000).toFixed()} description={item.comment} amount={500} status={item.status} />
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        )
                    })



                }
            </div>
        </div>
    )
}

export default TransactionList
