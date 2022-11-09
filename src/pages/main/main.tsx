import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { Post } from "./post";

export interface IPost {
  title: string;
  content: string;
  id: string;
  username: string;
}

export const Main = () => {
  const [postsList, setPostsList] = useState<IPost[] | null>(null);
  const postRef = collection(db, "posts");
  const getPosts = async () => {
    const data = await getDocs(postRef);
    setPostsList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IPost[]
    );
  };
  useEffect(() => {
    getPosts();
  }, [postRef]);

  return (
    <div>
      {postsList?.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};
