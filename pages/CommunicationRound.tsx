import ProtectedLayout from "../src/components/ProtectedLayout";
import CommunicationRound from "../src/pages/CommunicationRound";

export default function CommunicationRoundPage() {
  return (
    <ProtectedLayout allowedRoles={["hr"]}>
      <CommunicationRound />
    </ProtectedLayout>
  );
}
