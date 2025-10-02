import { Skeleton } from "antd";
import React from "react";

const SkeltonComponent = () => {
  return Array.from({ length: 10 }).map((_, idx) => (
    <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden">
      <Skeleton.Image active className="!w-full !h-48" />
      <div className="p-4">
        <Skeleton active paragraph={{ rows: 2 }} />
        <Skeleton.Button active className="!w-full !h-10" />
      </div>
    </div>
  ));
};

export default SkeltonComponent;