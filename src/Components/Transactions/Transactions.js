import { useState, useEffect } from "react";
import API from "../../API_Interface/API_Interface";
import Accordion from "@mui/material/Accordion";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TransactionsForCycle from "./TransactionsForCycle";
import AccountsTable from "./AccountsTable";
import RoutesTable from "./RoutesTable";
import Cycle from "./Cycle";
import MarketID from "./MarketID";

export default function Transactions(props) {
      const [cycles, setCycles] = useState([]);
      const [selectedCycle, setSelectedCycle] = useState("");
      useEffect(() => {
        const api = new API();
        async function fetchCycles() {
            const response = await api.lastFiveCycles();
            if (response && response.data) {
                setCycles(response.data);
                setSelectedCycle(response.data[0].cycleID);
            }
        }
        fetchCycles();
      }, []);
        const handleCycleChange = (event) => {
            setSelectedCycle(event.target.value);
        };
    
  return (
    <div>
      <CycleSelect
        cycles={cycles}
        selectedCycle={selectedCycle}
        setSelectedCycle={setSelectedCycle}
        handleCycleChange={handleCycleChange}
      />
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Current Cycle Transaction Count
        </AccordionSummary>
        <AccordionDetails>
          <TransactionsForCycle
            selectedCycle={selectedCycle}
            setSelectedCycle={setSelectedCycle}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Transactions by Account
        </AccordionSummary>
        <AccordionDetails>
          <AccountsTable selectedCycle={selectedCycle} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          Transactions by Route
        </AccordionSummary>
        <AccordionDetails>
          <RoutesTable selectedCycle={selectedCycle} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4-content"
          id="panel4-header"
        >
          Transactions by Cycle
        </AccordionSummary>
        <AccordionDetails>
          <Cycle selectedCycle={selectedCycle} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5-content"
          id="panel5-header"
        >
          Transactions by Market
        </AccordionSummary>
        <AccordionDetails>
          <MarketID selectedCycle={selectedCycle} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

function CycleSelect({ selectedCycle, setSelectedCycle, cycles, handleCycleChange}) {
  return (
    <Box sx={{ minWidth: 120, mb: 5 }}>
      <FormControl>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Cycle ID
        </InputLabel>
        <NativeSelect
                  value={selectedCycle}
                  onChange={handleCycleChange}
          inputProps={{
            name: "cycle",
            id: "cycle-native-select",
          }}
        >
            {cycles.map((cycle) => (
                <option key={cycle.cycleID} value={cycle.cycleID}>
                {cycle.cycleID}
                </option>
            ))}
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
