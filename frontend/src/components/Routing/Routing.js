import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Context } from "../login/Login";
import SignIn from "../login/SignIn";
import HomePage from "../HomePage/Homepage";

export default function Routing() {
  const person = useContext(Context);
  return (
    <>
      // <h1>Hello {person}</h1>
      <Login />
      // <Context /> ? ( // <Route path="/homepage" element={<HomePage />} />
      // ) : ( //{" "}
      <div>
        //{" "}
        <BrowserRouter>
          //{" "}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signin" element={<SignIn />} />
            //{" "}
          </Routes>
          //{" "}
        </BrowserRouter>
        //{" "}
      </div>
    </>
  );
}
