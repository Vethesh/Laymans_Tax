import React, { useEffect, useState } from "react";
import axios from "axios";
import './profile.css';



import { message } from "antd"; // Import Ant Design message component


const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [editedFormData, setEditedFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Fetch user data when the component mounts
    const data = localStorage.getItem("user");
    const getid = JSON.parse(data);
    const userId = getid?.id;

    if (userId) {
      axios
        .get(`http://localhost:3002/user/${userId}`)
        .then(response => {
          const userData = response.data.user;
          setFormData(userData);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, []);

  const handleEditClick = () => {
    // Enable editing and initialize editedFormData with the current formData
    setIsEditing(true);
    setIsUpdating(true);

    setEditedFormData({ ...formData });
  };

  const handleUpdateClick = async () => {
    try {
      setLoading(true);

      // Send the editedFormData to the server
      const data = localStorage.getItem("user");
      const getid = JSON.parse(data);
      const userId = getid?.id;

      if (userId) {
        const response = await axios.put(
          `http://localhost:3002/user/${userId}/update`,
          editedFormData
        );

        if (response.status === 200) {
          setIsEditing(false); // Disable editing after saving
          setIsUpdating(false); // Disable updating after saving
          // Update the formData with the edited data
          setFormData({ ...editedFormData });
          message.success("Profile updated successfully");
        } else {
          message.error("Failed to update profile");
        }
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Failed to update profile");
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    // Update the editedFormData when the user edits the form fields
    setEditedFormData({ ...editedFormData, [name]: value });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      {loading && <div>Loading...</div>}
      <div style={{ padding: "16px" }}>
        <h2 style={{ textAlign: "center" }}>User Profile</h2>
        <form>
          <div>
            <label>Name:</label>
            <input 
              type="text"
              name="name"
              disabled={!isEditing}
              value={isEditing ? editedFormData.name : formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              disabled={!isEditing}
              value={isEditing ? editedFormData.email : formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              disabled={!isEditing}
              value={isEditing ? editedFormData.phone : formData.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={handleUpdateClick}
                  disabled={isUpdating}>
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setIsUpdating(false);
                  }}
                  style={{ marginTop: "8px" }}>
                  Cancel
                </button>
              </>
            ) : (
              <button type="button" onClick={handleEditClick}>
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
