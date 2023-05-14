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

const useStyles = makeStyles({
  iconColor: {
    color: "grey",
  },
});

const Dashboard = () => {
  const classes = useStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);

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
      <NewReferralModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default Dashboard;