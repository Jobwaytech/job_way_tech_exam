import ProtectedLayout from "../src/components/ProtectedLayout";
import AdminMonitor from "../src/pages/AdminMonitor";

export default function AdminMonitorPage() {
  return (
    <ProtectedLayout allowedRoles={["hr"]}>
      <AdminMonitor />
    </ProtectedLayout>
  );
}
