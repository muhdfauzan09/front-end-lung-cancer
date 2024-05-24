import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";

// Components
import Api from "../../axiosConfig";
import ModalComponent from "../../components/ModalComponent";

// Icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";

const UserSetting = () => {
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState({});
  const [cookies, removeCookie] = useCookies(["userToken"]);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    Api.get("/user/get/setting", {
      headers: { Authorization: `Bearer ${cookies.userToken}` },
    })
      .then((res) => {
        setUser(res.data.user_detail);
        setDepartment(res.data.department_detail);
      })
      .catch((err) => {
        if (err && err.response && err.response.status === 401) {
          removeCookie("userToken");
          navigate("/login");
        }
      });
  }, []);

  // Functions
  const updatePassword = (data) => {
    setLoading(true);
    Api.post("/user/post/new_password", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.userToken}`,
      },
    })
      .then((res) => {
        setLoading(false);
        setMessage(res.data.msg);
        setShow(true);
      })
      .catch((err) => {
        setLoading(false);
        setMessage(err.response.data.msg);
        setShow(true);
      });
  };

  const addUserProfile = (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]); // Apend the selected file

    Api.post("/user/post/add_user_profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${cookies.userToken}`,
      },
    })
      .then(() => window.location.reload(true))
      .catch((err) => {
        if (err.response.status === 400) {
          setShow(true);
          setMessage(err.response.data.msg);
        }
      });
  };

  const editUserProfile = (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]); // Append the selected file

    Api.post("/user/post/edit_user_profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${cookies.userToken}`,
      },
    })
      .then(() => window.location.reload(true))
      .catch((err) => {
        if (err.response.status === 400) {
          setShow(true);
          setMessage(err.response.data.msg);
        }
      });
  };

  return (
    <>
      <ModalComponent
        showModal={show}
        message={message}
        route={() => setShow(false)}
      />
      <div className="flex">
        <div className="sm:p-14 sm:pl-28 md:p-16 md:pl-36 w-screen">
          <div>
            <p className="font-semibold text-xl mb-14">
              <span className="text-blue-500">
                <Link to="/">Dashboard /</Link>
              </span>
              <span> Setting</span>
            </p>
          </div>

          <div className="grid md:grid-cols-3 md:gap-10 sm:grid-cols-1 sm:gap-y-10">
            {/* User Info */}
            <div className="col-span-1">
              <div className="font-bold mb-1 text-lg">
                <AccountCircleIcon className="text-cyan-300" /> User Info
              </div>

              <div className="bg-white p-16 pt-8 rounded-2xl">
                {/* Profile Picture */}
                <div className="text-center">
                  {user.user_profile_image == null ? (
                    <div>
                      <AccountCircleIcon
                        className="text-gray-300"
                        style={{ fontSize: "150px" }}
                      />
                      <div>
                        <input
                          accept="image/*"
                          id="icon-button-file"
                          type="file"
                          style={{ display: "none" }}
                          onChange={addUserProfile}
                        />
                        <label htmlFor="icon-button-file">
                          <div className="bg-blue-700 px-3 py-2 my-2 text-white font-bold rounded-md">
                            Upload Image Profile
                          </div>
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-3 flex justify-center">
                      <div>
                        <img
                          src={`http://127.0.0.1:5000/${user.user_profile_image}`}
                          alt="patient image"
                          className="rounded-full h-56 w-56 mb-3"
                        />
                        <input
                          accept="image/*"
                          id="icon-button-file"
                          type="file"
                          style={{ display: "none" }}
                          onChange={editUserProfile}
                        />
                        <label htmlFor="icon-button-file">
                          <div className="bg-blue-700 px-3 py-2 my-2 text-white font-bold rounded-md">
                            Change Image Profile
                          </div>
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Info Details */}
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

            <div className="col-span-2">
              {/* Department Detail */}
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
                          department.department_type_id === 1
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

              {/* Update Password */}
              <form onSubmit={handleSubmit(updatePassword)}>
                <div className="mt-10">
                  <div className="font-bold mb-1 text-lg">
                    <EnhancedEncryptionIcon className="text-cyan-300" /> Change
                    Password
                  </div>
                  <div className="bg-white p-16 pt-8 rounded-2xl grid grid-cols-2 gap-7">
                    <div>
                      <p className="font-bold mb-2">New Password</p>
                      <input
                        {...register("newPassword", {
                          required: "New Password is required",
                          minLength: 8,
                        })}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800 focus:shadow-outline"
                        type="password"
                      />
                      {errors.newPassword && (
                        <p className="text-red-500 font-bold">
                          {errors.newPassword.message}
                        </p>
                      )}
                      {errors.newPassword &&
                        errors.newPassword.type === "minLength" && (
                          <p className="text-red-500 font-bold">
                            Password is less than 8
                          </p>
                        )}
                    </div>
                    <div>
                      <p className="font-bold mb-2">Confirm Password</p>
                      <input
                        {...register("confirmPassword", {
                          required: "Confirm Password is required",
                          minLength: 8,
                          validate: (value) =>
                            value === getValues("newPassword") ||
                            "Passwords do not match",
                        })}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800 focus:shadow-outline"
                        type="password"
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-500 font-bold">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                      {errors.confirmPassword &&
                        errors.confirmPassword.type === "minLength" && (
                          <p className="text-red-500 font-bold">
                            Password is less than 8
                          </p>
                        )}
                    </div>
                    <div>
                      <p className="font-bold mb-2">Old Password</p>
                      <input
                        {...register("oldPassword", {
                          required: "Old Password is required",
                          minLength: 8,
                        })}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-800 focus:shadow-outline"
                        type="password"
                      />
                      {errors.oldPassword && (
                        <p className="text-red-500 font-bold">
                          {errors.oldPassword.message}
                        </p>
                      )}
                      {errors.oldPassword &&
                        errors.oldPassword.type === "minLength" && (
                          <p className="text-red-500 font-bold">
                            Password is less than 8
                          </p>
                        )}
                    </div>
                    {loading ? (
                      <button
                        className="px-14 py-3 mt-4 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded cursor-pointer"
                        disabled
                      >
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="mr-2"
                        />
                        Loading...
                      </button>
                    ) : (
                      <input
                        type="submit"
                        className="px-14 py-3 mt-4 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded cursor-pointer"
                      />
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSetting;
