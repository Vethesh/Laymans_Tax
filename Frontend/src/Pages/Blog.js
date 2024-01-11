import React, { useEffect, useState } from "react";
import Layout from "../Componenets/Layout";
import { Card, CardActions, CardContent } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import axios from "axios";
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
const Blog = ({ showHeaderAndFooter = true }) => {
  const [blogData, setBlogData] = useState([]);
  const d = new Date();

 const fetchData = () => {
   
   axios
     .get("http://localhost:3002/getblog")
     .then(response => {
       var data = response.data;
       if (Array.isArray(data.data)) {
         // Ensure that data.data is an array
         setBlogData([...data.data]);
       } else {
         console.error("Invalid data format received:", data);
       }
     })
     .catch(error => {
       console.error("Error fetching blog data:", error);
     });
 };


  useEffect(() => {
    fetchData(); // Initial fetch when the component mounts

    // Periodically check for updates
    const intervalId = setInterval(fetchData, 60000); // Adjust the interval as needed (e.g., every minute)

    return () => clearInterval(intervalId); // Cleanup the interval on unmount
  }, []);

  return (
    <div style={ { width:"100%",height:"100%",overflow:"scroll"}}>
      <Layout showHeaderAndFooter={showHeaderAndFooter}>
        {blogData.map(blogItem => (
          <Card
            key={blogItem.id}
            sx={{
              width: "80%",
              marginLeft: "10%",
              marginTop: "2%",
              marginBottom: "1%",
            }}>
            <CardContent>{blogItem.description}</CardContent>

            <CardActions
              sx={{
                marginLeft: "1%",
                display: "flex",
                justifyContent: "space-between",
              }}>
              <div>
                <CalendarMonthOutlinedIcon /> {blogItem.date.slice(0,10)}
              </div>
              <div>
                <AccessTimeOutlinedIcon /> {blogItem.time}
              </div>
            </CardActions>
          </Card>
        ))}

        {blogData.length === 0 && (
          <Card
            sx={{
              width: "80%",
              marginLeft: "10%",
              marginTop: "2%",
              marginBottom: "1%",
            }}>
            <CardContent>There is no data yet...</CardContent>

            <CardActions sx={{ marginLeft: "1%" }}>
              <CalendarMonthOutlinedIcon /> {d.toLocaleDateString("pt-PT")}
            </CardActions>
          </Card>
        )}
      </Layout>
    </div>
  );
};


export default Blog;
