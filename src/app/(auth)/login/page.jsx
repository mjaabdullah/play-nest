import LoginForm from "@/components/loginPage/LoginForm";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0D1117] flex flex-col gap-5 items-center justify-center px-4 py-10">
      <LoginForm />
      <span>
        Don't have an account?{" "}
        <Link className="text-[#00cc5c] font-bold" href={`/register`}>
          Register
        </Link>
      </span>
    </div>
  );
};

export default LoginPage;
