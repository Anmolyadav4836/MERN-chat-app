import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { loginUser, loginError, isLoginLoading, updateLoginInfo, loginInfo } = useContext(AuthContext);
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <form onSubmit={loginUser} className="h-screen flex items-center justify-center">
      <div className=" w-full max-w-md bg-white p-10 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => updateLoginInfo({ ...loginInfo, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="relative">
            <input
              type= {showPassword? "text" : "password"}
              placeholder="Password"
              onChange={(e) => updateLoginInfo({ ...loginInfo, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="absolute top-2 right-2" onClick={() => setShowPassword(!showPassword)}>
              {
                showPassword ? (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>)
              }
            </div>

          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
          >
            {isLoginLoading ? "Logging in..." : "Login"}
          </button>

          {loginError?.error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
              <p>{loginError.message}</p>
            </div>
          )}

          <div className="flex  gap-4 items-center justify-center bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
            Dummy login data
            <div>
               User-1
              <p>Email: user5@gmail.com</p>
              <p>Password: User5@12345</p>
            </div>
            
            <div>
              User-2
              <p>Email: user@gmail.com</p>
              <p>Password: User@1234</p>
            </div>
            
          </div>
        </div>
      </div>
      
    </form>
  );
};

export default Login;
