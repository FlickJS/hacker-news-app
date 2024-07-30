export interface FormState {
  name: string;
  email: string;
  feedback: string;
}

export interface ErrorState {
  name: string;
  email: string;
  feedback: string;
  form?: string;
}
