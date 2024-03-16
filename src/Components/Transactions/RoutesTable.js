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
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";

function Row({ route, selectedCycle }) {
  const [open, setOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const api = new API();

  // click callback to get transactions for this account
  const handleExpandClick = async () => {
    setOpen(!open);
    // only fetch transactions if the row is open
    if (!open && transactions.length === 0) {
      try {
        const response = await api.routeTransactionsForCycle(
          selectedCycle,
          route.routeID
        );
        console.log(`inner response.data: ${JSON.stringify(response.data, null, 2)}`);
        setTransactions(response.data);
      } catch (error) {
        console.error("Failed to fetch transactions", error);
        // Handle error appropriately
      }
    }
  };

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleExpandClick}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {route.routeName}
        </TableCell>
        <TableCell align="right">{route.routeID}</TableCell>
        <TableCell align="right">{route.marketID}</TableCell>
        <TableCell align="right">{route.status}</TableCell>
        <TableCell align="right">{route.lastModified}</TableCell>
        <TableCell align="right">{route.cycleID}</TableCell>
      </TableRow>
      {/* Implement the collapse content */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Transactions
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {/* Define the headers for your transactions data */}
                    <TableCell>Route Name</TableCell>
                    <TableCell>Route ID</TableCell>
                    <TableCell>Account ID</TableCell>
                    <TableCell>Cycle ID</TableCell>
                    <TableCell>Taps</TableCell>
                    <TableCell>Last Modified</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((transaction, key) => (
                    <TableRow key={key}>
                      {/* Display transaction data */}
                      <TableCell>{transaction.routeName}</TableCell>
                      <TableCell>{transaction.routeID}</TableCell>
                      <TableCell>{transaction.accountID}</TableCell>
                      <TableCell>{transaction.cycleID}</TableCell>
                      <TableCell>{transaction.taps}</TableCell>
                      <TableCell>{transaction.lastModified}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  account: PropTypes.object.isRequired,
};

function RoutesTable({ selectedCycle }) {
  const [routes, setRoutes] = useState([]);
  const api = new API();
  useEffect(() => {
    const fetchAccounts = async () => {
      if (selectedCycle) {
        const response = await api.routesForCycle(selectedCycle);
        console.log(`routes response.data: ${JSON.stringify(response.data, null, 2)}`);
        setRoutes(response.data);
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
            <TableCell>Route Name</TableCell>
            <TableCell align="right">Route ID</TableCell>
            <TableCell align="right">Market ID</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Last Modified</TableCell>
            <TableCell align="right">Cycle ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {routes.map((route, key) => (
            <Row
              key={key}
              route={route}
              selectedCycle={selectedCycle}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RoutesTable;
