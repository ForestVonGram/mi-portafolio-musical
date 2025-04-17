import Router from './Router';
import Navbar from "./components/NavBar";

function App() {
    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <main className="p-4">
                <Router />
            </main>
        </div>
    )
}

export default App;
