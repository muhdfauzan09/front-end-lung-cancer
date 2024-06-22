import Api from "../../axiosConfig";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Icons
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import PageviewIcon from "@mui/icons-material/Pageview";
import TableContainer from "@mui/material/TableContainer";
import ModalComponent from "../../components/ModalComponent";

const AdminDepartment = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [cookies, removeCookie] = useCookies(["adminToken"]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  // Functions
  const find_department = (data) => {
    setLoading(true);
    Api.post("/admin/department/list", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.adminToken}`,
      },
    })
      .then((res) => {
        setDepartments(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setModalShow(true);
        setModalMessage(err.response.data.msg);
      });
  };

  return (
    <>
      <ModalComponent
        showModal={modalShow}
        message={modalMessage}
        route={() => {
          setModalShow(false);
        }}
      />
      <div className="flex">
        <div className="sm:p-14 sm:pl-28 md:p-16 md:pl-32 w-screen">
          <div>
            <p className="font-semibold text-xl mb-14">
              <span className="text-blue-500">Dashboard / </span>
              <span>Department</span>
            </p>
          </div>

          <div>
            <div className="bg-white p-16 rounded-2xl">
              {/* Filter Input */}
              <div>
                <form onSubmit={handleSubmit(find_department)}>
                  <div className="grid grid-cols-6 sm:gap-8">
                    <input
                      className="col-span-2 shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800 focus:shadow-outline"
                      type="text"
                      placeholder="Department Name"
                      {...register("departmentName", {
                        required: "Full name is required",
                      })}
                    />
                    <select
                      className="col-span-1 shadow border w-full text-lg rounded-lg focus:outline-blue-800 p-2.5"
                      {...register("department", {
                        required: "Department is required",
                      })}
                    >
                      <option value="" selected>
                        Department:
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
                        type="submit"
                        className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                      >
                        Find
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Table */}
              <div>
                <div className="mt-20">
                  <TableContainer className="rounded-xl">
                    <Table sx={{ minWidth: 650 }}>
                      <TableHead className="bg-gray-100">
                        <TableRow>
                          <TableCell>Department Name</TableCell>
                          <TableCell align="left">Department</TableCell>
                          <TableCell align="left">Address 1</TableCell>
                          <TableCell align="left">City</TableCell>
                          <TableCell align="left">District</TableCell>
                          <TableCell align="left">ZipCode</TableCell>
                          <TableCell align="left">State</TableCell>
                          <TableCell align="left">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {departments.map((item, id) => (
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
                                ? "CLINIC"
                                : "HOSPITAL"}
                            </TableCell>
                            <TableCell align="left">
                              {item.department_address}
                            </TableCell>
                            <TableCell align="left">{item.city}</TableCell>
                            <TableCell align="left">{item.district}</TableCell>
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
