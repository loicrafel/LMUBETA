import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { addPost, getPost } from "../actions/post.actions";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";
import TextareaAutosize from "react-textarea-autosize";
import SendIcon from "@mui/icons-material/Send";

const Input = styled("input")({
  display: "none",
});

const NewProfile = () => {
  const uid = useSelector((state) => state.authReducer.user);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handlePost = async () => {
    if (message || postPicture) {
      if (file.size > 500000) {
        cancelPost();
        setError("La taille maximale est atteinte");
      } else if (
        file.type !== "image/png" &&
        file.type !== "image/jpg" &&
        file.type !== "image/jpeg"
      ) {
        cancelPost();
        setError("Seuls les formats jpg, png et et jpeg sont acceptés");
      } else {
        const data = new FormData();
        data.append("posterId", uid.id);
        data.append("description", message);
        if (postPicture) data.append("file", postPicture);
        dispatch(addPost(data));
        dispatch(getPost(uid.id));
        cancelPost();
        setError("");
      }
    } else {
      alert("Le téléversement n'a pas fonctionné");
    }
  };

  const handlePicture = (e) => {
    setFile(e.target.files[0]);
    const fil = e.target.files[0];
    previewFile(fil);
  };

  const previewFile = (fil) => {
    const reader = new FileReader();
    reader.readAsDataURL(fil);
    reader.onloadend = () => {
      setPostPicture(reader.result);
    };
  };

  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
  };

  return (
    <div className="post-container">
      <div className="post-form">
        {message || postPicture ? (
          <div className="cancel" onClick={cancelPost}>
            X
          </div>
        ) : null}

        {postPicture ? (
          <div className="apercu-image">
            <img src={postPicture} alt="apercu-img" />
          </div>
        ) : (
          <div className="icon">
            <div className="error">{error}</div>
            <div>
              <label htmlFor="icon-button-file">
                <Input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  onChange={(e) => handlePicture(e)}
                />
                <IconButton
                  style={{ color: "grey" }}
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera fontSize="large" />
                </IconButton>
              </label>
            </div>
          </div>
        )}
        <div className="footer">
          <TextareaAutosize
            maxRows={5}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            placeholder="Explique en quelques mots ce que pourrait t'apporter la communauté..."
          />
          {message && postPicture ? (
            <IconButton aria-label="delete" onClick={handlePost}>
              <SendIcon />
            </IconButton>
          ) : (
            <div>
              <Popup
                trigger={
                  <IconButton aria-label="delete">
                    <SendIcon />
                  </IconButton>
                }
                position={["bottom center", "bottom right", "bottom left"]}
                closeOnDocumentClick
              >
                <div className="popup">
                  Veuillez entrer un message et une photo!
                </div>
              </Popup>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewProfile;
