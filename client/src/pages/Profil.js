import React, { useEffect } from "react";
import Log from "../components/Log";
import Navbar from "../components/navbar";
import Post from "../components/post";

import Thread from "../components/thread";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../components/utils";
import { getPost } from "../actions/post.actions";
import SettingsIcon from "@mui/icons-material/Settings";
import useModal from "../components/Modal/useModal";
import Modal2 from "../components/Modal/modal2";

const Profil = () => {
  const uid = useSelector((state) => state.authReducer.user);
  const privateposts = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPost(uid.id));
  }, [uid, dispatch]);

  const { isShowing, toggle } = useModal();

  return (
    <div>
      <Navbar />
      <div>
        {uid.id ? (
          <div className="user">
            <Modal2 isShowing={isShowing} hide={toggle} />

            <div className="settings">
              <SettingsIcon fontSize="large" onClick={toggle} />
            </div>

            <div className="profil">
              <div className="post">
                <Post />
              </div>

              <div className="profil-thread">
                <div className="message">
                  <div className="m1">
                    <p>
                      Bienvenue {uid?.pseudo}. Dans ton espace, tu peux
                      soumettre une nouvelle demande, consulter les conseils
                      donnés par les autres utilisateurs et voir si tes conseils
                      sont appréciés.
                    </p>
                  </div>

                  <div className="m2">
                    <p>
                      Grâce à LightMeUp, l'intelligence collective devient ton
                      coach! Les conseils les plus pertinents émergeront pour
                      t'aider à progresser dans le domaine de la séduction en
                      ligne.
                    </p>
                  </div>

                  <div>
                    <img
                      src="../img/arrow.svg"
                      alt="flèche vers le bas"
                      height="40px"
                    />
                  </div>
                </div>
                <div className="post2">
                  <Post />
                </div>

                {!isEmpty(privateposts) && <Thread posts={privateposts} />}
              </div>
            </div>
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
