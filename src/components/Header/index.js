import {Box, Center, Flex, Text} from "@chakra-ui/react";

import {Link as RouterLink} from 'react-router-dom';

function Header(){
    return (
        <Box h={'80px'}>
            <Flex h={'100%'}>
                <Center w={'25%'} h={'100%'}>
                    <RouterLink to={'/panel/v1'}>
                        <Text fontSize={'3xl'} fontWeight={'600'}>AlphaFrog</Text>
                    </RouterLink>
                </Center>
            </Flex>
        </Box>
    )
}


export default Header;
