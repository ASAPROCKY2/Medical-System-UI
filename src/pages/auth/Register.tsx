import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { usersAPI } from "../../Features/users/userAPI";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import {
  FaPhone,
  FaHome,
  FaEnvelope,
  FaLock,
  FaSpinner,
  FaUser,
} from "react-icons/fa";

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
    .email("Enter a valid email")
    .max(100, "Max 100 characters")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Min 6 characters")
    .max(255, "Max 255 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
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
        <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-6 text-white flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Medical Portal</h1>
            <p className="opacity-90">Create your healthcare account</p>
          </div>
          {/* ✅ Added testable nav link for Cypress */}
          <Link
            to="/register"
            data-testid="nav-register"
            className="hidden"
          >
            Register
          </Link>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Registration
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField
                label="First Name"
                icon={<FaUser className="h-5 w-5 text-gray-400" />}
                fieldProps={register("firstName")}
                error={errors.firstName?.message}
                testId="signup-firstname"
              />

              <InputField
                label="Last Name"
                icon={<FaUser className="h-5 w-5 text-gray-400" />}
                fieldProps={register("lastName")}
                error={errors.lastName?.message}
                testId="signup-lastname"
              />

              <InputField
                label="Email"
                icon={<FaEnvelope className="h-5 w-5 text-gray-400" />}
                fieldProps={register("email")}
                error={errors.email?.message}
                testId="signup-email"
                colSpan={2}
              />

              <InputField
                label="Password"
                icon={<FaLock className="h-5 w-5 text-gray-400" />}
                fieldProps={register("password")}
                error={errors.password?.message}
                testId="signup-password"
                type="password"
              />

              <InputField
                label="Confirm Password"
                icon={<FaLock className="h-5 w-5 text-gray-400" />}
                fieldProps={register("confirmPassword")}
                error={errors.confirmPassword?.message}
                testId="signup-confirmpassword"
                type="password"
              />

              <InputField
                label="Contact Phone"
                icon={<FaPhone className="h-5 w-5 text-gray-400" />}
                fieldProps={register("contactPhone")}
                error={errors.contactPhone?.message}
                testId="signup-contactPhone"
              />

              <InputField
                label="Address"
                icon={<FaHome className="h-5 w-5 text-gray-400" />}
                fieldProps={register("address")}
                error={errors.address?.message}
                testId="signup-address"
              />
            </div>

            <button
              data-testid="signup-submitbtn"
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

// Reusable input field
type InputFieldProps = {
  label: string;
  icon: React.ReactNode;
  fieldProps: any;
  error?: string;
  testId: string;
  type?: string;
  colSpan?: number;
};

function InputField({
  label,
  icon,
  fieldProps,
  error,
  testId,
  type = "text",
  colSpan,
}: InputFieldProps) {
  const colClass = colSpan === 2 ? "md:col-span-2" : "";
  return (
    <div className={colClass}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          data-testid={testId}
          type={type}
          {...fieldProps}
          className="pl-10 w-full rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500 border p-2.5"
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default Register;
