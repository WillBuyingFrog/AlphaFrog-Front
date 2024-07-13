import {Box, Flex} from "@chakra-ui/react";
import Header from "../../components/Header";
import {Outlet} from "react-router-dom";
import AlphaRecordSideBar from "../../components/AlphaRecordSideBar";


function AlphaRecord(){
    return (
        <Box
            marginLeft={'15%'}
            marginRight = {'15%'}
            w={'70%'}
        >
            <Header />
            <Flex>
                <AlphaRecordSideBar />
                <Outlet />
            </Flex>

        </Box>
    )
}

export default AlphaRecord;
