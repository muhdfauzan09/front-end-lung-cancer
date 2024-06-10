import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import PageviewIcon from "@mui/icons-material/Pageview";

const Test = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const currentRows = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="mt-16">
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
                <TableCell align="center">Image Classification</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <span
                      className={`${
                        row.image_class === "Negative"
                          ? "bg-green-600"
                          : "bg-red-500"
                      } mr-2 rounded-full px-2`}
                    />
                    {row.patient_name.toUpperCase()}
                  </TableCell>
                  <TableCell align="center">{row.patient_gender}</TableCell>
                  <TableCell align="center">
                    {row.patient_phone_number}
                  </TableCell>
                  <TableCell align="center">
                    {row.patient_address1.toUpperCase()}
                  </TableCell>
                  <TableCell align="center">{row.patient_address2}</TableCell>
                  <TableCell align="center">{row.patient_postcode}</TableCell>
                  <TableCell align="center">
                    <div
                      className={`${
                        row.lung_cancer === 0
                          ? "text-green-600 font-bold"
                          : "text-red-600 font-bold"
                      }`}
                    >
                      {row.lung_cancer === 0 ? "Negative" : "Positive"}
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
                    <Link to={`/view/patient/${row.patient_id}`}>
                      <PageviewIcon className="text-blue-800" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex justify-end mt-4">
          <span className="mt-3 font-semibold">
            Page {currentPage} of {totalPages}, {data.length} Patients
          </span>
          <div
            className={`px-3 py-2 my-2 ml-4 ${
              currentPage === 1 ? "bg-blue-200" : "bg-blue-700 "
            } text-white  font-bold rounded-md cursor-pointer ${
              currentPage === 1 ? "cursor-not-allowed" : ""
            }`}
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Previous
          </div>

          <div
            className={`px-3 py-2 my-2 ml-4 ${
              currentPage === totalPages ? "bg-blue-200" : "bg-blue-700 "
            } text-white  font-bold rounded-md cursor-pointer ${
              currentPage === totalPages ? "cursor-not-allowed" : ""
            }`}
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
