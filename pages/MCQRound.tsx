import ProtectedLayout from "../src/components/ProtectedLayout";
import MCQRound from "../src/pages/MCQRound";

export default function MCQRoundPage() {
  return (
    <ProtectedLayout allowedRoles={["hr", "user"]}>
      <MCQRound />
    </ProtectedLayout>
  );
}
