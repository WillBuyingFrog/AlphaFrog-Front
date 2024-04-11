import {Box, Flex} from "@chakra-ui/react";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";


function Dashboard(){
    return (
        <Box>
            <Header />
            <Flex>
                <SideBar />
                <Box>
                    这里是主体内容
                </Box>
            </Flex>
        </Box>

    )
}

export default Dashboard;