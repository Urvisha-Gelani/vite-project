import React from "react";
import { RotatingLines } from "react-loader-spinner";
interface spinnerType {
    status : boolean
}
const Spinner: React.FC<spinnerType> = ({status}) => {
  return (
    
      <RotatingLines
        visible={status}
        width="50"
        strokeColor="#17153B"
        strokeWidth="5"
        animationDuration="0.50"
        ariaLabel="rotating-lines-loading"
      />
   
  );
};

export default Spinner;
