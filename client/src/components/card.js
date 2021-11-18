import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { close, deletePost } from "../actions/post.actions";
import LikeButton from "./LikeButton";
import { dateParser, isEmpty } from "./utils";
import SendIcon from "@mui/icons-material/Send";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import TextareaAutosize from "react-textarea-autosize";
import { IconButton } from "@mui/material";

const Card = ({ post }) => {
  const uid = useSelector((state) => state.authReducer.user);
  const usersData = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();
  const deleteQuote = () => dispatch(deletePost(post._id));
  const total = post.responses
    .map((item) => item.vote)
    .reduce((prev, curr) => prev + curr, 0);

  const [message, setMessage] = useState("");
  const end = () => {
    dispatch(close(post._id, message));
    setMessage("");
  };

  return (
    <div className="card-background">
      <div className="edit">
        {uid.id === post.posterId && (
          <div>
            <p>Supprimer</p>
            <img
              onClick={() => {
                if (window.confirm("Voulez-vous supprimer cet article ?")) {
                  deleteQuote();
                }
              }}
              src="../img/bin.svg"
              alt="bin"
            />
          </div>
        )}

        <div>
          {post.after ? <p>Terminé</p> : <p>En cours</p>}
          <img src="../img/write.svg" alt="bin" />
        </div>

        <div>
          <LikeButton post={post} />
        </div>
      </div>

      <div className="date">
        {dateParser(post.createdAt)}

        {uid.id === post.posterId ? (
          <p>Par vous</p>
        ) : (
          <p>
            Par{" "}
            {!isEmpty(usersData) &&
              usersData
                .map((user) => {
                  if (user._id === post.posterId) return user.pseudo;
                  else return null;
                })
                .join("")}
          </p>
        )}
      </div>
      <div className="card-container">
        <div className={post.posterId === uid.id ? "card hop" : "card"}>
          <div className="card-pic">
            <img src={post.picture} alt="thread" />
          </div>
          <div className="imessage">
            <p className="from-me">{post.description}</p>
            <br />
            {post.responses.length !== 0 ? (
              <p className="from-them">
                {post.responses.length} proposition
                {post.responses.length === 1 ? null : "s"} !
              </p>
            ) : (
              <p className="from-them">Aucune prosition pour l'instant</p>
            )}
            <br />
            {post.responses.length !== 0 ? (
              <div>
                {post.responses
                  .sort((a, b) => b.vote - a.vote)
                  .map((resp) => (
                    <div
                      className={
                        resp.posterId === uid.id ||
                        resp.supporters.includes(uid.id)
                          ? "from-them active-response"
                          : "from-them"
                      }
                      key={resp._id}
                    >
                      <p className="text">{resp.text}</p>
                      <p className="score">
                        {Math.round((resp.vote / total) * 100)}%
                      </p>
                    </div>
                  ))}
              </div>
            ) : null}
            {post.after ? (
              <p className="from-me">{post.after.context}</p>
            ) : null}
          </div>
        </div>
        {post.posterId === uid.id && (
          <div className="footer">
            <TextareaAutosize
              maxRows={5}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              placeholder={
                !isEmpty(post.after)
                  ? "Une correction ou une mise à jour à apporter?"
                  : "Explique le dénouement de la situation aux utilisateurs qui t'ont aidé"
              }
            />
            {message ? (
              <IconButton aria-label="delete" onClick={end}>
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
                  <div className="popup">Veuillez entrer un message!</div>
                </Popup>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
