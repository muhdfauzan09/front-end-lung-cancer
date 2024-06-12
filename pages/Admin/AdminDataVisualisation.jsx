import { useEffect } from "react";
import Api from "../../axiosConfig";
import useState from "react-usestateref";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import LineVisualisation from "../../components/LineVisualisation";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";

const AdminDatavisualisation = () => {
  const [cookies] = useCookies(["adminToken"]);
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
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchVisualisationData = async () => {
      const response = await Api.get("/admin/visualisation", {
        headers: {
          Authorization: `Bearer ${cookies.adminToken}`,
        },
      });
      const data = response.data.patient_count_by_month_list;
      const months = data.map((item) => item.month);
      const positiveCounts = data.map((item) => item.positive);
      const negativeCounts = data.map((item) => item.negative);
      setDataVisualisation({
        months,
        positive_patient_count: positiveCounts,
        negative_patient_count: negativeCounts,
      });
    };
    fetchVisualisationData();
  }, [cookies]);

  const filterDataVisualisation = (data) => {
    Api.post("/admin/visualisation", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.adminToken}`,
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
    <div className="flex">
      <div className="sm:p-10 sm:pl-28 md:p-20 md:pt-16 md:pl-32 w-screen">
        <p className="font-semibold text-xl mb-14">
          <span className="text-blue-500">Dashboard /</span> Data Visualisation
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
                  placeholder="MM/YYYY"
                  type="month"
                  className="shadow border rounded w-1/4 py-3 px-3 text-gray-700 focus:outline-blue-800 focus:shadow-outline"
                  {...register("startDate", { required: true })}
                />

                <input
                  placeholder="MM/YYYY"
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDatavisualisation;
