import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getCard } from "../../../actions/card/card";

const ViewVideo = () => {
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
      render: (text, record) => (
       
            <Link to={`cardData/${record.id}`}>{text}</Link>
      )
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
  ];

  // console.log(data);

  return (
    <>
      <div style={{overflowX:'auto'}}>
       
          <Table dataSource={data} columns={columns} loading={loading} />
       
      </div>
    </>
  );
};

export default ViewVideo;
