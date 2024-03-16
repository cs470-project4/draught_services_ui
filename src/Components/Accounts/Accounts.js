import React, {useState, useEffect, Fragment} from 'react';
import Typography from '@mui/material/Typography';
import API from "../../API_Interface/API_Interface";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function Accounts(props) {
    const [accounts, setAccounts] = useState([]);
    useEffect(() => {
        const api = new API();
        async function getAccounts() {
            const accountsJSONString = await api.getActiveAccounts();
            console.log(`accountsJSONString: ${JSON.stringify(accountsJSONString.data, null, 2)}`);
            setAccounts(accountsJSONString.data);
        }
        getAccounts();
    }, []);
    return (
        <Fragment>
            <Typography component="div" variant='h2'>
                All Active Accounts
            </Typography>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Account Name</TableCell>
                            <TableCell align="right">Account ID</TableCell>
                            <TableCell align="right">Route ID</TableCell>
                            <TableCell align="right">Market ID</TableCell>
                            <TableCell align="right">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accounts.map((account, key) => (
                            <TableRow key={key}>
                                <TableCell component="th" scope="row">
                                    {account.accountName}
                                </TableCell>
                                <TableCell align="right">{account.accountID}</TableCell>
                                <TableCell align="right">{account.routeID}</TableCell>
                                <TableCell align="right">{account.marketID}</TableCell>
                                <TableCell align="right">{account.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    )
}

