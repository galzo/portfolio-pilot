const apiServerUrl = import.meta.env.VITE_SERVER_API;

export const ApiRoutes = {
  user: {
    signup: `${apiServerUrl}/api/user/signup`,
    login: `${apiServerUrl}/api/user/login`,
    getAll: `${apiServerUrl}/api/user/all`,
  },
  portfolio: {
    get: `${apiServerUrl}/api/portfolio`,
    buy: `${apiServerUrl}/api/portfolio/buy`,
    sell: `${apiServerUrl}/api/portfolio/sell`,
    addFunds: `${apiServerUrl}/api/portfolio/addFunds`,
  },
  stock: {
    getAll: `${apiServerUrl}/api/stock/all`,
  },
};
