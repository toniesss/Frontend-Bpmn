import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define success notification function
export const notifySuccess = (message) => {
    toast(<p style={{ fontSize: 16, position: "absolute" }}>{message}</p>, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: true,
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
      type: "success"
    });
  };
  
  // Define error notification function
  export const notifyError = (message) => {
    toast(<p style={{ fontSize: 16 }}>{message}</p>, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: true,
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
      type: "error"
    });
  };
  

export default function gg() {
  const onSubmit = () => {
    notifySuccess("Группа успешно создана!");
  };
  const onError = () => {
    notifyError("Группа не создана!");
  };
  return (
    <div className="App">
      <button onClick={() => onSubmit()}>Click</button>
      <button onClick={() => onError()}>Error</button>
      <ToastContainer />
    </div>
  );
}


const notify = () => toast("Wow so easy !");

  