import Button from "../_layout/Button";
import { FeedbackFormProps } from "../../_types/FeedbackFormProps";

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  form,
  errors,
  successMessage,
  handleChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold mb-4">Feedback form</h1>
        <label htmlFor="name" className="block text-sm font-medium">
          Name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border rounded-md ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
        </label>
        {errors.name && <p className="text-red-700">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border rounded-md ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
        </label>
        {errors.email && <p className="text-red-700">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="feedback" className="block text-sm font-medium">
          Feedback
          <textarea
            name="feedback"
            value={form.feedback}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border rounded-md ${
              errors.feedback ? "border-red-500" : "border-gray-300"
            }`}
          />
        </label>
        {errors.feedback && <p className="text-red-700">{errors.feedback}</p>}
      </div>
      <Button
        type="submit"
        className="px-4 py-2 bg-white text-primary font-semibold shadow-md hover:bg-gray-100 transition duration-300 rounded-md"
      >
        Submit
      </Button>
      {errors.form && (
        <div className="flex items-center font-bold text-red-700 border-2 border-red-700 rounded p-2">
          <p>{errors.form}</p>
        </div>
      )}
      {successMessage && (
        <div className="flex items-center font-bold text-green-700 border-2 border-green-700 rounded p-2">
          <p>{successMessage}</p>
        </div>
      )}
    </form>
  );
};

export default FeedbackForm;
