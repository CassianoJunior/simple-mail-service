import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { App } from './App';
import heroVideo from './assets/hero-video.mp4';
import { useUserContext } from './contexts/UserContext';

const LogIn = () => {
  const { userExists, handleUserLoginRequest, handleUserRegisterRequest } =
    useUserContext();
  const [formIsLogin, setFormIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const toggleForm = useCallback(() => {
    setFormIsLogin((prev) => !prev);
  }, [formIsLogin]);

  const handleLogin = (email: string) => {
    if (!email) return toast.warning('Please, type your email');
    handleUserLoginRequest(email);
    setEmail('');
  };

  const handleRegister = (username: string, email: string) => {
    if (!email || !username)
      return toast.warning('Please, type your email and username');
    handleUserRegisterRequest(username, email);
    setEmail('');
    setUsername('');
  };

  return userExists ? (
    <App />
  ) : (
    <div className="h-screen flex justify-between items-center bg-zinc-700">
      <div className="max-w-7xl h-[40rem] flex items-center justify-between m-auto p-6 rounded-2xl bg-blue-200 shadow-md shadow-blue-100">
        <div className="h-full">
          <div className="bg-trasparent rounded-lg py-6 px-8 w-full h-full flex flex-col justify-center">
            <hgroup className="text-gray-800 mb-10">
              <h1 className="text-3xl font-semibold">
                Welcome to Mail Service
              </h1>
              <h2 className="text-xl">Your eletronic mail provider</h2>
            </hgroup>
            {formIsLogin ? (
              <div className="mb-2">
                <h2 className="text-center text-gray-800 text-lg mb-2 font-semibold">
                  Sign in to your account
                </h2>

                <input
                  className="border disabled:cursor-not-allowed rounded-lg block w-full py-3 px-6 outline-none bg-blue-300 placeholder-gray-600 text-black focus:ring-blue-500 focus:ring-2"
                  type="email"
                  placeholder="Type your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            ) : (
              <div className="mb-2">
                <h2 className="text-center text-gray-800 text-lg mb-2 font-semibold">
                  Create your new account
                </h2>

                <input
                  className="mb-2 border disabled:cursor-not-allowed rounded-lg block w-full py-3 px-6 outline-none bg-blue-300 placeholder-gray-600 text-black focus:ring-blue-500 focus:ring-2"
                  type="text"
                  placeholder="Preferred username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <input
                  className="border disabled:cursor-not-allowed rounded-lg block w-full py-3 px-6 outline-none bg-blue-300 placeholder-gray-600 text-black focus:ring-blue-500 focus:ring-2"
                  type="email"
                  placeholder="Type your best email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            )}
            <div className=" flex items-center justify-between py-2">
              <p
                onClick={toggleForm}
                className="hover:cursor-pointer pl-2 text-zinc-800 "
              >
                {`${
                  formIsLogin
                    ? 'Create your account'
                    : 'Already have an account'
                }`}
              </p>
              <button
                className="bg-[#2DA4FF] hover:bg-blue-500 hover:shadow-md hover:shadow-blue-300 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                onClick={
                  formIsLogin
                    ? () => handleLogin(email)
                    : () => handleRegister(username, email)
                }
              >
                {formIsLogin ? 'Login' : 'Register'}
              </button>
            </div>
          </div>
        </div>
        <div>
          <video className="rounded-3xl h-[35rem]" autoPlay={true} loop muted>
            <source src={heroVideo} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};

export { LogIn };
