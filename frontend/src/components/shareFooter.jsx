import { Button, Typography } from "@material-tailwind/react";

import html2canvas from "html2canvas";

export default function FooterWithSocialLinks({ setIsImage, isImage }) {
  const screenShot = () => {
    setIsImage(true);
    const habit = document.getElementById("Share");

    html2canvas(habit).then((canvas) => {
      const image = new Image();
      image.src = canvas.toDataURL(); // 將Canvas轉換為DataURL

      // 創建一個新的<img>元素並將其添加到頁面上
      const imgElement = document.createElement("img");

      // Add style to imgElement
      imgElement.style.borderColor = "black";
      imgElement.style.borderWidth = "3px";
      imgElement.style.borderStyle = "dotted";
      imgElement.style.borderRadius = "10px";
      imgElement.style.paddingBottom = "0px";
      imgElement.style.width = "90%";
      imgElement.style.height = "auto";
      imgElement.style.marginLeft = "auto";
      imgElement.style.marginRight = "auto";
      imgElement.style.marginTop = "1em";
      imgElement.style.backgroundColor = "orange";
      imgElement.src = image.src;

      habit.appendChild(imgElement);
    });
  };
}

/*
  return (
    <footer className="relative w-full pt-0">
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="mt-0 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 pb-5 md:flex-row md:justify-surround">
          <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
            
            <Typography
              as="a"
              className="opacity-80 transition-opacity hover:opacity-100"
              xmlns="http://www.w3.org/2000/svg"
            >
              {!isImage && (
                <>
                  <Button size="sm" color="deep-orange" onClick={screenShot}>
                    <svg
                      className="h-10 w-10"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <g>
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M3 3h2v2H3V3zm4 0h2v2H7V3zm4 0h2v2h-2V3zm4 0h2v2h-2V3zm4 0h2v2h-2V3zm0 4h2v2h-2V7zM3 19h2v2H3v-2zm0-4h2v2H3v-2zm0-4h2v2H3v-2zm0-4h2v2H3V7zm7.667 4l1.036-1.555A1 1 0 0 1 12.535 9h2.93a1 1 0 0 1 .832.445L17.333 11H20a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h2.667zM9 19h10v-6h-2.737l-1.333-2h-1.86l-1.333 2H9v6zm5-1a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
                      </g>
                    </svg>
                  </Button>
                </>
              )}
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
*/