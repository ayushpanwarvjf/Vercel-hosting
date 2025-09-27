import fetch from "node-fetch";

/*
  ⚡ CONFIGURATION ⚡
  Change SOURCE_API to your desired API URL.
  Only one API works at a time.
*/

const SOURCE_API = "https://allapiinone.vercel.app/api?key=DEMOKEY&type=mobile&term="; // ← change this
const METHOD = "GET"; // GET or POST

export default async function handler(req, res) {
  try {
    // Get query parameter 'term'
    const term = req.query.term || "";

    if (!term) {
      return res.status(400).json({
        success: false,
        message: "Missing 'term' query parameter"
      });
    }

    // Build full URL
    const url = SOURCE_API + encodeURIComponent(term);

    // Fetch the original API
    const response = await fetch(url, { method: METHOD });

    // Parse response
    let data;
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    // Return result
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
