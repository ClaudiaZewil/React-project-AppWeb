import React from "react";
import style from "./Footer.module.css";
import unimib from "../../assets/images/unimib.jpg";

function Footer(props) {
    const {logoImg} = props;
    return(
        <footer className="row m-4 d-flex justify-content-around align-items-center">
            <div className="col-5">
                <img src={logoImg} alt="Rolling Stones logo image" className={style.footerImage}/>
                <h3>500 Greatest Songs of All time</h3>
                <p>"The 500 Greatest Songs of All Time" is a recurring survey compiled by the American magazine Rolling Stone. Another updated edition of the list was published in 2021: you can find it <a href="https://www.rollingstone.com/music/music-lists/best-songs-of-all-time-1224767/" target="_blank">here</a>.
                </p>
            </div>
            <div className="col-5">
                <div className="row">
                    <div className="col">
                        <p>Progetto di Claudia Rabaioli (886638)</p>
                        <p>Applicazioni Web, A.A. 2022-2023</p>
                    </div>
                    <div className="col">
                        <img src={unimib} alt="Università Milano Bicocca logo image" className={style.footerImage}/>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;