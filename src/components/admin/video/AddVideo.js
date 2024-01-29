import React, { useState, useEffect } from "react";
import { Form, Select, Input, Button, Row, Col, message, Spin } from "antd";
import { getCard } from "../../../actions/card/card";
import { useDispatch } from "react-redux";
import { addCardData } from "../../../actions/cardData/cardData";

const { TextArea } = Input;

const AddVideo = () => {
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

  // console.log(data);
  const onFinish = async (values) => {
    try {
      setLoading(true);
      console.log("Received values:", values);
      const res = await dispatch(addCardData(values));
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error("Error while adding card data:", error);
      message.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Spin size="medium" />
        </div>
      ) : (
        <Form name="yourForm" onFinish={onFinish} layout="vertical">
          <Row gutter={[16, 16]}>
            <Col lg={12} sm={24} xs={24}>
              <Form.Item
                name="cardId"
                label="Title"
                rules={[{ required: true, message: "Please select a title!" }]}
              >
                <Select placeholder="Select a title">
                  {data.map((card) => (
                    <Select.Option key={card.id} value={card.id}>
                      {card.titleEnglish}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col lg={12} sm={24} xs={24}>
              <Form.Item
                name="videoLink"
                label="YouTube Link"
                rules={[
                  { required: true, message: "Please enter a YouTube link!" },
                ]}
              >
                <Input placeholder="Enter YouTube link" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col lg={12} sm={24} xs={24}>
              <Form.Item
                name="iconText"
                label="Text Icon"
                rules={[
                  { required: true, message: "Please enter a text icon!" },
                ]}
              >
                <Input placeholder="Enter text icon" />
              </Form.Item>
            </Col>

            <Col lg={12} sm={24} xs={24}>
              <Form.Item
                name="overview"
                label="Overview"
                rules={[
                  { required: true, message: "Please enter an overview!" },
                ]}
              >
                <TextArea
                  placeholder="Enter overview"
                  autoSize={{ minRows: 3, maxRows: 6 }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button className="custom-btn" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default AddVideo;
