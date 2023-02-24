import React, {useEffect, useState} from "react";
import SongCardGrid from "../../components/SongCardGrid/SongCardGrid";
import SongListData from "../../assets/data/RollingStoneTop500Song.json";
import {useParams} from "react-router-dom";

function SongDetails() {
    let {songNumber} = useParams();
    let id = parseInt(songNumber);
    const songCurrent = SongListData.filter((song) => song.position === id)[0];

    //chiamata API
    const [songData, setSongData] = useState([]);
    const [apiError, setApiError] = useState(false);
    useEffect(() => {
        let isMounted = true;
        let songArtistData = songCurrent.artistTitle;
        let songNameData = songCurrent.songTitle;
        for (let i = 0; i < songArtistData.lenght; i++) {
            if (songArtistData[i] === " ") songArtistData[i] = "%";
        }
        for (let i = 0; i < songNameData.lenght; i++) {
            if (songNameData[i] === " ") songNameData[i] = "%";
        }
        fetch(`https://api.deezer.com/search?q=${songArtistData}%${songNameData}`)
            .then(res => res.json())
            .then(res => {
                if (isMounted)
                    setSongData(res);
                console.log(res);
            })
            .catch((error) => {
                console.log("Error" + error)
                setApiError(true);
            });

        return () => {
            isMounted = false;
        }
    }, []);

    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    <img src={songData["data"]["0"]["artist"]["picture_xl"]} alt={songCurrent.songTitle} loading="lazy" className="img-fluid"/>
                </div>
                <div className="col">
                    <div className="my-5 text-center">
                        <SongCardGrid
                            songList={songCurrent}
                            col={{xs: 1, sm: 1, md: 1, lg: 1, xl: 1}}
                        />
                    </div>
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}

export default SongDetails;