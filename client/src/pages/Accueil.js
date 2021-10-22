import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Navbar from "../components/navbar";
import Thread from "../components/thread";

const Accueil = () => {
  const posts = useSelector((state) => state.allPostsReducer);
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="accueil">
        <div className="image">
          <img src="../img/hand.png" alt="holding phone" />
        </div>

        <div className="message">
          <div>
            <div className="m1">
              <p>
                Panne d'inspiration... <br />
                Light Me Up !
              </p>
            </div>
            <br />
            <div className="m2">
              <p>
                Grâce à la force de sa communauté, Light Me Up permet aux
                personnes en manque d'inspiration de trouver la réponse
                parfaite! Les réponses les plus pertinentes seront directement
                accessibles dans l'onglet "utilisateur". À vos plumes!
              </p>
            </div>
          </div>

          <div className="m3">
            <div>
              <NavLink className="button-signup" exact to="game">
                Help
              </NavLink>
            </div>
            <p> or </p>
            <div>
              <NavLink className="button-signup" exact to="user">
                Get Helped
              </NavLink>
              <div className="souligne">
                <NavLink className="souligne" exact to="user">
                  Or Connect
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Thread posts={posts} />
    </div>
  );
};

export default Accueil;
