import Api from "../../axiosConfig";
import Table from "@mui/material/Table";

import { useCookies } from "react-cookie";
import { Spinner } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// Icons
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import PageviewIcon from "@mui/icons-material/Pageview";
import TableContainer from "@mui/material/TableContainer";

const UserPatientList = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState([]);
  const [loading, setLoading] = useState(false);
  const [findPatient, setFindPatient] = useState({
    lung_cancer: "0",
    patient: "",
  });
  const [cookies, removeCookie] = useCookies(["userToken"]);

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
        setLoading(false);
      });
  }, [cookies, navigate, removeCookie]);

  // Function
  const find_patient = () => {
    setLoading(true);
    setTimeout(() => {
      Api.post("/user/get/patient", findPatient, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.userToken}`,
        },
      })
        .then((res) => {
          setPatient(res.data.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }, 1000);
  };

  return (
    <>
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
              <div>
                {/* Input Patient's Name */}
                <div className="grid md:grid-cols-6 md:gap-6 sm:grid-cols-1 sm:gap-6">
                  <input
                    className="col-span-2 shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800  focus:shadow-outline"
                    value={findPatient.patient}
                    type="text"
                    placeholder="Patient's Name"
                    onChange={(e) =>
                      setFindPatient({
                        ...findPatient,
                        patient: e.target.value,
                      })
                    }
                  />
                  <select
                    id="conditions"
                    value={findPatient.lung_cancer}
                    onChange={(e) =>
                      setFindPatient({
                        ...findPatient,
                        lung_cancer: e.target.value,
                      })
                    }
                    className="col-span-1 shadow border w-full text-lg rounded-lg focus:outline-blue-800 p-2.5"
                  >
                    <option value="0">Lung Cancer - Negative</option>
                    <option value="1">Lung Cancer - Positive</option>
                  </select>

                  {loading ? (
                    <button
                      className="bg-blue-800 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
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
                      onClick={find_patient}
                      className="bg-blue-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Find
                    </button>
                  )}
                </div>
              </div>

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
                          <TableCell align="center">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {patient.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <span
                                className={`${
                                  row.lung_cancer === 0
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
                                  row.lung_cancer === 0
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
