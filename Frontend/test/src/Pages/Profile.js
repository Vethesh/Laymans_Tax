import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Paper,
  CssBaseline,
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import axios from "axios";
import Spinner from "../Componenets/Spinner";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("user");
    const getid = JSON.parse(data);
    const userId = getid?.id;

    if (userId) {
      axios
        .get(`http://localhost:3002/user/${userId}`)
        .then(response => {
          const Data = response.data.user;
          setFormData({
            ...formData,
            ...Data,
          });
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      // Simulate an update operation with a delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // For demonstration purposes, we'll just show a success message
      setLoading(false);
      alert("Profile updated successfully");
      setIsEditing(false); // Disable editing after saving
    } catch (error) {
      setLoading(false);
      alert("Failed to update profile");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {loading && <Spinner />}
      <Paper elevation={3} style={{ padding: "16px", margin: "16px auto" }}>
        <Typography variant="h5" align="center">
          User Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Name"
                name="name"
                disabled={!isEditing}
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Email"
                name="email"
                type="email"
                disabled={!isEditing}
                value={formData.email}
                onChange={e =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Phone"
                name="phone"
                disabled={!isEditing}
                value={formData.phone}
                onChange={e =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12}>
              {isEditing ? (
                <>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}>
                    Save
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    color="default"
                    startIcon={<CancelIcon />}
                    onClick={() => setIsEditing(false)}
                    style={{ marginTop: "8px" }}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={handleEditClick}>
                  Edit Profile
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Profile;
