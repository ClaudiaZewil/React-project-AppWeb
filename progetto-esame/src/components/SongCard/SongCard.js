import React, {useState, useEffect} from "react";
import {Card, CardBody, CardImg, CardText, CardTitle, CardSubtitle, CardHeader} from "reactstrap";
import style from "./SongCard.module.css";
import {NavLink} from "react-router-dom";
import songDefaultImage from "../../assets/images/RollingStoneLogoSmall.png";
import songDefaultImageBW from "../../assets/images/RollingStoneLogoSmallBW.png";
import songLoadingImage from "../../assets/images/loading.png";

function SongCard(props) {
    const {songNumber, songName, songArtist} = props;
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
        fetch(`/search?q=${songArtistData}%${songNameData}&index=0&limit=1&output=json`)
            .then(res => res.json())
            .then(data => {
                if (isMounted)
                    setSongData(data);
                console.log(data);
            })
            .catch((error) => {
                console.log("Error" + error);
                setApiError(true);
            });

        return () => {
            isMounted = false;
        }
    }, [songNumber]);

     return (
         <NavLink to={`/songList/${songNumber}`}>
             <Card className={`h-100 ${style.card}`}>
                 {songData.length !== 0 ?
                     <div>
                         {
                             songData.error ?
                                 <CardImg src={songDefaultImageBW}></CardImg>
                                 :
                                 <CardImg src={songData["data"]["0"]["album"]["cover_xl"]} loading="lazy"  top width="100%"></CardImg>
                         }
                     </div>
                     :
                     <div>
                         {
                             apiError === false ?
                                 <CardImg src={songLoadingImage}></CardImg>
                                 :
                                 <CardImg src={songDefaultImage}></CardImg>
                         }
                     </div>
                 }
                 <CardBody className="mb-3 text-center">
                     <CardText tag="h3" className={`${style.songNumber}`}>{songNumber}</CardText>
                     <CardTitle><h4>{songName}</h4></CardTitle>
                     <CardSubtitle>{songArtist}</CardSubtitle>
                 </CardBody>
             </Card>
         </NavLink>
     )
}

export default SongCard;