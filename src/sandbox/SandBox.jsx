import { AppBar, Container, Toolbar } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import NavItem from "../routes/components/NavItem";

export default function SandBox() {
  //   const user = {};
  //   user.isAdmin = true;
  //   if (!user || !user.isAdmin) return <Navigate replace to={ROUTES.CARDS} />;
  return (
    <div>
      <AppBar position="sticky" color="transparent">
        <Toolbar>
          <NavItem to="counter" label="Counter Page" sx={{ color: "black" }} />
          <NavItem
            to="mydetails"
            label="My Details Page"
            sx={{ color: "black" }}
          />
          <NavItem
            to="password"
            label="Password Page"
            sx={{ color: "black" }}
          />
          <NavItem to="todo" label="Todo Page" sx={{ color: "black" }} />
          <NavItem
            to="firsteffect"
            label="First Effect Page"
            sx={{ color: "black" }}
          />
          <NavItem
            to="countries"
            label="Coutries Page"
            sx={{ color: "black" }}
          />
          <NavItem to="render" label="Render" sx={{ color: "black" }} />
        </Toolbar>
      </AppBar>
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}
