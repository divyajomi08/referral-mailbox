import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { Typography } from "@material-ui/core";

import CircularProgress from "@mui/material/CircularProgress";
import { StyledTableCell, StyledTableRow } from "utils";

const EmailAddressTable = ({
  emailAddresses,
  isEmailsLoading,
  rowsPerPage,
  setRowsPerPage,
  page,
  setPage,
}) => {

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(1);
  };

  if (isEmailsLoading) {
    return (
      <div className="flex h-screen w-screen justify-center">
        <CircularProgress className="self-center" size="3rem" />
      </div>
    );
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Email Address</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
            </TableRow>
          </TableHead>
          {emailAddresses.referrals.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant="body1" className="flex justify-center">
                  No Data
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <TableBody>
              {emailAddresses.referrals.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.referred_email}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.status}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {emailAddresses.referrals.length !== 0 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={emailAddresses.referrals_count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};

export default EmailAddressTable;
