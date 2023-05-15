import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import { Search, ExitToApp } from "@mui/icons-material";
import EmailAddressTable from "./Table";
import ReferralModal from "./ReferralModal";
import referralApis from "../../apis/referrals";
import authenticationApis from "../../apis/authentication";
import useDebounce from "hooks/useDebounce";

const useStyles = makeStyles({
  iconColor: {
    color: "grey",
  },
});

const Dashboard = () => {
  const classes = useStyles();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [referredEmail, setReferredEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailAddresses, setEmailAddresses] = useState([]);
  const [isEmailsLoading, setIsEmailsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const debounceSearchTerm = useDebounce(searchTerm, 300);

  const handleClose = () => {
    setReferredEmail("");
    setIsModalOpen(false);
  };

  const handleOpen = () => setIsModalOpen(true);

  const fetchEmailAddresses = async () => {
    try {
      setIsEmailsLoading(true);
      const response = await referralApis.fetchEmails(
        searchTerm,
        page,
        rowsPerPage
      );
      setEmailAddresses(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsEmailsLoading(false);
    }
  };

  const handleSubmit = async (referredEmail) => {
    try {
      setIsLoading(true);
      await referralApis.create({
        referral: { referred_email: referredEmail },
      });
      fetchEmailAddresses();
    } catch (error) {
      console.log(error);
    } finally {
      handleClose();
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await authenticationApis.logout();
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmailAddresses();
  }, [debounceSearchTerm, page, rowsPerPage]);

  return (
    <div className="flex flex-col gap-6 m-8">
      <div className="flex gap-4 justify-between">
        <Typography variant="h5" className="self-center">
          Referred Email Addresses
        </Typography>
        <Button onClick={handleSignOut} endIcon={<ExitToApp />}>
          Sign out
        </Button>
      </div>
      <div className="flex gap-4 self-end">
        <TextField
          variant="outlined"
          name="search"
          size="small"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            style: { borderRadius: "8px" },
            startAdornment: (
              <InputAdornment position="start">
                <Search className={classes.iconColor} />
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
      <EmailAddressTable
        emailAddresses={emailAddresses}
        isEmailsLoading={isEmailsLoading}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        page={page}
        setPage={setPage}
      />
      <ReferralModal
        isModalOpen={isModalOpen}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        referredEmail={referredEmail}
        setReferredEmail={setReferredEmail}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Dashboard;
