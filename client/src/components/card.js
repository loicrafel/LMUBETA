import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, publish } from "../actions/post.actions";

import LikeButton from "./LikeButton";
import { dateParser, isEmpty } from "./utils";

const Card = ({ post }) => {
  const uid = useSelector((state) => state.authReducer.user);
  const usersData = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();
  const deleteQuote = () => dispatch(deletePost(post._id));
  const total = post.responses
    .map((item) => item.vote)
    .reduce((prev, curr) => prev + curr, 0);
  const [publied, setPublied] = useState(post.public);
  const publier = () => {
    dispatch(publish(post._id));
    setPublied(!publied);
  };

  return (
    <div className="card-container">
      <div className="edit">
        {uid.id === post.posterId && (
          <div>
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
        {uid.id === post.posterId && publied === false && (
          <div>
            <img src="../img/edit.svg" onClick={publier} alt="edit" />
          </div>
        )}
        {uid.id === post.posterId && publied && (
          <div>
            <img src="../img/unedit.svg" onClick={publier} alt="unedit" />
          </div>
        )}

        <div>
          <LikeButton post={post} />
        </div>
        <div className="date">
          {dateParser(post.createdAt)} <br />
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
      </div>
      <div className="card">
        <div className="card-pic">
          <img src={"." + post.picture} alt="thread" />
        </div>
        <div className="imessage">
          <p className="from-me">{post.description}</p>
          <br />
          {post.responses.length !== 0 ? (
            <p className="from-them">
              Vous avez reçu {post.responses.length} réponses!!
            </p>
          ) : (
            <p className="from-them">
              Vous n'avez pas encore recu de réponses mais ça ne saurait tarder
            </p>
          )}
          <br />
          {post.responses.length !== 0 ? (
            <div>
              {post.responses
                .sort((a, b) => b.vote - a.vote)
                .map((resp) => (
                  <div className="from-them" key={resp._id}>
                    <p className="text">{resp.text}</p>
                    <p className="score">
                      {Math.round((resp.vote / total) * 100)}%
                    </p>
                  </div>
                ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Card;
