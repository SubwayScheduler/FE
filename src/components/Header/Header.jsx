import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

const Header = () => {
  const dispatch = useDispatch();

  const { id, token } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="absolute top-0 left-0 w-full z-50 flex items-center justify-between flex-wrap bg-white py-4 lg:px-12 shadow border-solid border-t-2 border-blue-700">
      <div className="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
        <div className="flex items-center flex-shrink-0 text-gray-800 mr-16">
          <span className="font-semibold text-xl tracking-tight">
            지하철 시간표
          </span>
        </div>
        <div className="block lg:hidden">
          <button
            id="nav"
            className="flex items-center px-3 py-2 border-2 rounded text-blue-700 border-blue-700 hover:text-blue-700 hover:border-blue-700"
            onClick={toggleMenu}
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`menu w-full flex-grow lg:flex lg:items-center lg:w-auto lg:px-3 px-8 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="text-md font-bold text-blue-700 lg:flex-grow">
          <Link
            to="/timetable"
            className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
          >
            시간표
          </Link>
          {token && (
            <>
              <Link
                to="/admin-crud"
                className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
              >
                관리자
              </Link>
            </>
          )}
        </div>

        {token && <span>{id}님 환영합니다!</span>}
        <div className="flex">
          {!token && (
            <Link
              to="/login"
              className="block text-md px-4 py-2 rounded text-blue-700 ml-2 font-bold hover:text-white mt-4 hover:bg-blue-700 lg:mt-0"
            >
              로그인(Login)
            </Link>
          )}
          {token && (
            <Link
              to="/"
              onClick={handleLogout}
              className="block text-md px-4 py-2 rounded text-blue-700 ml-2 font-bold hover:text-white mt-4 hover:bg-blue-700 lg:mt-0"
            >
              로그아웃(Logout)
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
