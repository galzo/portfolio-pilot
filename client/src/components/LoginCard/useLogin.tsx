import { useCallback, useState } from "react";
import { isEmailAddressValid, isPasswordValid } from "../../utils/inputUtils";
import { UserApi } from "../../api/user.api";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [error, setError] = useState("");

  const handleEmailChange = useCallback((email: string) => {
    setEmailError("");
    setEmail(email);
  }, []);

  const handlePasswordChange = useCallback((password: string) => {
    setPasswordError("");
    setPassword(password);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!isEmailAddressValid(email)) {
      setEmailError("Please fill in a valid email address");
      return;
    }

    if (!isPasswordValid(password)) {
      setPasswordError("Please fill in a password");
      return;
    }

    const isSuccess = await UserApi.login({ email: email, password: password });
  }, [email, password]);

  const handleKeypress = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        event.stopPropagation();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  return {
    email,
    password,
    emailError,
    passwordError,
    error,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    handleKeypress,
  };
};
