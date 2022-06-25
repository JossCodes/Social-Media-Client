import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

const Profile = () => {
  let { id } = useParams();
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);
  const { authState } = useContext(AuthContext);

  let history = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/basicInfo/${id}`).then((response) => {
      setUsername(response.data.username);
    });

    axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div className="profilePageContainer">
      <div className="basicInfo">
        <h1>Username: {username}</h1>
        {authState.username === username && (
          <button onClick={() => history("/changepassword")}>
            Change my password
          </button>
        )}
      </div>
      <div className="listOfPosts">
        {listOfPosts.map((value, key) => (
          <div className="post" key={key}>
            <div className="title">{value.title}</div>
            <div
              className="body"
              onClick={() => {
                history(`/post/${value.id}`);
              }}
            >
              {value.postText}
            </div>
            <div className="footer">
              <div className="username">{value.username}</div>
              <div className="buttons">
                <label>{value.Likes.length}</label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
