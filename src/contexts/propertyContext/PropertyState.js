import PropertyContext from "./propertyContext";
import { addProperty } from "./functions";

const PropertyState = (props) => {
   
  let states = {addProperty };
  return (
    <PropertyContext.Provider value={states}>
      {props.children}
    </PropertyContext.Provider>
  );
};

export default PropertyState;
