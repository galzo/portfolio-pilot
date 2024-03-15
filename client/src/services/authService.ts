export class AuthService {
  storeAuthToken = (authToken: string) => {
    localStorage.setItem("token", authToken);
  };
  clearAuthToken = () => {
    localStorage.removeItem("token");
  };
  getAuthToken = () => {
    localStorage.getItem("token");
  };
}
