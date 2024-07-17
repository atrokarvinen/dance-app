import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../auth/use-auth";

export const Navigation = () => {
  const { initialLogin } = useAuth();

  useEffect(() => {
    initialLogin();
  }, []);

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
