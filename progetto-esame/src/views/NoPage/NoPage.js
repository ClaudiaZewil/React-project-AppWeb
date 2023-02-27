import React from "react";
import songDefaultImage from "../../assets/images/crowd.jpeg";
import style from "./NoPage.module.css";
import {NavLink} from "react-router-dom";


function NoPage() {
    return(
        <div className="container">
            <div className="row pt-5 d-flex align-items-center">
                <div className="col-12 col-md-4">
                    <img src={songDefaultImage} loading="lazy" width="100%" alt="" className={`img-fluid ${style.defaultImage}`} />
                </div>
                <div className={`col-12 col-md-4 p-5 ${style.description}`}>
                    <h2>Sorry :(</h2>
                    <p>This page doesn't exist.</p>
                    <NavLink className="button btn btn-outline-danger mt-5" to="/songList">See all the Greatest Songs</NavLink>
                </div>
            </div>
        </div>
    )
}

export default NoPage;