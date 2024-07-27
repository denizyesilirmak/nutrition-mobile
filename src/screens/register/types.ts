type PasswordErrors = {
  length: "default" | "error" | "satisfied";
  uppercase: "default" | "error" | "satisfied";
  lowercase: "default" | "error" | "satisfied";
  match: "default" | "error" | "satisfied";
  validEmail: "default" | "error" | "satisfied";
};

export type { PasswordErrors };
