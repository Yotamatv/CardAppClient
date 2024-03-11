import React from "react";
import { Route, Routes } from "react-router-dom";
import CardDetailsPage from "../cards/pages/CardDetailsPage";
import CardPage from "../cards/pages/CardPage";
import EditCardPage from "../cards/pages/EditCardPage";
import FavCards from "../cards/pages/FavCards";
import MyCards from "../cards/pages/MyCards";
import AboutPage from "../pages/AboutPage";
import ErrorPage from "../pages/ErrorPage";

import Countries from "../sandbox/effectHook/Countries";
import Effect from "../sandbox/effectHook/Effect";
import FirstEffect from "../sandbox/effectHook/FirstEffect";
import MyForm from "../sandbox/forms/MyForm";
import TestForm from "../sandbox/forms/TestForm";

import Get2Countries from "../sandbox/render/Get2Countries";
import SandBox from "../sandbox/SandBox";
import Counter from "../sandbox/stateHook/Counter";
import MyDetails from "../sandbox/stateHook/MyDetails";
import Password from "../sandbox/stateHook/Password";
import Todo from "../sandbox/stateHook/Todo";
import LoginPage from "../users/pages/LoginPage";
import SignupPage from "../users/pages/SignupPage";
import ROUTES from "./routesModel";
import Profile from "../users/pages/Profile";
import MapPage from "../sandbox/map/MapPage";
import AddCardPage from "../cards/pages/AddCardPage";

export default function Router() {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<CardPage />} />
      <Route path={ROUTES.CARDS} element={<CardPage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
      <Route path={ROUTES.FAV_CARDS} element={<FavCards />} />
      <Route path={ROUTES.MY_CARDS} element={<MyCards />} />
      <Route path={ROUTES.CREATE_CARD} element={<AddCardPage />} />
      <Route path={ROUTES.USER_PROFILE} element={<Profile />} />
      <Route path={`${ROUTES.EDIT_CARD}/:id`} element={<EditCardPage />} />
      <Route path={`${ROUTES.CARD_INFO}/:id`} element={<CardDetailsPage />} />
      <Route path={ROUTES.SANDBOX} element={<SandBox />}>
        <Route path="counter" element={<Counter />} />
        <Route path="mydetails" element={<MyDetails />} />
        <Route path="password" element={<Password />} />
        <Route path="todo" element={<Todo />} />
        <Route path="firsteffect" element={<FirstEffect />} />
        <Route path="countries" element={<Countries />} />
        <Route path="effect" element={<Effect />} />
        <Route path="render" element={<Get2Countries />} />
      </Route>
      <Route path="test" element={<MyForm />} />
      <Route path="form" element={<TestForm />} />
      <Route path="map" element={<MapPage />} />

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
