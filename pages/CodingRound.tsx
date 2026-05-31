import ProtectedLayout from "../src/components/ProtectedLayout";
import CodingRound from "../src/pages/CodingRound";

export default function CodingRoundPage() {
  return (
    <ProtectedLayout allowedRoles={["hr", "user"]}>
      <CodingRound />
    </ProtectedLayout>
  );
}
