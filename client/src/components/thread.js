import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "./card";
import { ShimmerBadge, ShimmerPostItem } from "react-shimmer-effects";

const Thread = ({ posts }) => {
  const [loadPost, setLoadPost] = useState(true);
  const [reload, setReload] = useState(true);
  const [count, setCount] = useState(2);
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

  const Shimmer = () => {
    return (
      <div className="center">
        <ShimmerBadge width={200} />
        <ShimmerPostItem card text cta imageHeight={460} imageWidth={250} />
      </div>
    );
  };

  useEffect(() => {
    if (loadPost && posts.length > count) {
      setLoadPost(false);
      setCount(count + 2);
    }

    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadPost, count, posts.length]);

  useEffect(() => {
    setTimeout(() => setReload(false), 1000);
  }, [reload]);

  return (
    <div>
      <div className="list-choice">
        <div
          onClick={() => {
            setModal(0);
            setReload(true);
          }}
          className={modal === 0 ? "active-class" : "unactive"}
        >
          Mes posts
        </div>
        <div
          onClick={() => {
            setModal(1);
            setReload(true);
          }}
          className={modal === 1 ? "active-class" : "unactive"}
        >
          Mes contributions
        </div>
        <div
          onClick={() => {
            setModal(2);
            setReload(true);
          }}
          className={modal === 2 ? "active-class" : "unactive"}
        >
          Que sont-ils devenus?
        </div>
      </div>

      {reload ? (
        <Shimmer />
      ) : (
        <div className="thread">
          {modal === 0 && (
            <p className="intro">
              Découvrez les conseils donnés par les autres utilisateurs.
            </p>
          )}
          {modal === 1 && (
            <p className="intro">
              Revivez les conseils que vous avez donnés aux autres utilisateurs.
            </p>
          )}
          {modal === 2 && (
            <p className="intro">
              Découvrez l'envers du décors : Vos conseils ont-ils portés leurs
              fruits?
            </p>
          )}
          {posts &&
            modal === 0 &&
            posts
              .sort((a, b) => b.createdAt - a.createdAt)
              .filter((x) => x.posterId === uid.id)
              .slice(0, count)
              .map((post) => {
                return <Card post={post} key={post._id} />;
              })}
          {posts1 &&
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

          {posts2 &&
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
      )}
    </div>
  );
};

export default Thread;
