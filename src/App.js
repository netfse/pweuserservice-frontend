import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"

import SignIn from './pages/signin'
import SignUp from './pages/signup'
import OidcCallback from './components/oidcallback'

function App() {
  return (
    <Fragment>
      <div className='app-routes'>
        <Router basename={process.env.REACT_APP_URL_ROOT_NAME}>
          <Routes>
            <Route path="/" element={<Navigate to="/signin" replace />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/oidc_callback" element={<OidcCallback />} />
          </Routes>
        </Router>
      </div>
    </Fragment>
  );
}

export default App;

