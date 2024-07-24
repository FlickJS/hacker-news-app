"use server";

export async function submitFeedback(formData: {
  name: string;
  email: string;
  feedback: string;
}) {
  try {
    const { name, email, feedback } = formData;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return { message: "Invalid name", status: 400 };
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailPattern.test(email)) {
      return { message: "Invalid email", status: 400 };
    }

    if (
      !feedback ||
      typeof feedback !== "string" ||
      feedback.trim().length === 0
    ) {
      return { message: "Invalid feedback", status: 400 };
    }

    console.log("Form Data:", { name, email, feedback });
    return { message: "Feedback received", status: 200 };
  } catch (error) {
    console.error("Error processing request:", error);
    return { message: "Internal Server Error", status: 500 };
  }
}
