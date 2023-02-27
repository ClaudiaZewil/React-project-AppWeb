import React, {useEffect, useState} from "react";
import SongListData from "../../assets/data/RollingStoneTop500Song.json";
import {NavLink, useParams} from "react-router-dom";
import SongCard from "../../components/SongCard/SongCard";
import songDefaultImage from "../../assets/images/crowd.jpeg";
import style from "../../components/SongTableTr/SongTableTr.module.css";
import songLoadingImage from "../../assets/images/loading.png";
import style2 from "./SongDetails.module.css";
import songDefaultImageBW from "../../assets/images/RollingStoneLogoSmallBW.png";

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

        fetch(`/search?q=${songArtistData}%${songNameData}&index=0&limit=1`)
            .then(res => res.json())
            .then(res => {
                if (isMounted)
                    setSongData(res);
                console.log(res, fetch.url);
            })
            .catch((error) => {
                console.log("Error" + error)
                setApiError(true);
            });
        fetch(`https://musicbrainz.org/ws/2/artist/?query=artist:${songArtistData}&fmt=json`)
            .then(data => data.json())
            .then(data => {
                if (isMounted)
                    setArtistData(data);
                console.log(data);
            })
            .catch((error) => {
                console.log("Error" + error)
                setApiError(true);
            });

        return () => {
            isMounted = false;
        }
    }, [songNumber]);

    return(
        <div className="container">
            <div className="row pt-5 d-flex align-items-center">
                <div className={`col-12 col-md-4 ${style2.imgContainer}`}>
                    {songData.length !== 0 ?
                        <div>
                            {
                                songData.error ?
                                    <img src={songDefaultImage} loading="lazy" width="100%" alt=""
                                         className={`img-fluid ${style2.artistImage}`} />
                                    :
                                    <div>
                                        <img src={songData["data"]["0"]["artist"]["picture_xl"]} loading="lazy" width="100%" alt=""
                                         className={`img-fluid ${style2.artistImage}`} />
                                        <h3 className={`mb-4 ${style2.playText}`}>Play it</h3>
                                        <audio controls className={`mb-5 ${style2.audioPlayer}`}>
                                            <source src={songData["data"]["0"]["preview"]} type="audio/mp3" />
                                        </audio>
                                    </div>
                            }
                        </div>
                        :
                        <div>
                            {
                                apiError === false ?
                                    <img src={songLoadingImage} loading="lazy" width="100%" alt=""
                                         className={`img-fluid ${style2.artistImage}`} />
                                    :
                                    <img src={songDefaultImage} loading="lazy" width="100%" alt=""
                                         className={`img-fluid ${style2.artistImage}`} />
                            }
                        </div>
                    }
                </div>
                <div className="col-12 col-md-4 pb-5">
                    <SongCard className={`${style2.detailsCard} fewCards`}
                        songNumber={songCurrent["0"]["position"]}
                        songName={songCurrent["0"]["songTitle"]}
                        songArtist={songCurrent["0"]["artistTitle"]}
                    >
                    </SongCard>
                </div>
                <div className={`col-12 col-md-4 p-5 ${style2.description}`}>
                    <div>
                        <h2>{songCurrent["0"]["artistTitle"]}</h2>
                        {artistData.length !== 0 ?
                            <div>
                                {
                                    artistData.error ?
                                        <p>Error: no aviable information</p>
                                        :
                                        <p>
                                            <strong>Type:</strong> {artistData.artists["0"]["type"]}<br/>
                                            <strong>Area:</strong> {artistData.artists["0"]["area"]["name"]}<br/>
                                            <strong>Begin area:</strong> {artistData.artists["0"]["begin-area"]["name"]}<br/>
                                            <strong>Life:</strong> {artistData.artists["0"]["life-span"]["begin"]} -
                                            <span className="d-inline">
                                                {
                                                    artistData.artists["0"]["life-span"]["ended"] === true ?
                                                        <span> {artistData.artists["0"]["life-span"]["end"]}</span>
                                                        :
                                                        <span> alive</span>
                                                }
                                            </span>
                                        </p>

                                }
                            </div>
                            :
                            <div>
                                {
                                    apiError === false ?
                                        <p>Loading information...</p>
                                        :
                                        <p>Server: no aviable information</p>
                                }
                            </div>
                        }
                    </div>
                    <div className={style.navigation}>
                        {songNumber - 1 !== 0 &&
                            <NavLink className={`button btn btn-outline-danger m-2 ${style.prev} ${style.navItem}`}
                                     to={`/songList/${songNumber - 1}`}>&lt; Prev</NavLink>
                        }
                        {songNumber + 1 <= Object.keys(SongListData).length &&
                            <NavLink className={`button btn btn-outline-danger m-2 ${style.next} ${style.navItem}`}
                                     to={`/songList/${songNumber + 1}`}>Next &gt;</NavLink>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SongDetails;