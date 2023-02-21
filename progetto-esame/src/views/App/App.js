import React from "react";
import MainTemplate from "../../components/MainTemplate/MainTemplate";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "../Home/Home";
import SongList from "../SongList/SongList";
import SongDetails from "../SongDetails/SongDetails";

function App() {

  return (
      <BrowserRouter>
          <MainTemplate>
              <Routes>
                  <Route path={"/"} element={<Home />}/>
                  <Route path={"/songlist"} element={<SongList />}/>
                  <Route path={"/:song"} element={<SongDetails />}/>
              </Routes>
          </MainTemplate>
      </BrowserRouter>

  );
}

export default App;
