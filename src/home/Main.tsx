import {Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import {useCheckWallet} from "./hooks/useCheckWallet";
import {useHomeActions} from "./hooks/useHomeActions";

const Main = () => {
    const { connectWallet, currentAccount } = useCheckWallet();
    const { wave } = useHomeActions();

    return (
        <Flex flexDir="column" px={5}>
            <Text pt={8} textAlign="center" fontFamily="Montserrat" fontSize="5xl" fontWeight="450">Vlad's decentralized home</Text>
            {!currentAccount &&
                <Button mt={5} size="lg" colorScheme="purple" w="300px" alignSelf="center" onClick={connectWallet}>Connect Wallet</Button>
            }
            {currentAccount &&
                <Button mt={5} size="lg" colorScheme="teal" w="300px" alignSelf="center" onClick={wave}>Wave at Vlad</Button>

            }
        </Flex>
    );
};

export default Main;
