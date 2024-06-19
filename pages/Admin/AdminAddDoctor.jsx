import axios from "axios";
import Api from "../../axiosConfig";
import useState from "react-usestateref";
import ModalComponent from "../../components/ModalComponent";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const AdminAddDoctor = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData, useData] = useState([]);
  const [data2, setData2, useData2] = useState([]);
  const [states, setStates, useStates] = useState([]);
  const [district, setDistrict, useDistrict] = useState([]);
  const [disabled, setDisable, useDisable] = useState(true);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios.get("https://jian.sh/malaysia-api/state/v1/all.json").then((res) => {
      setData(res.data);
      const newStates = res.data.map((state) => ({
        value: state.state,
        label: state.state,
      }));
      setStates(newStates);
    });
  }, []);

  // Functions
  const OnRegister = (data, errors) => {
    setLoading(true);
    Api.post("/admin/register/user", data, {
      "Content-Type": "application/json",
    })
      .then((res) => {
        if (res.status == 200 && res.statusText == "OK") {
          setShow(true);
          setLoading(false);
          setMessage(res.data.message);
        }
      })
      .catch((err) => {
        setShow(true);
        setLoading(false);
        setMessage(err.response.data.message);
      });
  };

  return (
    <>
      <ModalComponent
        showModal={show}
        message={message}
        route={
          message == "The email is already registered."
            ? () => {
                setShow(false);
              }
            : () => {
                navigate("/admin/doctor");
              }
        }
      />

      <div className="flex">
        <div className="sm:p-10 sm:pl-28 md:p-20 md:pt-16 md:pl-32 w-screen">
          <p className="font-semibold text-xl mb-14">
            <span className="text-blue-500">
              <Link to={"/admin"}>Dashboard /</Link>
            </span>
            <span> Add Doctor</span>
          </p>

          <form onSubmit={handleSubmit(OnRegister)}>
            <div className="bg-white p-10 rounded-2xl">
              <div>
                <p className="text-blue-800 font-bold text-3xl">
                  Create Doctor Account
                </p>

                {/* User Detail */}
                <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-x-10 gap-y-10 mt-10">
                  <div>
                    <p className="font-bold mb-2">First Name</p>
                    <input
                      {...register("firstName", {
                        required: "First Name is Required",
                      })}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                      type="text"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 font-bold">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="font-bold mb-2">Last Name</p>
                    <input
                      {...register("lastName", {
                        required: "Last Name is Required",
                      })}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                      type="text"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 font-bold">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="font-bold mb-2">Email</p>
                    <input
                      {...register("email", { required: "Email is Required" })}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                      type="text"
                    />
                    {errors.email && (
                      <p className="text-red-500 font-bold">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="font-bold mb-2">Phone Number</p>
                    <input
                      {...register("phoneNumber", {
                        required: "Phone Number is Required",
                      })}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                      type="text"
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 font-bold">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Department Detail*/}
                <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-x-10 gap-y-10 mt-20">
                  <div>
                    <p className="font-bold mb-2">Department Type</p>
                    <select
                      {...register("departmentType", {
                        required: "Department Type is Required",
                      })}
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800 focus:outline-offset-5 focus:shadow-outline"
                    >
                      <option disabled>Select department type :</option>
                      <option value="1">Clinic</option>
                      <option value="2">Hospital</option>
                    </select>
                    {errors.departmentType && (
                      <p className="text-red-500 font-bold">
                        {errors.departmentType.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="font-bold mb-2">Department Name</p>
                    <input
                      {...register("departmentName", {
                        required: "Department Name is Required",
                      })}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                      type="text"
                    />
                    {errors.departmentName && (
                      <p className="text-red-500 font-bold">
                        {errors.departmentName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="font-bold mb-2">Department (Address)</p>
                    <input
                      {...register("departmentAddress", {
                        required: "Department Address is Required",
                      })}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                      type="text"
                    />
                    {errors.departmentAddress && (
                      <p className="text-red-500 font-bold">
                        {errors.departmentAddress.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="font-bold mb-2">Department (State)</p>
                    <select
                      {...register("departmentState", {
                        required: "Department State is Required",
                        onChange: (e) => {
                          setDisable(false);
                          const state = getValues("departmentState");
                          axios
                            .get(
                              `https://jian.sh/malaysia-api/state/v1/${state.toLowerCase()}.json`
                            )
                            .then((res) => {
                              setData2(res.data.administrative_districts);
                              const newDistrict = useData2.current.map(
                                (state) => ({
                                  value: state,
                                  label: state,
                                })
                              );
                              setDistrict(newDistrict);
                            });
                        },
                      })}
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800 focus:shadow-outline"
                      type="text"
                    >
                      <option selected disabled>
                        Choose state :
                      </option>
                      {states.map(({ value, label }, index) => (
                        <option value={value} key={index}>
                          {label}
                        </option>
                      ))}
                    </select>
                    {errors.departmentState && (
                      <p className="text-red-500 font-bold">
                        {errors.departmentState.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="font-bold mb-2">Department (City)</p>
                    <input
                      {...register("departmentCity", {
                        required: "Department City is Required",
                      })}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                      type="text"
                    />
                    {errors.departmentCity && (
                      <p className="text-red-500 font-bold">
                        {errors.departmentCity.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="font-bold mb-2">Department (District)</p>
                    <select
                      {...register("departmentDistrict", {
                        required: "Department District is Required",
                        disabled: disabled,
                      })}
                      className="shadow border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                    >
                      <option selected disabled>
                        Choose District :
                      </option>
                      {district.map(({ value, label }, index) => (
                        <option value={value} key={index}>
                          {label}
                        </option>
                      ))}
                    </select>
                    {errors.departmentDistrict && (
                      <p className="text-red-500 font-bold">
                        {errors.departmentDistrict.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="font-bold mb-2">Department (Zip/Code)</p>
                    <input
                      {...register("departmentZipCode", {
                        required: "Department Zip/Code is Required",
                      })}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                      type="number"
                    />
                    {errors.departmentZipCode && (
                      <p className="text-red-500 font-bold">
                        {errors.departmentZipCode.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Button */}
              <div className="flex justify-end">
                {loading ? (
                  <button
                    className="px-14 py-3 mt-14 font-bold text-white rounded-lg bg-blue-700 hover:bg-blue-600"
                    disabled
                  >
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="mr-2"
                    />
                    Loading...
                  </button>
                ) : (
                  <input
                    className="px-14 py-3 mt-14 font-bold text-white rounded-lg bg-blue-700 hover:bg-blue-600"
                    type="submit"
                    label="submit"
                  />
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminAddDoctor;
