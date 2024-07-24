"use client";

import React from "react";
import useFeedback from "./useFeedback";
import ContactDetails from "../_components/_feedback/ContactDetails";
import Navigation from "../_components/_layout/Navigation";
import FeedbackForm from "../_components/_feedback/FeedbackForm";

const Feedback: React.FC = () => {
  const { form, errors, successMessage, handleChange, handleSubmit } =
    useFeedback();

  return (
    <div>
      <Navigation />
      <div className="container max-w-4xl mx-auto flex-grow p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        <FeedbackForm
          form={form}
          errors={errors}
          successMessage={successMessage}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <ContactDetails />
      </div>
    </div>
  );
};

export default Feedback;
