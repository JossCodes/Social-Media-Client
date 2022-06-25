import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ThumbUpAlt } from "@material-ui/icons";
import { AuthContext } from "../helpers/AuthContext";

const Home = () => {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const { authState } = useContext(AuthContext);
  let history = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history("/login");
    } else {
      axios
        .get("https://social-media-api-josscodes.herokuapp.com/posts", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListOfPosts(response.data.listOfPosts);
          setLikedPosts(response.data.likedPosts.map((like) => like.PostId));
        });
    }
  }, []);

  const likeAPost = (postId) => {
    axios
      .post(
        "https://social-media-api-josscodes.herokuapp.com/likes",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );

        if (likedPosts.includes(postId)) {
          setLikedPosts(likedPosts.filter((id) => id !== postId));
        } else {
          setLikedPosts([...likedPosts, postId]);
        }
      });
  };

  return (
    <div>
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
            <div className="username">
              <Link to={`/profile/${value.UserId}`}>{value.username}</Link>
            </div>
            <div className="buttons">
              <ThumbUpAlt
                onClick={() => likeAPost(value.id)}
                className={
                  likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"
                }
              />
              <label>{value.Likes.length}</label>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
