import {Box, VStack} from "@chakra-ui/react";
import SideBarItem from "./SideBarItem";
import {Link as RouterLink} from "react-router-dom";


function SideBar() {
    return (
        <Box p={4} minw={'180px'} w={'20%'}>
            <VStack
                w={'20%'} minW={'180px'}
                align={'stretch'}
            >
                <RouterLink to={'/panel/v1/domestic/index'}>
                    <SideBarItem text={'沪深个股'}  />
                </RouterLink>

                <SideBarItem text={'沪深指数'} />
            </VStack>
        </Box>
    );
}

export default SideBar;
