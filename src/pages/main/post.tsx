import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { IPost } from "./main";
import { FormEvent, useEffect, useRef, useState } from "react";

interface Props {
  post: IPost;
}

interface Likes {
  likeId: string;
  userId: string;
}

interface Comment {
  comment: string;
  postId: string;
  userId: string;
}

export const Post = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);

  const [likesAmount, setLikesAmount] = useState<Likes[] | null>(null);
  const [comments, setComments] = useState<Comment[] | null>(null);

  const likesRef = collection(db, "likes");

  const likesDoc = query(likesRef, where("postId", "==", post.id));
  const hasUserLiked = likesAmount?.find((like) => like.userId === user?.uid);

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikesAmount(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
    //console.log(data);

  };

  const addLike = async () => {
    try {
      const newLikeDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikesAmount((prev) =>
          prev
            ? [...prev, { userId: user?.uid, likeId: newLikeDoc.id }]
            : [{ userId: user?.uid, likeId: newLikeDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );
      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeToDelete = doc(db, "likes", likeToDeleteData.docs[0].id);

      await deleteDoc(likeToDelete);
      if (user) {
        console.log(likeToDeleteData.docs);
        setLikesAmount(
          (prev) =>
            prev &&
            prev.filter((like) => like.likeId !== likeToDeleteData.docs[0].id)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const commRef = collection(db, "comments");
  const textComment = useRef<HTMLTextAreaElement>(null);
  const commentsDoc = query(commRef, where("idPost", "==", post.id));

  const handleComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newComm = await addDoc(commRef, {
        comment: textComment?.current?.value,
        userId: user?.uid,
        postId: post.id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getComments = async () => {
    const data = await getDocs(commentsDoc);
    setComments(
      data.docs.map((doc) => ({
        comment: doc.id,
        postId: doc.id,
        userId: doc.data().userId,
      }))
    );
    console.log(data.docs);
  };
  /* const addLike = async () => {
    try {
      const newLikeDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikesAmount((prev) =>
          prev
            ? [...prev, { userId: user?.uid, likeId: newLikeDoc.id }]
            : [{ userId: user?.uid, likeId: newLikeDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  }; */
  useEffect(() => {
    getLikes();
    getComments();

    
  }, []);

  return (
    <>
      <div>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
        <p>@{post.username}</p>
        <button
          onClick={hasUserLiked ? removeLike : addLike}
          style={{ backgroundColor: hasUserLiked ? "green" : "" }}
        >
          <>&#x26A1;</>
        </button>
        {likesAmount && <p>Likes : {likesAmount.length}</p>}
      </div>
      <div>
        <form onSubmit={(e) => handleComment(e)}>
          <textarea placeholder="Comment..." ref={textComment}></textarea>
          <input type="submit" value="Send" />
        </form>
      </div>
      <hr />
    </>
  );
};
