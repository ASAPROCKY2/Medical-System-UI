// src/pages/auth/Register.tsx
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { usersAPI } from "../../Features/users/userAPI";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { FaPhone, FaHome, FaEnvelope, FaLock, FaSpinner } from "react-icons/fa";

type RegisterInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  contactPhone?: string;
  address?: string;
};

const schema: yup.ObjectSchema<RegisterInputs> = yup.object({
  firstName: yup
    .string()
    .max(50, "Max 50 characters")
    .required("First name is required"),
  lastName: yup
    .string()
    .max(50, "Max 50 characters")
    .required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email")
    .max(100, "Max 100 characters")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Min 6 characters")
    .max(255, "Max 255 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
  contactPhone: yup.string().max(20, "Max 20 characters").optional(),
  address: yup.string().max(255, "Max 255 characters").optional(),
});

function Register() {
  const navigate = useNavigate();
  const [createUser, { isLoading }] = usersAPI.useCreateUsersMutation({
    fixedCacheKey: "createUser",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      contactPhone: "",
      address: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    try {
      // Only register as a user
      await createUser({ ...data, role: "user" }).unwrap();
      toast.success("Registration successful! Please check your email.");
      setTimeout(() => {
        navigate("/auth/verify", { state: { email: data.email } });
      }, 2000);
    } catch (error: any) {
      toast.error(error?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-6 text-white">
          <h1 className="text-3xl font-bold">Medical Portal</h1>
          <p className="opacity-90">Create your healthcare account</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Registration
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  {...register("firstName")}
                  className="w-full rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500 border p-2.5"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  {...register("lastName")}
                  className="w-full rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500 border p-2.5"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    {...register("email")}
                    className="pl-10 w-full rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500 border p-2.5"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    {...register("password")}
                    className="pl-10 w-full rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500 border p-2.5"
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    {...register("confirmPassword")}
                    className="pl-10 w-full rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500 border p-2.5"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Contact Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Phone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    {...register("contactPhone")}
                    className="pl-10 w-full rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500 border p-2.5"
                  />
                </div>
                {errors.contactPhone && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.contactPhone.message}
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaHome className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    {...register("address")}
                    className="pl-10 w-full rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500 border p-2.5"
                  />
                </div>
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Creating Account...
                </>
              ) : (
                "Register Now"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-teal-600 hover:text-teal-700 font-medium hover:underline"
              >
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
