"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

function AuthPage({ page = "login" }) {
  const router = useRouter();

  const [data, setData]: any = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.loading(page === "login" ? "Logging In..." : "Creating Account...");

    try {
      const { firstName, lastName, email, password } = data;

      if (page === "login") {
        if (!email || !password) {
          toast.dismiss();
          toast.error("Please fill in all fields");
          return;
        }
      } else {
        if (!firstName || !lastName || !email || !password) {
          toast.dismiss();
          toast.error("Please fill in all fields");
          return;
        }
      }

      if (page === "login") {
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (res?.error) {
          toast.dismiss();
          toast.error(res.error);
          return;
        }
        toast.dismiss();
        toast.success("Login Successful!");
        router.push("/");
        return;
      }

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        toast.dismiss();
        toast.error(errorMessage || "Failed to create account");
        return;
      }

      toast.dismiss();
      toast.success("Account Created Successfully 🎉!");
      router.push("/auth/login");
    } catch (error) {
      console.log("Error in handleSignUp:", error);
      toast.dismiss();
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mt-16 text-center">
        {page !== "login" ? "Create Your Account" : "Welcome Back"}
      </h1>
      <p className="text-gray-600 dark:text-gray-300 text-lg mt-3 text-center">
        {page !== "login"
          ? "Sign up to get started."
          : "Login to continue exploring features."}
      </p>

      <form
        onSubmit={handleSignUp}
        className="w-full flex text-black flex-col gap-4 max-w-md mt-10"
      >
        {page !== "login" && (
          <>
            <input
              className="py-3 px-4 rounded-md border border-gray-400 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="firstName"
              onChange={changeInput}
              placeholder="First Name"
            />
            <input
              className="py-3 px-4 rounded-md border border-gray-400 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="lastName"
              onChange={changeInput}
              placeholder="Last Name"
            />
          </>
        )}
        <input
          className="py-3 px-4 rounded-md border border-gray-400 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          name="email"
          onChange={changeInput}
          placeholder="Email Address"
        />
        <input
          className="py-3 px-4 rounded-md border border-gray-400 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          name="password"
          onChange={changeInput}
          placeholder="Password"
        />

        <Button
          type="submit"
          variant="default"
          className="py-3 text-lg font-semibold rounded-md"
        >
          {page === "login" ? "Login" : "Sign Up"}
        </Button>

        <Link
          className="text-center text-blue-600 hover:underline text-sm font-medium mt-2"
          href={page === "login" ? "/auth/signup" : "/auth/login"}
        >
          {page === "login"
            ? "Don't have an account? Sign up"
            : "Already have an account? Login"}
        </Link>
      </form>
    </div>
  );
}

export { AuthPage };
