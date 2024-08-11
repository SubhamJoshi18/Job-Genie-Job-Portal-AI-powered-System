import { RefObject, useEffect } from "react";
import { Link } from "react-router-dom";
interface HeaderProps {
  paRrf: RefObject<HTMLDivElement>;
}

export default function Navbar({ paRrf }: HeaderProps) {
  useEffect(() => {
    paRrf.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [paRrf]);

  return (
    <>
      <div className="shadow-md top-0 sticky col-span-12 bg-white/70 ">
        <div className="navbar  flex items-center h-[12vh] justify-between px-3 container mx-auto">
          <div className="logo_section flex col-span-3">
            <img
              className="object-fill h-10 w-10"
              src="/assets/favicon.ico"
              alt="company logo"
            />
            <Link to={"/"}>
              <div className="company-name">
                <h1 className="font-semibold  pl-2">JobGenie</h1>
                <p className="text-xs pl-2 text-gray-400">
                  The Ultimate for Job Seekers
                </p>
              </div>
            </Link>
          </div>
          <div className="nav-main col-span-6">
            <ul className="flex gap-12 items-center justify-center">
              <li>
                <Link to={"/"}>Find Jobs</Link>
              </li>
              <li>
                <Link to={"/"}>For Recuiters</Link>
              </li>
              <li>
                <Link to={"/blogs"}>Blogs</Link>
              </li>
              <li>
                <Link to={"/"}>Career tips</Link>
              </li>
            </ul>
          </div>
          <div className="nav-login col-span-3">
            <button className="px-4 mr-2 font-semibold rounded-3xl py-2 hover:bg-gray-400/70 ">
              Login
            </button>
            <button className="hover:text-white hover:bg-[--color-text] px-5 border py-2 rounded-3xl text-[--color-text] font-semibold border-[--color-text]">
              Register Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
