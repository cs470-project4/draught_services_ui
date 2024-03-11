import { useEffect, useState } from "react";
import API from "../../API_Interface/API_Interface";
import { Typography, Paper, Grid, Card, CardContent } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

function CurrentCycleCount() {
  const [transactionsCount, setTransactionsCount] = useState(0);
  useEffect(() => {
    const api = new API();
    async function getTransactionsCount() {
      const transactionsCount = await api.getTransactionsCount();
      console.log(
        `transactions count from the DB ${JSON.stringify(transactionsCount.data[0].transaction_count)}`
      );
      setTransactionsCount(transactionsCount.data[0].transaction_count);
    }
    getTransactionsCount();
  }, []
  );
  return (
    <Card sx={{ minWidth: 275, margin: 2 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Transactions Count
        </Typography>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item>
            <TrendingUpIcon />
          </Grid>
          <Grid item>
            <Typography variant="h5" component="div">
              {transactionsCount} Transactions
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
export default CurrentCycleCount;
