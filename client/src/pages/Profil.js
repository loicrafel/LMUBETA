import React, { useEffect } from "react";
import Log from "../components/Log";
import Navbar from "../components/navbar";
import Post from "../components/post";

import Thread from "../components/thread";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../components/utils";
import { getPost } from "../actions/post.actions";

const Profil = () => {
  const uid = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPost(uid.user.id));
  }, [uid, dispatch]);

  const privateposts = useSelector((state) => state.postReducer);
  return (
    <div>
      <Navbar />
      <div>
        {uid.user.id ? (
          <div className="user">
            <div className="profil">
              <div className="post">
                <Post />
              </div>

              <div className="message">
                <div>
                  <div className="m1">
                    <p>
                      Bienvenue {!isEmpty(uid) && uid.user.pseudo}. Tu peux
                      soumettre une conversation ou consulter les réponses des
                      autres joueurs.
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
