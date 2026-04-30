import { AppTitle } from "../components/AppTitle/AppTitle";
import { PageContainer } from "../components/PageContainer/PageContainer";
import { UnlockCard } from "../components/UnlockCard/UnlockCard";

interface Props {
  setIsUnlocked: (val: boolean) => void;
}

export const UnlockPage = ({ setIsUnlocked }: Props) => {
  return (
    <PageContainer centered>
      <AppTitle subtitle="Final Challenge — Code Review" />
      <UnlockCard setIsUnlocked={setIsUnlocked} />
    </PageContainer>
  );
};
