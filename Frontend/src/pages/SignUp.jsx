
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthNavbar from "../components/AuthNavbar";
import toast from "react-hot-toast";
import api from "../services/api";

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const loadingToast = toast.loading("Creating your account...");
    try {
      await api.post("/auth/register", data);
      toast.dismiss(loadingToast);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.message || "Failed to create account");
    }
  };

  return (
    <div className='h-screen bg-[#0c0a09] flex flex-col'>
      <AuthNavbar />
      <div className='flex-1 flex items-center justify-center'>
        <div className='p-2 w-full max-w-md'>
          <h1 className='text-3xl text-white font-bold mb-4'>Sign Up</h1>
          <p className='text-white mb-8'>
            Get started by creating your account
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <div>
              <input
                type='text'
                placeholder='Full Name'
                {...register("fullName", {
                  required: "Full name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                className={`w-full text-black p-4 py-2 rounded-lg border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all ${
                  errors.fullName ? "border-red-500" : ""
                }`}
              />
              {errors.fullName && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <input
                type='text'
                placeholder='Username'
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                })}
                className={`w-full text-black p-4 py-2 rounded-lg border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all ${
                  errors.username ? "border-red-500" : ""
                }`}
              />
              {errors.username && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <input
                type='email'
                placeholder='Email'
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full text-black p-4 py-2 rounded-lg border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <input
                type='password'
                placeholder='Password'
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                    message:
                      "Password must contain at least one letter and one number",
                  },
                })}
                className={`w-full text-black p-4 py-2 rounded-lg border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              {errors.password && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type='submit'
              className='bg-white text-black px-4 py-2 rounded-lg w-full hover:bg-primary-700 transition-colors'
            >
              Sign Up
            </button>
          </form>

          <p className='mt-10 text-center text-sm text-white'>
            Already have an account?{" "}
            <Link to='/login' className='text-primary-600 font-bold'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
