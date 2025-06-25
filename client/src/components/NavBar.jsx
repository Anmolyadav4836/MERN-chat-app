import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Notification from "./chat/Notification";
import { Button } from "./Button";


const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <nav className="bg-gray-900 text-white mb-4 h-15 rounded-md px-6 py-3 flex items-center justify-between border-b-2">
      <h2 className="text-xl font-semibold">
        <Link to="/" className="text-white no-underline hover:text-yellow-300">
          ChatApp
        </Link>
      </h2>

      {user && (
        <span className="text-yellow-400 text-sm font-medium">
          Logged in as {user?.name}
        </span>
      )}

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Notification />
            <Link
              onClick={() => logoutUser()}
              to="/login"
              
            >
             <Button title="Logout"/>
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-white hover:text-yellow-300 text-sm transition duration-200"
            >
             <Button title="Login"/>
            </Link>
            <Link
              to="/register"
              className="text-white hover:text-yellow-300 text-sm transition duration-200"
            >
             <Button title="Register"/>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
