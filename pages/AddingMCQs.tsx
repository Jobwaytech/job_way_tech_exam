import ProtectedLayout from "../src/components/ProtectedLayout";
import AddingMCQs from "../src/pages/AddingMCQs";

export default function AddingMCQsPage() {
  return (
    <ProtectedLayout allowedRoles={["hr"]}>
      <AddingMCQs />
    </ProtectedLayout>
  );
}
