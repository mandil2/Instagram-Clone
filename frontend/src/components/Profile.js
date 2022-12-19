import React, { useState, useEffect } from 'react';
import './Profile.css';
export default function Profile() {
  const [pic, setPic] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/myposts', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => setPic(result));
  }, []);

  return (
    <div className="profile">
      {/* profile frame */}
      <div className="profile-frame">
        {/* profile-pic */}
        <div className="profile-pic">
          <img
            src="https://media.istockphoto.com/id/1368424494/photo/studio-portrait-of-a-cheerful-woman.jpg?s=612x612&w=is&k=20&c=S6Je1dyOxHNSMuE3mweAATneAAH9l3u9zdJqN8S0xxc="
            alt=""
          />
        </div>
        {/* profile data */}
        <div className="profile-data">
          <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
          <div className="profile-info" style={{ display: 'flex' }}>
            <p>40 posts</p>
            <p>40 followers</p>
            <p>40 following</p>
          </div>
        </div>
      </div>
      <hr style={{ width: '90%', opacity: '0.8', margin: '25px auto' }} />
      {/* gallery */}
      <div className="gallery">
        {pic.map((pics) => {
          return <img key={pics._id} src={pics.photo} className="item" alt=""></img>;
        })}
      </div>
    </div>
  );
}
