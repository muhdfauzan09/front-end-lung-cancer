import Api from "../axiosConfig";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import ModalComponent from "../components/ModalComponent";
import lungCancer from "../src/assets/lung_cancer_logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [cookies, setCookie] = useCookies();
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
        } else if (res.status === 200 && res.data.role_id === 2) {
          setCookie("userToken", res.data.access_token);
          navigate("/");
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
      <div className="grid md:grid-cols-2 sm:grid-cols-1 h-screen">
        <div className="bg-blue-800 grid place-content-center">
          <div>
            <img src={lungCancer} className="w-full" alt="Lung Cancer" />
            <div className="p-10 text-center">
              <p className="font-bold text-white text-4xl border-b-4 pb-6">
                Pneumocast.
              </p>

              <p className="text-zinc-200 font-normal text-sm mt-10">
                PRIVACY POLICY | TERMS OF USE
              </p>
              <p className="text-zinc-200 font-normal text-sm mt-2">
                Copyright @ 2024 Pneumocast
              </p>
            </div>
          </div>
        </div>

        {/* Login */}
        <div className="grid md:col-span-1 self-center">
          <form
            onSubmit={handleSubmit(onLogin)}
            className="max-w-[42rem] w-full m-auto"
          >
            <div className="p-16 bg-white rounded-3xl">
              <div className="mb-7">
                <p className="font-bold mb-16 text-2xl">Pneumocast.</p>
                <p className="text-5xl font-normal text-blue-500">Hello, </p>
                <p className="text-6xl font-bold text-blue-700">Welcome! </p>
              </div>

              <div>
                <div className="grid grid-rows-2">
                  <div className="mb-3">
                    <p className="font-bold mb-2 text-blue-700 text-xl">
                      Email
                    </p>
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
                    <p className="font-bold mb-2 text-blue-700 text-xl">
                      Password
                    </p>
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
                    <div className="flex justify-end text-blue-400 font-bold mt-2">
                      Forgot Password ?
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <input
                  className="px-14 py-3 mt-4 bg-blue-700 hover:bg-blue-600 text-white text-xl font-bold rounded-3xl"
                  type="submit"
                  value="Login"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
