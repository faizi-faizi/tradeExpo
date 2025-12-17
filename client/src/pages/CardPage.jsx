import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../api/userApi";
import * as htmlToImage from "html-to-image";

/* ---------------- utils ---------------- */
const toBase64 = async (url) => {
  const res = await fetch(url, { mode: "cors" });
  const blob = await res.blob();

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};

const waitForImages = async (node) => {
  const imgs = node.querySelectorAll("img");
  await Promise.all(
    [...imgs].map(
      (img) =>
        img.complete && img.naturalWidth
          ? Promise.resolve()
          : new Promise((r) => {
              img.onload = r;
              img.onerror = r;
            })
    )
  );
};

/* ---------------- component ---------------- */
export default function CardPage() {
  const { id } = useParams();
  const cardRef = useRef(null);

  const [user, setUser] = useState(null);
  const [assets, setAssets] = useState(null);
  const [cardImage, setCardImage] = useState(null);

  /* Fetch user */
  useEffect(() => {
    getUserById(id)
      .then((res) => setUser(res.data))
      .catch(console.error);
  }, [id]);

  /* Load assets as base64 */
  useEffect(() => {
    if (!user) return;

    const loadAssets = async () => {
      const frame = await toBase64(
        `${import.meta.env.VITE_BASE_URL}/frame/frame.jpg`
      );

      const photo = user.photo ? await toBase64(user.photo) : null;

      setAssets({
        frame,
        photo,
        qr: user.qr, // already base64
      });
    };

    loadAssets();
  }, [user]);

  /* Generate final PNG */
  useEffect(() => {
    if (!assets || cardImage) return;

    const generate = async () => {
      const node = cardRef.current;
      if (!node) return;

      await waitForImages(node);
      await new Promise((r) => requestAnimationFrame(r));

      const png = await htmlToImage.toPng(node, {
        width: 1080,
        height: 1350,
        pixelRatio: 1,
        cacheBust: true,
      });

      setCardImage(png);
    };

    generate();
  }, [assets, cardImage]);

  if (!user) return <div className="p-10 text-center">Loading…</div>;

  const downloadImage = () => {
    const a = document.createElement("a");
    a.href = cardImage;
    a.download = `${user.name}-card.png`;
    a.click();
  };

  return (
    <div className="relative w-full min-h-screen bg-gray-100 py-20 flex flex-col items-center">

      {/* DOWNLOAD */}
      {cardImage && (
        <button
          onClick={downloadImage}
          className="fixed top-5 right-5 z-20 bg-gray-800 text-white px-4 py-2 rounded-lg shadow"
        >
          Download Card
        </button>
      )}

      {/* PREVIEW */}
      {cardImage && (
        <img
          src={cardImage}
          alt="Preview"
          className="
        shadow-xl rounded
        w-[280px]
        sm:w-[360px]
        md:w-[420px]
        lg:w-[480px]
        object-contain
      "
        />
      )}

      {/* OFFSCREEN RENDER */}
      {!cardImage && assets && (
        <div style={{ position: "fixed", top: "-3000px", left: "-3000px" }}>
          <div
            ref={cardRef}
            style={{
              width: "1080px",
              height: "1350px",
              position: "relative",
              background: "white",
            }}
          >
            {/* FRAME */}
            <img
              src={assets.frame}
              className="absolute inset-0 w-full h-full"
              alt=""
            />

            {/* NAME */}
            <div
              className="absolute text-right bg-[#713F98] px-7 py-4 text-white rounded-l-xl"
              style={{
                top: "750px",
                left: "50%",
                transform: "translateX(-100%)",
              }}
            >
              <h1 className="text-4xl font-semibold">{user.name}</h1>
              {user.place && <p className="text-3xl mt-2">{user.place}</p>}
            </div>

            {/* PHOTO */}
            {assets.photo && (
              <img
                src={assets.photo}
                alt=""
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
            {assets.qr && (
              <img
                src={assets.qr}
                alt=""
                style={{
                  position: "absolute",
                  bottom: "50px",
                  left: "50px",
                  width: "150px",
                  background: "white",
                  borderRadius: "10px",
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}