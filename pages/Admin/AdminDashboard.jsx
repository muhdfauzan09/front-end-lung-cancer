import Api from "../../axiosConfig";
import useState from "react-usestateref";
import { useCookies } from "react-cookie";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Icons
import PieVisualisation from "../../components/PieVisualisation";
import LineVisualisation from "../../components/LineVisualisation";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [pieChart, setPieChart] = useState([]);
  const [cookies, removeCookie] = useCookies(["adminToken"]);
  const [visualisation, setVisualisation, refVisualisation] = useState({
    months: [],
    positive_patient_count: [],
    negative_patient_count: [],
  });
  const [user, setUser, refUser] = useState({
    male_patient_count: null,
    female_patient_count: null,
    total_patient_count: null,
    total_positive_count: null,
    total_negative_count: null,
    total_not_count: null,
    total_department: null,
    total_user: null,
  });

  useEffect(() => {
    Api.get("/admin/dashboard", {
      headers: {
        Authorization: `Bearer ${cookies.adminToken}`,
      },
    })
      .then((res) => {
        const patient_count = res.data.total_patient;
        const male_count = res.data.total_male_patient;
        const female_count = res.data.total_female_patient;
        const positive_count = res.data.total_positive_patient;
        const negative_count = res.data.total_negative_patient;
        const not_count = res.data.total_not_patient;
        const department_count = res.data.total_department;
        const doctor_count = res.data.total_user;
        const data = res.data.patient_count_by_month_list;
        const months = data.map((item) => item.month);
        const positiveCounts = data.map((item) => item.positive);
        const negativeCounts = data.map((item) => item.negative);

        setPieChart([positive_count, negative_count, not_count]);
        setVisualisation({
          months: months,
          positive_patient_count: positiveCounts,
          negative_patient_count: negativeCounts,
        });
        setUser({
          total_patient_count: patient_count,
          male_patient_count: male_count,
          female_patient_count: female_count,
          total_positive_count: positive_count,
          total_negative_count: negative_count,
          total_not_count: not_count,
          total_department: department_count,
          total_user: doctor_count,
        });
      })
      .catch((err) => {
        if (err.response.data.status == 401) {
          removeCookie("adminToken");
          navigate("/NotAuthorized");
        }
      });
  }, [cookies, removeCookie]);

  return (
    <>
      <div className="flex">
        <div className="sm:p-14 sm:pl-28 md:px-20 md:pl-40 w-screen">
          {/* Data Overview */}
          <div className="mb-10">
            <div className="font-bold mb-1 text-lg">
              <BarChartOutlinedIcon className="text-cyan-300" /> Data Overview
              (Patient)
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 p-4 text-center bg-white rounded-2xl">
              <div className="border-r-4 border-slate-300">
                <p className="text-green-600 text-5xl mb-3 font-bold ">
                  {user.total_patient_count}
                </p>
                <p className="text-slate-300 text-2xl text-center font-semibold ">
                  Patient
                </p>
              </div>
              <div className="border-r-4 border-slate-300">
                <p className="text-green-600 text-5xl mb-3 font-bold ">
                  {user.male_patient_count}
                </p>
                <p className="text-slate-300 text-2xl text-center font-semibold">
                  Male
                </p>
              </div>
              <div className="">
                <p className="text-green-600 text-5xl mb-3 font-bold ">
                  {user.female_patient_count}
                </p>
                <p className="text-slate-300 text-2xl text-center font-semibold">
                  Female
                </p>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <div className="font-bold mb-1 text-lg">
              <BarChartOutlinedIcon className="text-cyan-300" /> Data Overview
              (Result Diagnosed)
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 p-4 text-center bg-white rounded-2xl">
              <div className="border-r-4 border-slate-300">
                <p className="text-red-600 text-5xl mb-3 font-bold ">
                  {user.total_positive_count}
                </p>
                <p className="text-slate-300 text-2xl text-center font-semibold">
                  Positive
                </p>
              </div>
              <div className="border-r-4 border-slate-300">
                <p className="text-red-600 text-5xl mb-3 font-bold ">
                  {user.total_negative_count}
                </p>
                <p className="text-slate-300 text-2xl text-center font-semibold">
                  Negative
                </p>
              </div>
              <div className="">
                <p className="text-red-600 text-5xl mb-3 font-bold ">
                  {user.total_not_count}
                </p>
                <p className="text-slate-300 text-2xl text-center font-semibold">
                  Not Diagnosed
                </p>
              </div>
            </div>
          </div>

          {/* Data overview Department and doktor */}
          <div className="mb-14">
            <div className="font-bold mb-1 text-lg">
              <BarChartOutlinedIcon className="text-cyan-300" /> Data Overview
              (Department & Doctor)
            </div>
            <div className="grid p-4 sm:grid-cols-1 md:grid-cols-4 bg-white text-center rounded-2xl">
              <div className="border-r-4 border-slate-300">
                <p className="text-blue-600 text-5xl mb-3 font-bold">
                  {user.total_department}
                </p>
                <p className="text-slate-300 text-2xl font-semibold ">
                  Departments
                </p>
              </div>
              <div className="border-r-4 border-slate-300">
                <p className="text-blue-600 text-5xl mb-3 font-bold ">
                  {user.total_user}
                </p>
                <p className="text-slate-300 text-2xl font-semibold">Doctors</p>
              </div>
              <div className="border-r-4 border-slate-300">
                <p className="text-blue-600 text-5xl mb-3 font-bold ">
                  {user.female_patient_count}
                </p>
                <p className="text-slate-300 text-2xl font-semibold">Female</p>
              </div>
              <div className="">
                <p className="text-blue-600 text-5xl mb-3 font-bold ">
                  {user.female_patient_count}
                </p>
                <p className="text-slate-300 text-2xl font-semibold">Female</p>
              </div>
            </div>
          </div>

          {/* Data Visualisatiion */}
          <div className="mb-14">
            <div className="font-bold mb-1 text-lg">
              <BarChartOutlinedIcon className="text-cyan-300" /> Data
              Visualisation
            </div>
            <div className="grid grid-cols-7 gap-10">
              <div className="col-span-5 p-5 bg-white rounded-2xl">
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
              <div className="col-span-2 p-14 bg-white rounded-2xl text-center">
                <PieVisualisation pieData={pieChart} />
                <div className="text-rose-500 font-bold mt-3">
                  Positive : {user.total_positive_count}
                </div>
                <div className="text-sky-600 font-bold">
                  Negative : {user.total_negative_count}
                </div>
                <div className="text-yellow-400 font-bold">
                  Not Diagnose : {user.total_not_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
