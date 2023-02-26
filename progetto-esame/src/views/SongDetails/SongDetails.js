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

        fetch(`https://api.deezer.com/search?q=${songArtistData}%${songNameData}&output=jsonp`, {
            crossorigin: true,
            mode: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
        })
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
    }, [songNumber]);

    return(
        <div className="container pt-5">
            <div className="row pt-5 d-flex align-items-center">
                <div className="col-12 col-md-4">
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
                                        <audio controls className={style2.audioPlayer}>
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
                <div className="col-12 col-md-4">
                    <SongCard className={style2.detailsCard}
                        songNumber={songCurrent["0"]["position"]}
                        songName={songCurrent["0"]["songTitle"]}
                        songArtist={songCurrent["0"]["artistTitle"]}
                    >
                    </SongCard>
                </div>
                <div className="col-12 col-md-4">
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
                                                    artistData.artists["0"]["life-span"]["ended"] === null ?
                                                        <span> alive</span>
                                                        :
                                                        <span> {artistData.artists["0"]["life-span"]["ended"]}</span>
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
                        {number - 1 !== 0 &&
                            <NavLink className={`${style.prev} ${style.navItem}`}
                                     to={`/songList/${number - 1}`}>&lt; Prev</NavLink>
                        }
                        {number + 1 <= Object.keys(SongListData).length &&
                            <NavLink className={`${style.next} ${style.navItem}`}
                                     to={`/songList/${number + 1}`}>Next &gt;</NavLink>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SongDetails;