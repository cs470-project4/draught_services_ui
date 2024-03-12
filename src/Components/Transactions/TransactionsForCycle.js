import { useEffect, useState } from "react";
import API from "../../API_Interface/API_Interface";
import { Typography, Grid, Card, CardContent } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

function TransactionsForCycle({ selectedCycle, setSelectedCycle}) {
  const [transactionCount, setTransactionCount] = useState(0);

  useEffect(() => {
    const api = new API();
    const fetchTransactionCount = async () => {
      if (selectedCycle) {
        const response = await api.getTransactionsForCycle(selectedCycle);
        setTransactionCount(response.data[0].transaction_count);
      }
    };
      fetchTransactionCount();
  }, [selectedCycle]);
  

  if (transactionCount === null) {
    return <div>Loading...</div>;
  }
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
              {transactionCount} Transactions
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
export default TransactionsForCycle;
