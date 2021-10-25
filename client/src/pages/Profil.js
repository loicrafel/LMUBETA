import React, { useEffect, useState } from "react";
import Log from "../components/Log";
import Navbar from "../components/navbar";
import Post from "../components/post";

import Thread from "../components/thread";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../components/utils";
import { getPost } from "../actions/post.actions";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../actions/auth.actions";
import { deleteUser } from "../actions/user.actions";

const Profil = () => {
  const uid = useSelector((state) => state.authReducer.user);
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPost(uid.id));
  }, [uid, dispatch]);

  const logout = (e) => {
    e.preventDefault();
    setOpenModal(false);
    dispatch(logoutUser());
  };
  const deleteuser = (id) => {
    if (
      window.confirm(
        "Souhaitez-vous réellement supprimer votre compte? Cette action est irréversible."
      )
    ) {
      setOpenModal(false);
      dispatch(deleteUser(id));
      dispatch(logoutUser());
    }
  };

  const privateposts = useSelector((state) => state.postReducer);
  return (
    <div>
      <Navbar />
      <div>
        {uid.id ? (
          <div className="user">
            {openModal ? (
              <div className="moresettings">
                <img
                  className="close"
                  src="../img/close.svg"
                  alt="parametres"
                  onClick={() => setOpenModal(!openModal)}
                />
                <div className="listsettings">
                  <NavLink className="insidelistsettings" exact to="about">
                    <img src="../img/help.svg" alt="parametres" />
                    <p>Aide et assistance</p>
                  </NavLink>
                  <div
                    className="insidelistsettings"
                    onClick={(e) => logout(e)}
                  >
                    <img src="../img/logout.svg" alt="deconnection" />
                    <p>Se déconnecter</p>
                  </div>
                  <div
                    className="insidelistsettings"
                    onClick={(e) => deleteuser(uid.id)}
                  >
                    <img src="../img/bin.svg" alt="delete-account" />
                    <p>Supprimer le compte</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="settings">
                <img
                  src="../img/settings.png"
                  alt="parametres"
                  onClick={() => setOpenModal(!openModal)}
                />
              </div>
            )}

            <div className="profil">
              <div className="post">
                <Post />
              </div>

              <div className="message">
                <div>
                  <div className="m1">
                    <p>
                      Bienvenue {uid?.pseudo}. Tu peux soumettre une
                      conversation ou consulter les réponses des autres joueurs.
                    </p>
                  </div>
                  <br />
                  <div className="m2">
                    <p>
                      Anonymement, les joueurs choisiront les réponses les plus
                      pertinentes à ta conversation. Tu pourras ensuite
                      consulter ces réponses sur ton espace personnel.
                    </p>
                  </div>
                  <br />

                  <div>
                    <img
                      src="../img/arrow.svg"
                      alt="flèche vers le bas"
                      height="40px"
                    />
                  </div>
                </div>
              </div>
            </div>

            {!isEmpty(privateposts) && <Thread posts={privateposts} />}
          </div>
        ) : (
          <div className="log-container">
            <div className="image">
              <img src="../img/hand.png" alt="holding phone" />
            </div>
            <Log signin={true} signup={false} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profil;
