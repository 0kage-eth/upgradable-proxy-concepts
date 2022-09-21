import { ethers, getNamedAccounts, network, deployments } from "hardhat"
import { developmentChains, networkConfig } from "../helper-hardhat-config"
import { verify } from "../utils/verify"

const deployBoxV2 = async () => {
    const { deployer } = await getNamedAccounts()
    const { deploy, log } = deployments

    const chainId = network.config.chainId || "31337"
    const networkConfirmations = networkConfig[chainId].blockConfirmations
    log("Deploying Box V2 contract")
    log("-----------------------------")

    const tx = await deploy("BoxV2", {
        from: deployer,
        args: [],
        waitConfirmations: networkConfirmations,
        log: true,
    })

    if (!developmentChains.includes(network.name)) {
        await verify("BoxV2", [])
    }

    log("BoxV2 successfully deployed")
}

export default deployBoxV2

deployBoxV2.tags = ["all", "boxV2"]
