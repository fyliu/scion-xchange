import React, { useState, useEffect } from "react";
import UserDataService from "services/user.service";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    retrieveProfile();
  }, []);

  const retrieveProfile = () => {
    UserDataService.getProfile()
      .then((res) => {
        setProfile(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const updateProfile = () => {
    UserDataService.updateProfile(profile)
      .then((res) => {
        setMessage("Profile updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{profile.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Id:</strong> {profile.id}
      </p>
      <p>
        <strong>Email:</strong> {profile.email}
      </p>
      <div className="form-group">
        <label htmlFor="contactInfo">Contact Info:</label>
        <textarea
          className="form-control"
          id="contactInfo"
          name="contactInfo"
          rows="3"
          onChange={handleInputChange}
          value={profile.contactInfo}
        />
      </div>
      <button
        type="submit"
        className="badge badge-success"
        onClick={updateProfile}
      >
        Update
      </button>
      <p>{message}</p>
    </div>
  );
};

export default Profile;
