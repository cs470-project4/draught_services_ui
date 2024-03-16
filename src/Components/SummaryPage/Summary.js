import React, { useEffect, useState } from "react";
import API from "../../API_Interface/API_Interface";
import {
  Typography,
  Grid,
    Card,
    Box,
  CardContent,
    CircularProgress,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
} from "@mui/material";

export default function Summary() {
  const [totalTransactions, setTotalTransactions] = useState(null);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const api = new API();
    async function fetchData() {
        const totalResp = await api.summaryTotal();
        console.log(
          `totalResp: ${JSON.stringify(
            totalResp.data,
            null,
            2
          )}`
        );
      setTotalTransactions(totalResp.data.totaltransactions);

        const topProductsResp = await api.summaryTopProducts();
        console.log(`topProductsResp: ${JSON.stringify(topProductsResp.data, null, 2)}`);
      setTopProducts(topProductsResp.data);
    }
    fetchData();
  }, []);

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Grid item>
        <Typography component="h2" variant="h3" gutterBottom>
          Summary
        </Typography>
      </Grid>
      <Grid item>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div" textAlign="center">
              Total Transactions in Latest Cycle
            </Typography>
            <Box display="flex" justifyContent="center">
              <Typography
                variant="h4"
                component="div"
                style={{ fontWeight: "bold" }}
              >
                {totalTransactions !== null ? (
                  totalTransactions
                ) : (
                  <CircularProgress />
                )}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div" textAlign="center">
              Top Products by Taps in Latest Cycle
            </Typography>
            {topProducts.length ? (
              <TableContainer component={Paper}>
                <Table aria-label="top products table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Product ID</TableCell>
                      <TableCell align="right">Taps</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topProducts.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {product.productID}
                        </TableCell>
                        <TableCell align="right">{product.totaltaps}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <CircularProgress />
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
