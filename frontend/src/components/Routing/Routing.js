import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../login/Login";
import SignIn from "../login/SignIn";
import HomePage from "../HomePage/Homepage";

export default function Routing() {
  return { validUserId } ? (
    <Route path="/homepage" element={<HomePage />} />
  ) : (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
