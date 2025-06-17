import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

// Page imports
import Login from "pages/login";
import Dashboard from "pages/dashboard";
import PatientList from "pages/patient-list";
import AddEditPatient from "pages/add-edit-patient";
import SurgerySchedule from "pages/surgery-schedule";
import PatientDetails from "pages/patient-details";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patient-list" element={<PatientList />} />
          <Route path="/add-edit-patient" element={<AddEditPatient />} />
          <Route path="/surgery-schedule" element={<SurgerySchedule />} />
          <Route path="/patient-details" element={<PatientDetails />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;