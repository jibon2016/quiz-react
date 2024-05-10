import { Link } from "react-router-dom";
import image from "../../assets/images/logo.png";
import classes from "../../styles/Nav.module.css";
import Account from "./Account";

export default function Nav () {
  return (    
  <nav className={classes.nav}>
  <ul>
    <li>
      <Link to="/" className={classes.brand}>
        <img className={classes.logo } src={image} alt="Learn with Sumit Logo" />
        <h3>React Quiz App</h3>
      </Link>
    </li>
  </ul>
  <Account />
</nav>
);
}