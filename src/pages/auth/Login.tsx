// src/pages/auth/Login.tsx
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginAPI } from '../../Features/login/loginAPI';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../Features/login/userSlice';

type LoginInputs = {
  email: string;
  password: string;
};

// Validation schema
const schema = yup.object({
  email: yup
    .string()
    .email('Invalid email')
    .max(100, 'Max 100 characters')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Min 6 characters')
    .max(255, 'Max 255 characters')
    .required('Password is required'),
});

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // If email was passed from registration page
  const emailFromState = (location.state as { email?: string })?.email || '';

  // Hook from RTK Query
  const [loginUser, { isLoading }] = loginAPI.useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: emailFromState,
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      const response = await loginUser(data).unwrap();

      // Save to redux
      dispatch(loginSuccess(response));

      toast.success('Login successful!');

      // Redirect based on role
      const role = response?.user?.role;
      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'doctor') {
        navigate('/doctor-dashboard');
      } else if (role === 'user') {
        navigate('/patient-dashboard');
      } else {
        navigate('/'); // fallback
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header with medical theme */}
        <div className="bg-teal-600 py-6 px-8 text-center">
          <div className="flex justify-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">Medical Portal</h1>
          <p className="text-teal-100 mt-1">Secure access to your health services</p>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Login to Your Account</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                placeholder="user@example.com"
                className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200 ${emailFromState ? 'bg-gray-100' : 'bg-white'}`}
                readOnly={!!emailFromState}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register('password')}
                placeholder="••••••••"
                className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <a href="/forgot-password" className="text-sm text-teal-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Authenticating...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Links */}
          <div className="text-center space-y-3">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <a href="/register" className="text-teal-600 font-medium hover:underline">
                Register here
              </a>
            </p>
            <p className="text-gray-600">
              <a href="/" className="text-gray-500 hover:text-gray-700 text-sm hover:underline">
                Back to Home
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;