import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import { useNavigate } from "react-router-dom";
export default function Cards({ cardDetail }) {
  const nav = useNavigate();
  const handleclick = () => {
    nav("/modal");
  };
  return (
    <Card
      sx={{
        maxWidth: 300,
        height: 230,
        boxShadow: "1px 1px 5px black",
        bgcolor: "black",
        color: "white",
      }}>
      <CardContent sx={{ color: "white", letterSpacing: "2px" }}>
        <Typography gutterBottom variant="h5" component="div">
          {cardDetail.title}
        </Typography>
        <Typography variant="body2" color="white">
          {cardDetail.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-around" }}>
        <Button size="large" color="primary" onClick={handleclick}>
          Click here
        </Button>
        <Button size="large" color="success">
          {cardDetail.amount}
          <CurrencyRupeeOutlinedIcon />
        </Button>
      </CardActions>
    </Card>
  );
}
