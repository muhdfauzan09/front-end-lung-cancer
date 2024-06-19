import Api from "../../axiosConfig";
import { Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Icons
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import ModalComponent from "../../components/ModalComponent";

const UserPrediction = () => {
  const navigate = useNavigate(); // Navigate
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [cookies, removeCookie] = useCookies(["userToken"]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    Api.get("/user/get/prediction", {
      headers: {
        Authorization: `Bearer ${cookies.userToken}`,
      },
    }).catch((err) => {
      if (err && err.response.status == 401) {
        navigate("/NotAuthorized");
        removeCookie("userToken");
      }
    });
  }, [cookies, removeCookie]);

  // Functions
  const onSubmit = (data) => {
    setLoading(true);
    Api.post("/user/post/prediction", data, {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${cookies.userToken}`,
      },
    }).then((res) => {
      setLoading(false);
      if (res.data.result[0] == 0) {
        setModalShow(true);
        setModalMessage("This individual does not possess lung cancer.");
      } else if (res.data.result[0] == 1) {
        setLoading(false);
        setModalShow(true);
        setModalMessage(
          "This person is concerned about the possibility of having lung cancer."
        );
      }
    });
  };

  return (
    <>
      <ModalComponent
        showModal={modalShow}
        message={modalMessage}
        route={() => {
          navigate("/patient");
        }}
      />
      <div className="flex">
        <div className="sm:p-14 sm:pl-28 md:p-16 md:pl-32 w-screen">
          <p className="font-semibold text-xl mb-14">
            <span className="text-blue-500">
              <Link to={"/"}>Dashboard /</Link>
            </span>
            <span> Prediction </span>
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="font-bold mb-1 text-lg">
                <GraphicEqIcon className="text-cyan-300" /> Early Detection
              </div>
              <div className="md:p-14 sm:p-7 bg-white rounded-2xl">
                {/* Patient's Detail */}
                <div>
                  <div className="flex">
                    <div className="bg-blue-800 rounded-full">
                      <p className="text-white py-3 px-4">1</p>
                    </div>
                    <div className="mt-3 ml-4">
                      <p className="font-bold text-xl">Patient's Detail</p>
                    </div>
                  </div>

                  <div className="mt-7 grid md:grid-cols-3 sm:grid-cols-1 gap-6">
                    <div className="col-span-1 pr-4">
                      <p className="font-bold mb-2">Full Name</p>
                      <input
                        {...register("fullName", {
                          required: "Full name is required",
                        })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                        type="text"
                      />
                      {errors.fullName && (
                        <p className="text-red-500 font-bold">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-1 pr-4">
                      <p className="font-bold mb-2">Phone Number</p>
                      <input
                        {...register("phoneNumber", {
                          required: "Phone Number is required",
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

                    <div className="col-span-1 pr-4">
                      <p className="font-bold mb-2">Gender</p>
                      <select
                        {...register("gender", {
                          required: "Gender is Required",
                        })}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                        type="text"
                      >
                        <option selected disabled value={""}>
                          --Choose Gender--
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                      {errors.gender && (
                        <p className="text-red-500 font-bold">
                          {errors.gender.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-1 pr-4">
                      <p className="font-bold mb-2">Address 1</p>
                      <input
                        {...register("address1", {
                          required: "Address 1 is required",
                        })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                        type="text"
                      />
                      {errors.address1 && (
                        <p className="text-red-500 font-bold">
                          {errors.address1.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-1 pr-4">
                      <p className="font-bold mb-2">Address 2</p>
                      <input
                        {...register("address2", {
                          required: "Address 2 is Required",
                        })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                        type="text"
                      />
                      {errors.address2 && (
                        <p className="text-red-500 font-bold">
                          {errors.address2.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-1 pr-4">
                      <p className="font-bold mb-2">Postcode</p>
                      <input
                        {...register("postcode", {
                          required: "Postcode is Required",
                        })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                        type="text"
                      />
                      {errors.postcode && (
                        <p className="text-red-500 font-bold">
                          {errors.postcode.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Feature Prediction  */}
                <div className="mt-20">
                  <div className="flex">
                    <div className="bg-blue-800 rounded-full">
                      <p className="text-white py-3 px-4">2</p>
                    </div>
                    <div className="mt-3 ml-4">
                      <p className="font-bold text-xl">Feature Prediction</p>
                    </div>
                  </div>

                  <div className="mt-7 grid md:grid-cols-3 sm:grid-cols-1 gap-6">
                    <div className="col-span-1 py-2 pr-4">
                      <p className="font-bold mb-2">Smoking</p>
                      <select
                        {...register("smoking", { required: true })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800 focus:shadow-outline"
                      >
                        <option value={1}>Non Smoker</option>
                        <option value={2}>Smoker</option>
                      </select>
                    </div>

                    <div className="col-span-1 py-2 pr-4">
                      <p className="font-bold mb-2">Yellow Fingers</p>
                      <select
                        {...register("yellow_fingers", { required: true })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                      >
                        <option value={1}>No Yellow Finger</option>
                        <option value={2}>Yellow Finger</option>
                      </select>
                    </div>

                    <div className="col-span-1 py-2 pr-4">
                      <p className="font-bold mb-2">Anxiety</p>
                      <select
                        {...register("anxiety", { required: true })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                      >
                        <option value={1}>No Anxiety</option>
                        <option value={2}>Anxiety</option>
                      </select>
                    </div>

                    <div className="col-span-1 py-2 pr-4">
                      <p className="font-bold mb-2">Peer Pressure</p>
                      <select
                        {...register("peer_pressure", { required: true })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                      >
                        <option value={1}>No Peer Pressure</option>
                        <option value={2}>Peer Pressure</option>
                      </select>
                    </div>

                    <div className="col-span-1 py-2 pr-4">
                      <p className="font-bold mb-2">Chronic Disease</p>
                      <select
                        {...register("chronic_disease", { required: true })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                      >
                        <option value={1}>No Chronic Disease</option>
                        <option value={2}>Chronic Disease</option>
                      </select>
                    </div>

                    <div className="col-span-1 py-2 pr-4">
                      <p className="font-bold mb-2">Fatigue</p>
                      <select
                        {...register("fatigue", { required: true })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                      >
                        <option value={1}>No Fatigue</option>
                        <option value={2}>Fatigue</option>
                      </select>
                    </div>

                    <div className="col-span-1 py-2 pr-4">
                      <p className="font-bold mb-2">Allergy</p>
                      <select
                        {...register("allergy", { required: true })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                      >
                        <option value={1}>No Allergy</option>
                        <option value={2}>Allergy</option>
                      </select>
                    </div>

                    <div className="col-span-1 py-2 pr-4">
                      <p className="font-bold mb-2">Wheezing</p>
                      <select
                        {...register("wheezing", { required: true })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                      >
                        <option value={1}>No Wheezing</option>
                        <option value={2}>Wheezing</option>
                      </select>
                    </div>

                    <div className="col-span-1 py-2 pr-4">
                      <p className="font-bold mb-2">Alcohol Consuming</p>
                      <select
                        {...register("alcohol_consuming", { required: true })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                      >
                        <option value={1}>No Alcohol Consuming</option>
                        <option value={2}>Alcohol Consuming</option>
                      </select>
                    </div>

                    <div className="col-span-1 py-2 pr-4">
                      <p className="font-bold mb-2">Coughing</p>
                      <select
                        {...register("coughing", { required: true })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                      >
                        <option value={1}>No Coughing</option>
                        <option value={2}>Coughing</option>
                      </select>
                    </div>

                    <div className="col-span-1 py-2 pr-4">
                      <p className="font-bold mb-2">Shortness Breath</p>
                      <select
                        {...register("shortness_breath", { required: true })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                      >
                        <option value={1}>No Shortness Breath</option>
                        <option value={2}>Shortness Breath</option>
                      </select>
                    </div>

                    <div className="col-span-1 py-2 pr-4">
                      <p className="font-bold mb-2">Swallowing Difficulty</p>
                      <select
                        {...register("swallowing_difficulty", {
                          required: true,
                        })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                      >
                        <option value={1}>No Swallowing Difficulty</option>
                        <option value={2}>Swallowing Difficulty</option>
                      </select>
                    </div>

                    <div className="col-span-1 py-2 pr-4">
                      <p className="font-bold mb-2">Chest Pain</p>
                      <select
                        {...register("chest_pain", { required: true })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                      >
                        <option value={1}>No Chest Pain</option>
                        <option value={2}>Chest Pain</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex mt-10 justify-end">
                  {loading ? (
                    <button
                      className="bg-blue-800 hover:bg-blue-600 text-center px-14 py-3 font-bold text-white rounded-lg text-xl"
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
                    <button
                      className="px-14 py-3 bg-slate-200 hover:bg-blue-400 text-blue-500 hover:text-white font-bold rounded-md"
                      type="submit"
                    >
                      Predict
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserPrediction;
