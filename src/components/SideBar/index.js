import {Box, List, ListItem} from "@chakra-ui/react";
import SideBarItem from "./SideBarItem";


function SideBar() {
    return (
        <Box p={4} minw={'180px'} w={'20%'}>
            <List>
                <ListItem>
                    <SideBarItem text={'个股'}/>
                </ListItem>
            </List>
        </Box>
    );
}

export default SideBar;