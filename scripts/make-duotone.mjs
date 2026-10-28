// Builds the periwinkle-toned hero photo from the colour original.
// usage: node scripts/make-duotone.mjs
import sharp from "sharp";

const SRC = process.env.SRC ?? "public/media/hero/felicia.webp";
// crop (fractions of the original) to a ~1.6:1 frame centred on the mirror so the subject reads at hero scale
const CROP = { x: 0.09, y: 0.29, w: 0.62, h: 0.58 };
const OUT = "public/media/hero/felicia-periwinkle.webp";
// luminance -> colour stops (dark bg navy -> electric periwinkle -> near-white lavender)
const STOPS = [
  [0.0, [12, 13, 24]],
  [0.35, [44, 46, 104]],
  [0.7, [122, 124, 220]],
  [1.0, [218, 219, 255]],
];
const lerp = (a, b, t) => a + (b - a) * t;
const ramp = (v) => {
  for (let i = 1; i < STOPS.length; i++) {
    if (v <= STOPS[i][0]) {
      const [p0, c0] = STOPS[i - 1], [p1, c1] = STOPS[i];
      const t = (v - p0) / (p1 - p0);
      return c0.map((c, k) => Math.round(lerp(c, c1[k], t)));
    }
  }
  return STOPS.at(-1)[1];
};

const meta = await sharp(SRC).metadata();
const region = { left: Math.round(CROP.x * meta.width), top: Math.round(CROP.y * meta.height), width: Math.round(CROP.w * meta.width), height: Math.round(CROP.h * meta.height) };
const { data, info } = await sharp(SRC).extract(region).greyscale().clahe({ width: 48, height: 48, maxSlope: 5 }).normalise({ lower: 1, upper: 99 }).raw().toBuffer({ resolveWithObject: true });
const out = Buffer.alloc(info.width * info.height * 3);
for (let i = 0; i < data.length; i++) {
  const [r, g, b] = ramp(Math.pow(data[i] / 255, 0.72)); // lift midtones so the subject reads
  out[i * 3] = r; out[i * 3 + 1] = g; out[i * 3 + 2] = b;
}
await sharp(out, { raw: { width: info.width, height: info.height, channels: 3 } }).webp({ quality: 82 }).toFile(OUT);
console.log("wrote", OUT, info.width, "x", info.height);
