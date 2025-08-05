"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

function AuthPage({page = "login"}) {
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

    toast.loading(page == 'login' ? ' Logging In.... ' : ' Creating Account.... ')

    try {
      const { firstName, lastName, email, password } = data;

       if (page === 'login') {
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

      if (page == "login") {
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        console.log(res,'ressss');

        if (res?.error) {
            toast.dismiss()
          toast.error(res.error);
          return;
        }
        toast.dismiss()
        toast.success("Login Successfull!");
        router.push("/");

        return;
      }

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        toast.dismiss()
        toast.error(errorMessage || "Failed to create account");
        return;
      }

      toast.dismiss()
      toast.success("Account Created Successfully 🎉!");
      router.push("/auth/login");

      console.log("Response:", response);
    } catch (error) {
      console.log("Error in handleSignUp:", error);
      toast.dismiss()
      toast.error('Something Went Wrong!')
    }
  };
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mt-10">
       {page !== 'login' ? "Create A New Account" : 'Login To Your Account'}
      </h1>
      <p className="text-center mt-4">Get Authorized To Enjoy All Features.</p>

      <form
        onSubmit={handleSignUp}
        className="w-full flex flex-col gap-2 max-w-md mt-8"
      >
      {page !== 'login' && <> <input
          className="py-2 text-black border border-black rounded-md outline-none p-2 text-center "
          type="text"
          name="firstName"
          id="firstName"
          onChange={changeInput}
          placeholder="first name"
        />
        <input
          className="py-2 text-black border border-black rounded-md outline-none p-2 text-center "
          type="text"
          name="lastName"
          id="lastName"
          onChange={changeInput}
          placeholder="last name"
        /></>}
        <input
          className="py-2 text-black border border-black rounded-md outline-none p-2 text-center "
          type="text"
          name="email"
          onChange={changeInput}
          id="email"
          placeholder="Email"
        />
        <input
          className="py-2 text-black border border-black rounded-md outline-none p-2 text-center "
          type="password"
          name="password"
          id="password"
          onChange={changeInput}
          placeholder="Password"
        />

        <Button type="submit" variant={"default"}>
          Sign Up
        </Button>

        <Link className="text-center" href={page == 'login' ? '/auth/signup' : '/auth/login'}>{page == 'login' ? 'Dont Have Any Account ?' : 'Already Have An Account!'}</Link>

      </form>
    </div>
  );
}

export  {AuthPage};
