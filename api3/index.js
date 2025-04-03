import base64js from "base64-js";
import express from "express";

const app = express();

const PORT = 8003;

function encoder(text) {
  const encodedText = new TextEncoder().encode(text);

  // Using base64 encoding
  return base64js.fromByteArray(encodedText);
}

app.use(express.json());

app.post("/base64", (req, res) => {
  const { text } = req.body;

  console.log(text);
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
  console.log(`Base64 Encoding Service is running on http://api3:${PORT}`);
});
