import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

function ImageCropper({ photo, onCancel, onCropDone }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const getCroppedImg = async () => {
    if (!photo) return;

    const image = new Image();
    image.src = URL.createObjectURL(photo);

    await new Promise((resolve) => (image.onload = resolve));

    const canvas = document.createElement("canvas");
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    canvas.toBlob((blob) => {
      const originalName = photo.name || "image.jpg";
      const fileName = originalName.replace(/\.[^/.]+$/, "");
      const file = new File([blob], fileName, { type: "image/jpeg" });
      onCropDone(file);
    }, "image/jpeg");
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg w-80 sm:w-96">

        <div className="relative w-full h-64 bg-gray-200">
          <Cropper
            image={URL.createObjectURL(photo)}
            crop={crop}
            zoom={zoom}
            aspect={5 / 6}          // 5:6 portrait ratio
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-gray-400 hover:bg-gray-600 text-white rounded-lg"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-green-700 hover:bg-green-900 text-white rounded-lg"
            onClick={getCroppedImg}
          >
            Crop & Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageCropper;