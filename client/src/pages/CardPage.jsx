import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../api/userApi";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";

export default function CardPage() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const cardRef = useRef(null);

    useEffect(() => {
        getUserById(id).then(res => setUser(res.data)).catch(console.error);
    }, [id]);

    if (!user) return <div className="p-10 text-center">Loading...</div>;

    const downloadPDF = async () => {
        const node = cardRef.current;

        const dataUrl = await htmlToImage.toPng(node, {
            pixelRatio: 1,
            width: 1600,
            height: 2400,
        });

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: [1600, 2400], 
        });

        pdf.addImage(dataUrl, "PNG", 0, 0, 1600, 2400);
        pdf.save(`${user.name}-card.pdf`);
    };


    return (
  <div className="relative w-full h-screen bg-gray-100 flex items-center justify-center overflow-hidden">

    {/* BACK BUTTON */}
    <button
      onClick={() => window.history.back()}
      className="absolute top-5 left-5 text-lg font-semibold text-gray-700 hover:underline"
    >
      ← Back
    </button>

    {/* DOWNLOAD BUTTON */}
    <button
      onClick={downloadPDF}
      className="absolute top-5 right-5 bg-gray-600 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700"
    >
      Download PDF
    </button>

    {/* VISIBLE SCALED-DOWN CARD */}
    <div
      className="transform scale-[0.20] sm:scale-[0.30] origin-center" 
      style={{
        width: "1600px",
        height: "2400px",
      }}
    >
      {/* CARD used for PDF */}
      <div
        ref={cardRef}
        style={{ 
          width: "1600px", 
          height: "2400px", 
          position: "relative" 
        }}
      >

        {/* FRAME */}
        <img
          src={`${import.meta.env.VITE_BASE_URL}/frame/frame.jpg`}
          style={{ width: "100%", height: "100%" }}
          className="absolute top-0 left-0"
        />

        {/* NAME SECTION */}
        <div
  className="absolute text-right bg-red-500 px-7 py-4 text-white rounded-l-xl shadow"
  style={{
    top: "1300px",
    right: "800px", 
  }}
>
          <h1 className="text-6xl">{user.name}</h1>
          {user.cName && (
            <p className="text-3xl mt-2 font-semibold">{user.cName}</p>
          )}
        </div>

        {/* PHOTO */}
        {user.photo && (
          <img
            src={user.photo}
            style={{
              position: "absolute",
              top: "1000px",
              right: "200px",
              height: "800px",
              borderRadius: "20px",
              objectFit: "cover",
            }}
          />
        )}

        {/* QR */}
        {user.qr && (
          <img
            src={user.qr}
            style={{
              position: "absolute",
              bottom: "80px",
              left: "80px",
              width: "220px",
              padding: "10px",
              background: "white",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            }}
          />
        )}

      </div>
    </div>
  </div>
);
}