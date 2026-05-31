import ProtectedLayout from "../src/components/ProtectedLayout";
import ViewScores from "../src/pages/ViewScores";

export default function ViewScoresPage() {
  return (
    <ProtectedLayout allowedRoles={["hr"]}>
      <ViewScores />
    </ProtectedLayout>
  );
}
