import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select,
    Stack,
    Table,
    Tbody, Td,
    Th,
    Thead,
    Tr, useDisclosure, useToast, VStack
} from "@chakra-ui/react";
import {useState} from "react";
import axios from 'axios';


function CreateRecord(){

    const [selectedFiles, setSelectedFiles] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [taskId, setTaskId] = useState(null);
    const [analyzedRecords, setAnalyzedRecords] = useState([]);
    const [uploadButtonText, setUploadButtonText] = useState("上传");

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };

    const handleUpload = async () => {
        if (!selectedFiles) {
            alert("请首先选择要上传的图片!");
            return;
        }

        const formData = new FormData();
        setUploading(true);
        setUploadButtonText("正在上传图片")
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('images', selectedFiles[i]);
        }

        try {
            const response = await axios.post('/alpharecord/create_records', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // console.log(response.data);
            setTaskId(response.data.task_id);
            setUploadButtonText("准备解析记录");
            checkTaskStatus(response.data.task_id);
        } catch (error) {
            console.error("There was an error uploading the files!", error);
            setUploading(false);
            setUploadButtonText("上传")
        }
    }

    const checkTaskStatus = (taskId) => {
        const interval = setInterval(async () => {
            try {
                const response = await axios.get(
                    `/domestic/tasks/check-task-status?task_id=${taskId}`);
                // console.log(response.data); // 输出返回内容到console

                if (response.data.state === 'SUCCESS') {
                    clearInterval(interval); // 清除定时器
                    setAnalyzedRecords(response.data.result.transaction_results);
                    setUploading(false);
                    setUploadButtonText("上传")
                }else if(response.data.state === 'FAILURE'){
                    alert("解析任务执行失败，请检查后端运行情况。")
                    setUploading(false);
                    setUploadButtonText("上传")
                }else if(response.data.state === 'PROGRESS'){
                    setUploadButtonText(response.data.result.progress);
                }

            } catch (error) {
                console.error("There was an error checking the task status!", error);
                clearInterval(interval); // 清除定时器
                setUploading(false);
                setUploadButtonText("上传")
            }
        }, 2500);
    }


    // 页面内编辑交易记录相关state和函数
    const [editingRecord, setEditingRecord] = useState(null);
    const {isOpen: isEditRecordModalOpen, onOpen: onEditRecordModelOpen, onClose: onEditRecordModalClose} = useDisclosure();
    const toast = useToast();

    const handleEditRecord = (record) => {
        setEditingRecord({ ...record });
        onEditRecordModelOpen();
    };

    const handleSaveRecord = () => {
        const updatedRecords = analyzedRecords.map(record => {
                if (record !== editingRecord) {
                    return { ...editingRecord };
                }else{
                    return record;
                }
            }
        );
        setAnalyzedRecords(updatedRecords);
        onEditRecordModalClose();
        toast({
            title: "记录已更新",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };

    return (
        <Flex>
            <VStack width={'1100px'}>
                <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p="6">
                    <FormControl>
                        <FormLabel>Select images to upload</FormLabel>
                        <Input type="file" multiple onChange={handleFileChange} />
                    </FormControl>
                    <Stack spacing={4} mt={4}>
                        <Button colorScheme="teal" onClick={handleUpload} isDisabled={uploading}>
                            {uploadButtonText}
                        </Button>
                    </Stack>
                </Box>
                <Box w={'1100px'} marginTop={'20px'}>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>No.</Th>
                                <Th>基金代码及名称</Th>
                                <Th>交易类型</Th>
                                <Th>交易时间</Th>
                                <Th>交易金额、份额与净值</Th>
                                <Th>手续费</Th>
                                <Th>操作</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {analyzedRecords.map((record, index) => (
                                <Tr key={index}>
                                    <Td>{index + 1}</Td>
                                    <Td>
                                        <VStack alignItems="flex-start">
                                            <Box>
                                                <span>{record.ts_code}</span>
                                                <br />
                                            </Box>
                                            <Box>
                                                <span>{record.fund_database_name}</span>
                                            </Box>
                                        </VStack>
                                    </Td>
                                    <Td>{record.type}</Td>
                                    <Td>{record.time}</Td>
                                    <Td>
                                        <VStack alignItems="flex-start">
                                            <Box>
                                                <span>{record.amount}</span>
                                                <br />
                                            </Box>
                                            <Box>
                                                <span>{record.shares},{record.nav}</span>
                                            </Box>
                                        </VStack>
                                    </Td>
                                    <Td>{record.fee}</Td>
                                    <Td>
                                        <Button size="sm" colorScheme="blue" onClick={() => handleEditRecord(record)}>
                                            编辑
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </VStack>

            <Modal isOpen={isEditRecordModalOpen} onClose={onEditRecordModalClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>编辑交易记录</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>基金代码</FormLabel>
                            <Input value={editingRecord?.ts_code || ''} onChange={(e) => setEditingRecord({ ...editingRecord, ts_code: e.target.value })} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>数据源中基金名称</FormLabel>
                            <Input value={editingRecord?.fund_database_name || ''} onChange={(e) => setEditingRecord({ ...editingRecord, fund_database_name: e.target.value })} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>交易平台</FormLabel>
                            <Input value={editingRecord?.platform || ''} onChange={(e) => setEditingRecord({ ...editingRecord, platform: e.target.value })} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>交易时间</FormLabel>
                            <Input value={editingRecord?.time || ''} onChange={(e) => setEditingRecord({ ...editingRecord, time: e.target.value })} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>交易金额</FormLabel>
                            <Input value={editingRecord?.amount || ''} onChange={(e) => setEditingRecord({ ...editingRecord, amount: e.target.value })} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>交易份额</FormLabel>
                            <Input value={editingRecord?.shares || ''} onChange={(e) => setEditingRecord({ ...editingRecord, shares: e.target.value })} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>份额净值</FormLabel>
                            <Input value={editingRecord?.nav || ''} onChange={(e) => setEditingRecord({ ...editingRecord, nav: e.target.value })} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>交易费用</FormLabel>
                            <Input value={editingRecord?.fee || ''} onChange={(e) => setEditingRecord({ ...editingRecord, fee: e.target.value })} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>交易类型</FormLabel>
                            <Select defaultValue={editingRecord?.type || 'none'}>
                                <option value={'buy'}>买入</option>
                                <option value={'sell'}>卖出</option>
                                <option value={'auto_invest'}>定投</option>
                                <option value={'dividend'}>分红</option>
                            </Select>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSaveRecord}>
                            保存
                        </Button>
                        <Button variant="ghost" onClick={onEditRecordModalClose}>
                            取消
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Flex>
    )
}


export default CreateRecord;
