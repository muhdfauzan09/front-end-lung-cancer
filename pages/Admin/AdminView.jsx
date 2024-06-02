import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom";

import Api from "../../axiosConfig";
import useState from "react-usestateref";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import LineVisualisation from "../../components/LineVisualisation";

// Icons
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";

const AdminView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [doctor, setDoctor] = useState({});
  const [department, setDepartment] = useState({});
  const [cookies, removeCookie] = useCookies(["adminToken"]);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const [findVisualisation, setFindVisualisation, refFindVisualisation] =
    useState({
      findMonths: [],
      patientList: [],
      findPatientCount: [],
    });
  const [dataVisualisation, setDataVisualisation, refDataVisualisation] =
    useState({
      months: [],
      positive_patient_count: [],
      negative_patient_count: [],
    });

  useEffect(() => {
    const fetchData = async () => {
      Api.get(`/admin/view/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.adminToken}`,
        },
      })
        .then((res) => {
          setDoctor(res.data.user);
          setDepartment(res.data.department[0]);
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            navigate("*");
          }
        });
    };

    // Functions
    const getDatavisualisation = () => {
      Api.get("/admin/filter/visualizations/" + id, {
        headers: {
          Authorization: `Bearer ${cookies.adminToken}`,
        },
      }).then((res) => {
        const data = res.data.patient_count_by_month;
        const months = data.map((item) => item.month);
        const positiveCounts = data.map((item) => item.positive);
        const negativeCounts = data.map((item) => item.negative);
        setDataVisualisation({
          months: months,
          positive_patient_count: positiveCounts,
          negative_patient_count: negativeCounts,
        });
      });
    };

    fetchData();
    getDatavisualisation();
  }, [id, navigate, cookies.adminToken]);

  // Function
  const filterDataVisualisation = (data) => {
    Api.post("/admin/filter/visualizations/" + id, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.adminToken}`,
      },
    }).then((res) => {
      setFindVisualisation({
        findMonths: res.data.month,
        findPatientCount: res.data.patient_count,
        patientList: res.data.patient_list,
      });
    });
  };

  return (
    <>
      <div className="flex">
        <div className="sm:p-14 sm:pl-28 md:px-20 md:pl-40 w-screen">
          <div>
            <p className="font-semibold text-xl mb-14">
              <span className="text-blue-500">Dashboard /</span>
              <span> Department Detail </span>
            </p>
          </div>

          <div className="grid grid-cols-6 gap-12">
            <div className="col-span-4 grid grid-cols-7 p-10 bg-white rounded-2xl">
              <div className="col-span-2 border-r-4">
                {doctor.user_profile_image ? (
                  <img
                    src={`http://127.0.0.1:5000/${doctor.user_profile_image}`}
                    alt="patient image"
                    className="rounded-full w-40 mb-10"
                  />
                ) : (
                  <AccountCircleIcon
                    className="text-gray-300"
                    style={{ fontSize: "150px", marginBottom: "2px" }}
                  />
                )}

                <div>
                  <p className="font-bold">Doctor's Name :</p>
                  <div>
                    {doctor.user_first_name} {doctor.user_last_name}
                  </div>
                </div>

                <div>
                  <p className="font-bold mt-3"> Phone Number :</p>
                  <div> {doctor.user_phone_number}</div>
                </div>

                <div>
                  <p className="font-bold mt-3"> Email :</p>
                  <div>{doctor.user_email}</div>
                </div>

                <div>
                  <p className="font-bold mt-3"> Status :</p>
                  <div className="font-bold text-green-700">Approved</div>
                </div>
              </div>

              <div className="grid grid-cols-2 col-span-5 p-8 gap-4">
                <div>
                  <p className="font-bold">Department Name :</p>
                  <input
                    disabled
                    type="text"
                    value={department.department_name}
                    className="mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                  />
                </div>

                <div>
                  <p className="font-bold">Department Name :</p>
                  <input
                    disabled
                    type="text"
                    value={department.department_name}
                    className="mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                  />
                </div>

                <div>
                  <p className="font-bold">Department Type :</p>
                  <input
                    disabled
                    type="text"
                    value={
                      department.department_id === 1 ? "Clinic" : "Hospital"
                    }
                    className="mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                  />
                </div>

                <div>
                  <p className="font-bold">Department (Address) :</p>
                  <input
                    disabled
                    type="text"
                    value={department.department_address}
                    className="mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                  />
                </div>

                <div>
                  <p className="font-bold">Department (City) :</p>
                  <input
                    disabled
                    type="text"
                    value={department.city}
                    className="mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                  />
                </div>

                <div>
                  <p className="font-bold">Department (zipCode) :</p>
                  <input
                    disabled
                    type="text"
                    value={department.zipcode}
                    className="mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                  />
                </div>

                <div>
                  <p className="font-bold">Department (State) :</p>
                  <input
                    disabled
                    type="text"
                    value={department.state}
                    className="mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-800  focus:shadow-outline"
                  />
                </div>
              </div>
            </div>

            {/* Patient Detail */}
            <div className="col-span-2">
              <div className="p-10 h-full bg-white rounded-2xl">
                <div>
                  <p className="text-md text-gray-500">Total Patient :</p>
                  <p className="text-lg font-bold">40</p>
                </div>
                <div className="mt-2">
                  <p className="text-md text-gray-500">
                    Total Patient (Male) :
                  </p>
                  <p className="text-lg font-bold">20</p>
                </div>
                <div className="mt-2">
                  <p className="text-md text-gray-500">
                    Total Patient (Female) :
                  </p>
                  <p className="text-lg font-bold">20</p>
                </div>
                <div className="mt-2">
                  <p className="text-md text-gray-500">
                    Total Patient (Positive) :
                  </p>
                  <p className="text-lg font-bold">20</p>
                </div>
                <div className="mt-2">
                  <p className="text-md text-gray-500">
                    Total Patient (Negative) :
                  </p>
                  <p className="text-lg font-bold">20</p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Visualisation */}
          <div className="mt-20">
            <div className="font-bold mb-1 text-lg">
              <GroupIcon className="text-cyan-300 mr-1" />
              Data Visualisation
            </div>
            <form onSubmit={handleSubmit(filterDataVisualisation)}>
              <div className="bg-white p-14 rounded-2xl">
                <div className="flex justify-evenly mb-12">
                  <select
                    {...register("class", { required: true })}
                    className="shadow border rounded w-1/4 py-3 px-3 text-gray-700 focus:outline-blue-800 focus:shadow-outline"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Lung Cancer
                    </option>
                    <option value="Positive">Positive</option>
                    <option value="Negative">Negative</option>
                  </select>

                  <input
                    placeholder="Start Date"
                    type="month"
                    className="shadow border rounded w-1/4 py-3 px-3 text-gray-700 focus:outline-blue-800 focus:shadow-outline"
                    {...register("startDate", { required: true })}
                  />

                  <input
                    placeholder="End Date"
                    type="month"
                    className="shadow border rounded w-1/4 py-3 px-3 text-gray-700 focus:outline-blue-800 focus:shadow-outline"
                    {...register("endDate", { required: true })}
                  />

                  <input
                    type="submit"
                    value="Filter"
                    className="bg-blue-700 hover:bg-blue-500 py-3 px-10 text-white rounded"
                  />
                </div>

                {refFindVisualisation.current.findMonths.length > 0 ? (
                  <div>
                    {getValues("class") == "Positive" ? (
                      <LineVisualisation
                        label={refFindVisualisation.current.findMonths}
                        graphDataPositive={
                          refFindVisualisation.current.findPatientCount
                        }
                      />
                    ) : (
                      <LineVisualisation
                        label={refFindVisualisation.current.findMonths}
                        graphDataNegative={
                          refFindVisualisation.current.findPatientCount
                        }
                      />
                    )}
                  </div>
                ) : (
                  <LineVisualisation
                    label={refDataVisualisation.current.months}
                    graphDataPositive={
                      refDataVisualisation.current.positive_patient_count
                    }
                    graphDataNegative={
                      refDataVisualisation.current.negative_patient_count
                    }
                  />
                )}

                {/* Table Patient list selepas filter */}
                {refFindVisualisation.current.patientList.length != 0 ? (
                  <div className="mt-20">
                    <TableContainer className="rounded-xl">
                      <Table sx={{ minWidth: 650 }}>
                        <TableHead className="bg-gray-100">
                          <TableRow>
                            <TableCell align="center">Patient Name</TableCell>
                            <TableCell align="center">Patient Gender</TableCell>
                            <TableCell align="center">
                              Patient Phone Number
                            </TableCell>
                            <TableCell align="center">
                              Early Detection
                            </TableCell>
                            <TableCell align="center">Image Class</TableCell>
                            <TableCell align="center">
                              Date Application Image
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {refFindVisualisation.current.patientList.map(
                            (row, index) => (
                              <TableRow key={index}>
                                <TableCell>{row.patient_name}</TableCell>
                                <TableCell align="center">
                                  {row.patient_gender}
                                </TableCell>
                                <TableCell align="center">
                                  {row.patient_phone_number}
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
                                  <div
                                    className={`${
                                      row.image_class === "Negative"
                                        ? "text-green-600 font-bold"
                                        : "text-red-600 font-bold"
                                    }`}
                                  >
                                    {row.image_class}
                                  </div>
                                </TableCell>
                                <TableCell align="center">
                                  {row.image_date_classification}
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminView;
