import useState from "react-usestateref";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams, Link } from "react-router-dom";

import Api from "../../axiosConfig";
import PageviewIcon from "@mui/icons-material/PageviewRounded";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ModalComponent from "../../components/ModalComponent";

const AdminView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [cookies, removeCookie] = useCookies(["adminToken"]);
  const [doctor, setDoctor] = useState({});
  const [status, setStatus] = useState({});
  const [department, setDepartment] = useState({});
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [patient, setPatient, patientRef] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      Api.get(`/admin/view/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.adminToken}`,
        },
      })
        .then((res) => {
          setPatient(res.data.patient);
          setDoctor(res.data.user);
          setDepartment(res.data.department[0]);
          console.log(patientRef.current);
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            navigate("*");
          }
        });
    };

    fetchData();
  }, [id, navigate]);

  // Functions
  const updateStatus = (update_status) => {
    setStatus({ status: update_status });
    Api.post(`/admin/doctor/update/${id}`, status, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setShow(true);
      setMessage(res.data.message);
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
              <span className="text-blue-500">Dashboard /</span>
              <span> Department Detail </span>
            </p>
          </div>

          <div className="grid grid-cols-4 gap-9">
            <div className="col-span-1 grid grid-rows-2">
              <div className="row-span-1">
                {doctor.user_status == "Pending" ? (
                  <div className="grid grid-flow-col justify-stretch mb-4">
                    <div
                      className="px-14 py-3 text-center font-bold text-white rounded-lg mr-4 bg-green-600 cursor-default"
                      onClick={() => {
                        updateStatus("Aprroved");
                      }}
                    >
                      Approve
                    </div>

                    <div
                      className="px-14 py-3 text-center font-bold text-white rounded-lg bg-red-600 cursor-default"
                      onClick={() => {
                        updateStatus("Rejected");
                      }}
                    >
                      Reject
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div className="font-bold mb-1 text-lg">
                  <PersonIcon className="text-cyan-300 mr-1" />
                  Doctor Detail
                </div>
                <div className="p-10 bg-white rounded-2xl mb-10">
                  <div className="">
                    <p className="text-md text-gray-500">Doctor's Name :</p>
                    <p className="text-lg font-bold">
                      {doctor.user_first_name} {doctor.user_last_name}
                    </p>
                  </div>

                  <div className="mt-2">
                    <p className="text-md text-gray-500">Email :</p>
                    <p className="text-lg font-bold">{doctor.user_email}</p>
                  </div>

                  <div className="mt-2">
                    <p className="text-md text-gray-500">Phone Number :</p>
                    <p className="text-lg font-bold">
                      {doctor.user_phone_number}
                    </p>
                  </div>

                  <div className="mt-2">
                    <p className="text-md text-gray-500">Department Type :</p>
                    <p className="text-lg font-bold">
                      {department.department_id == 1 ? "Clinic" : "Hospital"}
                    </p>
                  </div>

                  <div className="mt-2">
                    <p className="text-md text-gray-500">Department Name :</p>
                    <p className="text-lg font-bold">
                      {department.department_name}
                    </p>
                  </div>
                </div>
              </div>

              <div className="row-span-1">
                <div className="font-bold mb-1 text-lg">
                  <ApartmentOutlinedIcon className="text-cyan-300 mr-1" />
                  Department Detail
                </div>
                <div className="p-10 bg-white rounded-2xl">
                  <div className="">
                    <p className="text-md text-gray-500">Department Name :</p>
                    <p className="text-lg font-bold">
                      {department.department_name}
                    </p>
                  </div>

                  <div className="mt-2">
                    <p className="text-md text-gray-500">Department Type :</p>
                    <p className="text-lg font-bold">
                      {department.department_id == 1 ? "Clinic" : "Hospital"}
                    </p>
                  </div>

                  <div className="mt-2">
                    <p className="text-md text-gray-500">Address :</p>
                    <p className="text-lg font-bold">
                      {department.department_address}
                    </p>
                  </div>

                  <div className="mt-2">
                    <p className="text-md text-gray-500">City :</p>
                    <p className="text-lg font-bold">{department.city}</p>
                  </div>

                  <div className="mt-2">
                    <p className="text-md text-gray-500">ZipCode :</p>
                    <p className="text-lg font-bold">{department.zipcode}</p>
                  </div>

                  <div className="mt-2">
                    <p className="text-md text-gray-500">State :</p>
                    <p className="text-lg font-bold">{department.state}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Patient Lists */}
            <div className="col-span-3">
              <div className="font-bold mb-1 text-lg">
                <GroupIcon className="text-cyan-300 mr-1" />
                Patient List
              </div>
              <div className="bg-white p-14 rounded-2xl">
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
                      {patientRef.current.map((row, index) => (
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
                            <Link to={`/admin/view/patient/${row.patient_id}`}>
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
    </>
  );
};

export default AdminView;
