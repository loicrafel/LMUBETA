import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { likePost, unlikePost } from "../actions/post.actions";
import { useDispatch, useSelector } from "react-redux";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const uid = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost(post._id, uid.id));
    setLiked(true);
  };

  const unlike = () => {
    dispatch(unlikePost(post._id, uid.id));
    setLiked(false);
  };

  useEffect(() => {
    if (post.likers.includes(uid.id)) setLiked(true);
    else setLiked(false);
  }, [uid, post.likers]);

  return (
    <div className="like-container">
      <p>Liker</p>
      {uid.id ? null : (
        <Popup
          trigger={<img src="../img/heart.svg" alt="like" />}
          position={["bottom center", "bottom right", "bottom left"]}
          closeOnDocumentClick
        >
          <div className="popup">Connectez-vous pour aimer un post !</div>
        </Popup>
      )}
      {uid.id && liked === false && (
        <img src="../img/heart.svg" onClick={like} alt="like" />
      )}
      {uid.id && liked && (
        <img src="../img/heart-filled.svg" onClick={unlike} alt="unlike" />
      )}

      <span>{post.likers.length}</span>
    </div>
  );
};

export default LikeButton;
