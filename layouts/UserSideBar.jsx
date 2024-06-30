import Api from "../../front-end/axiosConfig";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

// Icons and components
import MenuIcon from "@mui/icons-material/Menu";
import GroupsIcon from "@mui/icons-material/Groups";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import SettingsIcon from "@mui/icons-material/Settings";
import ModalComponent2 from "../components/ModalComponent2";
import lung_cancer from "../src/assets/lung_cancer_logo.png";
import LogoutRounded from "@mui/icons-material/LogoutRounded";
import GridViewRounded from "@mui/icons-material/GridViewRounded";
import BarChartRounded from "@mui/icons-material/BarChartRounded";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

const UserSideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState({
    name: "",
    imageUrl: "",
  });
  const [show, setShow] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);

  useEffect(() => {
    Api.get("/user/sidebar/get-info", {
      headers: {
        Authorization: "Bearer " + cookies["userToken"],
      },
    }).then((res) => {
      // Capitalize the name
      const capitalizedName = res.data.data.user_first_name
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      setData({
        name: capitalizedName,
        imageUrl: res.data.data.user_profile_image,
      });
    });
  }, []);

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const isActiveRoute = (path) => location.pathname === path;

  return (
    <>
      <ModalComponent2
        showModal={show}
        message="Are you sure you want to logout?"
        route={() => {
          removeCookie("userToken");
          navigate("/login");
          setShow(false);
          window.location.reload();
        }}
        cancel={() => {
          setShow(false);
        }}
      />

      <Sidebar
        collapsed={collapsed}
        backgroundColor="#1f40af"
        width="380px"
        style={{
          position: "fixed",
          top: "0",
          bottom: "0",
        }}
      >
        <Menu
          className={collapsed ? "mt-10" : "px-4 py-6 mt-10"}
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              const activeStyle = {
                color: "black",
                backgroundColor: "white",
                borderRadius: "10px",
                "&:hover": {
                  color: "black !important",
                  backgroundColor: "white !important",
                },
              };

              return level === 0
                ? {
                    fontWeight: "bold",
                    fontSize: "larger",
                    paddingBlock: "42px",
                    ...(active
                      ? activeStyle
                      : {
                          color: "white",
                          "&:hover": {
                            color: "black !important",
                            backgroundColor: "white !important",
                            borderRadius: "10px !important",
                          },
                        }),
                  }
                : {};
            },
          }}
        >
          {collapsed ? (
            <MenuItem
              icon={<MenuIcon />}
              onClick={handleToggleCollapse}
              className="mt-10"
            />
          ) : (
            <MenuItem suffix={<MenuOpenIcon />} onClick={handleToggleCollapse}>
              <div className="flex">
                <img src={lung_cancer} style={{ height: "40px" }} />
                <div className="mt-1">Pneumocast.</div>
              </div>
            </MenuItem>
          )}

          <MenuItem
            icon={<GridViewRounded />}
            component={<Link to="/" />}
            onClick={() => setCollapsed(true)}
            active={isActiveRoute("/")}
          >
            Dashboard
          </MenuItem>

          <MenuItem
            icon={<BarChartRounded />}
            component={<Link to="/visualisation" />}
            onClick={() => setCollapsed(true)}
            active={isActiveRoute("/visualisation")}
          >
            Data Visualisation
          </MenuItem>

          <MenuItem
            icon={<PsychologyOutlinedIcon />}
            component={<Link to="/prediction" />}
            onClick={() => setCollapsed(true)}
            active={isActiveRoute("/prediction")}
          >
            Prediction
          </MenuItem>

          <MenuItem
            icon={<GroupsIcon />}
            component={<Link to="/patient" />}
            onClick={() => setCollapsed(true)}
            active={isActiveRoute("/patient")}
          >
            Patient
          </MenuItem>

          <MenuItem
            icon={<SettingsIcon />}
            component={<Link to="/setting" />}
            onClick={() => setCollapsed(true)}
            active={isActiveRoute("/setting")}
          >
            Account Setting
          </MenuItem>

          <div style={{ marginTop: "320px" }}>
            {collapsed ? (
              <MenuItem
                icon={<LogoutRounded />}
                onClick={() => {
                  setShow(true);
                }}
              >
                Logout
              </MenuItem>
            ) : (
              <MenuItem
                suffix={<LogoutRounded />}
                onClick={() => {
                  setShow(true);
                }}
              >
                <div className="flex pr-3 py-3">
                  {data.imageUrl ? (
                    <img
                      src={`http://127.0.0.1:5000/${data.imageUrl}`}
                      style={{
                        height: "60px",
                        borderRadius: "10px",
                        marginRight: "10px",
                      }}
                    />
                  ) : (
                    <>
                      <AccountCircleRoundedIcon
                        className="text-slate-700 mr-3 mt-1"
                        style={{
                          fontSize: "50px",
                        }}
                      />
                    </>
                  )}

                  <div>
                    <p>{data.name}</p>
                    <p>Doctor</p>
                  </div>
                </div>
              </MenuItem>
            )}
          </div>
        </Menu>
      </Sidebar>
      <Outlet />
    </>
  );
};

export default UserSideBar;
