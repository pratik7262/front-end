import { useContext } from "react";
import Admin from "./panels/Admin";
import userContext from "./contexts/userContext/userContext";
import User from "./panels/User";

function App() {
  const contextVars = useContext(userContext);
  console.log(contextVars.user)
  return <>{contextVars.user.isAdmin ? <Admin /> : <User />}</>;
}

export default App;
