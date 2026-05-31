import ProtectedLayout from "../src/components/ProtectedLayout";
import UserManagement from "../src/pages/UserManagement";

export default function UsersPage() {
  return (
    <ProtectedLayout allowedRoles={["hr"]}>
      <UserManagement />
    </ProtectedLayout>
  );
}
