import Api from "../../axiosConfig";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

// Components and Icons
import Table from "@mui/material/Table";
import useState from "react-usestateref";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import useStore from "../../../front-end/useStore";
import PageviewIcon from "@mui/icons-material/Pageview";
import TableContainer from "@mui/material/TableContainer";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import LineVisualisation from "../../components/LineVisualisation";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [pieChart, setPieChart] = useState([]);
  const [user, setUser, userRef] = useState({});
  const [cookies, removeCookies] = useCookies(["userToken"]);
  const [visualisation, setVisualisation, refVisualisation] = useState({
    months: [],
    positive_patient_count: [],
    negative_patient_count: [],
  });

  useEffect(() => {
    Api.get(`/user/get/dashboard`, {
      headers: {
        Authorization: `Bearer ${cookies.userToken}`,
      },
    })
      .then((res) => {
        const user_detail = res.data;
        const user_list = res.data.patient_list;
        const data = res.data.patient_count_by_month_list;
        const months = data.map((item) => item.month);
        const positiveCounts = data.map((item) => item.positive);
        const negativeCounts = data.map((item) => item.negative);

        setUser(user_detail);
        setUserList(user_list);
        setPieChart([
          user_detail.positive_patient_count,
          user_detail.negative_patient_count,
          user_detail.negative_not_count,
        ]);
        setVisualisation({
          months: months,
          positive_patient_count: positiveCounts,
          negative_patient_count: negativeCounts,
        });
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          removeCookies("userToken");
          navigate("/login");
        }
      });
  }, [cookies, removeCookies, navigate]);

  return (
    <div className="flex">
      <div className="sm:p-14 sm:pl-28 md:p-16 md:pl-36 w-screen">
        <div className="flex justify-end mb-2">
          {userRef.current.user_image_profile == null ? (
            <div className="flex">
              <AccountCircleRoundedIcon className="text-blue-700 mr-3 mt-1" />
              <h1 className="font-bold text-lg">{user.user_email}</h1>
            </div>
          ) : (
            <div className="flex">
              <img
                src={`http://127.0.0.1:5000/${userRef.current.user_image_profile}`}
                alt="patient image"
                className="rounded-full h-10 w-10 mr-5"
              />
              <h1 className="font-bold text-lg mt-2">{user.user_email}</h1>
            </div>
          )}
        </div>

        <div className="mb-14">
          <div className="font-bold mb-1 text-lg">
            <BarChartOutlinedIcon className="text-cyan-300" /> Data Overview
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-5 p-7 text-center bg-white rounded-2xl">
            <div className="border-r-4 border-slate-300">
              <p className="text-teal-600 text-5xl mb-3 font-bold">
                {user.total_patients}
              </p>
              <p className="text-slate-300 text-2xl text-center font-semibold">
                Total
              </p>
            </div>
            <div className="border-r-4 border-slate-300">
              <p className="text-blue-600 text-5xl mb-3 font-bold">
                {user.male_patient_count}
              </p>
              <p className="text-slate-300 text-2xl text-center font-semibold">
                Male
              </p>
            </div>
            <div className="border-r-4 border-slate-300">
              <p className="text-pink-400 text-5xl mb-3 font-bold">
                {user.female_patient_count}
              </p>
              <p className="text-slate-300 text-2xl text-center font-semibold">
                Female
              </p>
            </div>
            <div className="border-r-4 border-slate-300">
              <p className="text-red-600 text-5xl mb-3 font-bold">
                {user.positive_patient_count}
              </p>
              <p className="text-slate-300 text-2xl text-center font-semibold">
                Positive
              </p>
            </div>
            <div>
              <p className="text-green-600 text-5xl mb-3 font-bold">
                {user.negative_patient_count}
              </p>
              <p className="text-slate-300 text-2xl text-center font-semibold">
                Negative
              </p>
            </div>
          </div>
        </div>

        <div className="mb-14">
          <div className="font-bold mb-1 text-lg">
            <BarChartOutlinedIcon className="text-cyan-300" /> Data
            Visualisation
          </div>
          <div className="grid grid-cols-7 gap-10">
            <div className="col-span-7 p-9 bg-white rounded-2xl">
              <LineVisualisation
                label={refVisualisation.current.months}
                graphDataPositive={
                  refVisualisation.current.positive_patient_count
                }
                graphDataNegative={
                  refVisualisation.current.negative_patient_count
                }
              />
            </div>
          </div>
        </div>

        <div>
          <div className="font-bold mb-1 text-lg">
            <LocalHospitalIcon className="text-cyan-300 mr-1" />
            Latest 10 Patients Diagnosed
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
                    <TableCell align="center">Early Detection</TableCell>
                    <TableCell align="center">Image Classication</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userList.map((row) => (
                    <TableRow
                      key={row.patient_id}
                      sx={{ "td,th": { borderBottom: "1", padding: 3 } }}
                    >
                      <TableCell component="th" scope="row">
                        <span
                          className={`${
                            row.image_class === "Negative"
                              ? "bg-green-600"
                              : "bg-red-500"
                          } mr-2 rounded-full px-[3px]`}
                        />
                        {row.patient_name}
                      </TableCell>
                      <TableCell align="center">{row.patient_gender}</TableCell>
                      <TableCell align="center">
                        {row.patient_phone_number}
                      </TableCell>
                      <TableCell align="center">
                        {row.patient_address1}
                      </TableCell>
                      <TableCell align="center">
                        {row.patient_address2}
                      </TableCell>
                      <TableCell align="center">
                        {row.patient_postcode}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ paddingInline: "10px" }}
                      >
                        <div
                          className={`${
                            row.lung_cancer === 0
                              ? "text-green-600 font-bold p-1 bg-green-200 rounded-md"
                              : "text-red-600 font-bold p-1 bg-red-200 rounded-md"
                          }`}
                        >
                          {row.lung_cancer === 0 ? "Negative" : "Positive"}
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <div
                          className={`${
                            row.image_class === "Negative"
                              ? "text-green-600 font-bold p-1 bg-green-200 rounded-md"
                              : "text-red-600 font-bold p-1 bg-red-200 rounded-md"
                          }`}
                        >
                          {row.image_class === "Negative"
                            ? "Negative"
                            : "Positive"}
                        </div>
                      </TableCell>

                      <TableCell align="left">
                        <Link to={`view/patient/${row.patient_id}`}>
                          <PageviewIcon className="text-blue-700 hover:text-blue-400" />{" "}
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
  );
};

export default UserDashboard;
