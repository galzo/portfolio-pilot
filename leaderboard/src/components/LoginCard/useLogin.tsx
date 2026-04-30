import { useCallback, useState } from "react";
import { isEmailAddressValid, isPasswordValid } from "../../utils/inputUtils";
import { LoginResponse, UserApi } from "../../api/user.api";
import { ApiResponse } from "../../types/api.types";
import { resolveTokenFromUserResponse, resolveUserFromUserResponse } from "../../utils/apiUtils";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { AppRoutes } from "../../consts/routes";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");

  const clearErrors = useCallback(() => {
    setEmailError("");
    setPasswordError("");
    setApiError("");
  }, []);

  const handleResponsePayload = useCallback(
    (response: ApiResponse<LoginResponse>) => {
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

    if (!isPasswordValid(password)) {
      setPasswordError("Please fill in a password");
      return false;
    }

    return true;
  }, [email, password]);

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

    if (!isEmailAddressValid(email)) {
      setEmailError("Please fill in a valid email address");
      return;
    }

    if (!isPasswordValid(password)) {
      setPasswordError("Please fill in a password");
      return;
    }

    setIsLoading(true);
    const response = await UserApi.login({ email: email, password: password });
    handleResponsePayload(response);
    setIsLoading(false);
  }, [clearErrors, email, handleInputValidation, handleResponsePayload, password]);

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
      isLoading,
    },
    errors: {
      emailError,
      passwordError,
      apiError,
    },
    callbacks: {
      handleEmailChange,
      handlePasswordChange,
      handleSubmit,
      handleKeypress,
    },
  };
};
