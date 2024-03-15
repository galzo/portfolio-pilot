import { useCallback, useState } from "react";
import { isEmailAddressValid, isNameValid, isPasswordValid } from "../../utils/inputUtils";
import { UserApi } from "../../api/user.api";

export const useSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const handleNameChange = useCallback((name: string) => {
    setNameError("");
    setName(name);
  }, []);

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

    if (!isNameValid(name)) {
      setNameError("Please fill in a valid user name");
      return;
    }

    if (!isPasswordValid(password)) {
      setPasswordError("Please fill in a password");
      return;
    }

    const isSuccess = await UserApi.signup({ email: email, name: name, password: password, isAdmin: false });
    console.log("successss", isSuccess);
  }, [email, name, password]);

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
    details: {
      email,
      password,
      name,
    },
    errors: {
      emailError,
      passwordError,
      nameError,
      error,
    },
    callbacks: {
      handleEmailChange,
      handlePasswordChange,
      handleNameChange,
      handleSubmit,
      handleKeypress,
    },
  };
};
