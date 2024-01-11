import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

export default function FullWidthTextField() {
  const [blogText, setBlogText] = React.useState("");

  const handleSendClick = async () => {
    try {
      const data = { description: blogText };

      await axios.post("http://localhost:3002/blog", data);

      setBlogText("");

      console.log("Blog data sent successfully!");
    } catch (error) {
      console.error("Error sending blog data:", error);
    }
  };

  return (
    <Box
      sx={{
        width: 500,
        maxWidth: "100%",
        display: "flex",
        gap: "1rem",
      }}>
      <TextField
        fullWidth
        label="write your new Blog here ...."
        id="fullWidth"
        value={blogText}
        onChange={e => setBlogText(e.target.value)}
        e
      />
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        onClick={handleSendClick}>
        Send
      </Button>
    </Box>
  );
}
