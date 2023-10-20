// import Image from "next/image";
import XMark from "/public/icons/xmark.svg";
import React, { useState, useRef } from "react";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
  browserName,
} from "react-device-detect";
import Mobile from "/public/icons/mobile.svg";

export default function CameraForModal({ onClose, reservation }) {
  const [image, setImage] = useState(null);
  const handleFileInput = useRef(null);

  const handleClick = () => {
    handleFileInput.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imgname = event.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxW = 1920;
        const maxH = 1920;
        const iw = img.width;
        const ih = img.height;
        const scale = Math.min(maxW / iw, maxH / ih);
        const iwScaled = iw * scale;
        const ihScaled = ih * scale;
        canvas.width = iwScaled;
        canvas.height = ihScaled;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, iwScaled, ihScaled);
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], imgname, {
              type: "image/png",
              lastModified: Date.now(),
            });

            console.log(file);
            setImage(file);
          },
          "image/jpeg",
          0.8
        );
      };
    };
  };

  const uploadImage = () => {};

  return (
    <>
      <div className="p-[20px] md:p-[16px] w-[342px] h-fit flex flex-col gap-[8px] bg-white rounded-2xl overflow-auto">
        <div className="flex w-full justify-between h-fit">
          <h1 className="text-[32px] font-[Raleway] font-semibold text-[#2B2E4A]">
            Cámara
          </h1>
          <button
            className="group text-xl flex text-[20px] font-[nunito] h-full md:py-[8px] items-center my-auto gap-[6px] text-[#2B2E4A]"
            onClick={() => onClose()}
          >
            <XMark className="fill-[#2B2E4A] group-hover:fill-[#FF7068] w-[32px] h-[32px] transition" />
          </button>
        </div>
        {(isBrowser || browserName === "Brave") && (
          <div className="border border-[#2B2E4A] rounded-xl p-[20px]">
            <Mobile className="w-[32px] h-[32px] fill-[#2B2E4A] mx-auto mb-[20px]" />
            <p className="max-w-[300px] text-center text-[16px] text-[#2B2E4A] rounded-xl">
              Ingresa desde tu celular (O en su caso, a un navegador distinto a
              Brave) para capturar las fotografías de evidencia.
            </p>
          </div>
        )}
        {isMobile && browserName !== "Brave" && (
          <div className="flex flex-col gap-[8px] items-center">
            <button
              onClick={handleClick}
              className="text-[16px] text-[#2B2E4A] border border-[#2B2E4A] bg-[#F2F2F2] w-full p-[8px] active:bg-[#2B2E4A] active:text-[#F2F2F2] rounded-xl transition"
            >
              Capturar fotografía
            </button>
            <label>
              <input
                style={{ display: "none" }}
                type="file"
                accept="image/jpeg"
                capture="environment"
                ref={handleFileInput}
                onChange={handleImageChange}
              />
            </label>
            {/* {imageObject && <img src={imageObject.imagePreview} />} */}
            {image && (
              <div className="flex flex-col items-center border border-[#2B2E4A] rounded-xl">
                <img
                  src={URL.createObjectURL(image)}
                  alt="upload image"
                  className="rounded-t-xl w-[300px] h-[400px] object-cover"
                />
                <button
                  onClick={""}
                  className="text-center text-[#2B2E4A] text-[16px] p-[8px] bg-[#F2F2F2] w-full rounded-b-xl active:bg-[#2B2E4A] active:text-[#F2F2F2] transition"
                >
                  Subir fotografía
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
