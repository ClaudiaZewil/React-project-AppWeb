import React, {useState, useEffect} from "react";
import {Card, CardBody, CardImg, CardText, CardTitle, CardSubtitle, CardHeader} from "reactstrap";
import style from "./SongCard.module.css";
import {NavLink} from "react-router-dom";
import songDefaultImage from "../../assets/images/RollingStoneLogoSmall.png";
import songLoadingImage from "../../assets/images/loading.png";

function SongCard(props) {
    const {songNumber, songName, songArtist, songDate} = props;
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
         <NavLink to={`/${songNumber}`}>
             <Card>
                 <CardHeader>#{songNumber}</CardHeader>
                 {songData.length !== 0 ?
                     <div>
                         {
                             songData.data ?
                                 <CardImg src={songData["data"]["0"]["album"]["cover_xl"]} loading="lazy"  top
                                          width="100%">
                                 </CardImg>
                                 :
                                 <CardImg src={songDefaultImage}>
                                 </CardImg>
                         }
                     </div>
                     :
                     <div>
                         {
                             apiError === false ?
                                 <CardImg src={songLoadingImage}>
                                 </CardImg>
                                 :
                                 <CardImg src={songDefaultImage}>
                                 </CardImg>
                         }
                     </div>
                 }
                 <CardBody>
                     <CardTitle>{songName}</CardTitle>
                     <CardSubtitle>{songArtist}</CardSubtitle>
                     <CardText></CardText>
                 </CardBody>
             </Card>
         </NavLink>
     )
}

export default SongCard;