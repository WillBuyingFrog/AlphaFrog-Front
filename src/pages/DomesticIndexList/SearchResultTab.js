import {Box, Center, Flex, Grid, GridItem, Link, Spacer, Text} from "@chakra-ui/react";

import {ExternalLinkIcon} from "@chakra-ui/icons";


function SearchResultTab(props){

    const {icon, name, link, newTab} = props;

    return (
        <Flex height={'28px'} marginTop={'7px'} marginBottom={'7px'}>
            <Grid w={'100%'} templateColumns={'repeat(5, 1fr)'} gap={5}>
                <GridItem colSpan={1} display={'flex'} justifyContent={'flex-start'}>
                    <Center>
                        {icon}
                    </Center>
                </GridItem>
                <GridItem colSpan={3}>
                    <Center>
                        <Link
                            href={link} isExternal={newTab}
                            _hover={{ textDecoration: 'none', cursor: 'pointer' }}
                        >
                            <Text>{name}</Text>
                        </Link>
                    </Center>
                </GridItem>
                <GridItem colSpan={1} display={'flex'} justifyContent={'flex-end'} marginRight={'10px'}>
                    <ExternalLinkIcon width={5} height={5} />
                </GridItem>
            </Grid>
        </Flex>
    )
}

export default SearchResultTab;
