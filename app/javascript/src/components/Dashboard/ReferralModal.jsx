import React from "react";

import { Button, TextField, Modal, Typography, Box } from "@material-ui/core";
import SendIcon from "@mui/icons-material/Send";
import { isEmailValid } from "utils";
import { BOX_STYLE } from "constants";

const ReferralModal = ({
  isModalOpen,
  handleSubmit,
  referredEmail,
  setReferredEmail,
  handleClose,
  isLoading,
}) => {
  return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={BOX_STYLE}>
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
            onClick={() => handleSubmit(referredEmail)}
            disabled={isLoading || !isEmailValid(referredEmail)}
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ReferralModal;
