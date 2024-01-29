import React from "react";
import { Tabs, Breadcrumb} from "antd";
import AddStep from "./AddStep";
import ViewStep from "./ViewStep";


const { TabPane } = Tabs;

const StepComponent = () => {
  return (
    <div>
      <div className="flex justify-between items-center pt-5 pl-5 pr-5">
        <h2 className="text-2xl font-semibold  text-gray-800">
          Steps
        </h2>
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Steps</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md m-5">
        <div>
          <Tabs defaultActiveKey="create">
            <TabPane tab="Create" key="create">
             <AddStep />
            </TabPane>
            <TabPane tab="View" key="view">
            <ViewStep />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default StepComponent;
