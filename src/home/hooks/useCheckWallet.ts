import {useEffect, useState} from "react";


export const useCheckWallet = () => {
    const [currentAccount, setCurrentAccount] = useState<string>("");

    const checkIfWalletConnected = async() => {
        const { ethereum  } = window as any
        try {
            if (!ethereum) {
                alert("Get MetaMask you pleb :P!");
                // console.log("Make sure you to have metamask!")
                return;
            } else {
                // console.log("We have an ether object", ethereum)
            }

            /*
             * Check if we're authorized to access the user's wallet
             */
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            if (accounts.length !== 0) {
                const account = accounts[0];
                // console.log("Found an authorized account:", account);
                setCurrentAccount(account)
            } else {
                // console.log("No authorized account found")
            }


        } catch (error:any) {
            alert("An error occurred connecting your wallet");
        }
    }

    const connectWallet = async() => {
        try {
            const { ethereum } = window as any;

            if (!ethereum) {
                alert("Get MetaMask you pleb :P!");
                return;
            }

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });

            // console.log("Connected", accounts[0]);
            setCurrentAccount(accounts[0]);
        } catch (error) {
            alert("An error occurred connecting your wallet");
        }
    }

    useEffect(() => {
        checkIfWalletConnected()
    }, [])

    return {
        currentAccount,
        connectWallet
    }
}
