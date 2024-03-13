import { useEffect, useState } from "react";
import API from "../../API_Interface/API_Interface";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function Row({ account }) {
  const [open, setOpen] = useState(false);
  // Implement fetching of transactions for this account if necessary

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {account.accountName}
        </TableCell>
        <TableCell align="right">{account.accountID}</TableCell>
        <TableCell align="right">{account.routeID}</TableCell>
        <TableCell align="right">{account.marketID}</TableCell>
        <TableCell align="right">{account.status}</TableCell>
        <TableCell align="right">{account.lastModified}</TableCell>
        <TableCell align="right">{account.cycleID}</TableCell>
      </TableRow>
      {/* Implement the collapse content */}
    </>
  );
}

Row.propTypes = {
  account: PropTypes.object.isRequired,
};



function AccountsTable({ selectedCycle }) {
  const [ accounts, setAccounts ] = useState([]);
  const api = new API();
  useEffect(() => {
    const fetchAccounts = async () => {
      if (selectedCycle) {
        const response = await api.accountsForCycle(selectedCycle);
        console.log(`response.data: ${JSON.stringify(response.data, null, 2)}`);
        setAccounts(response.data);
      }
    };
    fetchAccounts();
  }, [selectedCycle]);
  
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Account Name</TableCell>
            <TableCell align="right">Account ID</TableCell>
            <TableCell align="right">Route ID</TableCell>
            <TableCell align="right">Market ID</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Last Modified</TableCell>
            <TableCell align="right">Cycle ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts.map((account) => (
            <Row key={account.accountID} account={account} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default AccountsTable;
