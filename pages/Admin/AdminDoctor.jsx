import Api from "../../axiosConfig";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";

// Icons
import PageviewIcon from "@mui/icons-material/Pageview";

const AdminDoctor = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cookies, removeCookie] = useCookies(["adminToken"]);
  const [findDoctor, setFindDoctor] = useState({
    doctor: "3",
    doctorName: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await Api.get("/admin/doctor/list", {
          headers: {
            Authorization: `Bearer ${cookies.adminToken}`,
          },
        });
        setDoctors(res.data.data);
      } catch (err) {
        if (err.response && err.response.data.status === 401) {
          removeCookie("adminToken");
          navigate("/NotAuthorized");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cookies.adminToken, removeCookie, navigate]);

  // Function
  const findDoctorHandler = async () => {
    try {
      setLoading(true);
      const res = await Api.post("/admin/doctor/list", findDoctor, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.adminToken}`,
        },
      });
      setDoctors(res.data.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

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
              {/* Find Doctor / Department */}
              <div>
                <div className="grid grid-cols-6 sm:gap-8">
                  <input
                    className="col-span-2 shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800  focus:shadow-outline"
                    placeholder="Doctor's Name"
                    type="text"
                    value={findDoctor.doctorName}
                    onChange={(e) =>
                      setFindDoctor({
                        ...findDoctor,
                        doctorName: e.target.value,
                      })
                    }
                  />
                  <select
                    id="countries"
                    className="col-span-1 shadow border w-full text-lg rounded-lg focus:outline-blue-800 p-2.5"
                    value={findDoctor.doctor}
                    onChange={(e) =>
                      setFindDoctor({
                        ...findDoctor,
                        doctor: e.target.value,
                      })
                    }
                  >
                    <option disabled value="3">
                      Department :
                    </option>
                    <option value="1">Clinic</option>
                    <option value="2">Hospital</option>
                  </select>

                  {loading ? (
                    <button
                      className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
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
                      onClick={findDoctorHandler}
                      className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                    >
                      Find
                    </button>
                  )}
                </div>
              </div>

              {/* Table */}
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
                              "td,th": {
                                borderBottom: "1px solid #ddd",
                                padding: 3,
                              },
                            }}
                          >
                            <TableCell align="left">
                              <div className="flex">
                                <img
                                  src={`http://127.0.0.1:5000/${item.user_profile_image}`}
                                  style={{
                                    height: "50px",
                                    borderRadius: "100%",
                                    marginRight: "1rem",
                                  }}
                                />
                                <div className="mt-3">
                                  {item.user_first_name} {item.user_last_name}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell align="left">
                              {item.department_name}
                            </TableCell>
                            <TableCell align="left">
                              {item.department_id === 1 ? "CLINIC" : "HOSPITAL"}
                            </TableCell>
                            <TableCell align="left">
                              {item.user_email}
                            </TableCell>
                            <TableCell align="left">
                              {item.user_phone_number}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                fontWeight: "bold",
                                color:
                                  item.user_status === "Pending"
                                    ? "blue"
                                    : item.user_status === "Approved"
                                    ? "green"
                                    : item.user_status === "Rejected"
                                    ? "red"
                                    : "inherit",
                              }}
                            >
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
