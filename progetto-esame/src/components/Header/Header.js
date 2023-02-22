import React, {useState} from "react";
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem} from 'reactstrap';
import {NavLink as RouterLink} from "react-router-dom";
import style from "./Header.module.css";

function Header(props) {
    const {logoImg} = props;
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return(
        <Navbar expand="md" light className="row p-3 d-flex justify-content-between align-items-center">
            <div className="col-3">
                <RouterLink to="/">
                    <img src={logoImg} alt="" className={`img-fluid ${style.headerImg}`}/>
                </RouterLink>
            </div>
            <div className="col-5 d-none d-md-inline">
                <h3>500 Greatest Songs of All time</h3>
            </div>
            <div className="col-3">
                <NavbarToggler onClick={toggle}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem key="/">
                            <RouterLink exact="true" to="/" activeClassName={style.active} className="nav-link me-2">Home</RouterLink>
                        </NavItem>
                        <NavItem key="/songList">
                            <RouterLink exact="true" to="/songList" activeClassName={style.active} className="nav-link me-2">Song List</RouterLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </div>
        </Navbar>
    )
}
export default Header;