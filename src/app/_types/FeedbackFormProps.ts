export interface FeedbackFormProps {
  form: {
    name: string;
    email: string;
    feedback: string;
  };
  errors: {
    name?: string;
    email?: string;
    feedback?: string;
    form?: string;
  };
  successMessage: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
