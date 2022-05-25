import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { DevelopersList } from "./components/developers-list/developers-list.component";
import { HeroBanner } from "./components/hero-banner/hero-banner.component";
import { RepositoriesList } from "./components/repositories-list/repositories-list.component";

export const App = () => {
  return (
    <BrowserRouter>
      <HeroBanner />
      <div className="container-lg pt-5">
        <Switch>
          <Route path="/" exact component={RepositoriesList} />
          <Route path="/developers" component={DevelopersList} />
          <Redirect to="/" />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
