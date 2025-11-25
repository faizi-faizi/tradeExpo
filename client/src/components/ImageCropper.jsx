import React, { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import heic2any from "heic2any";

function ImageCropper({ photo, onCancel, onCropDone }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [imageURL, setImageURL] = useState(null);
  const [processedFile, setProcessedFile] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // Convert HEIC / HEIF if needed
  useEffect(() => {
    const convertImage = async () => {
      if (!photo) return;

      try {
        let finalFile = photo;

        if (photo.type === "image/heic" || photo.type === "image/heif") {
          const blob = await heic2any({
            blob: photo,
            toType: "image/jpeg",
            quality: 0.9,
          });

          finalFile = new File(
            [blob],
            photo.name.replace(/\.[^/.]+$/, ".jpg"),
            { type: "image/jpeg" }
          );
        }

        setProcessedFile(finalFile);
        setImageURL(URL.createObjectURL(finalFile));
      } catch (err) {
        console.error("HEIC Conversion Error:", err);
        alert("Unable to process HEIC image");
      }
    };

    convertImage();
  }, [photo]);

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const getCroppedImg = async () => {
    if (!processedFile || !imageURL) return;

    const img = new Image();
    img.src = imageURL;
    await new Promise((res) => (img.onload = res));

    const canvas = document.createElement("canvas");
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      img,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    canvas.toBlob(
      (blob) => {
        const originalName = processedFile.name || "image.jpg";
        const croppedFile = new File([blob], originalName, { type: "image/jpeg" });
        onCropDone(croppedFile);
      },
      "image/jpeg",
      0.95
    );
  };

  if (!imageURL) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg w-80 sm:w-96">
        <div className="relative w-full h-64 bg-gray-200">
          <Cropper
            image={imageURL}
            crop={crop}
            zoom={zoom}
            aspect={5 / 6}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-green-700 hover:bg-green-900 text-white rounded-lg"
            onClick={getCroppedImg}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageCropper;