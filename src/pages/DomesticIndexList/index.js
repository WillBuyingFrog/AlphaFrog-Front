import {
    Box, Divider,
    Input,
    InputGroup,
    InputLeftElement,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger, Text,
} from "@chakra-ui/react";
import {useEffect, useRef, useState} from "react";
import * as PropTypes from "prop-types";
import SearchResultTab from "./SearchResultTab";
import {ChevronRightIcon, SearchIcon} from "@chakra-ui/icons";


function DomesticIndexList() {

    // 搜索功能相关的组件内容
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // 各子组件显示状态
    const [isOpen, setIsOpen] = useState(false);

    const searchInputRef = useRef(null);
    const popoverContentRef = useRef(null);

    useEffect(() => {
        if (searchTerm.length >= 3) {
            mySearchFunction(searchTerm);
        }
    }, [searchTerm]);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleBlur = () => {
        // 使用setTimeout来延迟关闭，以便可以捕捉到列表项的点击事件
        setTimeout(() => {
            // 判断popover有没有获得焦点
            // 如果popover及其中的内容没有获得焦点，再关闭popover
            if (!popoverContentRef.current.contains(document.activeElement)) {
                setIsOpen(false);
            }
        }, 100);
    };

    const mySearchFunction = (term) => {
        // 这里是你的搜索逻辑
        console.log(`Searching for: ${term}`);
    };


    return (
        <Box
            marginLeft={'50px'}
            width={'100%'}
        >

            <Box
                marginLeft={'25%'}
                marginRight={'25%'}
                width={'50%'}
            >
                {/*搜索框*/}
                <Popover
                    initialFocusRef={searchInputRef}
                    isOpen={isOpen}

                >
                    <PopoverTrigger>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
                            <Input
                                type="text"
                                placeholder="搜索沪深指数..."
                                value={searchTerm}
                                onChange={handleInputChange}
                                onFocus={() => setIsOpen(true)}
                                onBlur={handleBlur}
                                ref={searchInputRef}
                            />
                        </InputGroup>
                    </PopoverTrigger>
                    <PopoverContent
                        ref={popoverContentRef}
                        onBlur={() => {setIsOpen(false)}}
                        width={'380px'}
                    >
                        <PopoverBody
                            width={'100%'}
                        >
                            <Text>
                                搜索结果展示区域：（只会在输入框内字符大于等于2时展现，生产环境中这行字会删去）
                            </Text>
                            {/*展示数据库中的指数搜索结果*/}
                            {
                                searchResults.length !== 0 ? (
                                    searchResults.map((item, index) => (
                                        <Box key={index}>
                                            {item}
                                        </Box>
                                    ))
                                ) : (
                                    <Box marginBottom={'10px'}>
                                        没有搜索结果
                                    </Box>
                                )
                            }

                            <SearchResultTab
                                icon={<ChevronRightIcon w={5} h={5} />} name={'在tushare数据源中查询'}
                                link={'/panel/v1'} newTab={true}
                            />
                            <Divider />
                            <SearchResultTab
                                icon={<ChevronRightIcon w={5} h={5} />} name={'爬取新指数'}
                                link={'/panel/v1'} newTab={true}
                            />

                        </PopoverBody>

                    </PopoverContent>
                </Popover>
            </Box>


        </Box>
    )
}

export default DomesticIndexList;
