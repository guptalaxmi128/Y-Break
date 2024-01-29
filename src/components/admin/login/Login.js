import React,{ useState} from "react";
import { Form, Input, Button, message } from "antd";
import bgImage from "../../../assets/yoga.jpg";
import logo from "../../../assets/logo.png";
import { useDispatch } from "react-redux";
import { login } from "../../../actions/login/login";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false);

  const validateEmail = (rule, value) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!value || emailRegex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject("Invalid email format");
  };

  const validatePassword = (rule, value) => {
    if (!value || value.length >= 8) {
      return Promise.resolve();
    }
    return Promise.reject("Password must be 8 characters long");
  };
  const onFinish = async (values) => {
    // console.log("Received values:", values);

    try {
      setLoading(true);
      const response = await dispatch(login(values));
      if (response.success) {
        navigate("/admin/dashboard");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.error("Login Error:", error.response.data.message);
      message.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="flex flex-col items-center">
        <div className="flex  items-center">
          <img
            src={logo}
            alt="Yoga Logo"
            className="mx-auto mb-4 rounded-full"
            style={{ width: "70px", height: "70px" }}
          />
          <h2 className="text-2xl ml-2 font-semibold mb-6 text-gray-800 text-white">
            Y-Break
          </h2>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Sign in to your account
          </h2>
          <Form
            name="loginForm"
            onFinish={onFinish}
            initialValues={{ remember: true }}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Form.Item
              label="Your email"
              name="email"
              className="block text-sm font-medium text-gray-600"
              rules={[{ required: true, message: "Please enter your email!" },
              { validator: validateEmail },]}
            >
              <Input
                placeholder="Email"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              className="block text-sm font-medium text-gray-600"
              rules={[
                { required: true, message: "Please enter your password!" },
                { validator: validatePassword },
              ]}
            >
              <Input.Password
                placeholder="Password"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-blue-500 text-white px-4 py-1 rounded-md block mx-auto hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 w-full"
                loading={loading}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
