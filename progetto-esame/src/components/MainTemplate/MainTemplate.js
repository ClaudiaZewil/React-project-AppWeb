import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import logoImg from "../../assets/images/RollingStoneLogoBig.png";

function MainTemplate() {

    return(
        <>
            <Header logoImg={logoImg}/>

            <Footer logoImg={logoImg}/>
        </>
    )
}

export default MainTemplate;