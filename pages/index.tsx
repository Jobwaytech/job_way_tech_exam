import ProtectedLayout from "../src/components/ProtectedLayout";
import Dashboard from "../src/pages/Dashboard";

export default function Home() {
  return (
    <ProtectedLayout allowedRoles={["hr"]}>
      <Dashboard />
    </ProtectedLayout>
  );
}
