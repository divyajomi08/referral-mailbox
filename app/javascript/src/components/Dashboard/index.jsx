import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import EmailAddressTable from "./Table";
import NewReferralModal from "./NewReferralModal";
import referralApis from "../../apis/referrals";

const useStyles = makeStyles({
  iconColor: {
    color: "grey",
  },
});

const Dashboard = () => {
  const classes = useStyles();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [referredEmail, setReferredEmail] = useState("");

  const handleClose = () => {
    setReferredEmail("");
    setIsModalOpen(false);
  };

  const handleOpen = () => setIsModalOpen(true);

  const handleSubmit = async (referredEmail) => {
    try {
      await referralApis.create({
        referral: { referred_email: referredEmail },
      });
    } catch (error) {
      console.log(error);
    } finally {
      handleClose()
    }
  };

  return (
    <div className="flex flex-col gap-6 m-8">
      <div className="flex gap-4 justify-between">
        <Typography variant="h5" className="self-center">
          Referred Email Addresses
        </Typography>
        <div className="flex gap-4 self-end">
          <TextField
            variant="outlined"
            name="search"
            size="small"
            placeholder="Search"
            InputProps={{
              style: { borderRadius: "8px" },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon className={classes.iconColor} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            size="medium"
            onClick={handleOpen}
          >
            New Referral
          </Button>
        </div>
      </div>
      <EmailAddressTable />
      <NewReferralModal
        isModalOpen={isModalOpen}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        referredEmail ={referredEmail}
        setReferredEmail={setReferredEmail}
      />
    </div>
  );
};

export default Dashboard;
