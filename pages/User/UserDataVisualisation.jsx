import Api from "../../axiosConfig";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// icons
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableViewIcon from "@mui/icons-material/TableView";
import LineVisualisation from "../../components/LineVisualisation";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";

const rows = [
  { name: "Food1", calories: 200, fat: 10, carbs: 20, protein: 15 },
  { name: "Food2", calories: 300, fat: 15, carbs: 25, protein: 18 },
  { name: "Food3", calories: 150, fat: 8, carbs: 15, protein: 12 },
  { name: "Food4", calories: 250, fat: 12, carbs: 22, protein: 17 },
  { name: "Food5", calories: 180, fat: 9, carbs: 18, protein: 14 },
  { name: "Food6", calories: 320, fat: 20, carbs: 30, protein: 25 },
  { name: "Food7", calories: 280, fat: 18, carbs: 28, protein: 20 },
  { name: "Food8", calories: 200, fat: 12, carbs: 24, protein: 16 },
  { name: "Food9", calories: 150, fat: 8, carbs: 12, protein: 10 },
  { name: "Food10", calories: 350, fat: 25, carbs: 35, protein: 30 },
];

const UserDataVisualisation = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["userToken"]); // Cookies

  // get Api
  useEffect(() => {
    Api.get("/user/get/visualisation", {
      headers: {
        Authorization: `Bearer ${cookies.userToken}`,
      },
    }).catch((err) => {
      if (err && err.response.status == 401) {
        removeCookie("userToken");
        navigate("/NotAuthorized");
      }
    });
  }, [cookies, removeCookie]);

  return (
    <>
      <div className="flex">
        <div className="sm:p-14 sm:pl-28 md:p-16 md:pl-32 w-screen">
          {/*Data Visualisation */}
          <p className="font-semibold text-xl mb-14">
            <span className="text-blue-500">
              <Link to={"/"}>Dashboard /</Link>
            </span>
            <span> Data Visualisation</span>
          </p>

          {/* Line Chart */}
          <div className="mb-20">
            <div className="font-bold mb-1 text-lg">
              <BarChartOutlinedIcon className="text-cyan-300" /> Data
              Visualisation
            </div>
            <div className="col-span-3 md:p-14 sm:p-7 bg-white rounded-2xl">
              <LineVisualisation />
            </div>
          </div>

          {/* List of patient */}
          <div>
            <div className="font-bold mb-1 text-lg">
              <TableViewIcon className="text-cyan-300" /> Patient List
            </div>
            <div className="col-span-3 p-7 bg-white rounded-2xl">
              <TableContainer className="rounded-xl">
                <Table sx={{ minWidth: 650 }}>
                  <TableHead className="bg-gray-100">
                    <TableRow>
                      <TableCell>Dessert (100g serving)</TableCell>
                      <TableCell align="right">Calories</TableCell>
                      <TableCell align="right">Fat&nbsp;(g)</TableCell>
                      <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                      <TableCell align="right">Protein&nbsp;(g)</TableCell>
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
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
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

export default UserDataVisualisation;
