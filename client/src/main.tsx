import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline } from "@mui/material";
import App from "./App.tsx";
import Navigater from "./components/Navigater.tsx";
import Todo from "./components/todo.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <CssBaseline />
      <Navigater />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
