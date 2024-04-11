import {Box, Text} from "@chakra-ui/react";


function SideBarItem(props){
    return (
        <Box role={'group'}>
            <Box
                _groupHover={{
                    bg: 'blue.50',
                    cursor: 'pointer',
                }}
                h="50px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                transition="all 0.2s"
            >
                <Text
                    _groupHover={{
                        transform: "translateX(5px)",
                    }}
                    transition="all 0.2s"
                >
                    {props.text}
                </Text>
            </Box>
        </Box>

    )
}


export default SideBarItem;