import React, { useEffect, useState } from "react";
import API from "../../API_Interface/API_Interface";

function Cycle({selectedCycle}) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (selectedCycle) {
        try {
          const api = new API();
          const response = await api.transactionsForCycle(selectedCycle);
          setTransactions(response.data);
        } catch (error) {
          console.error("Failed to fetch transactions", error);
          // Handle error appropriately
        }
      }
    };

    fetchTransactions();
  }, [selectedCycle]);

  return (
    <div>
      <h2>Transactions by Cycle {selectedCycle}</h2>
      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Route Name</th>
            <th>Account ID</th>
            <th>Product ID</th>
            <th>Taps</th>
            <th>Last Modified</th>
            <th>Cycle ID</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.transactionID}</td>
              <td>
                {new Date(transaction.transactionDate).toLocaleDateString()}
              </td>
              <td>{transaction.routeName}</td>
              <td>{transaction.accountID}</td>
              <td>{transaction.productID}</td>
              <td>{transaction.taps}</td>
              <td>{new Date(transaction.lastModified).toLocaleDateString()}</td>
              <td>{transaction.cycleID}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Cycle;
