import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Paper,
  MenuItem,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const initialFormData = {
  id:"",
  name: "",
  email: "",
  phone: "",
  date: new Date().toISOString().substring(0, 10),
  service: "", // Add service field to the initial form data
};
const options = [
  { value: "GSTR-1", label: "GSTR-1" },
  { value: "GSTR-3B", label: "GSTR-3B" },
  { value: "GSTR-4", label: "GSTR-4" },
  { value: "GSTR-9", label: "GSTR-9" },
  { value: "ITR-1 (Sahaj)", label: "ITR-1 (Sahaj)" },
  { value: "ITR-2", label: "ITR-2" },
  { value: "ITR-3", label: "ITR-3" },
  { value: "ITR-4 (Sugam)", label: "ITR-4 (Sugam)" },
  { value: "ITR-5", label: "ITR-5" },
  { value: "Proprietor", label: "Proprietor" },
  { value: "Partnership", label: "Partnership" },
  { value: "LLP", label: "LLP" },
  { value: "Company", label: "Company" },
];
const FileUploadForm = () => {
  const nav = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [files, setFiles] = useState([]);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const onDrop = acceptedFiles => {
    setFiles([...files, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".pdf, .doc, .docx", // Specify accepted file types here
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  let data = localStorage.getItem("user");
  let getid = JSON.parse(data);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/user/${getid.id}`
        );
        const userData = response.data.user; 
        console.log(userData);// Assuming the response contains user data
        setFormData({
          ...initialFormData,
          ...userData,id:getid.id,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [getid.id]);
  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("id", getid.id);
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      form.append("date", formData.date);
      form.append("service", formData.service);
      files.forEach(file => {
        form.append("files", file);
      });
      if(formData.service[0] === "G")
      {
        await axios.post("http://localhost:3002/upload/gt", form);
      }
      else{
        await axios.post("http://localhost:3002/upload/itr", form);
      }
      

      setSubmissionSuccess(true);
      setTimeout(() => {
        nav(`/user/${getid.id}`);
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: "16px" }}>
        <Typography variant="h4" align="center">
          File Upload Form
        </Typography>
        {submissionSuccess ? (
          <Typography variant="h6" align="center" style={{ color: "green" }}>
            Form submitted successfully.
          </Typography>
        ) : (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="User_Id"
                  name="id"
                  variant="outlined"
                  value={getid.id}
                  onChange={handleChange}
                  required // Set as required
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  variant="outlined"
                  value={formData.name}
                  onChange={handleChange}
                  required // Set as required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleChange}
                  required // Set as required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  variant="outlined"
                  value={formData.phone}
                  onChange={handleChange}
                  required // Set as required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Date"
                  name="date"
                  type="date"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  value={formData.date}
                  onChange={handleChange}
                  required // Set as required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select // Use select for dropdown
                  label="Service"
                  name="service"
                  variant="outlined"
                  value={formData.service}
                  onChange={handleChange}
                  required // Set as required
                >
                  {options.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <div {...getRootProps()} style={dropzoneStyles}>
                  <input {...getInputProps()} />
                  <CloudUploadIcon fontSize="large" />
                  <Typography variant="subtitle1">
                    Drag & drop or click to upload files (PDF, DOC, DOCX)
                  </Typography>
                </div>
                {files.length > 0 && (
                  <div>
                    <Typography variant="subtitle1">Selected Files:</Typography>
                    <ul>
                      {files.map(file => (
                        <li key={file.name}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Paper>
    </Container>
  );
};

const dropzoneStyles = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

export default FileUploadForm;
