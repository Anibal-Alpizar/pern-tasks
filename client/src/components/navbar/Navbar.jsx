import { Link, useLocation } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./navigation";
import { Container } from "../ui";
import { useAuth } from "../../context/AuthContext";
import { twMerge } from "tailwind-merge";
import { BiLogOut } from "react-icons/bi";

function Navbar() {
  const location = useLocation();
  const { isAuth, signout, user } = useAuth();
  return (
    <nav className="bg-zinc-950 ">
      <Container className={"flex justify-between py-3"}>
        <h1 className="font-bold text-2xl">
          <Link to="/">PERN tasks</Link>
        </h1>
        <ul className="flex items-center justify-center md:gap-x-1">
          {isAuth ? (
            <>
              {privateRoutes.map(({ path, name, icon }, index) => (
                <li key={index}>
                  <Link
                    to={path}
                    className={twMerge(
                      "to-sky-300 flex items-center px-3 py-1 gap-x-1",
                      location.pathname === path && "bg-sky-500"
                    )}
                  >
                    {icon}
                    <span className="hidden md:block">{name}</span>
                  </Link>
                </li>
              ))}
              <li
                className="text-slate-300 flex items-center px-3 py-1 hover:cursor-pointer"
                onClick={() => {
                  signout();
                }}
              >
                <BiLogOut className="w-5 h-5" />
                <span className="hidden sm:block">Logout</span>
              </li>
              <li className="flex gap-x-2 items-center justify-center">
                <img
                  src={user.gravatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium">{user.name}</span>
              </li>
            </>
          ) : (
            publicRoutes.map(({ path, name }, index) => (
              <li
                className={twMerge(
                  "to-sky-300 flex items-center px-3 py-1",
                  location.pathname === path && "bg-sky-500"
                )}
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
