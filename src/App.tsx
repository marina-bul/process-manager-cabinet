import { CompanyPage } from "./components/CompanyPage/CompanyPage"
import { Sidebar } from "./components/Sidebar/Sidebar"

import './App.css'

function App() {
  return (
    <div className="app_container">
      <Sidebar />
      <main className="app_content">
        <CompanyPage />
      </main> 
    </div>

  )
}

export default App
