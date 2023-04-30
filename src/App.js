import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbars from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard"
import Startworkflow from "./pages/Startworkflow/Startworkflow"
import BpmnEditor from "./pages/Modeler/BpmnEditor";
import Bpmn from "./pages/Modeler/Bpmn"
import Detailmytasks from "./pages/Mytasks/Detailmytasks";
import Workflows from "./pages/Workflowlist";
import Task from "./pages/Mytasks";
import Form from "./pages/Myforms";
import Detailforms from "./pages/Myforms/Detailforms";
import Forms from "./pages/CreateForms/CreateForms";
import SubmitForm from "./pages/Startworkflow/SubmitForm";
import Formskey from "./pages/Tableforms/indexformkeys";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/Login/Loginpage";
import { AuthProvider } from "./context/AuthContext";
import EditForms from "./pages/EditForms/EditForms";
import PrivateRoutes from "./utils/PrivateRoute";



function App() {
  const [user,  setUser] = useState([])
  return (
      <Router>
            {/* <Sidebar>  */}
         
              <ToastContainer/>
              <AuthProvider>
              <Routes>

              <Route path="/" element={<PrivateRoutes/>}> 
              {/* <Navbars/> */}
              <Route path="/Dashboard" element={<Dashboard/>} />
                  <Route path="/Startworkflow" element={<SubmitForm/>} />
                  <Route path="/Myforms" element={<Form/>} />
                  <Route path="/Mytasks" element={<Task/>} />
                  <Route path="/Workflowlist" element={<Workflows/>} />
                  <Route path='Workflowlist/Modeler/:Bpmnid' element ={<BpmnEditor/>}/>
                  <Route path='Workflowlist/Modeler' element ={<Bpmn />}/>

                  <Route path='Myforms/Detail/:Formid' element ={<Detailforms/>}/>
                  <Route path='Mytasks/Detail/:taskid' element ={<Detailmytasks />}/>

                  <Route path="/Createforms" element={<Forms />}/> 
                  <Route path="/Form" element={<SubmitForm />} />

                  <Route path="/Tableforms" element={<Formskey/>}/>
                  <Route path="Tableforms/edit/:formid" element={<EditForms/>}/>
              </Route> 
                  <Route path="/login" element={<LoginPage/>}/>

            
              </Routes>
              </AuthProvider>
              {/* </Sidebar> */}
             
      </Router>
  );
}

export default App;
