import React, { useEffect, useState } from "react";

const DelayedLoading = (props) => {
  const { title, time } = props;
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(true), time);

    return () => clearTimeout(timer);
  });

  return showLoading && <div>{`Loading ${title}...`}</div>;
};

export default DelayedLoading;
