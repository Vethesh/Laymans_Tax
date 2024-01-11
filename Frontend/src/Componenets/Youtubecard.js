import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";

import { Button, CardActionArea, CardActions } from "@mui/material";

export default function Youtubecard({ cardDetail }) {
  return (
    <div className="video">
      <iframe
        width="600px"
        height="450px"
        src={cardDetail.title}
        key={cardDetail.id}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
