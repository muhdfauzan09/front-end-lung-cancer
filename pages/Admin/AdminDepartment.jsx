import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
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

const AdminDepartment = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [cookies, removeCookie] = useCookies(["adminToken"]);
  const [loading, setLoading] = useState(false);
  const [findDepartment, setFindDepartment] = useState({
    department: "1",
    departmentName: "",
  });

  useEffect(() => {
    Api.get("/admin/department/list", {
      headers: {
        Authorization: `Bearer ${cookies.adminToken}`,
      },
    })
      .then((res) => {
        setDepartments(res.data.data);
      })
      .catch((err) => {
        if (err.response.data.status == 401) {
          removeCookie("adminToken");
          navigate("/NotAuthorized");
        }
      });
  }, [cookies, removeCookie]);

  // Function
  const find_department = () => {
    setLoading(true);
    setTimeout(() => {
      Api.post("/admin/department/list", findDepartment, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.adminToken}`,
        },
      }).then((res) => {
        setDepartments(res.data.data);
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
              <span className="text-blue-500">Dashboard / </span>
              <span> Department</span>
            </p>
          </div>

          <div>
            <div className="bg-white p-16 rounded-2xl">
              <div>
                <div className="grid grid-cols-6 sm:gap-8">
                  <input
                    className="col-span-2 shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800  focus:shadow-outline"
                    type="text"
                    value={findDepartment.departmentName}
                    placeholder="Department Name"
                    onChange={(e) =>
                      setFindDepartment({
                        ...findDepartment,
                        departmentName: e.target.value,
                      })
                    }
                  />
                  <select
                    className="col-span-1 shadow border w-full text-lg rounded-lg focus:outline-blue-800 p-2.5"
                    value={findDepartment.department}
                    onChange={(e) =>
                      setFindDepartment({
                        ...findDepartment,
                        department: e.target.value,
                      })
                    }
                  >
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
                      onClick={find_department}
                      className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
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
                          <TableCell>Department Name</TableCell>
                          <TableCell align="left">Department</TableCell>
                          <TableCell align="left">Phone Number</TableCell>
                          <TableCell align="left">Address 1</TableCell>
                          <TableCell align="left">City</TableCell>
                          <TableCell align="left">ZipCode</TableCell>
                          <TableCell align="left">State</TableCell>
                          <TableCell align="left">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {departments.map((item) => (
                          <TableRow
                            key={item.department_id}
                            sx={{
                              "td,th": { borderBottom: "1", padding: 3 },
                            }}
                          >
                            <TableCell align="left">
                              {item.department_name}
                            </TableCell>
                            <TableCell align="left">
                              {item.department_type_id == 1
                                ? "Clinic"
                                : "Hospital"}
                            </TableCell>
                            <TableCell align="left"></TableCell>
                            <TableCell align="left">
                              {item.department_address}
                            </TableCell>
                            <TableCell align="left">{item.city}</TableCell>
                            <TableCell align="left">{item.zipcode}</TableCell>
                            <TableCell align="left">{item.state}</TableCell>
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

export default AdminDepartment;
