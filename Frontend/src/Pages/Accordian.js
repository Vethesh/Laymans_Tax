import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function ControlledAccordions({ data }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div style={{width:"50%",marginTop: "10px"}}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header">
          <Typography sx={{ width: "50%", flexShrink: 0 }}>
            {data.question}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{data.answer}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
