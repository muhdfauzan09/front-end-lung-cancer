import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

// Icons
import MenuIcon from "@mui/icons-material/Menu";
import GroupsIcon from "@mui/icons-material/Groups";
import ModalComponent2 from "../components/ModalComponent2";
import LogoutRounded from "@mui/icons-material/LogoutRounded";
import GridViewRounded from "@mui/icons-material/GridViewRounded";
import BarChartRounded from "@mui/icons-material/BarChartRounded";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyRounded";
import SettingsApplicationsRounded from "@mui/icons-material/SettingsApplicationsRounded";

const UserSideBar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies();

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex">
      <ModalComponent2
        showModal={show}
        message="Are you sure you want to logout ?"
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
        width="340px"
        style={{ position: "fixed", top: "0", bottom: "0" }}
      >
        <Menu
          className={collapsed ? "py-2" : "px-4 py-2"}
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              // only apply styles on first level elements of the tree
              if (level === 0)
                return {
                  paddingBlock: active ? "20px" : "42px",
                  color: active ? "#ffffff" : "#ffffff",
                  backgroundColor: active ? "#ffffff" : "1f40af",
                  fontWeight: "bolder",
                  fontSize: "larger",
                  "&:hover": {
                    backgroundColor: "white !important",
                    color: "black !important",
                    borderRadius: collapsed ? "0" : "10px !important",
                    fontWeight: "bolder !important",
                  },
                };
            },
          }}
        >
          <MenuItem
            className={collapsed ? "pt-10 text-white" : "pt-10 text-white"}
            icon={<MenuIcon />}
            onClick={() => {
              handleToggleCollapse();
            }}
          ></MenuItem>

          <MenuItem icon={<GridViewRounded />} component={<Link to="/" />}>
            Dashboard
          </MenuItem>

          <MenuItem
            icon={<SettingsApplicationsRounded />}
            component={<Link to="/setting" />}
          >
            Setting
          </MenuItem>

          <MenuItem
            icon={<BarChartRounded />}
            component={<Link to="/visualisation" />}
          >
            Data Visualisation
          </MenuItem>

          <MenuItem icon={<GroupsIcon />} component={<Link to="/patient" />}>
            Patient
          </MenuItem>

          <MenuItem
            icon={<PsychologyOutlinedIcon />}
            component={<Link to="/prediction" />}
          >
            Prediction
          </MenuItem>

          <MenuItem
            icon={<LogoutRounded />}
            onClick={() => {
              setShow(true);
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
      <Outlet />
    </div>
  );
};

export default UserSideBar;
