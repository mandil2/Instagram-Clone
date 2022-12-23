import React, { useState, useEffect } from 'react';
import './Profile.css';
// import PostDetail from './PostDetail.js';
import { useParams } from 'react-router-dom';

export default function UserProfile() {
  const { userid } = useParams();
  const [isFollow, setIsFollow] = useState(false);
  const [user, setUser] = useState('');
  const [posts, setPosts] = useState([]);

  //to follow user
  const followUser = (userId) => {
    fetch('http://localhost:5000/follow', {
      method: 'put',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsFollow(true);
      });
  };

  //to follow user
  const unfollowUser = (userId) => {
    fetch('http://localhost:5000/unfollow', {
      method: 'put',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsFollow(false);
      });
  };

  useEffect(() => {
    fetch(`http://localhost:5000/user/${userid}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUser(result.user);
        setPosts(result.post);
        if (
          result.user.followers.includes(
            JSON.parse(localStorage.getItem('user'))._id
          )
        ) {
          setIsFollow(true);
        }
      });
  }, [isFollow]);

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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <h1>{user.name}</h1>
            <button
              className="followBtn"
              onClick={() => {
                if (isFollow) {
                  unfollowUser(user._id);
                } else {
                  followUser(user._id);
                }
              }}
            >
              {isFollow ? 'Unfollow' : 'Follow'}
            </button>
          </div>
          <div className="profile-info" style={{ display: 'flex' }}>
            <p>{posts.length} posts</p>
            <p>{user.followers ? user.followers.length : '0'} followers</p>
            <p>{user.following ? user.following.length : '0'} following</p>
          </div>
        </div>
      </div>
      <hr style={{ width: '90%', opacity: '0.8', margin: '25px auto' }} />
      {/* gallery */}
      <div className="gallery">
        {posts.map((pics) => {
          return (
            <img
              key={pics._id}
              src={pics.photo}
              className="item"
              alt=""
              //   onClick={() => {
              // toggleDetails(pics);
              //   }}
            ></img>
          );
        })}
      </div>
      {/* {show && <PostDetail item={posts} toggleDetails={toggleDetails} />} */}
    </div>
  );
}
