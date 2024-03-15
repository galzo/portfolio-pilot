import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { useEffect } from "react";

export const useSignedInRedirect = (props: { redirectTo: string }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate(props.redirectTo);
    }
  }, [isLoggedIn, navigate, props.redirectTo]);
};

export const useSignedOutRedirect = (props: { redirectTo: string }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate(props.redirectTo);
    }
  }, [isLoggedIn, navigate, props.redirectTo]);
};
