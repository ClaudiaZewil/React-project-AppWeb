import React, {useEffect, useState} from "react";
import SongListData from "../../assets/data/RollingStoneTop500Song.json";
import {NavLink, useParams} from "react-router-dom";
import SongCard from "../../components/SongCard/SongCard";
import songDefaultImage from "../../assets/images/crowd.jpeg";
import style from "../../components/SongTableTr/SongTableTr.module.css";
import songLoadingImage from "../../assets/images/loading.png";
import style2 from "./SongDetails.module.css";

function SongDetails() {
    let {number} = useParams();
    let songNumber = parseInt(number);
    const songCurrent = SongListData.filter((song) => parseInt(song["position"]) === songNumber);
    console.log(songCurrent);

    //chiamata API
    const [songData, setSongData] = useState([]);
    const [artistData, setArtistData] = useState([]);
    const [apiError, setApiError] = useState(false);
    useEffect(() => {
        let isMounted = true;
        let songArtistData = songCurrent["0"]["artistTitle"];
        let songNameData = songCurrent["0"]["songTitle"];
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
        fetch(`https://musicbrainz.org/ws/2/artist/?query=artist:${songArtistData}&fmt=json`)
            .then(res => res.json())
            .then(res => {
                if (isMounted)
                    setArtistData(res);
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
        <div className="container pt-5">
            <div className="row pt-5">
                <div className="col d-flex align-items-center">
                    <img src={songData["data"]["0"]["artist"]["picture_xl"]} loading="lazy" width="100%" alt=""
                         className={`img-fluid ${style2.artistImage}`} />
                    <audio controls>
                        <source src={songData["data"]["0"]["preview"]} type="audio/mp3" />
                    </audio>
                </div>
                <div className="col">
                    <SongCard
                        songNumber={songCurrent["0"]["position"]}
                        songName={songCurrent["0"]["songTitle"]}
                        songArtist={songCurrent["0"]["artistTitle"]}
                    >
                    </SongCard>
                </div>
                <div className="col d-flex align-items-center flex-column">
                    <div>
                        <h2>{songCurrent["0"]["artistTitle"]}</h2>
                        <p>
                            <strong>Type:</strong> {artistData.artists["0"]["type"]}<br/>
                            <strong>Area:</strong> {artistData.artists["0"]["area"]["name"]}<br/>
                            <strong>Begin area:</strong> {artistData.artists["0"]["begin-area"]["name"]}<br/>
                            <strong>Life:</strong> {artistData.artists["0"]["life-span"]["begin"]} -
                            <span className="d-inline">
                                {
                                    artistData.artists["0"]["life-span"]["ended"] === null ?
                                        <span> alive</span>
                                        :
                                        <span> {artistData.artists["0"]["life-span"]["ended"]}</span>
                                }
                            </span>
                        </p>
                    </div>
                    <div className={style.navigation}>
                        {songNumber - 1 !== 0 &&
                            <NavLink className={`${style.prev} ${style.navItem}`}
                                     to={`/songList/${songNumber - 1}`}>&lt; Prev</NavLink>
                        }
                        {songNumber + 1 <= Object.keys(SongListData).length &&
                            <NavLink className={`${style.next} ${style.navItem}`}
                                     to={`/songList/${songNumber + 1}`}>Next &gt;</NavLink>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SongDetails;