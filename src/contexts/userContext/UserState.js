import { useState } from "react";
import { login,signUp } from "./functions";
import UserContext from "./userContext";

const UserState = (props) => {
  const [user, setUser] = useState({isAdmin:false})
  let states = { login,signUp,user,setUser };
  return (
    <UserContext.Provider value={states}>{props.children}</UserContext.Provider>
  );
};

export default UserState;
