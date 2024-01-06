"use client";

import { FaGithubSquare, FaLinkedin } from "react-icons/fa";

interface IFooter {}

const Footer = ({}: IFooter) => {
  const linkedUlr = "https://www.linkedin.com/in/seljaworks/";
  const githubUrl = "https://github.com/pom-pom27";
  return (
    <div className="flex items-center justify-center w-full p-7 bg-red-200">
      Created By Selja Sampe Rante.
      <a
        href={linkedUlr}
        target="_blank"
        className="ml-2 cursor-pointer text-xl"
      >
        <FaLinkedin />
      </a>
      <a
        href={githubUrl}
        target="_blank"
        className="ml-2 cursor-pointer text-xl"
      >
        <FaGithubSquare />
      </a>
    </div>
  );
};

export default Footer;
