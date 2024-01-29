import React, { useState } from "react";
import { Input, Button, Form, Row, Col, ColorPicker, TimePicker,message } from "antd";
import { useDispatch } from "react-redux";
import { createCard } from "../../../actions/card/card";

const AddCard = () => {
  const dispatch=useDispatch();
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);
  const [loading,setLoading]=useState(false);

  const [colorHex1, setColorHex1] = useState("#FF0000");
  const [formatHex1, setFormatHex1] = useState("hex");
  const hexString1 = React.useMemo(
    () =>
      typeof colorHex1 === "string" ? colorHex1 : colorHex1?.toHexString(),
    [colorHex1]
  );

  const [colorHex2, setColorHex2] = useState("#FF0000");
  const [formatHex2, setFormatHex2] = useState("hex");
  const hexString2 = React.useMemo(
    () =>
      typeof colorHex2 === "string" ? colorHex2 : colorHex2?.toHexString(),
    [colorHex2]
  );

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const fileName = event.target.files[0];
      setImage(fileName);
    }
  };

 
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const formData=new FormData();
      formData.append("iconImage",image);
      formData.append("titleEnglish",values.titleEnglish);
      formData.append("titleHindi",values.titleHindi);
      formData.append("bgColor1",hexString1);
      formData.append("bgColor2",hexString2);
      formData.append("time",values.time);
      formData.append("iconText",values.iconText);
      // formData.forEach((value, key) => {
      //   console.log(`${key}: ${value}`);
      // });
  
      const response = await dispatch(createCard(formData));
      if (response.success) {
        message.success(response.message);
      form.resetFields();
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
  return (
    <>
      <div>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Row gutter={[16, 16]}>
            <Col lg={12} sm={24} xs={24}>
              <Form.Item
                name="titleEnglish"
                label="Title (English)"
                rules={[{ required: true, message: "This field is required!" }]}
              >
                <Input placeholder="Title(English)" />
              </Form.Item>
            </Col>
            <Col lg={12} sm={24} xs={24}>
              <Form.Item
                name="titleHindi"
                label="Title (Hindi)"
                rules={[
                  { required: true, message: "This field is required! " },
                ]}
              >
                <Input placeholder="Title (Hindi)" />
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
                name="iconImage"
                label="Image"
                rules={[{ required: true, message: "Please select image" }]}
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
                name="time"
                label="Time"
                rules={[{ required: true, message: "Please select time" }]}
              >
                <TimePicker format="HH:mm" className="w-full" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col lg={12} sm={24} xs={24}>
              <Form.Item
                name="iconText"
                label="Icon Text"
                rules={[{ required: true, message: "This field is required!" }]}
              >
                <Input placeholder="Icon Text" />
              </Form.Item>
            </Col>
          

           
          </Row>
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button
              type="default"
              htmlType="submit"
              className="custom-btn mt-3"
              loading={loading}
              style={{ background: 'transparent', borderColor: 'transparent' }}
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AddCard;
