import axios from "axios";
import { ApiRoutes } from "../consts/api";
import { AuthService } from "../services/authService";

interface SignupRequest {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

interface SignupResponse {
  token: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

const signup = async (payload: SignupRequest) => {
  try {
    console.log("Signing up user...", payload);

    const authService = new AuthService();
    authService.clearAuthToken();

    const response = await axios.post<SignupResponse>(ApiRoutes.user.signup, payload);
    const { token } = response.data;
    authService.storeAuthToken(token);

    console.log("Sign up complete", token);
    return true;
  } catch (e) {
    console.error("Error signing up", e);
    return false;
  }
};

const login = async (payload: LoginRequest) => {
  try {
    console.log("Logging in user...", payload);

    const authService = new AuthService();
    authService.clearAuthToken();

    const response = await axios.post<LoginResponse>(ApiRoutes.user.login, payload);
    const { token } = response.data;
    authService.storeAuthToken(token);

    console.log("Login complete", token);
    return true;
  } catch (e) {
    console.error("Error logging in", e);
    return false;
  }
};

export const UserApi = {
  signup,
  login,
};
