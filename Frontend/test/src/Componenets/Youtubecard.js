import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { Button, CardActionArea, CardActions } from "@mui/material";

export default function Youtubecard({cardDetail}) {
  return (
    <Card sx={{ maxWidth: 600,boxShadow:"1px 1px 5px black", height:450,}}>
      <CardActionArea>
        {/* <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        /> */}
        <CardContent>
         
        
         
        </CardContent>
      </CardActionArea>
      <CardActions>
       
      </CardActions>
    </Card>
  );
}
