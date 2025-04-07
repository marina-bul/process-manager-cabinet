import { useEffect } from "react";

import { CompanyPage } from "./components/CompanyPage/CompanyPage";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { useAuth } from "./shared/helpers/useAuth";

import './App.css';

function App() {
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {     

      if (!isAuthenticated) {
          login().catch(err => {
              console.error('Cannot login. Please, try again', err);
          });
      }
  }, [isAuthenticated, login]);
  
  return (
    <div className="app_container">
      <Sidebar />
      <main className="app_content">
        {isAuthenticated ? (
          <CompanyPage />
        ) : (
          <p className="empty_content">You are not logged in yet.</p>
        )}
        
      </main> 
    </div>

  )
}

export default App
