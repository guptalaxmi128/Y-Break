import React, { useState, useEffect } from "react";
import { Table, Breadcrumb } from "antd";
import { useDispatch } from "react-redux";
import { getUsers } from "../../../actions/user/user";

const UserList = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await dispatch(getUsers());
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const columns = [
    {
      title: "Sno",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => <span> {text}</span>,
      onFilter: (value, record) => {
        if (value === "az") {
          return record.name;
        } else if (value === "za") {
          return -record.name;
        }
        return null;
      },
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      onFilter: (value, record) => {
        if (value === "az") {
          return record.email;
        } else if (value === "za") {
          return -record.email;
        }
        return null;
      },
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      onFilter: (value, record) => {
        const numericMobileNumber = parseInt(record.mobileNumber, 10);
        if (value === "09") {
          return numericMobileNumber >= 0 && numericMobileNumber <= 9;
        } else if (value === "90") {
          return numericMobileNumber >= 9 && numericMobileNumber <= 0;
        }
        return null;
      },
      sorter: (a, b) =>
        parseInt(a.mobileNumber, 10) - parseInt(b.mobileNumber, 10),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      render: (age) => (age ? age : "-"),
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      render: (city) => (city ? city : "-"),
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      render: (country) => (country ? country : "-"),
    },
  ];
  console.log(data);
  return (
    <div>
      <div className="flex justify-between items-center pt-5 pl-5 pr-5">
        <h2 className="text-2xl font-semibold  text-gray-800">Users</h2>
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Users</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md m-5">
        <div>
          <Table dataSource={data} columns={columns} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default UserList;
