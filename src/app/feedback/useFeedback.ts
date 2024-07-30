import { useState } from "react";
import { submitFeedback } from "./actions";
import { FormState, ErrorState } from "../../types/FormTypes";

const useFeedback = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    feedback: "",
  });
  const [errors, setErrors] = useState<ErrorState>({
    name: "",
    email: "",
    feedback: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    setSuccessMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: ErrorState = { name: "", email: "", feedback: "" };
    let hasError = false;

    if (!form.name) {
      newErrors.name = "Name is required.";
      hasError = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) {
      newErrors.email = "Email is required.";
      hasError = true;
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Please enter a valid email.";
      hasError = true;
    }

    if (!form.feedback) {
      newErrors.feedback = "Feedback is required.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await submitFeedback(form);

      if (response.status === 200) {
        setForm({ name: "", email: "", feedback: "" });
        setErrors({ name: "", email: "", feedback: "" });
        setSuccessMessage(response.message);
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          form: "Error submitting feedback.",
        }));
      }
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        form: "Error submitting feedback.",
      }));
    }
  };

  return {
    form,
    errors,
    successMessage,
    handleChange,
    handleSubmit,
  };
};

export default useFeedback;
