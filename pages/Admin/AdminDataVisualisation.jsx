import * as React from "react";
import { useForm } from "react-hook-form";

import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import LineVisualisation from "../../components/LineVisualisation";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";

// Icons
import TableViewIcon from "@mui/icons-material/TableView";

const AdminDatavisualisation = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  // Functions
  const filterDataVisualisation = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex">
        <div className="sm:p-10 sm:pl-28 md:p-20 md:pt-16 md:pl-32 w-screen">
          <p className="font-semibold text-xl mb-14">
            <span className="text-blue-500">Dashboard /</span>
            <span> Data Visualisation</span>
          </p>

          <div className="mb-20">
            <div className="font-bold mb-1 text-lg">
              <BarChartOutlinedIcon className="text-cyan-300" /> Data
              Visualisation
            </div>

            <div className="col-span-3 md:p-14 sm:p-7 bg-white rounded-2xl">
              <form onSubmit={handleSubmit(filterDataVisualisation)}>
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
                    placeholder="MM/DD/YYYY"
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

                <LineVisualisation />
              </form>
            </div>
          </div>

          {/* <div>
            <div className="font-bold mb-1 text-lg">
              <TableViewIcon className="text-cyan-300" /> Data Visualisation
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
          </div> */}
        </div>
      </div>
    </>
  );
};

export default AdminDatavisualisation;
