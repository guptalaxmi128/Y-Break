import React, { useState, useEffect } from "react";
import {
  Spin,
  Form,
  Input,
  Select,
  Row,
  Col,
  Button,
  message,
} from "antd";
import { useDispatch } from "react-redux";
import { getCard } from "../../../actions/card/card";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { addSteps } from "../../../actions/step/step";

const AddStep = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState([{ id: 1, value: "" }]); // Initial step

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

  const onFinish = async (values) => {
    try {
      const data = {
        cardId: values.cardId,
        stepsArr: steps,
      };

      const res = await dispatch(addSteps(data));
      if (res.success) {
        message.success(res.message);
        form.resetFields();
        setSteps([{ id: 1, value: "" }]);
      } else {
        message.error("Failed to add steps");
      }
    } catch (error) {
      console.error("Error adding steps:", error);
      message.error(error.response.data.message);
    }
  };

  const addStep = () => {
    setSteps((prevSteps) => [
      ...prevSteps,
      { id: prevSteps.length + 1, value: "" },
    ]);
  };

  const removeStep = (id) => {
    setSteps((prevSteps) => prevSteps.filter((step) => step.id !== id));
  };

  const handleStepChange = (id, value) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) => (step.id === id ? { ...step, value } : step))
    );
  };

  return (
    <>
    
        <div>
          {loading ? (
            <div className="flex items-center justify-center h-screen">
              <Spin size="medium" />
            </div>
          ) : (
            <Form
              form={form}
              name="yourForm"
              onFinish={onFinish}
              layout="vertical"
            >
              <Row gutter={[16, 16]}>
                <Col lg={12} sm={24} xs={24}>
                  <Form.Item
                    name="cardId"
                    label="Title"
                    rules={[
                      { required: true, message: "Please select a title!" },
                    ]}
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

                {steps.map((step) => (
                  <Col lg={12} sm={24} xs={24}>
                    <div className="flex">
                      <Form.Item
                     style={{ width: '96%' }}
                        label={`Step ${step.id}`}
                        rules={[
                          { required: true, message: "Please enter a step!" },
                        ]}
                      >
                        <Input
                          value={step.value}
                          onChange={(e) =>
                            handleStepChange(step.id, e.target.value)
                          }
                        />
                      </Form.Item>

                      <DeleteOutlined
                        className="ml-2"
                        onClick={() => removeStep(step.id)}
                      />
                    </div>
                  </Col>
                ))}
              </Row>

              <Button type="dashed" onClick={addStep} icon={<EditOutlined />}>
                Add Step
              </Button>

              <Form.Item>
                <Button
                  className="custom-btn mt-2"
                  htmlType="submit"
                  loading={loading}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
   
    </>
  );
};

export default AddStep;
