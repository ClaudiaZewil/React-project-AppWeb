import React, {useState, useEffect} from "react";
import {Card, CardBody, CardImg, CardText, CardTitle, CardSubtitle, CardHeader} from "reactstrap";
import style from "./SongCard.module.css";
import {NavLink} from "react-router-dom";

function SongCard(props) {
    const {songNumber, songName, songArtist, songDate} = props;
    const [songData, setSongData] = useState([]);

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
        fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=361bb0d6ecbc8a3710b9d8a467354834&artist=${songArtistData}&track=${songNameData}&format=json`)
            .then(res => res.json())
            .then(res => {
                if (isMounted)
                    setSongData(res);
                console.log(songData);
            })
            .catch((error) => console.log("Error" + error));
        return () => {
            isMounted = false;
        }
    }, []);

     return (
         <NavLink to={`/${songNumber}`}>
             <Card>
                 <CardHeader>#{songNumber}</CardHeader>
                 <CardImg></CardImg>
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