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
                <RouterLink to={'/record/create-record'}>
                    <SideBarItem text={'创建一般投资记录'}  />
                </RouterLink>

                <SideBarItem text={'创建初始投资记录'} />
            </VStack>
        </Box>
    );
}

export default SideBar;
