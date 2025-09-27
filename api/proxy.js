import fetch from "node-fetch";

/*
  ⚡ CONFIGURATION ⚡
  Change SOURCE_API to your desired API URL.
  Only one API works at a time.
*/

const SOURCE_API = "https://api.example.com/imei?number="; // ← change this
const METHOD = "GET"; // GET or POST

export default async function handler(req, res) {
  try {
    const term = req.query.term || ""; // parameter to append
    const url = SOURCE_API + encodeURIComponent(term);

    const response = await fetch(url, { method: METHOD });

    let data;
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    res.status(200).json({
      success: true,
      data
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}
