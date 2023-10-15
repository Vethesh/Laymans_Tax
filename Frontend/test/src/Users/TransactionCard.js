import React from "react";
import { Card, CardContent, Typography, Icon } from "@mui/material";

const cardStyles = {
  maxWidth: 200,
  width: "20rem",
  margin: "16px auto",
  padding: "16px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const completedIconStyles = {
  color: "green",
};

const inProgressIconStyles = {
  color: "blue",
  animation: "spin 2s infinite linear",
  "@keyframes spin": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
};

const TransactionCard = ({ transactionGData }) => {
  let inProgress = false;
  if(transactionGData.progress===1)
  {
      inProgress=true;
  }


  return (
    <Card style={cardStyles}>
      <CardContent>
        <Typography variant="h6">{transactionGData.service}</Typography>
        <Typography variant="subtitle2" color="textSecondary">
          {transactionGData.date.slice(0, 10)}
        </Typography>
        {inProgress ? (
          <Icon style={completedIconStyles}>check_circle</Icon>
        ) : (
          
          <Icon style={inProgressIconStyles}>autorenew</Icon>
        )}

        <Typography variant="body2" color="textSecondary">
          {inProgress ? "completed" : "pending.."}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TransactionCard;
