import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@material-ui/icons/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

export default function BasicModal({ handleModalClick, img }) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    handleModalClick();
  };

  return (
    <div>
      <Modal
        open={open}
        // onClose={handleClick}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CloseIcon
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              margin: "10px",
              fontSize: "35px",
              cursor: "pointer",
              backgroundColor: "white",
              padding: "7px",
            }}
            onClick={handleClose}
          />
          <img src={img} style={{ height: "100%", width: "100%" }} alt="" />
        </Box>
      </Modal>
    </div>
  );
}
