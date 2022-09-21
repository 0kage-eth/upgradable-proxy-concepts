import { ethers, network, deployments, getNamedAccounts } from "hardhat"
import { networkConfig, developmentChains } from "../helper-hardhat-config"
import { verify } from "../utils/verify"
import "dotenv/config"

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

const deployBox = async () => {
    const { deployer } = await getNamedAccounts()

    const { deploy, log } = deployments

    const numConfirmations = networkConfig[network.config.chainId!].blockConfirmations

    log("Deploying Box Contract....")

    const tx = await deploy("Box", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: numConfirmations,
        proxy: {
            proxyContract: "OpenZeppelinTransparentProxy",
            viaAdminContract: {
                name: "BoxProxyAdmin",
                artifact: "BoxProxyAdmin",
            },
        },
    })

    if (!developmentChains.includes(network.name) && ETHERSCAN_API_KEY) {
        log("detected a non-local chain. Verifying contract...")
        await verify("Box", [])
    }
}

export default deployBox

deployBox.tags = ["all", "box"]
