import React from "react";
import { Tabs, Breadcrumb} from "antd";
import AddVideo from "./AddVideo";
import ViewVideo from "./ViewVideo";


const { TabPane } = Tabs;

const VideoComponent = () => {
  return (
    <div>
      <div className="flex justify-between items-center pt-5 pl-5 pr-5">
        <h2 className="text-2xl font-semibold  text-gray-800">
          Video
        </h2>
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Video</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md m-5">
        <div>
          <Tabs defaultActiveKey="create">
            <TabPane tab="Create" key="create">
              <AddVideo />
            </TabPane>
            <TabPane tab="View" key="view">
            <ViewVideo />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default VideoComponent;
