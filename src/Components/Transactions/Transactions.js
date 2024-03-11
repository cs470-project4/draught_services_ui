import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import CurrentCycleCount from "./CurrentCycleCount";
import AccountID from "./AccountID";
import RouteID from "./RouteID";
import CycleID from "./CycleID";
import MarketID from "./MarketID";

export default function Transactions(props) {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Current Cycle Transaction Count
        </AccordionSummary>
        <AccordionDetails>
          <CurrentCycleCount />
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
          <AccountID />
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
          <RouteID />
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
          <CycleID />
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
          <MarketID />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
