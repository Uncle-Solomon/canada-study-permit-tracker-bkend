import { SERVICE_ID, TEMPLATE_ID, USER_ID } from "../utils/config";

export const sendEmail = async (
  username: string,
  secretKey: string,
  email: string,
  title: string
) => {
  try {
    const response = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: SERVICE_ID, // Replace with your service ID
          template_id: TEMPLATE_ID, // Replace with your template ID
          user_id: USER_ID, // Replace with your user ID
          template_params: {
            title: title,
            to_email: email,
            to_name: username,
            message: secretKey,
            "g-recaptcha-response": "03AHJ_ASjnLA214KSNKFJAK12sfKASfehbmfd...", // Remove if not applicable
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Email sending failed with status: ${response.status}`);
    }

    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Email service error:", error);
  }
};
