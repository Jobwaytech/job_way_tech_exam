import { useEffect } from "react";
import { useRouter } from "next/router";
import Login from "../src/pages/Login";
import { useAuthStore } from "../src/store/authStore";

export default function LoginPage() {
  const { user, loading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (user) router.replace("/");
  }, [user, loading, router]);

  if (loading) return <div />;
  return <Login />;
}
