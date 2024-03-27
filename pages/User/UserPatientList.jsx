import Api from "../../axiosConfig";
import { useCookies } from "react-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// Icon
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import PageviewIcon from "@mui/icons-material/Pageview";
import TableContainer from "@mui/material/TableContainer";

const UserPatientList = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState([]);
  const [cookies, removeCookie] = useCookies(["userToken"]);

  useEffect(() => {
    Api.get("/user/get/patient", {
      headers: {
        Authorization: `Bearer ${cookies.userToken}`,
      },
    })
      .then((res) => {
        const data = res.data.data;
        setPatient(data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          navigate("/NotAuthorized");
          removeCookie("userToken");
        }
      });
  }, [cookies, removeCookie]);

  return (
    <div className="flex">
      <div className="sm:p-14 sm:pl-28 md:p-16 md:pl-32 w-screen">
        <div>
          <p className="font-semibold text-xl mb-14">
            <span className="text-blue-500">Dashboard /</span>
            <span> Patient List</span>
          </p>
        </div>

        <div>
          <div className="bg-white p-16 rounded-2xl">
            <div>
              {/* Input Patient's Name */}
              <div className="grid grid-cols-6 sm:gap-8">
                <input
                  className="col-span-2 shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800  focus:shadow-outline"
                  type="text"
                  placeholder="Patient's Name"
                />
                <select
                  id="conditions"
                  className="col-span-1 shadow border w-full text-lg rounded-lg focus:outline-blue-800 p-2.5"
                >
                  <option selected value="0">
                    No Cancer
                  </option>
                  <option value="1">Cancer</option>
                </select>
                <div
                  className="text-center p-3  font-bold text-white rounded-lg"
                  style={{ backgroundColor: "#034CA1" }}
                >
                  Find
                </div>
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
                        <TableCell align="center">Lung Cancer</TableCell>
                        <TableCell align="center">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {patient.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <span
                              className={
                                row.lung_cancer == 0
                                  ? "bg-green-600 mr-2 rounded-full px-2"
                                  : "bg-red-500 mr-2 rounded-full px-2"
                              }
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
                              className={
                                row.lung_cancer == 0
                                  ? "text-green-600 font-bold"
                                  : "text-red-600 font-bold"
                              }
                            >
                              {row.lung_cancer == 0 ? "Negative" : "Positive"}
                            </div>
                          </TableCell>
                          <TableCell align="center">
                            <Link to={`/view/patient/${row.patient_id}`}>
                              <PageviewIcon className="text-blue-900" />
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
  );
};

export default UserPatientList;