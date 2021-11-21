import * as React from "react"
import {
    ChakraProvider, extendTheme, Flex, Text,
} from "@chakra-ui/react"
import {default as HomeMain} from "./home/Main"
import {FaDiscord, FaLinkedin, FaTwitter} from "react-icons/all";
import {SocialButton} from "./common/SocialButton";


const theme = extendTheme({
    fonts: {
        heading: "Montserrat, Karla"
    }
})

const socialLinks:Array<any> = [
    {label: "Twitter", icon: <FaTwitter/>, href: "https://twitter.com/vladfortech", color: "#1DA1F2"},
    {label: "Linkedin", icon: <FaLinkedin/>, href: "https://www.linkedin.com/in/vladislav-varadinov/", color: "#0e76a8"}
]
export const App = () => (


    <ChakraProvider theme={theme}>
        <Text fontFamily="Montserrat" fontStyle="italic" position="absolute" top={2} left={2}>Connect with me</Text>
        <Flex position="absolute" top={9} left={5}>
            {socialLinks.map((link:any) =>
                <SocialButton mx={1} bg={link.color} cursor="pointer" href={link.href}>
                    {link.icon}
                </SocialButton>
            )}
        </Flex>

      <HomeMain/>

    </ChakraProvider>
)
