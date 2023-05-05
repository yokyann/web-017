import axios from "axios";
import { useState, useEffect } from "react";
import User from "./User";

function ListUsers(props){

  async function fetchUsers() {
    try {
      const res = await axios.get("http://localhost:4000/api/users/all");
      props.setUsers(res.data);
    } catch (error) {
      console.log("error : ", error);
    }
  }

   useEffect(() => {
    fetchUsers();
    }, []);

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