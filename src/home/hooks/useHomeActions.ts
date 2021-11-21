import {ethers} from "ethers";
import abiJSON from "../../utils/testContract.json"
import {useEffect, useState} from "react";
import { useBoolean } from "@chakra-ui/react";
import {useDidUpdate} from "../../common/hooks/useDidUpdate";

export const useHomeActions = (isCurrentAccount: boolean) => {
    const contractAddr = "0x5B9c5f95a616cAEf12135D3899499fc3aDeaB900";
    const contractABI = abiJSON.abi

    const [comments, setComments] = useState<Array<any>>()
    const [newComment, setNewComment] = useState<string>("")
    const [isMiningTnx, setIsMiningTnx] = useBoolean(false)

    const getAllComments = async() => {
        try {
            const { ethereum } = window as any;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const commentPortalContract = new ethers.Contract(contractAddr, contractABI, signer);
                // Call the getAllWaves method from your Smart Contract
                const comments = await commentPortalContract.getAllComments();
                /*
                 * We only need address, timestamp, and message in our UI so let's
                 * pick those out
                 */
                let commentsCleaned: Array<any> = [];
                comments.forEach((comment:any) => {
                    commentsCleaned.push({
                        sender: comment.sender,
                        timestamp: new Date(comment.timestmap * 1000),
                        message: comment.message
                    });
                });

                /*
                 * Store our data in React State
                 */
                setComments(commentsCleaned);
            } else {
                console.log("Ethereum object doesn't exist!")
            }
        } catch (error) {
            // console.log(error);
        }
    }

    const comment = async () => {
        try {
            const { ethereum } = window as any;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const testContract = new ethers.Contract(contractAddr, contractABI, signer);

                let count = await testContract.getTotalComments();
                // console.log("Retrieved total wave count...", count.toNumber());

                /*
                * Execute the actual wave from your smart contract
                */
                const commentTxn = await testContract.comment(newComment, {gasLimit: 300000 });
                // console.log("Mining...", commentTxn.hash);
                setIsMiningTnx.on()

                await commentTxn.wait();
                // console.log("Mined -- ", commentTxn.hash);
                setIsMiningTnx.off()
                setNewComment("")

                count = await testContract.getTotalComments();
                // console.log("Retrieved total wave count...", count.toNumber());

            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            // console.log(error)

        }
    }

    useEffect(() => {
        let testContract: any;
        const onNewWave = (from:string, timestamp:any, message:string) => {
            console.log('new comment', from, timestamp, message);
            setComments((prevState:any) => [
                ...prevState,
                {
                    address: from,
                    timestamp: new Date(timestamp * 1000),
                    message: message,
                },
            ]);
        };

        const { ethereum } = window as any
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();

            testContract = new ethers.Contract(contractAddr, contractABI, signer);
            testContract.on('NewComment', onNewWave);
        }

        return () => {
            if (testContract) {
                testContract.off('NewComment', onNewWave);
            }
        };
    }, [])

    useEffect(() => {
        getAllComments()
    }, [])

    useDidUpdate(() => {
        if(isCurrentAccount){
            getAllComments()
        }
    }, [isCurrentAccount])

    return {
        newComment, setNewComment, isMiningTnx,
        comment, comments
    }
}
