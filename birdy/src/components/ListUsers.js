import axios from "axios";
import { useState, useEffect } from "react";
import User from "./User";

function ListUsers(props) {



    return (
        <div className="mt-4">
            <div className="grid">
                {props.users.map((user) => {
                    return (
                        <div>
                            <User 
                                myfollowings={props.myfollowings}
                                setMyfollowings={props.setMyfollowings}
                                getuser={props.getuser} setPage={props.setPage} setVisitMe={props.setVisitMe} setUsers={props.setUsers} me={props.me} user={user} />
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )
}

export default ListUsers;