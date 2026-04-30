import { AppTitle } from "../components/AppTitle/AppTitle";
import { AuthCard } from "../components/AuthCard/AuthCard";
import { PageContainer } from "../components/PageContainer/PageContainer";

interface Props {
  onLogin: (user: { id: number; username: string }) => void;
}

export const AuthPage = ({ onLogin }: Props) => {
  return (
    <PageContainer centered>
      <AppTitle subtitle="CTF Leaderboard" />
      <AuthCard onAuthenticated={onLogin} />
    </PageContainer>
  );
};
