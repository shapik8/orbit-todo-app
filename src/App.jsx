import { AppProvider } from './context/AppContext';
import Sidebar from './components/layout/Sidebar';
import MainContent from './components/layout/MainContent';
import './styles/global.css';

function App() {
  return (
    <AppProvider>
      <div className="app-container">
        <Sidebar />
        <MainContent />
      </div>
    </AppProvider>
  );
}

export default App;
