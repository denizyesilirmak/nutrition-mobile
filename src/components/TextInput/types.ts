type TextInputProps = {
  placeholder?: string;
  keyboardType?:
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "email-address"
    | "phone-pad"
    | undefined;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  icon?: any;
  secureTextEntry?: boolean;
  error?: boolean;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
  value?: string;
  postFix?: string;
  onPress?: () => void;
  editable?: boolean;
};
export type { TextInputProps };
