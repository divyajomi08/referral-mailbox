import React, { useState } from "react";

import { Button, TextField, Modal, Typography, Box } from "@material-ui/core";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

const NewReferralModal = ({ isModalOpen, setIsModalOpen, handleSubmit, handleClose }) => {
  const [referredEmail, setReferredEmail] = useState("");


  return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Send New Referral
        </Typography>
        <hr></hr>
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-1">
            <Typography
              id="modal-modal-title"
              variant="subtitle1"
              component="h2"
            >
              Enter the recipient email address:
            </Typography>
            <TextField
              variant="outlined"
              name="email"
              size="small"
              label="Email"
              InputProps={{
                style: { borderRadius: "8px" },
              }}
              value={referredEmail}
              onChange={(e) => setReferredEmail(e.target.value)}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            className="self-end"
            onClick={()=>handleSubmit(referredEmail)}
          >
            Send
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default NewReferralModal;
