type TextInputProps = {
  onChangeText?: (text: string) => void;
  value?: string;
  placeholder?: string;
  label?: string;
  secured?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?:
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "email-address"
    | "phone-pad";
};

export type { TextInputProps };
