const apiServerUrl = "http://localhost:3000";
const prodApiServerUrl = "http://18.144.80.86:3000";

export const ApiRoutes = {
  user: {
    signup: `${apiServerUrl}/api/user/signup`,
    login: `${apiServerUrl}/api/user/login`,
  },
  portfolio: {
    get: `${apiServerUrl}/api/portfolio`,
    buy: `${apiServerUrl}/api/portfolio/buy`,
    sell: `${apiServerUrl}/api/portfolio/sell`,
  },
  stock: {
    getAll: `${apiServerUrl}/api/stock/all`,
  },
};
