const apiServerUrl = "http://localhost:3000";

export const ApiRoutes = {
  user: {
    signup: `${apiServerUrl}/api/user/signup`,
    login: `${apiServerUrl}/api/user/login`,
  },
  portfolio: {
    get: `${apiServerUrl}/api/portfolio`,
  },
  stock: {
    getAll: `${apiServerUrl}/api/stock/all`,
  },
};
