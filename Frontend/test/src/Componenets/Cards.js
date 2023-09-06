import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

export default function Cards({ cardDetail }) {
  return (
    <Card
      sx={{
        maxWidth: 300,
        boxShadow: "1px 1px 5px black",
        bgcolor: "black",
        color: "white",
      }}>
      <CardActionArea>
        {/* <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {cardDetail.title}
          </Typography>
          <Typography
            variant="body2"
            color="white"
            sx={{ letterSpacing: "1px" }}>
            {cardDetail.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="large" color="primary">
          clich here
        </Button>
      </CardActions>
    </Card>
  );
}
