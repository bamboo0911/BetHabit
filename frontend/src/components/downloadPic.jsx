import { Button, CardFooter } from "@material-tailwind/react";
import html2canvas from "html2canvas";
import React, { useState, useEffect } from "react";

export default function DownloadButton({ setIsImage, isImage }) {
  const habit = document.getElementById("Share");

  const downloadImage = () => {
    html2canvas(habit).then((canvas) => {
      const dataURL = canvas.toDataURL();
      const a = document.createElement("a");
      a.href = dataURL;
      a.download = "your_image.png";
      a.click();
    });
  };

  /*html2canvas(habit).then((canvas) => {
    const image = new Image();
    image.src = canvas.toDataURL();

    const imgElement = document.createElement("img");

    imgElement.style.borderColor = "black";
    imgElement.style.borderWidth = "2px";
    imgElement.style.borderStyle = "dotted";
    imgElement.style.borderRadius = "10px";
    imgElement.style.padding = "0px";
    imgElement.style.width = "90%";
    imgElement.style.height = "auto";
    imgElement.style.marginLeft = "auto";
    imgElement.style.marginRight = "auto";
    imgElement.style.marginTop = "3em";
    imgElement.src = image.src;

    habit.appendChild(imgElement);
  });*/

  return (
    <CardFooter className="pt-0 mt-10 max-w-[15rem] mx-auto">
      {isImage && (
        <Button onClick={downloadImage} variant="gradient" fullWidth>
          DOWNLOAD IMAGE!
        </Button>
      )}
    </CardFooter>
  );
}
