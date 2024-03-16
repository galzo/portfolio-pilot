const apiServerUrl = "http://localhost:3000";

export const ApiRoutes = {
  user: {
    signup: `${apiServerUrl}/api/user/signup`,
    login: `${apiServerUrl}/api/user/login`,
  },
  portfolio: {
    get: `${apiServerUrl}/api/portfolio`,
    buy: `${apiServerUrl}/api/portfolio/buy`,
  },
  stock: {
    getAll: `${apiServerUrl}/api/stock/all`,
  },
};
