import { Group } from "@mantine/core";
import { IconCar, IconHome, IconMenu2, IconUserCircle } from "@tabler/icons-react";
// import { useNavigate } from "react-router-dom";

import classes from "./Footer.module.css";

export const Footer = () => {
  // const navigate = useNavigate();
  return (
    <>
      <Group justify="center" className={classes.footer_Container} gap={"50px"}>
        <IconMenu2 size={48} color="white" />
        <IconHome size={48} color="white" />
        <IconUserCircle size={48} color="white" />
        <IconCar size={48} color="white" />
      </Group>
    </>
  );
};
