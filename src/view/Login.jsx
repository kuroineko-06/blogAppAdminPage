import React, { useEffect, useState } from "react";
import { useNotification } from "../context/NotificationProvider";
import client from "../api/client";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { updateNotification } = useNotification();

  const navigate = useNavigate();

  const handleSubmit = async (e, error) => {
    e.preventDefault();
    handelValidation();
    await client
      .post("http://localhost:4848/api/login/login", {
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response);
        localStorage.setItem("token", response?.data?.token);
        localStorage.setItem("role", response?.data?.role);
        sessionStorage.setItem(
          "account",
          JSON.stringify(response?.data?.token)
        );
        updateNotification("success", "Login complete!!!!");
        navigate(`/home`);
      })
      .catch(function (error) {
        console.log(error);
        updateNotification("Error", "Email/Password does't match!!!");
      });
  };

  const handelValidation = () => {
    if (!email.trim()) {
      return updateNotification("error", "Email is missing!");
    }
    if (!password.trim()) {
      return updateNotification("error", "Password is missing!");
    }
    if (password.length < 8) {
      return updateNotification(
        "error",
        "Password should be equal or greater than 8 characters."
      );
    }
  };

  useEffect(() => {
    sessionStorage.setItem("account", JSON.stringify(" "));
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div
        class="flex min-h-full max-w-screen-md mx-auto flex-col border-2
                border-blue-500 rounded-3xl mt-10 justify-center px-6 py-12 lg:px-8"
      >
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            class="mx-auto h-20 w-auto"
            src="neko-logo.png"
            alt="Your Logo"
          />
          <h2
            class="mt-10 text-center text-2xl font-bold 
                leading-9 tracking-tight text-gray-900"
          >
            Sign in to your account
          </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" action="#" method="POST">
            <div>
              <label
                for="email"
                class="block text-sm font-medium 
                            leading-6 text-gray-900"
              >
                Email address
              </label>
              <div class="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autocomplete="email"
                  required
                  class="block w-full pl-3 rounded-md border-0 
                                py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
                                ring-gray-300 placeholder:text-gray-400 
                                focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                                sm:text-base base:leading-6"
                />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label
                  for="password"
                  class="block text-sm font-medium leading-6 
                                text-gray-900"
                >
                  Password
                </label>
              </div>
              <div class="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  autocomplete="current-password"
                  required
                  class="block w-full pl-3 rounded-md border-0 
                                py-1.5 text-gray-900 shadow-sm ring-1 ring-inset mb-10
                                ring-gray-300 placeholder:text-gray-400 
                                focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                                sm:text-base base:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                class="flex w-full justify-center rounded-md 
                            bg-indigo-600 px-3 py-1.5 text-sm font-semibold 
                            leading-6 text-white shadow-sm hover:bg-indigo-500 
                            focus-visible:outline focus-visible:outline-2 
                            focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p class="mt-10 text-center text-sm text-gray-500">
            <a
              href="/register"
              class="font-semibold leading-6 text-indigo-600
                        hover:text-indigo-500"
            >
              Don't have account? Press here to register!!!
            </a>
          </p>
        </div>
      </div>
    </form>
  );
}
