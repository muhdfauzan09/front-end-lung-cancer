import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";

import Api from "../axiosConfig";
import lungCancer from "../src/assets/lung_cancer.png";
import ModalComponent from "../components/ModalComponent";

const Login = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onLogin = (data) => {
    Api.post("/user/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200 && res.data.role_id === 1) {
          setCookie("adminToken", res.data.access_token);
          navigate("/admin");
          window.location.reload(false);
        } else if (res.status === 200 && res.data.role_id === 2) {
          setCookie("userToken", res.data.access_token);
          navigate("/");
          window.location.reload(false);
        }
      })
      .catch((err) => {
        setShow(true);
        setMessage(err.response.data.msg);
      });
  };

  return (
    <>
      <ModalComponent
        showModal={show}
        message={message}
        route={() => {
          setShow(false);
        }}
      />
      <div className="grid md:grid-cols-2 h-screen">
        <div className="md:col-span-1" style={{ backgroundColor: "#034CA1" }}>
          <div className="md:px-28 md:py-48">
            <img
              src={lungCancer}
              className="ml-auto mr-auto w-96"
              alt="Lung Cancer"
            />
            <div className="p-10 text-center">
              <p className="font-bold text-white text-4xl">
                EARLY STAGE LUNG CANCER
              </p>
              <p className="font-bold text-white text-4xl border-b-4 pb-10">
                PREDICTION APPLICATION
              </p>
            </div>
          </div>
        </div>

        {/* Login */}
        <div className="md:col-span-1 bg-slate-200 md:px-32 md:py-52">
          <form onSubmit={handleSubmit(onLogin)}>
            <div className="p-16 bg-white rounded-2xl">
              <p
                className="text-center font-bold text-3xl mb-2"
                style={{ color: "#034CA1" }}
              >
                Login
              </p>
              <p className="text-center font-medium text-lg mb-5">
                Please Enter Your Email & Password
              </p>
              <div>
                <div className="grid grid-rows-2">
                  <div className="mb-3">
                    <p className="font-bold mb-2">Email</p>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800 focus:shadow-outline"
                      type="text"
                      {...register("email", {
                        required: "Please Enter Your Email",
                      })}
                    />
                    {errors.email && (
                      <p className="text-red-500 font-bold">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="font-bold mb-2">Password</p>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800 focus:shadow-outline"
                      type="password"
                      {...register("password", {
                        required: "Please Enter Your Password",
                      })}
                    />
                    {errors.password && (
                      <p className="text-red-500 font-bold">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <input
                  className="px-14 py-3 mt-4 font-bold text-white rounded-lg"
                  style={{ backgroundColor: "#034CA1" }}
                  type="submit"
                  value="Login"
                />
              </div>
              <div className="text-center text-blue-500 font-medium mt-3 cursor-pointer">
                <Link to="/register">Register Account</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
