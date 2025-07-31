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

  const emailFromState = (location.state as { email?: string })?.email ?? '';

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
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      const response = await loginUser(data).unwrap();

      if (!response?.token || !response?.user) {
        throw new Error('Invalid response from server.');
      }

      const {
        user_id,
        firstname,
        lastname,
        email,
        role,
        image_url,
        doctor_id,
      } = response.user;

      dispatch(
        loginSuccess({
          token: response.token,
          user: {
            user_id,
            firstname,
            lastname,
            email,
            role,
            image_url: image_url ?? '',
            doctor_id: doctor_id ?? null,
          },
        })
      );

      toast.success('Login successful!');

      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'doctor') {
        navigate('/doctor');
      } else if (role === 'user') {
        navigate('/user');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      console.error('Login failed:', err);

      const message =
        err?.data?.message ||
        err?.error ||
        err?.message ||
        'Login failed. Please check your credentials.';

      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-teal-600 py-6 px-8 text-center">
          <h1 className="text-2xl font-bold text-white">Medical Portal</h1>
          <p className="text-teal-100 mt-1">Secure access to your health services</p>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Login to Your Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                data-testid="email-input"
                data-test="login-email-input" 
                type="email"
                {...register('email')}
                placeholder="user@example.com"
                autoFocus
                aria-invalid={!!errors.email}
                aria-describedby="email-error"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200 ${
                  emailFromState ? 'bg-gray-100' : 'bg-white'
                }`}
                readOnly={!!emailFromState}
              />
              {errors.email && (
                <p
                  id="email-error"
                  className="mt-1 text-sm text-red-600"
                  data-testid="email-error"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                data-testid="password-input"
                data-test="login-password-input" 
                type="password"
                {...register('password')}
                placeholder="••••••••"
                aria-invalid={!!errors.password}
                aria-describedby="password-error"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200`}
              />
              {errors.password && (
                <p
                  id="password-error"
                  className="mt-1 text-sm text-red-600"
                  data-testid="password-error"
                >
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <a href="/forgot-password" className="text-sm text-teal-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              data-test="login-submit-button" 
              disabled={isLoading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Authenticating...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="text-center space-y-3">
            <p className="text-gray-600">
              Don&apos;t have an account?{' '}
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
