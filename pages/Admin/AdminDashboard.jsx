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
  const [cookies, removeCookie] = useCookies(["adminToken"]);
  const [user, setUser, refUser] = useState({
    male_patient_count: null,
    female_patient_count: null,
    total_patient_count: null,
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
        setUser({
          total_patient_count: patient_count,
          male_patient_count: male_count,
          female_patient_count: female_count,
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
        <div className="sm:p-14 sm:pl-28 md:p-16 md:pl-32 w-screen">
          {/* Data Overview */}
          <div className="mb-14">
            <div className="font-bold mb-1 text-lg">
              <BarChartOutlinedIcon className="text-cyan-300" /> Data OverView
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-4 gap-10">
              <div className="p-4 text-center bg-white rounded-2xl">
                <p className="text-sky-600 text-5xl mb-3 font-bold ">
                  {user.total_patient_count}
                </p>
                <p className="text-slate-300 text-2xl text-center font-semibold ">
                  Patient
                </p>
              </div>
              <div className="p-4 text-center bg-white rounded-2xl">
                <p className="text-lime-600 text-5xl mb-3 font-bold ">
                  {user.male_patient_count}
                </p>
                <p className="text-slate-300 text-2xl text-center font-semibold">
                  Male
                </p>
              </div>
              <div className="p-4 text-center bg-white rounded-2xl">
                <p className="text-sky-600 text-5xl mb-3 font-bold ">
                  {user.female_patient_count}
                </p>
                <p className="text-slate-300 text-2xl text-center font-semibold">
                  Female
                </p>
              </div>
              <div className="p-4 text-center bg-white rounded-2xl">
                <p className="text-lime-600 text-5xl mb-3 font-bold ">0</p>
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
            <div className="grid grid-cols-7 gap-10">
              <div className="col-span-5 p-14 bg-white rounded-2xl">
                <LineVisualisation />
              </div>
              <div className="col-span-2 p-14 bg-white rounded-2xl">
                <PieVisualisation />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
