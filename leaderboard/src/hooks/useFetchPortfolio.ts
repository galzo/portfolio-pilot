import { useCallback, useEffect, useState } from "react";
import { PortfolioApi } from "../api/portfolio.api";
import { User } from "../types/user.types";
import { Portfolio } from "../types/portfolio.types";
import { Optional } from "../types/common.types";

export const useFetchPortfolio = (user: Optional<User>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [portfolio, setPortfolio] = useState<Portfolio>();
  const [portfolioError, setPortfolioError] = useState("");

  const fetchPortfolio = useCallback(async (userId: number) => {
    setIsLoading(true);

    const response = await PortfolioApi.getPortfolio(userId);
    if (response.isSuccess) {
      setPortfolio(response.payload);
    } else {
      setPortfolioError(response.error);
    }

    setIsLoading(false);
  }, []);

  const refreshPortfolio = useCallback(async () => {
    if (user) {
      fetchPortfolio(user.id);
    }
  }, [fetchPortfolio, user]);

  useEffect(() => {
    const shouldTrigger = user && !isLoading && !portfolio && !portfolioError;
    if (shouldTrigger) {
      fetchPortfolio(user.id);
    }
  }, [fetchPortfolio, isLoading, portfolio, portfolioError, user]);

  return {
    isLoading,
    portfolio,
    portfolioError,
    refreshPortfolio,
  };
};
