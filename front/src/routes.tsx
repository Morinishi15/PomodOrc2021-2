import { Route, BrowserRouter , Routes} from "react-router-dom"
import Home from "../src/pages/Home/Index"
import About from "../src/pages/About"
// import Clock from "../src/components/Clock/Clock"
// import { Dispatch, SetStateAction, useState } from "react"
// import Tabs from "../src/components/Tabs/Tabs"
import Title from "../src/pages/Ticker/title"
import Todo from "../src/pages/ToDoList/index"
import Sub from "pages/SubTasks/Sub"

export const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                
                <Route path="/relogio/:nome" element={<Title/>} />
                <Route path="/" element={<Home/>} />
                <Route path="/about" element={<About/>} />

            </Routes>
            <Routes>

                <Route path="/todo" element={<Todo/>} />
                <Route path="/sub" element={<Sub/>} />                
                        
            </Routes>  
        </BrowserRouter>
    );
}
