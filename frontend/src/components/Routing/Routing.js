import React, { useContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login, { Context, LoginId } from "../login/Login";
import SignIn from "../login/SignIn";
import HomePage from "../HomePage/Homepage";

export default function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}
