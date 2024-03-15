import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { useEffect } from "react";

interface UseRedirectProps {
  predicate: () => boolean;
  redirectTo: string;
}

export const useRedirect = (props: UseRedirectProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.predicate()) {
      navigate(props.redirectTo);
    }
  }, [navigate, props, props.redirectTo]);
};
