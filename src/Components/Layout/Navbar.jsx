import React from "react";
import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";
import Container from "./Container";
import logo from "../../Images/costs_logo.png";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Container>
        <Link to="/">
          <img src={logo} alt="Costs logo" />
        </Link>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/">Home</Link>
          </li>

          <li className={styles.item}>
            <Link to="/projects">Projects</Link>
          </li>

          <li className={styles.item}>
            <Link to="/company">Company</Link>
          </li>

          <li className={styles.item}>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
};

export default Navbar;
