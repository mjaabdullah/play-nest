import RegisterForm from "@/components/registerPage/RegisterForm";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0D1117] flex flex-col gap-5 items-center justify-center px-4 py-10">
      <RegisterForm />
      <span>
        Already have an account?{" "}
        <Link className="text-[#00cc5c] font-bold" href={`/login`}>
          LogIn
        </Link>
      </span>
    </div>
  );
};

export default RegisterPage;
