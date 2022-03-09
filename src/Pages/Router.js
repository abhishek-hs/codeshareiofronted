import React from "react";
import NotepadPage from "./NotepadPage";
import HomePage from "./HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import VideoCallDemo from "./videoCallDemo";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path=":gropid" element={<NotepadPage />} />
        <Route path="/demo" element={<VideoCallDemo />} />
      </Routes>
    </BrowserRouter>
  );
}
