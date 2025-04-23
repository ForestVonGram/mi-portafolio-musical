import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppRoutes from "./routes";
import Navbar from "./components/Navbar";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <div className="p-4">
                <AppRoutes />
            </div>
        </BrowserRouter>
    );
}

export default App;
