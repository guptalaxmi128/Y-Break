import React, { useState, useEffect } from "react";
import { Card, Statistic, Row, Col, Breadcrumb} from "antd";


const Dashboard = () => {


  const [completionData, setCompletionData] = useState({
    totalInstructors: 300,
    totalCourses: 60,
  });

   useEffect(() => {
    const fetchData = () => {
      // Simulate delay for API call
      setTimeout(() => {
       

        setCompletionData({
          totalInstructors: 320, // Updated value for demonstration
          totalCourses: 70, // Updated value for demonstration
        });

      
      }, 1000); // Simulate a delay of 1 second
    };

    // Fetch data when the component mounts
    fetchData();
  }, []);



  return (
    <div>
      <div className="flex justify-between items-center pt-5 pl-5 pr-5">
        <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="bg-white rounded-lg p-6 shadow-md m-5">
         <Row gutter={[16, 16]} >
          <Col lg={8} sm={24} xs={24}>
            <Card className="bg-sky-50">
              <Statistic
                title="Total Users"
                value={completionData.totalInstructors}
              />
              
            </Card>
          </Col>

          <Col lg={8} sm={24} xs={24}>
            <Card className="bg-amber-50">
              <Statistic
                title="Total Cards"
                value={`${completionData.totalCourses}`}
              />
            
            </Card>
          </Col>
          
        </Row>
      
     
      </div>
    </div>
  );
};

export default Dashboard;
