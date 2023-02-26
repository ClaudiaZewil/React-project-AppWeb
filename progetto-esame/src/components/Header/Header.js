import React, {useState} from "react";
import {Collapse, Nav, Navbar, NavbarToggler, NavItem} from 'reactstrap';
import {NavLink as RouterLink} from "react-router-dom";
import style from "./Header.module.css";

function Header(props) {
    const {logoImg} = props;
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return(
        <Navbar expand="md" light className={`row p-2 px-3 d-flex justify-content-around align-items-center fixed-top ${style.header}`} >
            <div className="col-3">
                <RouterLink to="/">
                    <img src={logoImg} alt="" className={`img-fluid py-2 ${style.headerImg}`}/>
                </RouterLink>
            </div>
            <div className="col-5 d-none d-md-inline text-center">
                <h3>500 Greatest Songs of All time</h3>
            </div>
            <div className="col-3">
                <NavbarToggler onClick={toggle}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem key="/">
                            <RouterLink exact="true" to="/" className="nav-link me-2"><h5 className={style.navItem}>Home</h5></RouterLink>
                        </NavItem>
                        <NavItem key="/songList">
                            <RouterLink exact="true" to="/songList" className="nav-link me-2"><h5 className={style.navItem}>Song List</h5></RouterLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </div>
        </Navbar>
    )
}
export default Header;