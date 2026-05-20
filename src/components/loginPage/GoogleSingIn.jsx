"use client";
import { Button } from "@heroui/react";

import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const GoogleSingIn = ({ callbackUrl }) => {
  const router = useRouter();
  // const handleGoogleSignIn = async () => {
  //   await authClient.signIn.social({
  //     provider: "google",
  //     callbackURL: callbackUrl,
  //   });
  // };
  return (
    <>
      <div className="flex items-center gap-3 my-4">
        <div className="flex-1 h-px bg-gray-300" />
        <span className="text-gray-500 text-sm font-medium select-none">
          OR
        </span>
        <div className="flex-1 h-px bg-gray-300" />
      </div>
      <div>
        <Button
          // onClick={handleGoogleSignIn}
          className="w-full"
          variant="tertiary"
        >
          <FcGoogle />
          Sign in with Google
        </Button>
      </div>
    </>
  );
};

export default GoogleSingIn;
