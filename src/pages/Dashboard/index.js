import {Box, Flex} from "@chakra-ui/react";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import {Outlet} from "react-router-dom";



function Dashboard(){
    return (
        <Box
            marginLeft={'15%'}
            marginRight = {'15%'}
            w={'70%'}
        >
            <Header />
            <Flex>
                <SideBar />
                <Box w={'50%'}>
                    <Outlet />
                </Box>
            </Flex>
        </Box>

    )
}

export default Dashboard;
