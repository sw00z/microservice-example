import express from "express";

const app = express();

const URL1 = "http://api2:8002/rot13";
const URL2 = "http://api3:8003/base64";

const PORT = 8000;

async function encodeText(text, URL) {
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.encodedText;
  } catch (error) {
    throw error;
  }
}

app.use(express.text());

app.post("/rot", (req, res) => {
  let text = req.body;
  console.log(text);
  if (!text) {
    return res.status(400).send("Bad Request: No text provided");
  }

  encodeText(text, URL1)
    .then((encodedText) => {
      res.send(
        `Welcome to the Encoding Service! \nThe text you sent is: ${text} \nThe encoded response will appear below: \nRot13 Encoded Text: \n${JSON.stringify(encodedText)}`,
      );
    })
    .catch((error) => {
      console.error("Error encoding text:", error);
      res.status(500).send("Internal Server Error: Unable to encode text");
    });
});

app.post("/base", (req, res) => {
  let text = req.body;
  console.log(text);
  if (!text) {
    return res.status(400).send("Bad Request: No text provided");
  }

  encodeText(text, URL2)
    .then((encodedText) => {
      res.send(
        `Welcome to the Encoding Service! \nThe text you sent is: ${text} \nThe encoded response will appear below: \nBase64 Encoded Text: \n${JSON.stringify(encodedText)}`,
      );
    })
    .catch((error) => {
      console.error("Error encoding text:", error);
      res.status(500).send("Internal Server Error: Unable to encode text");
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://api:${PORT}`);
});
