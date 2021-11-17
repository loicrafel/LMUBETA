import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../components/navbar";
import useModal from "../components/Modal/useModal";
import Modal from "../components/Modal/modal1";

const Accueil = () => {
  const { isShowing, toggle } = useModal();
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <Modal isShowing={isShowing} hide={toggle} />
      <div className="accueil">
        <div className="image">
          <img src="../img/hand.png" alt="holding phone" />
        </div>

        <div className="message">
          <div className="message-container">
            <div className="m1">
              <p>
                Besoin de conseils... <br />
                Light Me Up !
              </p>
            </div>
            <div className="m2">
              <p>
                LightMeUp est le premier site d'entraide pour la séduction en
                ligne. Grâce à la force de sa communauté, Light Me Up permet à
                ses utilisateurs de recevoir des conseils gratuitement et
                anonymement. Besoin d'une idée de réponse, d'une phrase
                d'accroche, ou d'une explication? L'intelligence collective est
                à votre service.
              </p>
              <div className="center">
                <div className="row">
                  <p className="number" onClick={toggle}>
                    ?
                  </p>
                  <p>Comment utiliser LightMeUp ?</p>
                </div>
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
                    Connect
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx="true">{`
        button.modal-toggle {
          background-color: turquoise;
          cursor: pointer;
          padding: 1rem 2rem;
          text-transform: uppercase;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default Accueil;
