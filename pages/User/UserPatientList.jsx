import { useCookies } from "react-cookie";
import { Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// Components
import Api from "../../axiosConfig";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import PageviewIcon from "@mui/icons-material/Pageview";
import TableContainer from "@mui/material/TableContainer";
import ModalComponent from "../../components/ModalComponent";

const UserPatientList = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [patient, setPatient] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cookies, removeCookie] = useCookies(["userToken"]);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    Api.get("/user/get/patient", {
      headers: {
        Authorization: `Bearer ${cookies.userToken}`,
      },
    })
      .then((res) => {
        setPatient(res.data.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          navigate("/NotAuthorized");
          removeCookie("userToken");
        }
      });
  }, [cookies, navigate, removeCookie]);

  // Function
  const find_patient = (data) => {
    setLoading(true);
    setTimeout(() => {
      Api.post("/user/get/patient", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.userToken}`,
        },
      })
        .then((res) => {
          setPatient(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          if (err && err.response.status === 400) {
            setLoading(false);
            setMessage(err.response.data.msg);
            setShow(true);
          } else if (err && err.response.status === 500) {
            setLoading(false);
          }
        });
    }, 1000);
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
                <Link to={"/"}>Dashboard /</Link>
              </span>
              <span> Patient List</span>
            </p>
          </div>

          <div>
            <div className="bg-white p-16 rounded-2xl">
              <form onSubmit={handleSubmit(find_patient)}>
                {/* Filter Input */}
                <div className="grid md:grid-cols-6 md:gap-6 sm:grid-cols-1 sm:gap-6">
                  <input
                    {...register("patient", { required: true })}
                    type="text"
                    placeholder="Patient's Name"
                    className="col-span-2 shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800  focus:shadow-outline"
                  />
                  <select
                    {...register("class", { required: true })}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800 focus:outline-offset-5 focus:shadow-outline"
                  >
                    <option value="">Diagnosed Result :</option>
                    <option value="Negative">Lung Cancer - Negative</option>
                    <option value="Positive">Lung Cancer - Positive</option>
                  </select>

                  {loading ? (
                    <button
                      className="py-2 px-4 bg-blue-800 hover:bg-blue-600 text-white font-bold  rounded"
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
                      value="Find"
                      type="submit"
                      className="py-2 px-4 bg-slate-200 hover:bg-blue-400 text-blue-500 hover:text-white font-bold  rounded"
                    />
                  )}
                </div>
              </form>

              {/* Table Patient */}
              <div>
                <div className="mt-20">
                  <TableContainer className="rounded-xl">
                    <Table sx={{ minWidth: 650 }}>
                      <TableHead className="bg-gray-100">
                        <TableRow>
                          <TableCell>Full Name</TableCell>
                          <TableCell align="center">Gender</TableCell>
                          <TableCell align="center">Phone Number</TableCell>
                          <TableCell align="center">Address 1</TableCell>
                          <TableCell align="center">Address 2</TableCell>
                          <TableCell align="center">Postcode</TableCell>
                          <TableCell align="center">Early Detection</TableCell>
                          <TableCell align="center">
                            Image Classifcation
                          </TableCell>
                          <TableCell align="center">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {patient.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <span
                                className={`${
                                  row.image_class === "Negative"
                                    ? "bg-green-600"
                                    : "bg-red-500"
                                } mr-2 rounded-full px-2`}
                              />
                              {row.patient_name.toUpperCase()}
                            </TableCell>
                            <TableCell align="center">
                              {row.patient_gender}
                            </TableCell>
                            <TableCell align="center">
                              {row.patient_phone_number}
                            </TableCell>
                            <TableCell align="center">
                              {row.patient_address1.toUpperCase()}
                            </TableCell>
                            <TableCell align="center">
                              {row.patient_address2.toUpperCase()}
                            </TableCell>
                            <TableCell align="center">
                              {row.patient_postcode}
                            </TableCell>
                            <TableCell align="center">
                              <div
                                className={`${
                                  row.lung_cancer == 0
                                    ? "text-green-600 font-bold"
                                    : "text-red-600 font-bold"
                                }`}
                              >
                                {row.lung_cancer === 0
                                  ? "Negative"
                                  : "Positive"}
                              </div>
                            </TableCell>
                            <TableCell align="center">
                              <div
                                className={`${
                                  row.image_class == "Negative"
                                    ? "text-green-600 font-bold"
                                    : "text-red-600 font-bold"
                                }`}
                              >
                                {row.image_class}
                              </div>
                            </TableCell>
                            <TableCell align="center">
                              <Link to={`/view/patient/${row.patient_id}`}>
                                <PageviewIcon className="text-blue-800" />
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPatientList;
