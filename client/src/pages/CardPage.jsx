import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../api/userApi";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";

export default function CardPage() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const cardRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        getUserById(id).then(res => setUser(res.data)).catch(console.error);
    }, [id]);



    if (!user) return <div className="p-10 text-center">Loading...</div>;

    const downloadPDF = async () => {
        const node = cardRef.current;

        const width = 1080;
        const height = 1350;

        const dataUrl = await htmlToImage.toPng(node, {
            pixelRatio: 1,
            width,
            height,
        });

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: [width, height],
        });

        pdf.addImage(dataUrl, "PNG", 0, 0, width, height);
        pdf.save(`${user.name}-card.pdf`);
    };


    return (
        <div className="relative w-full h-screen bg-gray-100 flex items-center justify-center overflow-hidden">
            {/* Home button */}
            {/* <button
                onClick={() => navigate("/")}
                className="absolute top-5 left-5 flex items-center gap-2 text-lg font-semibold text-gray-700 hover:text-black cursor-pointer"
            >

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 9.75L12 3l9 6.75v8.25A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 18V9.75z"
                    />
                </svg>

                Home
            </button> */}

            {/* DOWNLOAD BUTTON */}
            <button
                onClick={downloadPDF}
                className="absolute top-5 right-5 bg-gray-500 text-white px-4 py-2 rounded-lg shadow cursor-pointer hover:bg-gray-700"
            >
                Download PDF
            </button>

            {/* VISIBLE SCALED-DOWN CARD */}
            <div
                className="transform scale-[0.28] sm:scale-[0.50] origin-center"
                style={{
                    width: "1080px",
                    height: "1350px",
                }}
            >
                {/* CARD used for PDF */}
                <div
                    ref={cardRef}
                    style={{
                        width: "1080px",
                        height: "1350px",
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
                        className="absolute text-right bg-[#713F98] px-7 py-4 text-white rounded-l-xl shadow"
                        style={{
                            top: "750px",
                            left: "50%",
                            transform: "translateX(-100%)",
                        }}
                    >
                        <h1 className="text-4xl font-semibold" style={{ fontFamily: "Poppins, sans-serif" }}>{user.name}</h1>
                        {user.cName && (
                            <p className="text-3xl mt-2 font" style={{ fontFamily: "Poppins, sans-serif" }}>{user.cName}</p>
                        )}
                    </div>

                    {/* PHOTO */}
                    {user.photo && (
                        <img
                            src={user.photo}
                            style={{
                                position: "absolute",
                                top: "650px",
                                left: "50%",
                                height: "400px",
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
                                bottom: "50px",
                                left: "50px",
                                width: "150px",

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