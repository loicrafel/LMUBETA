import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { addPost, getPost } from "../actions/post.actions";

const NewProfile = () => {
  const uid = useSelector((state) => state.authReducer.user);
  const error = useSelector((state) => state.errorReducer);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [file, setFile] = useState();
  const dispatch = useDispatch();

  const handlePost = async () => {
    if (message || postPicture) {
      const data = new FormData();
      data.append("posterId", uid.id);
      data.append("description", message);
      if (file) data.append("file", file);

      await dispatch(addPost(data));
      dispatch(getPost(uid.id));
      cancelPost();
    } else {
      alert("Veuillez entrer un message");
    }
  };

  const handlePicture = async (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setFile("");
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
            <div className="error">{error.format || error.maxSize}</div>
            <div>
              <img src="./img/picture.svg" alt="upload-img" />
              <input
                type="file"
                id="file-upload"
                name="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => handlePicture(e)}
              />
            </div>

            <p>Upload ta conversation!</p>
          </div>
        )}
        <div className="footer">
          <textarea
            name="message"
            id="message"
            placeholder="Exlique ta situation!"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          ></textarea>
          {message && postPicture ? (
            <button className="send" onClick={handlePost}>
              <img src="./img/send.svg" alt="envoyer" height="25px" />
            </button>
          ) : (
            <button className="send">
              <Popup
                trigger={<img src="./img/send.svg" alt="send" height="25px" />}
                position={["bottom center", "bottom right", "bottom left"]}
                closeOnDocumentClick
              >
                <div className="popup">
                  Veuillez entrer un message et une photo!
                </div>
              </Popup>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewProfile;
