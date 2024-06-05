import { Group } from "@mantine/core";
import { IconCar, IconHome, IconMenu2, IconUserCircle } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

import classes from "./Footer.module.css";
import axios from "axios";

export const Footer = () => {
  const navigate = useNavigate();
  const logout = () => {
    axios.post("/logout");
    navigate("/signin");
  };
  return (
    <>
      <Group justify="center" className={classes.footer_Container} gap={"50px"}>
        <IconMenu2 size={48} color="white" />
        <IconHome size={48} color="white" />
        <IconUserCircle size={48} color="white" onClick={logout} />
        <IconCar size={48} color="white" />
      </Group>
    </>
  );
};
