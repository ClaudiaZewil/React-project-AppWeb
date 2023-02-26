import React, {useState, useEffect} from "react";
import {Card, CardBody, CardImg, CardText, CardTitle, CardSubtitle, CardHeader} from "reactstrap";
import style from "./SongCard.module.css";
import {NavLink} from "react-router-dom";
import songDefaultImage from "../../assets/images/RollingStoneLogoSmall.png";
import songDefaultImageBW from "../../assets/images/RollingStoneLogoSmallBW.png";
import songLoadingImage from "../../assets/images/loading.png";

function SongCard(props) {
    const {songNumber, songName, songArtist, songImage} = props;
     return (
         <NavLink to={`/songList/${songNumber}`}>
             <Card className={`mb-3 ${style.card}`}>
                 <CardImg src={songImage}></CardImg>
                 <CardBody className="mb-3">
                     <CardText tag="h3" className={`${style.songNumber}`}>{songNumber}</CardText>
                     <CardTitle>{songName}</CardTitle>
                     <CardSubtitle>{songArtist}</CardSubtitle>
                 </CardBody>
             </Card>
         </NavLink>
     )
}

export default SongCard;