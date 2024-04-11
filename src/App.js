import {Box} from "@chakra-ui/react";

import routes from "./routes";

import Header from "./components/Header";
import {RouterProvider} from "react-router-dom";


function App() {
    return (
        <Box>
            <RouterProvider router={routes} />
        </Box>
    )
}

export default App;