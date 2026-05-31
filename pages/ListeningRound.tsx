import ProtectedLayout from "../src/components/ProtectedLayout";
import ListeningRound from "../src/pages/ListeningRound";

export default function ListeningRoundPage() {
  return (
    <ProtectedLayout allowedRoles={["hr", "user"]}>
      <ListeningRound />
    </ProtectedLayout>
  );
}
