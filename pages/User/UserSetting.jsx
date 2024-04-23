import Api from "../../axiosConfig";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";

// Icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";

const UserSetting = () => {
  const [user, setUser] = useState({});
  const [department, setDepartment] = useState({});
  const [cookies, removeCookie] = useCookies(["userToken"]);

  useEffect(() => {
    Api.get("/user/get/setting", {
      headers: {
        Authorization: `Bearer ${cookies.userToken}`,
      },
    }).then((res) => {
      console.log(res.data);
      setUser(res.data.user_detail);
      setDepartment(res.data.department_detail);
    });
  }, []);

  return (
    <div className="flex">
      <div className="sm:p-14 sm:pl-28 md:p-16 md:pl-36 w-screen">
        <div>
          <p className="font-semibold text-xl mb-14">
            <span className="text-blue-500">Dashboard /</span>
            <span> Setting</span>
          </p>
        </div>

        <div className="grid grid-cols-3 gap-14">
          {/* User Info */}
          <div className="col-span-1">
            <div className="font-bold mb-1 text-lg">
              <AccountCircleIcon className="text-cyan-300" /> User Info
            </div>
            <div className="bg-white p-16 pt-8 rounded-2xl">
              <div className="text-center">
                <AccountCircleIcon
                  className="text-blue-700"
                  style={{ fontSize: "150px" }}
                />
              </div>

              {/* Input */}
              <div className="col-span-1 py-2">
                <p className="font-bold mb-2">First Name</p>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800 focus:shadow-outline"
                  value={user.user_first_name}
                  type="text"
                  disabled
                />
              </div>

              <div className="col-span-1 py-2">
                <p className="font-bold mb-2">Last Name</p>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800 focus:shadow-outline"
                  value={user.user_last_name}
                  type="text"
                  disabled
                />
              </div>

              <div className="col-span-1 py-2">
                <p className="font-bold mb-2">Email</p>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800 focus:shadow-outline"
                  value={user.user_email}
                  type="text"
                  disabled
                />
              </div>

              <div className="col-span-1 py-2">
                <p className="font-bold mb-2">Phone Number</p>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800 focus:shadow-outline"
                  value={user.user_phone_number}
                  type="text"
                  disabled
                />
              </div>

              <div className="col-span-1 py-2">
                <p className="font-bold mb-2">Status</p>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800 focus:shadow-outline"
                  value={user.user_status}
                  type="text"
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Department Detail */}
          <div className="col-span-2">
            <div>
              <div className="font-bold mb-1 text-lg">
                <ApartmentRoundedIcon className="text-cyan-300" /> Department
                Detail
              </div>
              <div className="bg-white p-16 pt-8 rounded-2xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="py-2">
                    <p className="font-bold mb-2">Department Type</p>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800 focus:shadow-outline"
                      type="text"
                      value={
                        department.department_type_id == 1
                          ? "CLINIC"
                          : "HOSPITAL"
                      }
                      disabled
                    />
                  </div>

                  <div className="py-2">
                    <p className="font-bold mb-2">Department Name</p>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800 focus:shadow-outline"
                      value={department.department_name}
                      type="text"
                      disabled
                    />
                  </div>

                  <div className="py-2">
                    <p className="font-bold mb-2">Department Address</p>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800 focus:shadow-outline"
                      value={department.department_address}
                      type="text"
                      disabled
                    />
                  </div>

                  <div className="py-2">
                    <p className="font-bold mb-2">City</p>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800 focus:shadow-outline"
                      value={department.city}
                      type="text"
                      disabled
                    />
                  </div>

                  <div className="py-2">
                    <p className="font-bold mb-2">State</p>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800 focus:shadow-outline"
                      value={department.state}
                      type="text"
                      disabled
                    />
                  </div>

                  <div className="py-2">
                    <p className="font-bold mb-2">ZipCode</p>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800 focus:shadow-outline"
                      value={department.zipCode}
                      type="text"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSetting;
