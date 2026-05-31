import ProtectedLayout from "../src/components/ProtectedLayout";
import Settings from "../src/pages/Settings";

export default function SettingsPage() {
  return (
    <ProtectedLayout allowedRoles={["hr"]}>
      <Settings />
    </ProtectedLayout>
  );
}
