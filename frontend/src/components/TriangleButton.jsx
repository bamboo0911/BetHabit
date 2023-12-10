import React from "react";

const TriangleButton = ({ direction, onClick }) => {
  const getTrianglePath = () => {
    if (direction === "left") {
      return "M10 0 L0 5 L10 10 Z"; // 左边的三角形路径
    } else if (direction === "right") {
      return "M0 0 L10 5 L0 10 Z"; // 右边的三角形路径
    }
  };

  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: "pointer" }}
      onClick={onClick} // 使用传递给组件的 onClick 属性
    >
      <path d={getTrianglePath()} fill="#000" />
    </svg>
  );
};

export default TriangleButton;