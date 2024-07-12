import { Outlet } from "react-router-dom";

export const Navigation = () => {
  return (
    <>
      <nav>
        <a href="/">Home</a>
        <a style={{ marginLeft: 15 }} href="/books">
          Books
        </a>
        <a style={{ marginLeft: 15 }} href="/dances">
          Dances
        </a>
        <a style={{ marginLeft: 15 }} href="/favorites">
          Favorites
        </a>
        <a style={{ marginLeft: 15 }} href="/auth">
          Auth
        </a>
      </nav>
      <Outlet />
    </>
  );
};
