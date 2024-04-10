import {Box, List, ListItem} from "@chakra-ui/react";


function SideBar() {
    return (
        <Box bg="gray.300" p={4}>
            <List>
                <ListItem>
                    <a href="#">个股</a>
                </ListItem>
                {/* 添加其他列表项 */}
            </List>
        </Box>
    );
}