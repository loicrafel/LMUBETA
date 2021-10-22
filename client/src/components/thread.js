import React, { useEffect, useState } from "react";
import Card from "./card";
import { isEmpty } from "./utils";

const Thread = ({ posts }) => {
  const [loadPost, setLoadPost] = useState(true);
  const [count, setCount] = useState(5);

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
    <div className="thread">
      {!isEmpty(posts) &&
        posts
          .slice(0, count)
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((post) => {
            return <Card post={post} key={post._id} />;
          })}
    </div>
  );
};

export default Thread;
