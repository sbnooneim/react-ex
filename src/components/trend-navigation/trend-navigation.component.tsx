import { NavLink } from "react-router-dom";
import "./trend-navigation.styles.scss";

export const TrendNavigation = () => {
  return (
    <div className="btn-group btn-group-sm" role="group">
      <NavLink
        to="/"
        exact
        className="btn btn-outline-secondary border-end-0 px-3 trend-navigation__item text-decoration-none fw-medium"
        activeClassName="btn-primary"
      >
        Repositories
      </NavLink>
      <NavLink
        to="/developers"
        className="btn btn-outline-secondary border-start-0 px-3 trend-navigation__item text-decoration-none fw-medium"
        activeClassName="btn-primary"
      >
        Developers
      </NavLink>
    </div>
  );
};
