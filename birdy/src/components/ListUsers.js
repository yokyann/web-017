import axios from "axios";
import { useState, useEffect } from "react";
import User from "./User";

function ListUsers(props){

 

    return (
        <div className="mt-4">
              <div className="grid">
                {props.users.map((user) => {
                    return (
                        <div>
                            <User setPage={props.setPage} setVisitMe={props.setVisitMe} setUsers={props.setUsers} me={props.me} user={user}/>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )
}

export default ListUsers;