import { useCallback, useContext, useState } from "react";
import { isEmailAddressValid, isNameValid, isPasswordValid } from "../../utils/inputUtils";
import { SignupResponse, UserApi } from "../../api/user.api";
import { UserContext } from "../../contexts/UserContext/UserContext";
import { ApiResponse } from "../../types/api.types";
import { resolveTokenFromSignupResponse, resolveUserFromSignupResponse } from "../../utils/apiUtils";

export const useSignup = () => {
  const { setToken, setUser } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");

  const handleResponsePayload = useCallback(
    (response: ApiResponse<SignupResponse>) => {
      if (response.isSuccess) {
        const user = resolveUserFromSignupResponse(response.payload);
        const token = resolveTokenFromSignupResponse(response.payload);
        setUser(user);
        setToken(token);
      } else {
        setApiError(response.error);
      }
    },
    [setToken, setUser]
  );

  const handleInputValidation = useCallback(() => {
    if (!isEmailAddressValid(email)) {
      setEmailError("Please fill in a valid email address");
      return false;
    }

    if (!isNameValid(name)) {
      setNameError("Please fill in a valid user name");
      return false;
    }

    if (!isPasswordValid(password)) {
      setPasswordError("Please fill in a password");
      return false;
    }

    return true;
  }, [email, name, password]);

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
    const isValid = handleInputValidation();
    if (!isValid) return;

    setIsLoading(true);
    const response = await UserApi.signup({ email: email, name: name, password: password, isAdmin: false });
    handleResponsePayload(response);
    setIsLoading(false);
  }, [email, handleInputValidation, handleResponsePayload, name, password]);

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
      isLoading,
    },
    errors: {
      emailError,
      passwordError,
      nameError,
      error: apiError,
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
