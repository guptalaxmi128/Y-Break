import React from "react";
import { Layout, Menu ,message} from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BookOutlined,
  DashboardOutlined,
  LogoutOutlined,
  TeamOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined 
} from "@ant-design/icons";
import logo from "../../../assets/logo.png";
import UserList from "../userlist/UserList";
import CardComponent from "../addCard/CardComponent";
import VideoComponent from "../video/VideoComponent";
import { LOGOUT} from "../../../constants/actionTypes";
import { useDispatch } from "react-redux";
import StepComponent from "../addStep/StepComponent";
import Dashboard from "../dashboard/Dashboard";

const { Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

const MyLayout = () => {
    const dispatch=useDispatch();
  const location = useLocation();
    const navigate = useNavigate();

  const carouselStyle = {
    // backgroundImage: `url(${backgroundImage})`,
    background: "#1b2910",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  };

    const handleLogout = () => {
      dispatch({ type: LOGOUT });
      message.success("Admin logout successfully!");
      navigate("/");
    };

  const menuItems = [
    {
      key: "1",
      label: "Dashboard",
      icon: <DashboardOutlined />,
      link: "/admin/dashboard",
    },
    {
        key: "2",
        label: "Users",
        icon: <TeamOutlined />,
        link: "/admin/users",
      },
    {
      key: "3",
      label: "Add Card",
      icon: <BookOutlined />,
      link: "/admin/card",
    },
    {
      key: "4",
      label: "Add Video",
      icon: <PlayCircleOutlined />,
      link: "/admin/video",
    },
    {
      key: "5",
      label: "Add Step",
      icon: <CheckCircleOutlined />,
      link: "/admin/step",
    },

    {
      key: "6",
      label: "Logout",
      icon: <LogoutOutlined />,
        onClick:handleLogout
    },
  ];

  const customMenuStyle = {
    background: "transparent",
  };

  const customMenuItemStyle = {
    color: "white",
    fontFamily: "Rajdhani",
    marginTop: "10px",
    fontSize: "18px",
  };

  const renderMenuItems = (items) => {
    return items.map((item) => {
      if (item.subMenu) {
        return (
          <SubMenu
            key={item.key}
            icon={item.icon}
            title={item.label}
            style={customMenuItemStyle}
          >
            {renderMenuItems(item.subMenu)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            onClick={item.key === "6" ? item.onClick : null}
            style={customMenuItemStyle}
          >
            {item.link ? (
              <Link to={item.link} style={{ textDecoration: "none" }}>
                {item.label}
              </Link>
            ) : (
              item.label
            )}
          </Menu.Item>
        );
      }
    });
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          width={260}
          style={carouselStyle}
        >
          <div className="flex items-center justify-center mt-4">
            <img
              src={logo}
              alt="Yoga Logo"
              style={{ width: "60px", height: "60px", borderRadius: "50%" }}
            />
            <h2 className="text-2xl font-semibold mb-6 ml-2 text-gray-800 text-white">
              Y-Break
            </h2>
          </div>

          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={customMenuStyle}
          >
            {renderMenuItems(menuItems)}
            <div className="demo-logo-vertical" />
          </Menu>
        </Sider>

        <Layout>
          <Content>
            {location.pathname === "/admin/dashboard" && <Dashboard />}
            {location.pathname === "/admin/users" && <UserList />} 
            {location.pathname === "/admin/card" && <CardComponent />} 
            {location.pathname === "/admin/video" && <VideoComponent />} 
            {location.pathname === "/admin/step" && <StepComponent />} 
          </Content>
          <Footer className="text-center">Y-Break</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MyLayout;
