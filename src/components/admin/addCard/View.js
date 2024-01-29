import React, { useState, useEffect } from "react";
import { Table, Space, Button, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getCard, deleteCard } from "../../../actions/card/card";

const View = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await dispatch(getCard());
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
      title: "SNo",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Image",
      dataIndex: "iconImage_Path",
      key: "iconImage_Path",
      render: (text, record) => (
        <img
          src={record.iconImage_Path}
          alt={`${record.iconImage_OriginalName}`}
          style={{ maxWidth: "50px", maxHeight: "50px" }}
        />
      ),
    },
    {
      title: "Title (English)",
      dataIndex: "titleEnglish",
      key: "titleEnglish",
    },
    {
      title: "Title (Hindi)",
      dataIndex: "titleHindi",
      key: "titleHindi",
    },

    {
      title: "Color 1",
      dataIndex: "bgColor1",
      key: "bgColor2",
    },
    {
      title: "Color 2",
      dataIndex: "bgColor2",
      key: "bgColor2",
    },
    {
      title: "Icon Text",
      dataIndex: "iconText",
      key: "iconText",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space>
          <Button
            className="text-green-800 border-green-800"
            icon={<EditOutlined />}
          >
            <Link to={`card/edit/${record.id}`}>Edit</Link>
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

  const handleDelete = async (record) => {
    try {
      const res = await dispatch(deleteCard(record.id));
      if (res.success) {
        message.success(res.message);
      }
    } catch (error) {
      console.error("Error deleting card:", error);
      message.error(error.response.data.message);
    }
  };
  // console.log(data);

  return (
    <>
      <div style={{overflowX:'auto'}}>
       
          <Table dataSource={data} columns={columns} loading={loading} />
       
      </div>
    </>
  );
};

export default View;
