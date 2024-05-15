import Api from "../../axiosConfig";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useNavigate, useParams, Link } from "react-router-dom";

// Icons
import PhotoIcon from "@mui/icons-material/Photo";
import PersonIcon from "@mui/icons-material/Person";
import ModalComponent from "../../components/ModalComponent";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const UserViewPatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [patient, setPatient] = useState({});
  const [cookies, removeCookie] = useCookies(["userToken"]);

  useEffect(() => {
    Api.get("/user/get/patient/details/" + id, {
      headers: {
        Authorization: `Bearer ${cookies.userToken}`,
      },
    })
      .then((res) => {
        setPatient(res.data.patient_details[0]);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          navigate("/NotAuthorized");
          removeCookie("userToken");
        } else if (error.response && error.response.status === 404) {
          navigate("/notFound");
        }
      });
  }, [cookies, removeCookie]);

  // Funtions
  const imageUpload = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    Api.post(`/user/post/prediction/image/${patient.patient_id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        window.location.reload(true);
      })
      .catch((error) => {
        if (error.response.status == 400) {
          setShow(true);
          setMessage(error.response.data.msg);
        }
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
      <div className="flex">
        <div className="sm:p-14 sm:pl-28 md:p-16 md:pl-32 w-screen">
          <div>
            <p className="font-semibold text-xl mb-14">
              <span className="text-blue-500">
                <Link to="/patient">Patient List /</Link>
              </span>
              <span> {patient.patient_name} </span>
            </p>
          </div>

          <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-9">
            <div className="md:col-span-1 sm:col-span-1 grid grid-rows-2 gap-9">
              <div className="row-span-2">
                <div className="font-bold mb-1 text-lg">
                  <PersonIcon className="text-cyan-300 mr-1" />
                  Patient Details
                </div>
                <div className="p-10 bg-white rounded-2xl">
                  <div className="mt-2">
                    <p className="text-md text-gray-500">
                      Lung Cancer : (Early Detection)
                    </p>
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
                    <p className="text-md text-gray-500">
                      Lung Cancer : (Image Classification)
                    </p>
                    <p
                      className={
                        patient.image_class == "Negative"
                          ? "text-lg font-bold text-green-600"
                          : "text-lg font-bold text-red-600"
                      }
                    >
                      {patient.image_class
                        ? patient.image_class
                        : "Image has not been uploaded yet"}
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

            <div className="md:col-span-3 sm:col-span-1">
              {/* Feature */}
              <div>
                <div className="font-bold mb-1 text-lg">
                  <LocalHospitalIcon className="text-cyan-300 mr-1" />
                  Patient Feature
                </div>

                <div className="bg-white p-12 rounded-2xl">
                  <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
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
                        value={
                          patient.wheezing == 1 ? "No Wheezing" : "Wheezing"
                        }
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
                        value={
                          patient.coughing == 1 ? "No Coughing" : "Coughing"
                        }
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

              {/* Image Classification */}
              <div>
                <div className="font-bold mb-1 mt-10 text-lg">
                  <PhotoIcon className="text-cyan-300 mr-1" />
                  Image Classification
                </div>
                <div className="bg-white p-12 rounded-2xl">
                  <div className=" bg-white rounded-2xl">
                    <FileUploader
                      handleChange={imageUpload}
                      name="file"
                      label="Upload or drop image right here"
                    />
                  </div>

                  <div className="mt-10">
                    {patient.image_path ? (
                      <img
                        src={`http://127.0.0.1:5000/${patient.image_path}`}
                        alt="patient image"
                      />
                    ) : (
                      "This patient doesn't yet have an image uploaded"
                    )}
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

export default UserViewPatient;
