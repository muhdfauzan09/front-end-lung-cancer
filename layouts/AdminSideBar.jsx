import { useState } from "react";
import { useCookies } from "react-cookie";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

// Import Icon
import MenuIcon from "@mui/icons-material/Menu";
import GroupsIcon from "@mui/icons-material/Groups";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ModalComponent2 from "../components/ModalComponent2";
import LogoutRounded from "@mui/icons-material/LoginRounded";
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
        message="Are You Sure You Want to Logout?"
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
        backgroundColor="#034CA1"
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
                  paddingBlock: active ? "20px" : "40px",
                  color: active ? "#ffffff" : "#ffffff",
                  backgroundColor: active ? "#ffffff" : "#034CA1",
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
