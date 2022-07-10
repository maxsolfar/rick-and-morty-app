import React from "react";

import { Routes, Route } from "react-router-dom";

import Home from "./components/Pages/Home/Home";
import CreateCharacter from "./components/Pages/CreateCharacter/CreateCharacter";
import CharacterDetail from "./components/Pages/CharacterDetail/CharacterDetail";
import NotFound from "./components/Pages/NotFound/NotFound";

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character/:idCharacter" element={<CharacterDetail/>}/>
          <Route path="/newcharacter" element={<CreateCharacter/>}/>
          <Route path="*" element={<NotFound/>}/>
          <Route element={<NotFound/>}/>
        </Routes>
    </div>
  )
}

export default App;
