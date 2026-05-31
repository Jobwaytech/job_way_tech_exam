import ProtectedLayout from "../src/components/ProtectedLayout";
import QuestionBank from "../src/pages/QuestionBank";

export default function QuestionsPage() {
  return (
    <ProtectedLayout allowedRoles={["hr"]}>
      <QuestionBank />
    </ProtectedLayout>
  );
}
