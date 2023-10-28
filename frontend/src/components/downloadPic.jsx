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

  return (
    <CardFooter className="py-2 m-0 max-w-[15rem] mx-auto">
      {isImage && (
        <Button color="deep-orange" onClick={downloadImage} variant="gradient" fullWidth>
          DOWNLOAD IMAGE!
        </Button>
      )}
    </CardFooter>
  );
}
