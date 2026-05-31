import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "./Layout";
import { useAuthStore } from "../store/authStore";

export default function ProtectedLayout({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) {
  const { user, loading, userRole } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace("/login");
    else if (allowedRoles && !allowedRoles.includes(userRole)) {
      // Redirect regular users to MCQRound
      router.replace("/MCQRound");
    }
  }, [user, loading, userRole, allowedRoles, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <Layout>{children}</Layout>;
}
