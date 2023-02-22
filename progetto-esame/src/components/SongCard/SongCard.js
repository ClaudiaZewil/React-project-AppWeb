import React from "react";
import {Card, CardBody, CardImg, CardText, CardTitle, CardSubtitle, CardHeader} from "reactstrap";
import style from "./SongCard.module.css";
import {NavLink} from "react-router-dom";

function SongCard(props) {
    const {songNumber, songName, songArtist, songImage, songDate} = props;
     return (
         <NavLink to={`/${songNumber}`}>
             <Card>
                 <CardHeader>#{songNumber}</CardHeader>
                 <CardImg src={songImage} alt={songName} loading="lazy"  top
                          width="100%" />
                 <CardBody>
                     <CardTitle>{songName}</CardTitle>
                     <CardSubtitle>{songArtist}</CardSubtitle>
                     <CardText>{songDate}</CardText>
                 </CardBody>
             </Card>
         </NavLink>
     )
}

export default SongCard;