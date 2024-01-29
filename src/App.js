import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyLayout from "./components/admin/layout/MyLayout";
import UpdateCard from "./components/admin/addCard/UpdateCard";
import ViewCardStep from "./components/admin/addStep/ViewCardStep";
import CardData from "./components/admin/video/CardData";
import Login from "./components/admin/login/Login";
import "./App.css";





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<MyLayout />} />
        <Route path="/admin/card/edit/:id" element={<UpdateCard />} />
        <Route path="/admin/cardData/:cardId" element={<CardData />} />
        <Route path="/admin/view-steps/:cardId" element={<ViewCardStep />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
