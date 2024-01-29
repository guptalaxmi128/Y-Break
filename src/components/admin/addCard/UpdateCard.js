import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  message,
  Form,
  Row,
  Col,
  TimePicker,
  Input,
  Button,
  ColorPicker,
  Breadcrumb
} from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  BookOutlined,
  DashboardOutlined,
  LogoutOutlined,
  TeamOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined 
} from "@ant-design/icons";
import moment from "moment";
import logo from "../../../assets/logo.png";
import { LOGOUT } from "../../../constants/actionTypes";
import { useDispatch } from "react-redux";
import { getCardById, updateCard } from "../../../actions/card/card";

const { Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

const MyLayout = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);
  const [titleHindi, setTitleHindi] = useState("");
  const [titleEnglish, setTitleEnglish] = useState("");
  const [iconText, setIconText] = useState("");
  const [loading, setLoading] = useState(false);
  const [time,setTime]=useState(null);

  const [colorHex1, setColorHex1] = useState("");
  const [formatHex1, setFormatHex1] = useState("hex");
  const hexString1 = React.useMemo(
    () =>
      typeof colorHex1 === "string" ? colorHex1 : colorHex1?.toHexString(),
    [colorHex1]
  );

  const [colorHex2, setColorHex2] = useState("");
  const [formatHex2, setFormatHex2] = useState("hex");
  const hexString2 = React.useMemo(
    () =>
      typeof colorHex2 === "string" ? colorHex2 : colorHex2?.toHexString(),
    [colorHex2]
  );

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
        const response = await dispatch(getCardById(id));
        setColorHex1(response.data.bgColor1);
        setColorHex2(response.data.bgColor2);
        setTitleEnglish(response.data.titleEnglish);
        setTitleHindi(response.data.titleHindi);
        setIconText(response.data.iconText);
        setTime(moment(response.data.time, "ddd, DD MMM YYYY HH:mm:ss z"));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const fileName = event.target.files[0];
      setImage(fileName);
    }
  };
//   console.log(time)

  const onFinish = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("iconImage", image);
      formData.append("titleEnglish", titleEnglish);
      formData.append("titleHindi", titleHindi);
      formData.append("bgColor1", hexString1);
      formData.append("bgColor2", hexString2);
      formData.append("time", time);
      formData.append("iconText", iconText);
      formData.append("id", id);
    //   formData.forEach((value, key) => {
    //     console.log(`${key}: ${value}`);
    //   });

      const response = await dispatch(updateCard(formData));
      if (response.success) {
        message.success(response.message);
        setTitleEnglish('');
        setTitleHindi('');
        setIconText('');
        setTime(null);
        setImage(null);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTimeChange = (time) => {
    setTime(time);
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
            <div className="flex justify-between items-center pt-5 pl-5 pr-5">
              <h2 className="text-2xl font-semibold  text-gray-800"> Update Card</h2>
              <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href="/admin/card">Card</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Upadte Card</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md m-5">
              <Form form={form} onFinish={onFinish} layout="vertical">
                <Row gutter={[16, 16]}>
                  <Col lg={12} sm={24} xs={24}>
                    <Form.Item
                      label="Title (English)"
                      rules={[
                        { required: true, message: "This field is required!" },
                      ]}
                    >
                      <Input
                        placeholder="Title(English)"
                        value={titleEnglish}
                        onChange={(e) => setTitleEnglish(e.target.value)}
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={12} sm={24} xs={24}>
                    <Form.Item
                      label="Title (Hindi)"
                      rules={[
                        { required: true, message: "This field is required! " },
                      ]}
                    >
                      <Input
                        placeholder="Title (Hindi)"
                        value={titleHindi}
                        onChange={(e) => setTitleHindi(e.target.value)}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[16, 16]}>
                  <Col lg={12} sm={24} xs={24}>
                    <Form.Item name="bgColor1" label="Color 1">
                      <div className="flex">
                        <ColorPicker
                          format={formatHex1}
                          value={colorHex1}
                          onChange={setColorHex1}
                          onFormatChange={setFormatHex1}
                        />
                        <Input className="w-9/10 ml-1" value={hexString1} />
                      </div>
                    </Form.Item>
                  </Col>
                  <Col lg={12} sm={24} xs={24}>
                    <Form.Item name="bgColor2" label="Color 2">
                      <div className="flex">
                        <ColorPicker
                          format={formatHex2}
                          value={colorHex2}
                          onChange={setColorHex2}
                          onFormatChange={setFormatHex2}
                        />
                        <Input className="w-9/10 ml-1" value={hexString2} />
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col lg={12} sm={24} xs={24}>
                    <Form.Item
                      label="Image"
                      rules={[
                        { required: true, message: "Please select image" },
                      ]}
                    >
                      <Input
                        type="file"
                        onChange={onImageChange}
                        className="filetype"
                      />
                    </Form.Item>
                  </Col>

                  <Col lg={12} sm={24} xs={24}>
                    <Form.Item
                      label="Time"
                      rules={[
                        { required: true, message: "Please select time" },
                      ]}
                    >
                      <TimePicker format="HH:mm" className="w-full" value={time} onChange={handleTimeChange}  />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col lg={12} sm={24} xs={24}>
                    <Form.Item
                      label="Icon Text"
                      rules={[
                        { required: true, message: "This field is required!" },
                      ]}
                    >
                      <Input
                        placeholder="Icon Text"
                        value={iconText}
                        onChange={(e) => setIconText(e.target.value)}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item wrapperCol={{ span: 24 }}>
                  <Button
                    type="default"
                    htmlType="submit"
                    className="custom-btn mt-3"
                    loading={loading}
                    style={{
                      background: "transparent",
                      borderColor: "transparent",
                    }}
                  >
                    Update
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Content>
          <Footer className="text-center">Y-Break</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MyLayout;
