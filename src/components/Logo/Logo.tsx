import React from "react";

interface LogoProps {
  width?: string | number;
  height?: string | number;
}

const Logo: React.FC<LogoProps> = ({ width = "100%", height = "100%" }) => {
  return <img src="/src/assets/icons/to-do-logo.svg" style={{ width, height }} alt="TODO APP LOGO"/>;
};

export default Logo;