import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/navbar";
import TextareaAutosize from "react-textarea-autosize";
import { IconButton } from "@mui/material";
import { dateParser, isEmpty } from "../components/utils";
import { AddResponse, getRandomPost, Vote } from "../actions/post.actions";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import SendIcon from "@mui/icons-material/Send";

const Game = () => {
  const uid = useSelector((state) => state.authReducer.user);
  const data = useSelector((state) => state.randomReducer[0]);

  const dispatch = useDispatch();

  const [vote, setVote] = useState("");
  const [reload, setReload] = useState(true);
  const [message, setMessage] = useState("");

  const handleVote = async () => {
    if (vote) {
      dispatch(Vote(data._id, vote, uid.id ? uid.id : null));
      setReload(true);
    } else {
      alert("Veuillez selectionner une réponse");
    }
  };

  const handlePost = async () => {
    dispatch(AddResponse(data._id, message, uid.id ? uid.id : null));
    cancelPost();
    setReload(true);
  };

  const cancelPost = () => {
    setMessage("");
  };

  useEffect(() => {
    if (reload === true) {
      dispatch(getRandomPost());
    }
    setTimeout(() => setReload(false), 800);
  }, [reload, dispatch]);
  if (reload)
    return (
      <div>
        <Navbar />
        <div class="dots">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  else
    return (
      <div>
        <Navbar />
        <div className="game">
          <div className="post">
            <div className="post-container">
              <div className="post-form">
                {message ? (
                  <div className="cancel" onClick={cancelPost}>
                    X
                  </div>
                ) : null}

                <div className="apercu-image">
                  <div className="game-img">
                    {!isEmpty(data) && (
                      <img src={data.picture} alt="apercu-img" />
                    )}
                  </div>
                </div>

                <div className="footer">
                  <TextareaAutosize
                    maxRows={5}
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    placeholder="Si aucune réponse ne te convient, propose ta réponse!"
                  />
                  {message ? (
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
                        position={[
                          "bottom center",
                          "bottom right",
                          "bottom left",
                        ]}
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
          </div>

          <div className="vote">
            <div>
              {!isEmpty(data) && data.responses.length === 0 ? (
                <div className="warning">
                  Aucune réponse n'a été proposée. <br /> Soyez le premier à
                  répondre!
                </div>
              ) : null}
            </div>
            <div className="groupe1">
              <div className="indic">{!isEmpty(data) && data.description}</div>
              <p className="date">
                Publié le {!isEmpty(data) && dateParser(data.createdAt)}
              </p>
            </div>
            <form className="responses">
              {!isEmpty(data) &&
                data.responses.map((resp) => (
                  <div className="resp" key={resp._id}>
                    <input
                      type="radio"
                      name="demo"
                      className="radio-input"
                      id={resp._id}
                      onChange={(e) => setVote(e.target.id)}
                    />
                    <label htmlFor={resp._id}>{resp.text}</label>
                  </div>
                ))}
            </form>

            {vote ? (
              <div className="vote-button">
                <button onClick={handleVote}> VOTE</button>
              </div>
            ) : (
              <div className="vote-button">
                <Popup
                  trigger={<button onClick={handleVote}> VOTE</button>}
                  position={["bottom center", "bottom right", "bottom left"]}
                  closeOnDocumentClick
                >
                  <div className="popup">
                    Veuillez sélectionner une réponse!
                  </div>
                </Popup>
              </div>
            )}
          </div>
          <div className="suivant">
            <IconButton onClick={() => setReload(true)}>
              <img src="../img/arrow.svg" alt="holding phone" height="30px" />
            </IconButton>
          </div>
        </div>
      </div>
    );
};

export default Game;
