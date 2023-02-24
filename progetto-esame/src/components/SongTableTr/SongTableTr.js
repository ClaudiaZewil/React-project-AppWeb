import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import songDefaultImage from "../../assets/images/RollingStoneLogoSmall.png";
import songLoadingImage from "../../assets/images/loading.png";
import style from "./SongTableTr.module.css";

function SongTableTr(props) {
    const {songNumber, songName, songArtist, songDate, songImage} = props;
    //chiamata API
    const [songData, setSongData] = useState([]);
    const [apiError, setApiError] = useState(false);
    useEffect(() => {
        let isMounted = true;
        let songArtistData = songName;
        let songNameData = songArtist;
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
    return (
        <tr key={songNumber}>
            <td>{songNumber}</td>
            <td>
                {songData.length !== 0 ?
                    <div>
                        {
                            songData.error ?
                                <NavLink to={`/songList/${songNumber}`}>
                                    <img src={songDefaultImage} loading="lazy" width="100%" alt="" className={`img-fluid ${style.imgTr}`} />
                                </NavLink>
                                :
                                <NavLink to={`/songList/${songNumber}`}>
                                    <img src={songData["data"]["0"]["album"]["cover_xl"]} loading="lazy" width="100%" alt="" className={`img-fluid ${style.imgTr}`} />
                                </NavLink>
                        }
                    </div>
                    :
                    <div>
                        {
                            apiError === false ?
                                <NavLink to={`/songList/${songNumber}`}>
                                    <img src={songLoadingImage} loading="lazy" width="100%" alt="" className={`img-fluid ${style.imgTr}`} />
                                </NavLink>
                                :
                                <NavLink to={`/songList/${songNumber}`}>
                                    <img src={songDefaultImage} loading="lazy" width="100%" alt="" className={`img-fluid ${style.imgTr}`} />
                                </NavLink>
                        }
                    </div>
                }
            </td>
            <td><NavLink to={`/songList/${songNumber}`}>{songName}</NavLink></td>
            <td>{songArtist}</td>
            <td>{songDate}</td>
        </tr>
    )
}

export default SongTableTr;