import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const Navbar = () => {
  const [user] = useAuthState(auth);
  const signUserOut = async () => {
    await signOut(auth);
  };
  return (
    <>
      <Link to="/">Home</Link>

      {user ? (
        <>
          <Link to="/post">Create Post</Link>
          <div>
            <p>{user?.displayName}</p>
            <img
              src={user?.photoURL || ""}
              alt="profil"
              width="20"
              height="20"
            />
            <button onClick={signUserOut}>Logout</button>
          </div>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </>
  );
};
