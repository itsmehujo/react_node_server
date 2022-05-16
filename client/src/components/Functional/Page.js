import { useEffect } from "react";

const Page = (props) => {
  useEffect(() => {
    document.title = props.title || "Feedback app";
  }, [props.title]);
  return props.children;
};

export default Page;