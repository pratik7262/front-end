import { useState } from "react";
import ModalContext from "./modalContext";

const ModalState = (props) => {
  const [open, setOpen] = useState(false);
  const [sOpen, setsOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setsOpen(false);
  };

  const handleOpen = () => setOpen(true);
  const handlesOpen = () => setsOpen(true);

  const states = { handleClose, handleOpen, open,sOpen,handlesOpen };
  return (
    <ModalContext.Provider value={states}>
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalState;
