import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Modal = ({ isShowing, hide }) => {
  const uid = useSelector((state) => state.authReducer.user);
  const post = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(true);
  const deleteuser = (id) => {
    if (
      window.confirm(
        "Souhaitez-vous réellement supprimer votre compte? Cette action est irréversible."
      )
    ) {
      dispatch(deleteuser(id));
    }
  };

  return isShowing ? (
    <>
      <div className="modal-overlay">
        <div className="modal-wrapper">
          <div className="modal">
            <div>
              <div className="listsettings">
                <div className="insidelistsettings">
                  <img
                    src="../img/stat.svg"
                    alt="statistiques"
                    className="image"
                  />
                  <p onClick={() => setModal(!modal)}>
                    Statistiques de {uid.pseudo}
                  </p>
                  {!modal && <p>:</p>}
                  {!modal && <p>{post.length} posts</p>}
                </div>

                <NavLink className="insidelistsettings" exact to="about">
                  <img
                    src="../img/help.svg"
                    alt="parametres"
                    className="image"
                  />
                  <p>Aide et assistance</p>
                </NavLink>

                <div
                  className="insidelistsettings"
                  onClick={(e) => deleteuser(uid.id)}
                >
                  <img
                    src="../img/bin.svg"
                    alt="delete-account"
                    className="image"
                  />
                  <p>Supprimer le compte</p>
                </div>
              </div>
            </div>

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

        .close {
          height: 30px;
          position: absolute;
          top: 0px;
          right: 0px;
        }
        .listsettings {
          margin: 10px;
          padding-right: 40px;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        .insidelistsettings {
          text-decoration: none;
          cursor: pointer;
          display: flex;
          flex-direction: row;
          gap: 15px;
          align-items: center;
        }
        .image {
          height: 30px;
          background-color: lightgrey;
          border-radius: 100px;
          padding: 10px;
        }

        p {
          font-size: 14px;
          font-family: "CalibriLight";
          color: black;
        }
        li {
          list-style-type: none;
          font-size: 14px;
          font-family: "CalibriLight";
          color: black;
        }

        .modal {
          z-index: 100;
          background: #fff;
          position: relative;
          margin: auto;
          border-radius: 5px;
          max-width: 500px;
          width: auto;
          padding: 1rem;
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
