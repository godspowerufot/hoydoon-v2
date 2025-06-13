// pages/api/proxy.js
import axios from "axios";

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "Missing URL" });

  try {
    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Failed to fetch from Google API",
        details: error.message,
      });
  }
}
