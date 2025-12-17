const express = require("express");
const { createCanvas, loadImage } = require("canvas");
const path = require("path");
const User = require("../model/userModel");

const router = express.Router();

/* helper: rounded left rectangle */
function drawRoundedLeftRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w, y);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/* helper: load remote image */
const loadImageFromUrl = async (url) => {
  const res = await fetch(url);
  const buf = Buffer.from(await res.arrayBuffer());
  return loadImage(buf);
};

router.get("/image/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");

    const WIDTH = 1080;
    const HEIGHT = 1350;

    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");

    /* BACKGROUND */
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    /* FRAME */
    const framePath = path.join(__dirname, "../public/frame/frame.jpg");
    const frame = await loadImage(framePath);
    ctx.drawImage(frame, 0, 0, WIDTH, HEIGHT);

    /* USER PHOTO (centered like React) */
    if (user.photo) {
      const photo = await loadImageFromUrl(user.photo);
      const photoWidth = 340;
      const photoHeight = Math.round(photoWidth * 6 / 5);
      const photoX = 540;
      const photoY = 650;

      ctx.save();
      ctx.beginPath();
      ctx.roundRect(photoX, photoY, photoWidth, photoHeight, 20);
      ctx.clip();
      ctx.drawImage(photo, photoX, photoY, photoWidth, photoHeight);
      ctx.restore();
    }

    /* NAME BOX  */
    
const paddingX = 28;
const paddingY = 22;
const gap = 10;

ctx.textAlign = "right";

/* NAME */
ctx.font = "bold 35px sans-serif";
const nameTextWidth = ctx.measureText(user.name).width;

/* PLACE */
let placeTextWidth = 0;
if (user.place) {
  ctx.font = "30px sans-serif";
  placeTextWidth = ctx.measureText(user.place).width;
}

/* BOX SIZE (dynamic) */
const contentWidth = Math.max(nameTextWidth, placeTextWidth);
const boxWidth = contentWidth + paddingX * 2;
const boxHeight = user.place
  ? paddingY * 2 + 35 + gap + 30
  : paddingY * 2 + 35;

/* POSITION (same translateX(-100%)) */
const boxX = WIDTH / 2 - boxWidth;
const boxY = 750;

/* DRAW BOX */
ctx.fillStyle = "#713F98";
drawRoundedLeftRect(ctx, boxX, boxY, boxWidth, boxHeight, 24);
ctx.fill();

/* DRAW NAME */
ctx.fillStyle = "#ffffff";
ctx.font = "bold 35px sans-serif";
ctx.fillText(
  user.name,
  boxX + boxWidth - paddingX,
  boxY + paddingY + 35
);

/* DRAW PLACE */
if (user.place) {
  ctx.font = "30px sans-serif";
  ctx.fillText(
    user.place,
    boxX + boxWidth - paddingX,
    boxY + paddingY + 35 + gap + 30
  );
}

    /* QR */
    if (user.qr) {
      const qr = await loadImageFromUrl(user.qr);
      ctx.drawImage(qr, 50, HEIGHT - 200, 150, 150);
    }

    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "no-store");
    res.send(canvas.toBuffer("image/png"));

  } catch (err) {
    console.error("CARD IMAGE ERROR:", err);
    res.status(500).send("Image generation failed");
  }
});

module.exports = router;