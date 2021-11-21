import {Badge, Flex, Link, Spacer, Text } from '@chakra-ui/react';
import React from 'react';
import {formatDate} from "../../../utils/functions";

type Props = {
    comment: any
}

const CommentCard = ({ comment }: Props) => {
    return (
        <Flex borderRadius={5} bgColor="teal.400"
              w="100%" maxW="900px" alignSelf="center" my={2} p={5}>
            <Flex flexDir="column" my="auto">
                <Text textColor="white" fontFamily="Montserrat">{comment.message}</Text>
                <Text textColor="white" fontSize="xs">
                    Posted by <Link isExternal href={`https://rinkeby.etherscan.io/address/${comment.sender}`}>{comment.sender}</Link>
                </Text>
            </Flex>
            <Spacer/>
            <Badge my="auto" p={1} colorScheme="red">{formatDate(comment.timestamp)}</Badge>
        </Flex>
    );
};

export default CommentCard;
