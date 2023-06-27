import { useEffect } from "react";

const Alert = ({ msg, type, removeAlert, data }) => {
  const success = "py-2 w-full bg-green-500";
  const error = "py-2 w-full bg-red-500";
  useEffect(() => {
    setTimeout(() => {
      removeAlert();
    }, 3000);
  }, [data]);
  return (
    <>
      <div className="w-full lg:max-w-[670px] lg:mx-auto  px-8 absolute mt-[-30px] lg:mt-[-30px]">
        <div
          className={` px-3 rounded-lg  ${type === "success" && success} ${
            type === "error" && error
          } ${type && ""}`}
        >
          <h1 className="text-center">{msg}</h1>
        </div>
      </div>
    </>
  );
};

export default Alert;
