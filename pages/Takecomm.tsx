import ProtectedLayout from "../src/components/ProtectedLayout";
import Takecomm from "../src/pages/Takecomm";

export default function TakecommPage() {
  return (
    <ProtectedLayout allowedRoles={["hr", "user"]}>
      <Takecomm />
    </ProtectedLayout>
  );
}
