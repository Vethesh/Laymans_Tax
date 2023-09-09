import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const entityData = [
  {
    id: 100,
    title: "Proprietor",
    description:
      "A proprietorship is a business owned and operated by a single individual. It is the simplest form of business structure and provides full control to the owner.",
  },
  {
    id: 101,
    title: "Partnership",
    description:
      "A partnership involves multiple individuals sharing profits and losses,  flexible size and structure, typically requiring a partnership agreement.",
  },
  {
    id: 102,
    title: "LLP",
    description:
      "A Limited Liability Partnership (LLP) is a legal entity where partners have limited liability. It combines  partnership with limited liability protection.",
  },
  {
    id: 103,
    title: "Company",
    description:
      "A company is a legal entity separate from its owners, offering limited liability to shareholders. It can be structured as a corporation or an LLC .",
  },
];

function Bookcard() {
  const nav = useNavigate();
  const handleclick = () => {
    nav("/modal");
  };
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,2fr)",
        gridGap: "5rem",
        marginLeft: "1%",
        marginTop: "5%",
        justifyContent: "space-around",
      }}>
      {entityData.map(entity => (
        <Card
          key={entity.id}
          variant="outlined"
          sx={{
            maxWidth: 300,
            height: 200,
            boxShadow: "1px 1px 5px black",
            bgcolor: "black",
            color: "white",
            borderRadius: "1rem",
          }}>
          <CardContent sx={{ color: "white", letterSpacing: "2px" }}>
            <Typography variant="h5" component="div">
              {entity.title}
            </Typography>
            <Typography variant="body2">{entity.description}</Typography>
          </CardContent>
          <CardActions>
            <Button color="primary" onClick={handleclick}>
              Click Here
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

export default Bookcard;
