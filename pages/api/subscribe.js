import axios from "axios";

// Define response data type
// type Data = { message?: string; error?: string; };

const subscribeHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;

  // Basic email validation
  if (!email || !email.includes("@")) {
    return res
      .status(400)
      .json({ error: "Please enter a valid email address" });
  }

  // Retrieve Mailchimp credentials from environment variables
  const API_KEY = process.env.NEXT_MAILCHIMP_API_KEY;
  const API_SERVER = process.env.NEXT_MAILCHIMP_API_SERVER;
  const AUDIENCE_ID = process.env.NEXT_MAILCHIMP_AUDIENCE_ID;

  console.log(API_KEY);
  // Construct Mailchimp API request URL
  const url = `https://${API_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

  // Prepare request data
  const data = {
    email_address: email,
    status: "subscribed",
  };

  // Set request headers
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `apikey ${API_KEY}`,
    },
  };

  // Send POST request to Mailchimp API
  try {
    const response = await axios.post(url, data, options);
    if (response.status === 200 || response.status === 201) {
      return res
        .status(201)
        .json({ message: "Awesome! You have successfully subscribed!" });
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data.title === "Member Exists") {
        return res.status(400).json({
          error: "Uh oh, it looks like this email's already subscribed🧐",
        });
      }
    }
    return res.status(500).json({
      error:
        "Oops! There was an error subscribing you to the newsletter. Please email us and we'll add you to the list.",
    });
  }
};

export default subscribeHandler;
