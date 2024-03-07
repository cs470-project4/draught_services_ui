import React, { useState, useEffect, Fragment } from "react";
import API from "../../API_Interface/API_Interface";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const marketsTableAttributes = [
  {
    title: "Market ID",
    attributeDBName: "marketID",
    align: "left",
  },
  {
    title: "Market Name",
    attributeDBName: "marketName",
    align: "left",
  },
  {
    title: "City",
    attributeDBName: "city",
    align: "left",
  },
  {
    title: "State",
    attributeDBName: "state",
    align: "left",
  },
  {
    title: "Status",
    attributeDBName: "status",
    align: "left",
  },
  {
    title: "Last Modified",
    attributeDBName: "lastModified",
    align: "left",
  },
  {
    title: "Date Created",
    attributeDBName: "dateCreated",
    align: "left",
  },
];

export default function Markets(props) {
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    const api = new API();
    async function getMarkets() {
      const marketsJSONString = await api.allMarkets();
      console.log(
        `markets from the DB ${JSON.stringify(marketsJSONString.data)}`
      );
      setMarkets(marketsJSONString.data);
    }
    getMarkets();
  }, []);

  const TRow = ({ marketObject }) => {
    return (
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        {marketsTableAttributes.map((attr, idx) => (
          <TableCell key={idx} align={attr.align}>
            {marketObject[attr.attributeDBName]}
          </TableCell>
        ))}
      </TableRow>
    );
  };

  return (
    <Fragment>
      {markets.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="route table">
            <TableHead>
              <TableRow>
                {marketsTableAttributes.map((attr, idx) => (
                  <TableCell key={idx} align={attr.align}>
                    {attr.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {markets.map((route, idx) => (
                <TRow marketObject={route} key={idx} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Fragment>
  );
}
