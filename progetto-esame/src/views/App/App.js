import React from "react";
import MainTemplate from "../../components/MainTemplate/MainTemplate";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "../Home/Home";
import SongList from "../SongList/SongList";
import SongDetails from "../SongDetails/SongDetails";
import NoPage from "../NoPage/NoPage";

function App() {

  return (
      <BrowserRouter>
          <MainTemplate>
              <Routes>
                  <Route path={"/"} element={<Home />}/>
                  <Route path={"/songList"} element={<SongList />}/>
                  <Route path={"/songList/:number"} element={<SongDetails />}/>
                  <Route path={'*'} element={<NoPage />}/>
              </Routes>
          </MainTemplate>
      </BrowserRouter>

  );
}

export default App;
