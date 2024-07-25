import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button/Button";
import logo from "/images/logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleMenu = () => {
    setOpen(!open);
  };

  return (
    <nav className="bg-primary w-full h-20 font-inter px-2 sm:px-4 lg:px-8 flex justify-between items-center">
      <div className="w-20">
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="bg-contain w-full cursor-pointer"
          />
        </Link>
      </div>
      <ul
        className={`${
          open ? "flex" : "hidden"
        } flex-col w-full md:w-auto absolute top-20 left-0 bg-primary justify-center items-center gap-2 py-4 md:flex md:flex-row md:static border-y border-muted md:border-0`}
      >
        <li>
          <a href="" className="font-bold text-light hover:text-muted mr-4">
            Live Matches
          </a>
        </li>
        <li>
          <a href="" className="font-bold text-light hover:text-muted mr-4">
            Upcoming Matches
          </a>
        </li>
        <li>
          <a href="" className="font-bold text-light hover:text-muted mr-4">
            Past Matches
          </a>
        </li>
      </ul>

      <Button onClick={handleMenu}>
        {!open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="size-9"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-9"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        )}
      </Button>
    </nav>
  );
};

export default Navbar;
