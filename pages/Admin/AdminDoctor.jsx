import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Api from "../../axiosConfig";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PageviewIcon from "@mui/icons-material/Pageview";

const AdminDoctor = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [cookies, removeCookie] = useCookies(["adminToken"]);

  useEffect(() => {
    Api.get("/admin/doctor/list", {
      headers: {
        Authorization: `Bearer ${cookies.adminToken}`,
      },
    })
      .then((res) => {
        setDoctors(res.data.data);
      })
      .catch((err) => {
        if (err.response.data.status === 401) {
          removeCookie("adminToken");
          navigate("/NotAuthorized");
        }
      });
  }, [cookies, removeCookie]);

  return (
    <>
      <div className="flex">
        <div className="sm:p-14 sm:pl-28 md:p-16 md:pl-32 w-screen">
          <div>
            <p className="font-semibold text-xl mb-14">
              <span className="text-blue-500">Dashboard / </span>
              <span> Doctor</span>
            </p>
          </div>

          <div>
            <div className="bg-white p-16 rounded-2xl">
              <div>
                {/* Input Patient's Name  */}
                <div className="grid grid-cols-6 sm:gap-8">
                  <input
                    className="col-span-2 shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800  focus:shadow-outline"
                    type="text"
                    placeholder="Doctor's Name"
                  />
                  <select
                    id="countries"
                    className="col-span-1 shadow border w-full text-lg rounded-lg focus:outline-blue-800 p-2.5"
                  >
                    <option value="US">Clinic</option>
                    <option value="CA">Hospital</option>
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
                          <TableCell>Doctor's Name</TableCell>
                          <TableCell align="left">Department Name</TableCell>
                          <TableCell align="left">Department</TableCell>
                          <TableCell align="left">Email</TableCell>
                          <TableCell align="left">Phone Number</TableCell>
                          <TableCell align="left">Status</TableCell>
                          <TableCell align="left">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {doctors.map((item) => (
                          <TableRow
                            key={item.department_id}
                            sx={{
                              "td,th": { borderBottom: "1", padding: 3 },
                            }}
                          >
                            <TableCell align="left">
                              {item.user_first_name} {item.user_last_name}
                            </TableCell>
                            <TableCell align="left">
                              {item.department_name}
                            </TableCell>
                            <TableCell align="left">
                              {item.department_id === 1 ? "Clinic" : "Hospital"}
                            </TableCell>
                            <TableCell align="left">
                              {item.user_email}
                            </TableCell>
                            <TableCell align="left">
                              {item.user_phone_number}
                            </TableCell>
                            <TableCell align="left">
                              {item.user_status}
                            </TableCell>
                            <TableCell align="left">
                              <Link to={`/admin/view/${item.user_id}`}>
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

export default AdminDoctor;
