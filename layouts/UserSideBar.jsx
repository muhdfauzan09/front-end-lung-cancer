import { useState } from "react";
import useStore from "../useStore";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

// Icons
import MenuIcon from "@mui/icons-material/Menu";
import GroupsIcon from "@mui/icons-material/Groups";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ModalComponent2 from "../components/ModalComponent2";
import lung_cancer from "../src/assets/lung_cancer_logo.png";
import LogoutRounded from "@mui/icons-material/LogoutRounded";
import GridViewRounded from "@mui/icons-material/GridViewRounded";
import BarChartRounded from "@mui/icons-material/BarChartRounded";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyRounded";
import SettingsApplicationsRounded from "@mui/icons-material/SettingsApplicationsRounded";

const UserSideBar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);

  const getUrlImage = useStore((state) => state.votes);
  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

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
        width="350px"
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
              if (level === 0)
                return {
                  fontWeight: "bold",
                  fontSize: "larger",
                  color: active ? "#1f40af" : "#ffffff",
                  paddingBlock: active ? "20px" : "42px",
                  "&:hover": {
                    color: "black !important",
                    fontWeight: "bolder !important",
                    backgroundColor: "white !important",
                    borderRadius: active ? "15px" : "10px !important",
                  },
                };
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

          <MenuItem icon={<GridViewRounded />} component={<Link to="/" />}>
            Dashboard
          </MenuItem>

          <MenuItem
            icon={<BarChartRounded />}
            component={<Link to="/visualisation" />}
          >
            Data Visualisation
          </MenuItem>

          <MenuItem
            icon={<PsychologyOutlinedIcon />}
            component={<Link to="/prediction" />}
          >
            Prediction
          </MenuItem>

          <MenuItem icon={<GroupsIcon />} component={<Link to="/patient" />}>
            Patient
          </MenuItem>

          <MenuItem icon={<SettingsIcon />} component={<Link to="/setting" />}>
            Setting
          </MenuItem>

          <div style={{ marginTop: "330px" }}>
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
                <div className="flex p-2 bg-red-500">
                  <img
                    src={`http://127.0.0.1:5000/${getUrlImage}`}
                    className="h-10"
                  />
                </div>
                testsdds
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
