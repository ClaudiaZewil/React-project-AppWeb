import React, {useEffect, useState} from "react";
import SongListData from "../../assets/data/RollingStoneTop500Song.json";
import {useParams} from "react-router-dom";

function SongDetails() {
    let {number} = useParams();
    let songNumber = parseInt(number);
    const songCurrent = SongListData.filter((song) => song["position"] === songNumber);

    console.log(songCurrent);

    return(

        <div className="container">
            <div className="row">
                <div className="col">
                </div>
                <div className="col">
                    <p>{songCurrent.artistTitle}</p>
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}

export default SongDetails;