import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  message,
  Table,
  Breadcrumb,
  Space,
  Button,
  Spin,
  Input,Form,Modal
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  BookOutlined,
  DashboardOutlined,
  LogoutOutlined,
  TeamOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined 
} from "@ant-design/icons";
import logo from "../../../assets/logo.png";
import { LOGOUT } from "../../../constants/actionTypes";
import { useDispatch } from "react-redux";
import {
  deleteCardData,
  getCardData,
  updateCardData,
} from "../../../actions/cardData/cardData";

const { Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

const CardData = () => {
  const { cardId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [videoLink, setVideoLink] = useState("");
  const [iconText, setIconText] = useState("");
  const [overview, setOverview] = useState("");
  const [id, setId] = useState("");

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
      icon: <CheckCircleOutlined  />,
      link: "/admin/step",
    },

    {
      key: "6",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getCardData(cardId));
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, cardId]);



  //   console.log(data)

  const handleDelete = async (record) => {
    // console.log(record)
    try {
      const res = await dispatch(deleteCardData(record.id));
      if (res.success) {
        message.success(res.message);
      }
    } catch (error) {
      console.error("Error deleting card:", error);
      message.error(error.response.data.message);
    }
  };

  const columns = [
    {
      title: "SNo",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },

    {
      title: "Icon Text",
      dataIndex: "iconText",
      key: "iconText",
    },
    {
      title: "Video Link",
      dataIndex: "videoLink",
      key: "videoLink",
    },
    {
      title: "Overview",
      dataIndex: "overview",
      key: "overview",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space>
          <Button
            className="text-green-800 border-green-800"
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            danger
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const showEditModal = (record) => {
    const filteredData = data?.find(item => item.id === record.id);
  
    if (filteredData) {
      const { videoLink, overview, iconText, id } = filteredData;
      if (id) {
        setId(id);
        setVideoLink(videoLink);
        setOverview(overview);
        setIconText(iconText);
        setEditModalVisible(true);
      } else {
        console.error("Error: The 'id' property is not present in the filtered data.");
     
      }
    }
  };
  
  
console.log(id)
  const handleEditCancel = () => {
    setEditModalVisible(false);
  };

  const handleEditSave = async () => {
    try {
      const data = {
        videoLink,
        overview,
        iconText,
        id
      };
      const res = await dispatch(updateCardData(data));
      if (res.success) {
        message.success(res.message);
        setVideoLink('');
        setOverview('');
        setIconText('');
        setEditModalVisible(false);
      } else {
        message.error("Failed to update data. Please try again.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      message.error(error.response.data.message);
    }
  };
  

  const editModalContent = (
    <Modal
      title="Edit Data"
      visible={editModalVisible}
      onCancel={handleEditCancel}
      onOk={handleEditSave}
      destroyOnClose
      okButtonProps={{className:'custom-btn'}}
    >
      <Form layout="vertical" onFinish={handleEditSave}>
        <Form.Item
          label="Video Link"
        
          rules={[{ required: true, message: "Please enter a video link" }]}
        >
          <Input value={videoLink} onChange={(e)=>setVideoLink(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Overview"
       
          rules={[{ required: true, message: "Please enter an overview" }]}
        >
          <Input.TextArea value={overview} onChange={(e)=>setOverview(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Icon Text"
         
          rules={[{ required: true, message: "Please enter an icon text" }]}
        >
          <Input value={iconText} onChange={(e)=>setIconText(e.target.value)} />
        </Form.Item>
      </Form>
    </Modal>
  );

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
            <div className="flex justify-between items-center pt-5 pl-5 pr-5">
              <h2 className="text-2xl font-semibold  text-gray-800">
                Card Data
              </h2>
              <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href="/admin/video">Video</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Card Data</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md m-5">
              <div>
                {loading ? (
                  <div className="flex items-center justify-center h-screen">
                    <Spin size="medium" />
                  </div>
                ) : (
                  <Table dataSource={data} columns={columns} />
                )}
              </div>
              {editModalContent}
            </div>
          </Content>
          <Footer className="text-center">Y-Break</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default CardData;
