import express from "express";
import rot13Cipher from "rot13-cipher";

const app = express();

const PORT = 8002;

let encoder = (text) => rot13Cipher(text);

app.use(express.json());

app.post("/rot13", (req, res) => {
  const { text } = req.body;

  try {
    if (!text || typeof text !== "string") {
      return res
        .status(400)
        .json({ error: "Bad Request: No valid text provided" });
    }

    const encodedText = encoder(text);
    res.json({ encodedText });
  } catch (error) {
    console.error("Error encoding text:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error: Unable to encode text" });
  }
});

app.listen(PORT, () => {
  console.log(`Rot13 Encoding Service is running on http://api2:${PORT}`);
});
