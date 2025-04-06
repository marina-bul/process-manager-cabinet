import { CompanyPage } from "./components/CompanyPage/CompanyPage"
import { Sidebar } from "./components/Sidebar/Sidebar"

function App() {
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <Sidebar />
      <main>
        <CompanyPage />
      </main> 
    </div>

  )
}

export default App
