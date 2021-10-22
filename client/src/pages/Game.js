import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Navbar from "../components/navbar";

import { dateParser, isEmpty } from "../components/utils";
import { AddResponse, Vote } from "../actions/post.actions";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const Game = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [vote, setVote] = useState("");
  const [reload, setReload] = useState(true);
  const [message, setMessage] = useState("");

  const handleVote = async () => {
    if (vote) {
      dispatch(Vote(data._id, vote));
      setReload(true);
    } else {
      alert("Veuillez selectionner une réponse");
    }
  };

  const handlePost = async () => {
    dispatch(AddResponse(data._id, message));
    cancelPost();
    setReload(true);
  };

  const cancelPost = () => {
    setMessage("");
  };

  useEffect(() => {
    if (reload === true) {
      axios
        .get(`${process.env.REACT_APP_API_URL}api/post/random`)
        .then((res) => setData(res.data[0]));
    }
    setReload(false);
  }, [reload]);

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
                <textarea
                  name="message"
                  id="message"
                  placeholder="Propose ta réponse!"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                ></textarea>
                {message ? (
                  <button className="send" onClick={handlePost}>
                    <img src="./img/send.svg" alt="envoyer" height="25px" />
                  </button>
                ) : (
                  <button className="send">
                    <Popup
                      trigger={
                        <img src="./img/send.svg" alt="send" height="25px" />
                      }
                      position={[
                        "bottom center",
                        "bottom right",
                        "bottom left",
                      ]}
                      closeOnDocumentClick
                    >
                      <div className="popup">Veuillez entrer un message!</div>
                    </Popup>
                  </button>
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
          <div>
            <div className="indic">
              Indications de l'auteur : {!isEmpty(data) && data.description}
            </div>
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
          <div className="vote-button">
            <button onClick={handleVote}> Vote </button>
          </div>
        </div>
        <div className="suivant">
          <button onClick={() => setReload(true)}>
            <p>NEXT</p>
            <img src="../img/arrow.svg" alt="holding phone" height="30px" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Game;
