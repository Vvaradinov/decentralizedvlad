import {ethers} from "ethers";
import abiJSON from "../../utils/testContract.json"

export const useHomeActions = () => {
    const contractAddr = "0xF6ac878D6DB2D8ef759dc6e101BAF2DC74B6B4d5";
    const contractABI = abiJSON.abi

    const wave = async () => {
        try {
            const { ethereum } = window as any;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const testContract = new ethers.Contract(contractAddr, contractABI, signer);

                let count = await testContract.getTotalWaves();
                console.log("Retrieved total wave count...", count.toNumber());

                /*
                * Execute the actual wave from your smart contract
                */
                const waveTxn = await testContract.wave();
                console.log("Mining...", waveTxn.hash);

                await waveTxn.wait();
                console.log("Mined -- ", waveTxn.hash);

                count = await testContract.getTotalWaves();
                console.log("Retrieved total wave count...", count.toNumber());



            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error)

        }
    }


    return {
        wave
    }
}
