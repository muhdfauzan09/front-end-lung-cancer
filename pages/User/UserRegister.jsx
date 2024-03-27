import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../../components/ModalComponent";
import api from "../../axiosConfig";
import lungCancer from "../../src/assets/lung_cancer.png";

const UserRegister = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  // Functions
  const OnRegister = (data, errors) => {
    api
      .post("/user/register", data, {
        "Content-Type": "application/json",
      })
      .then((res) => {
        console.log(res);
        if (res.status == 200 && res.statusText == "OK") {
          setShow(true);
          setMessage(res.data.message);
        }
      })
      .catch((err) => {
        setShow(true);
        console.log(err);
        setMessage(err.response.data.message);
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

      <div className="grid md:grid-cols-5 sm:grid-cols-2 h-screen">
        {/* Image or Logo */}
        <div className="col-span-2" style={{ backgroundColor: "#034CA1" }}>
          <div className="md:px-28 md:py-48">
            <img src={lungCancer} className="ml-auto mr-auto" />
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

        {/* Register */}
        <div className="col-span-3 bg-slate-200 md:p-28 sm:p-10">
          <form onSubmit={handleSubmit(OnRegister)}>
            <div className="md:p-14 sm:p-10 bg-white rounded-lg">
              <p
                className="text-center font-bold text-3xl mb-2"
                style={{ color: "#034CA1" }}
              >
                Create Your Doctor Account
              </p>
              <p className="text-center font-medium text-lg mb-5">
                Please Enter Your Personal Detail
              </p>

              <div>
                <p className="font-bold mb-2">Enter Your Name</p>
                <div className="grid grid-cols-2">
                  <div className="py-2 pr-4">
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800 focus:shadow-outline"
                      type="text"
                      placeholder="First Name"
                      {...register("firstName", {
                        required: "First Name is Required",
                      })}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 font-bold">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div className="py-2 pr-4">
                    <input
                      className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800 focus:outline-offset-5   focus:shadow-outline"
                      type="text"
                      placeholder="Last Name"
                      {...register("lastName", {
                        required: "Last Name is Required",
                      })}
                    />
                    {errors.lastName?.type === "required" && (
                      <p className="text-red-500 font-bold">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-7">
                <p className="font-bold mb-2">
                  Enter Your Email & Phone Number
                </p>
                <div className="grid grid-cols-2">
                  <div className="py-2 pr-4">
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800 focus:outline-offset-5   focus:shadow-outline"
                      type="text"
                      placeholder="Email"
                      {...register("email", { required: "Email is Required" })}
                    />
                    {errors.email && (
                      <p className="text-red-500 font-bold">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="py-2 pr-4">
                    <input
                      className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800 focus:outline-offset-5   focus:shadow-outline"
                      type="text"
                      placeholder="Phone Number"
                      {...register("phoneNumber", {
                        required: "Phone Number is Required",
                      })}
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 font-bold">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-7">
                <p className="font-bold mb-2">
                  Enter Your Department & Department Name
                </p>
                <div className="grid grid-cols-2">
                  <div className="py-2 pr-4">
                    <select
                      name="Deparment"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800 focus:outline-offset-5 focus:shadow-outline"
                      placeholder="Department"
                      {...register("department", {
                        required: "Department is Required",
                      })}
                    >
                      <option value="">Department :</option>
                      <option value="1">Clinic</option>
                      <option value="2">Hospital</option>
                    </select>
                    {errors.department && (
                      <p className="text-red-500 font-bold">
                        {errors.department.message}
                      </p>
                    )}
                  </div>

                  <div className="py-2 pr-4">
                    <input
                      className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800 focus:outline-offset-5   focus:shadow-outline"
                      type="text"
                      placeholder="Department Name"
                      {...register("departmentName", {
                        required: "Department Name is Required",
                      })}
                    />
                    {errors.departmentName && (
                      <p className="text-red-500 font-bold">
                        {errors.departmentName.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-7">
                <p className="font-bold mb-2">Enter Your Department Address</p>
                <div className="grid grid-cols-2">
                  <div className="py-2 pr-4">
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800 focus:outline-offset-5   focus:shadow-outline"
                      type="text"
                      placeholder="Address"
                      {...register("address1", {
                        required: "Address is Required",
                      })}
                    />
                    {errors.address1 && (
                      <p className="text-red-500 font-bold">
                        {errors.address1.message}
                      </p>
                    )}
                  </div>

                  <div className="py-2 pr-4">
                    <input
                      className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800 focus:outline-offset-5   focus:shadow-outline"
                      type="text"
                      placeholder="City"
                      {...register("city", { required: "City is Required" })}
                    />
                    {errors.city && (
                      <p className="text-red-500 font-bold">
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  <div className="py-2 pr-4 mt-4">
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800 focus:outline-offset-5   focus:shadow-outline"
                      type="text"
                      placeholder="Zip/Code"
                      {...register("zipCode", {
                        required: "Zip/Code is Required",
                      })}
                    />
                    {errors.zipCode && (
                      <p className="text-red-500 font-bold">
                        {errors.zipCode.message}
                      </p>
                    )}
                  </div>

                  <div className="py-2 pr-4 mt-4">
                    <input
                      className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800 focus:outline-offset-5   focus:shadow-outline"
                      type="text"
                      placeholder="State"
                      {...register("state", { required: "State is Required" })}
                    />
                    {errors.state && (
                      <p className="text-red-500 font-bold">
                        {errors.state.message}
                      </p>
                    )}
                  </div>

                  <div className="py-2 pr-4 mt-4">
                    <select
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800 focus:outline-offset-5   focus:shadow-outline"
                      placeholder="Role"
                      {...register("role", { required: "Role is Required" })}
                    >
                      <option value="Clinic">Role :</option>
                      <option value="1">Nurse</option>
                      <option value="2">Doctor</option>
                    </select>
                    {errors.role && (
                      <p className="text-red-500 font-bold">
                        {errors.role.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-7">
                <p className="font-bold mb-2">Enter Your Password</p>
                <div className="grid grid-cols-2">
                  <div className="py-2 pr-4">
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800 focus:outline-offset-5   focus:shadow-outline"
                      type="password"
                      placeholder="Password"
                      {...register("password", {
                        required: true,
                        minLength: 8,
                        validate: (value) =>
                          value === getValues("confirmPassword") ||
                          "password is not match",
                      })}
                    />
                    {errors.password && errors.password.type == "minLength" && (
                      <p className="text-red-500 font-bold">
                        Password is less than 8
                      </p>
                    )}
                    {errors.password && errors.password.type == "required" && (
                      <p className="text-red-500 font-bold">
                        Password is Required
                      </p>
                    )}

                    {errors.password && errors.password.type == "validate" && (
                      <p className="text-red-500 font-bold">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="py-2 pr-4">
                    <input
                      className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800 focus:outline-offset-5   focus:shadow-outline"
                      type="password"
                      placeholder="Confirm Password"
                      {...register("confirmPassword", {
                        required: true,
                        minLength: 8,
                      })}
                    />
                    {errors.confirmPassword &&
                      errors.confirmPassword.type == "minLength" && (
                        <p className="text-red-500 font-bold">
                          Password is less than 8
                        </p>
                      )}
                    {errors.confirmPassword &&
                      errors.confirmPassword.type == "required" && (
                        <p className="text-red-500 font-bold">
                          Confirm Password is Required
                        </p>
                      )}
                    {errors.password && errors.password.type == "validate" && (
                      <p className="text-red-500 font-bold">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <input
                  className="px-14 py-3 mt-14 font-bold text-white rounded-lg"
                  style={{ backgroundColor: "#034CA1" }}
                  type="submit"
                  label="submit"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserRegister;
