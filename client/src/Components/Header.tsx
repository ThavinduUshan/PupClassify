import React from "react";
import logo from "../assets/dog.svg";

const Header: React.FC = () => {
  const resetPage = () => {
    window.location.reload();
  };

  return (
    <React.Fragment>
      <header className="text-gray-600 body-font ">
        <div className="container mx-auto flex flex-wrap px-8 py-5 flex-col md:flex-row items-center ">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <img src={logo} alt="Logo" className="w-10 " />
            <span className="ml-3 text-xl">PupClassify</span>
          </a>
          <button
            className="inline-flex items-center ml-auto bg-gray-800 text-white border-0 py-2 px-3 rounded hover:bg-gray-600"
            onClick={resetPage}
          >
            Generate New+
          </button>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
