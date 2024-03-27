import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../../axiosConfig";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PageviewOutlinedIcon from "@mui/icons-material/PageviewOutlined";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import LineVisualisation from "../../components/LineVisualisation";
import PieVisualisation from "../../components/PieVisualisation";

const rows = [
  {
    name: "John Doe",
    phoneNumber: "555-1234",
    gender: "Male",
    result: "Positive",
  },
  {
    name: "Jane Smith",
    phoneNumber: "555-5678",
    gender: "Female",
    result: "Negative",
  },
  {
    name: "Alex Johnson",
    phoneNumber: "555-9012",
    gender: "Male",
    result: "Positive",
  },
  {
    name: "Emily Davis",
    phoneNumber: "555-3456",
    gender: "Female",
    result: "Negative",
  },
  {
    name: "Michael Brown",
    phoneNumber: "555-7890",
    gender: "Male",
    result: "Positive",
  },
  {
    name: "Sophia Miller",
    phoneNumber: "555-2345",
    gender: "Female",
    result: "Negative",
  },
  {
    name: "William Wilson",
    phoneNumber: "555-6789",
    gender: "Male",
    result: "Positive",
  },
  {
    name: "Olivia Taylor",
    phoneNumber: "555-0123",
    gender: "Female",
    result: "Negative",
  },
  {
    name: "Liam Anderson",
    phoneNumber: "555-3456",
    gender: "Male",
    result: "Positive",
  },
  {
    name: "Ava White",
    phoneNumber: "555-7890",
    gender: "Female",
    result: "Negative",
  },
];

const UserDashboard = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["userToken"]);
  const [user, setUser] = useState({});

  useEffect(() => {
    Api.get(`/user/dashboard`, {
      headers: {
        Authorization: `Bearer ${cookies.userToken}`,
      },
    })
      .then((response) => {
        const user_detail = response.data.data;
        setUser(user_detail);
      })
      .catch((err) => {
        if (err && err.response && err.response.status === 401) {
          removeCookie("userToken");
          navigate("/login");
        }
      });
  }, [cookies, removeCookie]);

  return (
    <>
      <div className="flex">
        <div className="sm:p-14 sm:pl-28 md:p-16 md:pl-32 w-screen">
          {/* Data Overview */}
          <div className="flex justify-end mb-2">
            <AccountCircleRoundedIcon className="text-blue-700 mr-3 mt-1" />
            <h1 className="font-bold text-lg">{user.user_email}</h1>
          </div>
          <div className="mb-14">
            <div className="font-bold mb-1 text-lg">
              <BarChartOutlinedIcon className="text-cyan-300" /> Data Overview
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-4 gap-10">
              <div className="p-4 text-center bg-white rounded-2xl">
                <p className="text-sky-600 text-5xl mb-3 font-bold ">135</p>
                <p className="text-slate-300 text-2xl text-center font-semibold ">
                  Patient
                </p>
              </div>
              <div className="p-4 text-center bg-white rounded-2xl">
                <p className="text-lime-600 text-5xl mb-3 font-bold ">581</p>
                <p className="text-slate-300 text-2xl text-center font-semibold">
                  Male
                </p>
              </div>
              <div className="p-4 text-center bg-white rounded-2xl">
                <p className="text-sky-600 text-5xl mb-3 font-bold ">201</p>
                <p className="text-slate-300 text-2xl text-center font-semibold">
                  Female
                </p>
              </div>
              <div className="p-4 text-center bg-white rounded-2xl">
                <p className="text-lime-600 text-5xl mb-3 font-bold ">187</p>
                <p className="text-slate-300 text-2xl text-center font-semibold">
                  High
                </p>
              </div>
            </div>
          </div>
          {/* Data Visualisatiion */}
          <div className="mb-14">
            <div className="font-bold mb-1 text-lg">
              <BarChartOutlinedIcon className="text-cyan-300" /> Data
              Visualisation
            </div>
            <div className="grid grid-cols-5 gap-10">
              <div className="col-span-3 p-14 bg-white rounded-2xl">
                <LineVisualisation />
              </div>
              <div className="col-span-2 p-14 bg-white rounded-2xl">
                <PieVisualisation />
              </div>
            </div>
          </div>
          {/* Table latest diagnose */}
          <div>
            <div className="font-bold mb-1 text-lg">
              <LocalHospitalIcon className="text-cyan-300 mr-1" />
              Department Detail
            </div>
            <div className="bg-white p-14 rounded-2xl">
              <TableContainer className="rounded-xl">
                <Table sx={{ minWidth: 650 }}>
                  <TableHead className="bg-gray-100">
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="left">Phone Number</TableCell>
                      <TableCell align="left">Gender</TableCell>
                      <TableCell align="left">Result</TableCell>
                      <TableCell align="left">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "td,th": { borderBottom: "1", padding: 3 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="left">{row.phoneNumber}</TableCell>
                        <TableCell align="left">{row.gender}</TableCell>
                        <TableCell
                          align="left"
                          style={{
                            color:
                              row.result === "Positive"
                                ? "rgb(255,0,0)"
                                : "rgb(50,205,50)",
                          }}
                        >
                          {row.result}
                        </TableCell>
                        <TableCell align="left">
                          <PageviewOutlinedIcon className="text-blue-800" />
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
    </>
  );
};

export default UserDashboard;
