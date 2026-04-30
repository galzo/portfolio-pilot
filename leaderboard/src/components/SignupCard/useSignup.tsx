import { useCallback, useContext, useState } from "react";
import { isEmailAddressValid, isNameValid, isPasswordValid } from "../../utils/inputUtils";
import { SignupResponse, UserApi } from "../../api/user.api";
import { ApiResponse } from "../../types/api.types";
import { resolveTokenFromUserResponse, resolveUserFromUserResponse } from "../../utils/apiUtils";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../consts/routes";
import { useAuth } from "../../hooks/useAuth";

export const useSignup = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");

  const clearErrors = useCallback(() => {
    setEmailError("");
    setNameError("");
    setPasswordError("");
    setApiError("");
  }, []);

  const handleResponsePayload = useCallback(
    (response: ApiResponse<SignupResponse>) => {
      if (response.isSuccess) {
        const user = resolveUserFromUserResponse(response.payload);
        const token = resolveTokenFromUserResponse(response.payload);
        setUser(user);
        setToken(token);
        navigate(AppRoutes.portfolio);
      } else {
        setApiError(response.error);
      }
    },
    [navigate, setToken, setUser]
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
    clearErrors();

    const isValid = handleInputValidation();
    if (!isValid) return;

    setIsLoading(true);
    const response = await UserApi.signup({ email: email, name: name, password: password, isAdmin: false });
    handleResponsePayload(response);
    setIsLoading(false);
  }, [clearErrors, email, handleInputValidation, handleResponsePayload, name, password]);

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
      apiError,
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
