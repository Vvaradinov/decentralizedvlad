import {Button, Flex, Text, Textarea } from '@chakra-ui/react';
import React from 'react';
import {useCheckWallet} from "./hooks/useCheckWallet";
import {useHomeActions} from "./hooks/useHomeActions";
import CommentCard from "./components/CommentCard/CommentCard";

const Main = () => {
    const { connectWallet, currentAccount } = useCheckWallet();
    const { comments, comment, isMiningTnx, setNewComment, newComment } = useHomeActions(currentAccount !== "");

    return (
        <Flex flexDir="column" px={5}>
            <Text pt={8} textAlign="center" fontFamily="Montserrat" fontSize="5xl" fontWeight="500">👋 Vlad's decentralized home 🔥</Text>
            <Text pt={1} textAlign="center" fontFamily="Karla" fontSize="lg" > Currently on Ethereum Rinkeby Test Net</Text>
            {!currentAccount &&
                <Button mt={5} size="lg" colorScheme="purple" w="300px" alignSelf="center" onClick={connectWallet}>Connect Wallet</Button>
            }
            {currentAccount &&
                <>
                    <Textarea placeholder="Let Vlad know what's on your mind..."
                              isFullWidth={false} value={newComment} mt={5}
                              onChange={e => setNewComment(e.target.value)} isDisabled={isMiningTnx}
                              size="lg" maxWidth="600px" alignSelf="center"/>
                    <Button mt={5} size="lg" colorScheme="teal" w="300px"
                            isDisabled={newComment?.length === 0}
                            alignSelf="center" isLoading={isMiningTnx} loadingText="Posting Comment" onClick={comment}>Comment</Button>

                    <Flex flexDir="column" mt={16}>
                        {comments && comments.map((i:any, key:number) =>
                            <CommentCard key={key} comment={i}/>
                        )}
                    </Flex>
                </>
            }
        </Flex>
    );
};

export default Main;
