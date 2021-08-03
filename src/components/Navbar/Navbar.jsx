import styles from './Navbar.module.css'
import LinkItem from './LinkItem/LinkItem';
import Sidebar from './Sidebar/Sidebar';
import React from "react";

const Navbar = () => {
  return (
    <nav className={styles.navigation}>

      <LinkItem name="Profile" path="/profile"/>
      <LinkItem name="Messages" path="/messages"/>
      <LinkItem name="News" path="/news"/>
      <LinkItem name="Users" path="/users"/>
      <LinkItem name="Music" path="/music"/>
      <LinkItem name="Settings" path="/settings"/>
      <Sidebar/>
    </nav>
  )
}

export default Navbar
