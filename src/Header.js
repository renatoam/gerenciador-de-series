import React, { useState } from 'react';
// importar com chaves quer dizer que só estamos importando uma parte do pacote
import { Navbar, NavbarBrand, Collapse, Nav, NavItem, NavLink, NavbarToggler } from 'reactstrap';
import { Link } from 'react-router-dom';

const Header = () => {
    const [open, setOpen] = useState(false);
    const toggle = () => {
        setOpen(!open)
    }
    return (
        <Navbar color="light" light expand="md">
            <section className="container">
                <NavbarBrand tag={Link} to="/">Minhas Séries</NavbarBrand>
                <NavbarToggler onClick={toggle}></NavbarToggler>
                <Collapse isOpen={open} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink tag={Link} to="/series">Séries</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/generos">Gêneros</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </section>
        </Navbar>
    )
}

export default Header;