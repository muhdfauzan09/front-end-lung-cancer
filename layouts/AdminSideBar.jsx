import { useState } from "react";
import { useCookies } from "react-cookie";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

// Import Icon
import MenuIcon from "@mui/icons-material/Menu";
import GroupsIcon from "@mui/icons-material/Groups";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ModalComponent2 from "../components/ModalComponent2";
import lung_cancer from "../src/assets/lung_cancer_logo.png";
import LogoutRounded from "@mui/icons-material/LoginRounded";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import GridViewRounded from "@mui/icons-material/GridViewRounded";
import BarChartRounded from "@mui/icons-material/BarChartRounded";

const AdminSideBar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies();

  // Functions
  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex">
      <ModalComponent2
        showModal={show}
        message="Are you sure you want to logout ?"
        route={() => {
          removeCookie("adminToken");
          navigate("/login");
          setShow(false);
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

          <MenuItem icon={<GridViewRounded />} component={<Link to="/admin" />}>
            Dashboard
          </MenuItem>
          <MenuItem
            icon={<BarChartRounded />}
            component={<Link to="/admin/visualisation" />}
          >
            Data Visualisation
          </MenuItem>
          <MenuItem
            icon={<ApartmentIcon />}
            component={<Link to="/admin/department" />}
          >
            Department List
          </MenuItem>
          <MenuItem
            icon={<GroupsIcon />}
            component={<Link to="/admin/doctor" />}
          >
            Doctor List
          </MenuItem>
          <MenuItem
            icon={<PersonAddAlt1Icon />}
            component={<Link to="/admin/add/doctor" />}
          >
            Add Doctor
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

export default AdminSideBar;
