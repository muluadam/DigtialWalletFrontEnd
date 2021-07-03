import React from 'react'
import { Link } from "react-router-dom"
const UserProfile = (props) => {
    return (
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <h5 style={{ textAlign: "center" }}>
                YOUR TAG TO RECEIVE MONEY IS:
            </h5>

            <button className="btn" style={{
                marginTop: 30, backgroundColor: "#00008B",
                width: 300, alignSelf: "center", padding: 15,
                color: "#fff"
            }}>
                $BIGBREAD
            </button>


            <button onClick={props.onClick} className="btn btn-outline-danger" style={{ marginTop: 60, width: 300, alignSelf: "center" }}>
                LOGOUT
            </button>

        </div>
    )
}

export default UserProfile
