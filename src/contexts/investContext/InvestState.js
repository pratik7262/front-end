import { useState } from "react";
import InvestContext from "./investContext";

const InvestState = (props) => {
  const [disabled, setDisabled] = useState(false);
  const invest = async (
    name,
    price,
    user,
    units,
    propertyId,
    url,
    handleClose
  ) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: name,
        price: price,
        sellerId: user,
        units: units,
        propertyId: propertyId,
      }),
    });
    const json = await response.json();
    if (json.resMSG) {
      alert(json.resMSG);
      setDisabled(false);
      handleClose();
    } else {
      alert("Some Error Occured");
      setDisabled(false);
    }
  };

  return (
    <InvestContext.Provider value={{ disabled, setDisabled, invest }}>
      {props.children}
    </InvestContext.Provider>
  );
};

export default InvestState;
