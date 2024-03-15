export class AuthService {
  storeAuthToken = (authToken: string) => {
    localStorage.setItem("token", authToken);
  };
}
