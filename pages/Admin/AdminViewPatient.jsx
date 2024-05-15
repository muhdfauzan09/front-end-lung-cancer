import Api from "../../axiosConfig";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const AdminViewPatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState({});
  const [cookies, removeCookie] = useCookies(["adminToken"]);

  useEffect(() => {
    Api.get("/admin/get/patient/details/" + id, {
      headers: {
        Authorization: `Bearer ${cookies.adminToken}`,
      },
    })
      .then((res) => {
        setPatient(res.data.patient_details[0]);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          navigate("/NotAuthorized");
          removeCookie("adminToken");
        }
        if (error.response && error.response.status === 404) {
          navigate("/notFound");
        }
      });
  }, [cookies, removeCookie]);

  return (
    <>
      <div className="flex">
        <div className="sm:p-14 sm:pl-28 md:p-16 md:pl-32 w-screen">
          <div>
            <p className="font-semibold text-xl mb-14">
              <span className="text-blue-500">
                <Link to="/patient">Patient List /</Link>
              </span>
              <span>{patient.patient_name}</span>
            </p>
          </div>
          <div className="grid grid-cols-4 gap-9">
            <div className="col-span-1 grid grid-rows-2 gap-9">
              <div className="row-span-2">
                <div className="font-bold mb-1 text-lg">
                  <LocalHospitalIcon className="text-cyan-300 mr-1" />
                  Patient Profile
                </div>
                <div className="p-10 bg-white rounded-2xl">
                  <div className="">
                    <p className="text-md text-gray-500">Lung Cancer :</p>
                    <p
                      className={
                        patient.lung_cancer == 0
                          ? "text-lg font-bold text-green-600"
                          : "text-lg font-bold text-red-600"
                      }
                    >
                      {patient.lung_cancer == 0 ? "Negative" : "Positive"}
                    </p>
                  </div>

                  <div className="mt-2">
                    <p className="text-md text-gray-500">Name :</p>
                    <p className="text-lg font-bold">{patient.patient_name}</p>
                  </div>

                  <div className="mt-2">
                    <p className="text-md text-gray-500">Phone Number :</p>
                    <p className="text-lg font-bold">
                      {patient.patient_phone_number}
                    </p>
                  </div>

                  <div className="mt-2">
                    <p className="text-md text-gray-500">Gender :</p>
                    <p className="text-lg font-bold">
                      {patient.patient_gender}
                    </p>
                  </div>

                  <div className="mt-2">
                    <p className="text-md text-gray-500">Address 1 :</p>
                    <p className="text-lg font-bold">
                      {patient.patient_address1}
                    </p>
                  </div>

                  <div className="mt-2">
                    <p className="text-md text-gray-500">Address 2 :</p>
                    <p className="text-lg font-bold">
                      {patient.patient_address2}
                    </p>
                  </div>

                  <div className="mt-2">
                    <p className="text-md text-gray-500">Postcode :</p>
                    <p className="text-lg font-bold">
                      {patient.patient_postcode}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature */}
            <div className="col-span-3">
              <div className="font-bold mb-1 text-lg">
                <LocalHospitalIcon className="text-cyan-300 mr-1" />
                Patient Profile
              </div>
              <div className="bg-white p-14 rounded-2xl">
                <div className="flex">
                  <div
                    style={{ backgroundColor: "#034CA1", borderRadius: "50%" }}
                  >
                    <p className="text-white py-3 px-4">1</p>
                  </div>
                  <div className="mt-3 ml-4">
                    <p className="font-bold text-xl">Features</p>
                  </div>
                </div>
                <div className="mt-7 grid grid-cols-3 gap-6">
                  <div className="col-span-1 py-2 pr-4">
                    <p className="font-bold mb-2">Smoking</p>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                      type="text"
                      disabled
                      value={patient.smoking == 1 ? "Non-Smoking" : "Smoking"}
                    />
                  </div>

                  <div className="col-span-1 py-2 pr-4">
                    <p className="font-bold mb-2">Yellow Fingers</p>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                      type="text"
                      disabled
                      value={
                        patient.yellow_fingers == 1
                          ? "No Yellow Finger"
                          : "Yellow Finger"
                      }
                    />
                  </div>

                  <div className="col-span-1 py-2 pr-4">
                    <p className="font-bold mb-2">Anxiety</p>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                      type="text"
                      disabled
                      value={patient.anxiety == 1 ? "No Anxiety" : "Anxiety"}
                    />
                  </div>

                  <div className="col-span-1 py-2 pr-4">
                    <p className="font-bold mb-2">Peer Pressure</p>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                      type="text"
                      disabled
                      value={
                        patient.peer_pressure == 1
                          ? "No Peer Pressure"
                          : "Peer Pressure"
                      }
                    />
                  </div>

                  <div className="col-span-1 py-2 pr-4">
                    <p className="font-bold mb-2">Chronic Disease</p>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                      type="text"
                      disabled
                      value={
                        patient.chronic_disease == 1
                          ? "No Chronic Disease"
                          : "Chronic Disease"
                      }
                    />
                  </div>

                  <div className="col-span-1 py-2 pr-4">
                    <p className="font-bold mb-2">Fatigue</p>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                      type="text"
                      disabled
                      value={patient.fatigue == 1 ? "No Fatigue" : "Fatigue"}
                    />
                  </div>

                  <div className="col-span-1 py-2 pr-4">
                    <p className="font-bold mb-2">Allergy</p>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                      type="text"
                      disabled
                      value={patient.allergy == 1 ? "No Allergy" : "Allergy"}
                    />
                  </div>

                  <div className="col-span-1 py-2 pr-4">
                    <p className="font-bold mb-2">Wheezing</p>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                      type="text"
                      disabled
                      value={patient.wheezing == 1 ? "No Wheezing" : "Wheezing"}
                    />
                  </div>

                  <div className="col-span-1 py-2 pr-4">
                    <p className="font-bold mb-2">Alcohol Consuming</p>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                      type="text"
                      disabled
                      value={
                        patient.alcohol_consuming == 1
                          ? "No Alcohol Consumer"
                          : "Alcohol Consumer"
                      }
                    />
                  </div>

                  <div className="col-span-1 py-2 pr-4">
                    <p className="font-bold mb-2">Coughing</p>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                      type="text"
                      disabled
                      value={patient.coughing == 1 ? "No Coughing" : "Coughing"}
                    />
                  </div>

                  <div className="col-span-1 py-2 pr-4">
                    <p className="font-bold mb-2">Shortness Breath</p>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                      type="text"
                      disabled
                      value={
                        patient.shortness_breath == 1
                          ? "No Shortness Breath"
                          : "Shortness Breath"
                      }
                    />
                  </div>

                  <div className="col-span-1 py-2 pr-4">
                    <p className="font-bold mb-2">Swallowing Dificulty</p>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                      type="text"
                      disabled
                      value={
                        patient.swallowing_dificulty == 1
                          ? "No Swallowing Dificulty"
                          : "Swallowing Dificulty"
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminViewPatient;
