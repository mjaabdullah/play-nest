"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  toast,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import GoogleSingIn from "./GoogleSingIn";

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, SetShowPassword] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = {};

    // Convert FormData to plain object
    formData.forEach((value, key) => {
      userData[key] = value.toString();
    });

    const { data, error } = await authClient.signIn.email(
      {
        ...userData,
      },
      {
        onRequest: (ctx) => {
          //show loading
        },
        onSuccess: (ctx) => {
          router.push("/");
        },
        onError: (ctx) => {
          // display the error message
          toast.warning(`Failed to login: ${ctx.error.message}`);
        },
      },
    );
  };

  return (
    <Form
      className="flex max-w-96 flex-col gap-4 bg-white dark:bg-[#161D27] border border-gray-200 dark:border-[#1C2A3A] rounded-2xl p-7 shadow-lg dark:shadow-black/30"
      render={(props) => <form {...props} data-custom="foo" />}
      onSubmit={onSubmit}
    >
      <div className="mb-6">
        <h1 className="text-gray-800 dark:text-[#E8F0ED] text-2xl font-bold tracking-tight">
          Welcome Back
        </h1>
        <p className="text-gray-500 dark:text-[#8BA3A0] text-sm mt-1">
          Sign in to continue booking
        </p>
      </div>
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }

          return null;
        }}
      >
        <Label>Email</Label>
        <Input placeholder="Enter your email" />
        <FieldError />
      </TextField>

      <TextField
        isRequired
        minLength={6}
        name="password"
        type={showPassword ? "text" : "password"}
        validate={(value) => {
          if (value.length < 6) {
            return "Password must be at least 6 characters";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }
          if (!/[a-z]/.test(value)) {
            return "Password must contain at least one lowercase letter";
          }
          if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
          }

          return null;
        }}
        className={`relative`}
      >
        <Label>Password</Label>
        <Input placeholder="Enter your password" />
        <span
          onClick={() => SetShowPassword(!showPassword)}
          className="absolute right-2 cursor-pointer top-8 text-xl text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </span>
        <Description>
          Must be at least 6 characters with 1 uppercase, 1 lowercase and 1
          number
        </Description>
        <FieldError />
      </TextField>

      <div className="flex gap-2">
        <Button className={`bg-[#00B14F]`} fullWidth type="submit">
          LogIn
        </Button>
      </div>
      <GoogleSingIn />
    </Form>
  );
};

export default LoginForm;
