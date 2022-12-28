import React, { useState, useEffect } from 'react';
import './Createpost.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Createpost() {
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');

  const navigate = useNavigate();

  //toast functions
  const notifyA = (err) => toast.error(err);
  const notifyB = (msg) => toast.success(msg);

  useEffect(() => {
    // saving post to mongodb
    if (url) {
      fetch('http://localhost:5000/createPost', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('jwt'),
        },
        body: JSON.stringify({
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            notifyA(data.error);
          } else {
            notifyB('Successfully Posted');
            navigate('/');
          }
        })
        .catch((err) => console.log(err));
    }
  }, [url]);

  // posting image to cloudinary
  const postDetails = () => {
    console.log(body, image);
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'insta-clone');
    data.append('cloud_name', 'devlash123');
    fetch('https://api.cloudinary.com/v1_1/devlash123/image/upload', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((err) => console.log(err));
  };

  const loadfile = (event) => {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };
  return (
    <div className="createPost">
      <div className="post-header">
        <h4 style={{ margin: '3px auto' }}>Create New Post</h4>
        <button
          id="post-btn"
          onClick={() => {
            postDetails();
          }}
        >
          Share
        </button>
      </div>
      <div className="main-div">
        <img
          id="output"
          src="https://customercare.igloosoftware.com/.api2/api/v1/communities/10068556/previews/thumbnails/4fc20722-5368-e911-80d5-b82a72db46f2?width=680&height=680&crop=False"
          alt=""
        />
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            loadfile(event);
            setImage(event.target.files[0]);
          }}
        />

        <div className="details">
          <div className="card-header">
            <div className="card-pic">
              <img
                src="https://media.istockphoto.com/id/1368424494/photo/studio-portrait-of-a-cheerful-woman.jpg?s=612x612&w=is&k=20&c=S6Je1dyOxHNSMuE3mweAATneAAH9l3u9zdJqN8S0xxc="
                alt=""
              />
            </div>
            <h5>Ramesh</h5>
          </div>
          <textarea
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
            type="text"
            placeholder="Write a caption..."
          ></textarea>
        </div>
      </div>
    </div>
  );
}
