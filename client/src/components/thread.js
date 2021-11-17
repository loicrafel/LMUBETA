import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "./card";
import { isEmpty } from "./utils";

const Thread = ({ posts }) => {
  const [loadPost, setLoadPost] = useState(true);
  const [count, setCount] = useState(5);
  const [modal, setModal] = useState(0);
  const uid = useSelector((state) => state.authReducer.user);
  const posts1 = useSelector((state) => state.allPostsReducer);
  const posts2 = useSelector((state) => state.allPostsReducer);

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPost(true);
    }
  };

  useEffect(() => {
    if (loadPost && posts.length > count) {
      setLoadPost(false);
      setCount(count + 2);
    }

    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadPost, count, posts.length]);

  return (
    <div>
      <div className="list-choice">
        <div
          onClick={() => setModal(0)}
          id="register"
          className={modal === 0 ? "active-class" : "unactive"}
        >
          Mes posts
        </div>
        <div
          onClick={() => setModal(1)}
          id="login"
          className={modal === 1 ? "active-class" : "unactive"}
        >
          Mes contributions
        </div>
        <div
          onClick={() => setModal(2)}
          id="login"
          className={modal === 2 ? "active-class" : "unactive"}
        >
          Que sont-ils devenus?
        </div>
      </div>

      <div className="thread">
        {modal === 2 && (
          <p className="intro">
            Découvrez l'envers du décors : quelles décisions ont pris les
            utilisateurs que vous avez aidés? Vos conseils ont-ils portés leurs
            fruits?
          </p>
        )}
        {!isEmpty(posts) &&
          modal === 0 &&
          posts
            .sort((a, b) => b.createdAt - a.createdAt)
            .filter((x) => x.posterId === uid.id)
            .slice(0, count)
            .map((post) => {
              return <Card post={post} key={post._id} />;
            })}
        {!isEmpty(posts1) &&
          modal === 1 &&
          posts1

            .sort((a, b) => b.createdAt - a.createdAt)
            .filter((post) =>
              post.responses
                .map((y) => y.supporters.includes(uid.id))
                .includes(true)
            )
            .slice(0, count)
            .map((post) => {
              return <Card post={post} key={post._id} />;
            })}

        {!isEmpty(posts2) &&
          modal === 2 &&
          posts2

            .sort((a, b) => b.createdAt - a.createdAt)
            .filter((x) => x.after)
            .filter(
              (post) =>
                post.responses
                  .map((y) => y.supporters.includes(uid.id))
                  .includes(true) || post.responses.posterId === uid.id
            )
            .slice(0, count)
            .map((post) => {
              return <Card post={post} key={post._id} />;
            })}
      </div>
    </div>
  );
};

export default Thread;
