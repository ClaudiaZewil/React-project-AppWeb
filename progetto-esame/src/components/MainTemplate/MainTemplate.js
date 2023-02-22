import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import logoImg from "../../assets/images/RollingStoneLogoBig.png";

function MainTemplate(props) {
    const {children} = props;
    return(
        <>
            <Header logoImg={logoImg}/>
            <div className="my-5">
                {children}
            </div>
            <Footer logoImg={logoImg}/>
        </>
    )
}

export default MainTemplate;