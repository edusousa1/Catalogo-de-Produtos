import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "../src/Components/Home"
import Inicial from "../src/Components/Inicial"
import Alterar from "./Components/Alterar"
function AppRoutes(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Inicial />} />
                <Route path="/produto/" element={<Home />} />
                <Route path="/alterar/:produtoId" element={<Alterar />} /> {/* Rota com parâmetro de ID */}
            </Routes>
        </Router>
    )
}
export default AppRoutes