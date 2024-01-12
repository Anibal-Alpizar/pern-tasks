import { Link, useLocation } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./navigation";
import { Container } from "../ui";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const location = useLocation();
  const { isAuth, signout } = useAuth();
  return (
    <nav className="bg-zinc-950 ">
      <Container className={"flex justify-between py-3"}>
        <h1 className="font-bold text-2xl">
          <Link to="/">PERN tasks</Link>
        </h1>
        <ul className="flex gap-x-2">
          {isAuth ? (
            <>
              {privateRoutes.map(({ path, name }, index) => (
                <li
                  className={`text-slate-300 ${
                    location.pathname === path && "bg-sky-500 px-3 py-1"
                  }`}
                  key={index}
                >
                  <Link to={path}>{name}</Link>
                </li>
              ))}
              <li
                onClick={() => {
                  signout();
                }}
              >
                Logout
              </li>
            </>
          ) : (
            publicRoutes.map(({ path, name }, index) => (
              <li
                className={`text-slate-300 ${
                  location.pathname === path && "bg-sky-500 px-3 py-1"
                }`}
                key={index}
              >
                <Link to={path}>{name}</Link>
              </li>
            ))
          )}
        </ul>
      </Container>
    </nav>
  );
}

export default Navbar;
