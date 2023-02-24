import React from "react";
import {NavLink} from "react-router-dom";
import SongCardGrid from "../../components/SongCardGrid/SongCardGrid";
import SongListData from "../../assets/data/RollingStoneTop500Song.json";

function Home() {
    const songFiltered = SongListData.filter((song) => song.position === "1" || song.position === "2" || song.position === "3");
    return(
        <div className="container">
            <div className="row justify-content-center">
                <div className="col">
                    <div className="my-5 text-center">
                        <SongCardGrid
                            songList={songFiltered}
                            col={{xs: 1, sm: 1, md: 3, lg: 3, xl: 3}}
                        />
                        <NavLink className="button" to="/songList">See all the Greatest Hit</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;