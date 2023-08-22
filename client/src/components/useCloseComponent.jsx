import { useNavigate } from "react-router-dom";

export const useCloseComponent = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
    // Add your logic here to handle closing the component
  };

  return handleClose;
};
