import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import PrivateRoutes from "./router/PrivateRoutes";
import { useDispatch, useSelector } from "react-redux";
import ScrollToTop from "./components/ScrollToTop";
import AdminDashboard from "./pages/AdminDashboard";
import EditProfessionalPage from "./pages/EditProfessionalPage";
import AppointmentCancel from "./pages/AppointmentCancel";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import NewProfessional from "./pages/NewProfessional";
import ProfessionalPage from "./pages/ProfessionalPage";
import ServicePage from "./pages/ServicePage";
import NewAppointment from "./pages/NewAppointment";


function App() {
  const user = useSelector((state) => state.user);
  /* console.log(user, user.isAdmin, "<<<<---USER!!!!!") */
  return (
    <>
    <BrowserRouter>
        <ScrollToTop />  
        <Navigation />
        <Routes>
        <Route index element={<Home />} />
          {!user && (
                        <>
                            <Route path="/login" element={<Login />} />                            
                        </>
          )}
          {user && user.isAdmin && (
            <>
              <Route path="/admin" element={<AdminDashboard />} />  
              <Route path="/professional/:id/edit" element={<EditProfessionalPage />} />                        
            </>
          )}

          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<h1>Home</h1>} />
          </Route> */} 
          <Route path="/professional/:id" element={<ProfessionalPage />} />    
          <Route path="/service/:id" element={<ServicePage />} />    
          <Route path="/new-professional" element={<NewProfessional />} />
          <Route path="/new-appointment" element={<NewAppointment />} />
          <Route path="/appointment/:id/:service/cancel" element={<AppointmentCancel />} />
          
          <Route path="*" element={<Home />} />

        </Routes> 
        
  </BrowserRouter>      
    </>
  );
}

export default App;
