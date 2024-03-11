## Query for the cycleID
```sql
SELECT COUNT(*) AS transaction_count 
FROM transactions 
WHERE "cycleID" = (
    SELECT MAX("cycleID") - 1 FROM cycles
);
```
