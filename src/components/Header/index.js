import {Box, Center, Flex, Text} from "@chakra-ui/react";


function Header(){
    return (
        <Box h={'80px'}>
            <Flex h={'100%'}>
                <Center w={'25%'} h={'100%'}>
                    <Text fontSize={'3xl'} fontWeight={'600'}>AlphaFrog</Text>
                </Center>
            </Flex>
        </Box>
    )
}


export default Header;