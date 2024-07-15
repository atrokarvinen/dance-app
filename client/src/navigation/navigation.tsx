import { Link, Outlet } from "react-router-dom";

export const Navigation = () => {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link style={{ marginLeft: 15 }} to="/dances">
          Dances
        </Link>
        <Link style={{ marginLeft: 15 }} to="/favorites">
          Favorites
        </Link>
        <Link style={{ marginLeft: 15 }} to="/auth">
          Auth
        </Link>
      </nav>
      <Outlet />
    </>
  );
};
