import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import { EMAIL_REGEX } from "constants";

export const formatRailsErrors = (errors) => {
  const errorMessages = [];
  for (const key in errors) {
    if (Array.isArray(errors[key])) {
      errors[key].forEach((message) => {
        errorMessages.push(`${key} ${message}`);
      });
    }
  }
  return errorMessages.join(", ");
};

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#3f51b5",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const useButtonStyles = makeStyles((theme) => ({
  customButton: {
    borderRadius: "8px",
  },
}));

export const useIconStyles = makeStyles({
  iconColor: {
    color: "grey",
  },
});

export const isEmailValid = (email) => EMAIL_REGEX.test(email);