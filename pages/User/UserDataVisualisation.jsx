import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

// Components
import Api from "../../axiosConfig";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "@mui/material/Table";
import useState from "react-usestateref";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import BarChart from "../../components/BarChart";
import TableContainer from "@mui/material/TableContainer";
import ModalComponent from "../../components/ModalComponent";
import LineVisualisation from "../../components/LineVisualisation";

// Icons
import PageviewIcon from "@mui/icons-material/Pageview";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";

const UserDataVisualisation = () => {
  const navigate = useNavigate();
  const [key, setKey] = useState("line");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [cookies, removeCookie] = useCookies(["userToken"]);
  const [barChart, setBarChart, refBarChart] = useState({});
  const [dataVisualisation, setDataVisualisation, refDataVisualisation] =
    useState({
      months: [],
      positive_patient_count: [],
      negative_patient_count: [],
    });
  const [findVisualisation, setFindVisualisation, refFindVisualisation] =
    useState({
      findMonths: [],
      patientList: [],
      findPatientCount: [],
    });
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Line Visualisation
    const lineVisualisation = () => {
      Api.get("/user/get/line/visualisation", {
        headers: {
          Authorization: `Bearer ${cookies.userToken}`,
        },
      })
        .then((res) => {
          const data = res.data.patient_count_by_month;
          const months = data.map((item) => item.month);
          const positiveCounts = data.map((item) => item.positive);
          const negativeCounts = data.map((item) => item.negative);
          setDataVisualisation({
            months: months,
            positive_patient_count: positiveCounts,
            negative_patient_count: negativeCounts,
          });
        })
        .catch((err) => {
          if (err && err.response.status === 401) {
            removeCookie("userToken");
            navigate("/NotAuthorized");
          }
        });
    };

    // Bar Visualisation
    const barVisualisation = () => {
      Api.get("/user/get/bar/visualisaton", {
        headers: {
          Authorization: `Bearer ${cookies.userToken}`,
        },
      })
        .then((res) => {
          const result = res.data.result;
          setBarChart(result);
        })
        .catch((err) => {
          if (err && err.response.status === 401) {
            removeCookie("userToken");
            navigate("/NotAuthorized");
          }
        });
    };

    lineVisualisation();
    barVisualisation();
  }, [cookies, removeCookie]);

  // Function
  const filterLineVisualisation = (data) => {
    Api.post("/user/get/line/visualisation", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.userToken}`,
      },
    })
      .then((res) => {
        setFindVisualisation({
          findMonths: res.data.month,
          patientList: res.data.patient_list,
          findPatientCount: res.data.patient_count,
        });
      })
      .catch((err) => {
        if (err && err.response.status === 400) {
          setMessage(err.response.data.msg);
          setShow(true);
        }
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
          <p className="font-semibold text-xl mb-14">
            <span className="text-blue-500">
              <Link to={"/"}>Dashboard /</Link>
            </span>
            <span> Data Visualisation</span>
          </p>

          <div className="mb-20">
            <div className="font-bold mb-1 text-lg">
              <BarChartOutlinedIcon className="text-cyan-300" /> Data
              Visualisation
            </div>

            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
            >
              {/* Line Visualisation */}
              <Tab eventKey="line" title="Line Visualisation">
                <div className="col-span-3 md:p-14 sm:p-7 bg-white rounded-b-2xl rounded-tr-2xl">
                  <form onSubmit={handleSubmit(filterLineVisualisation)}>
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
                  </form>

                  <div>
                    {refFindVisualisation.current.findMonths.length > 0 ? (
                      <div>
                        {getValues("class") === "Positive" ? (
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
                  </div>
                </div>

                {refFindVisualisation.current.patientList.length !== 0 && (
                  <div className="bg-white p-10 rounded-2xl mt-6">
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
                            <TableCell align="center">Action</TableCell>
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
                                <TableCell align="center">
                                  <Link to={`/view/patient/${row.patient_id}`}>
                                    <PageviewIcon className="text-blue-800" />
                                  </Link>
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                )}
              </Tab>

              {/* Bar Visualisation */}
              <Tab eventKey="bar" title="Bar Chart">
                <div className="col-span-3 md:p-14 sm:p-7 bg-white rounded-b-2xl rounded-tr-2xl">
                  <BarChart result={refBarChart.current} />
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDataVisualisation;
