import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import CreateIcon from "@mui/icons-material/Create";

const Modal = ({ isShowing, hide }) => {
  const [modal, setModal] = useState(true);

  return isShowing ? (
    <>
      <div className="modal-overlay">
        <div className="modal-wrapper">
          <div className="modal">
            <div className="list">
              <div
                onClick={() => setModal(!modal)}
                id="register"
                className={!modal ? "active-list" : "unactive"}
              >
                <p> Je souhaite aider</p>
              </div>
              <div
                onClick={() => setModal(!modal)}
                id="login"
                className={modal ? "active-list" : "unactive"}
              >
                <p> Je souhaite me faire aider</p>
              </div>
            </div>

            {modal && (
              <div>
                <div className="row">
                  <p className="number"> 1 </p>
                  <p>
                    J'ai besoin de conseils en matière de séduction en ligne
                  </p>
                </div>

                <div className="row">
                  <p className="number"> 2 </p>
                  <p>
                    Je poste une capture d'écran de la situation sur Light Me
                    Up!
                  </p>
                </div>

                <div className="row">
                  <p className="number"> 3 </p>
                  <p>Les autres utilisateurs me conseillent anonymement</p>
                </div>

                <div className="row">
                  <p className="number"> 4</p>
                  <p>
                    Je consulte les conseils donnés par les autres utilisateurs
                    dans mon espace personnel
                  </p>
                  <NavLink exact to="/user" title="Get Helped">
                    <PersonIcon
                      style={{ fill: "white" }}
                      stroke="grey"
                      strokeWidth="1px"
                      fontSize="small"
                    />
                  </NavLink>
                </div>
              </div>
            )}
            {!modal && (
              <div>
                <div className="row">
                  <p className="number"> 1 </p>
                  <p>Je me rends dans l'onglet help</p>
                  <NavLink exact to="/game" title="Help">
                    <CreateIcon
                      style={{ fill: "white" }}
                      stroke="grey"
                      strokeWidth="1px"
                      fontSize="small"
                    />
                  </NavLink>
                </div>

                <div className="row">
                  <p className="number"> 2 </p>
                  <p>
                    Je vote pour le meilleur conseil selon moi, ou je donne mon
                    propre conseil
                  </p>
                </div>
              </div>
            )}

            <button type="button" className="modal-close-button" onClick={hide}>
              <span>&times;</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 1040;
          background-color: rgba(0, 0, 0, 0.5);
        }

        .modal-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1050;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .list {
          display: flex;
          flex-direction: row;
          font-family: "CalibriLight";
          justify-content: space-evenly;
          align-items: center;
          margin-bottom: 30px;
          transition: 0.5s;
        }
        .active-list {
          background-color: rgb(255, 153, 153);
          color: white;
          padding: 10px;
          border-radius: 10px;
          width: 180px;
          text-align: center;
          transition: 0.5s;
          border: none;
        }
        .unactive {
          padding: 10px;
          border-radius: 10px;
          border: 1px solid grey;
          width: 180px;
          text-align: center;
          transition: 0.5s;
        }

        .row {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          padding-top: 5px;
          font-family: Calibri Light;
          color: grey;
          gap: 10px;
          margin: 10px;
        }
        .number {
          background-color: rgb(255, 153, 153);
          padding-left: 10px;
          padding-right: 10px;
          width: auto;
          border-radius: 20px;
          color: white;
          margin-right: 5px;
          font-size: 25px;
        }

        .modal {
          z-index: 100;
          background: #fff;
          position: relative;
          margin: auto;
          border-radius: 5px;
          max-width: 500px;
          width: 60%;
          padding: 1rem;
          height: 50%;
        }

        .modal-close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 1.4rem;
          font-weight: 700;
          color: #000;
          cursor: pointer;
          border: none;
          background: transparent;
        }
      `}</style>
    </>
  ) : null;
};

export default Modal;
