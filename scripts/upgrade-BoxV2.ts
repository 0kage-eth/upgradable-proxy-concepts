import { ethers, network, getNamedAccounts } from "hardhat"
import { Box, BoxV2 } from "../typechain-types"
/**
 * @notice this script allows us to upgrade implementation
 * @notice proxy contract will now have new implementation
 */

const upgradeImplementation = async () => {
    const { deployer, nftOwner1 } = await getNamedAccounts()

    const boxProxyAdmin = await ethers.getContract("BoxProxyAdmin", deployer)
    const boxProxy = await ethers.getContract("Box_Proxy")

    const boxContract1: Box = await ethers.getContractAt("Box", boxProxy.address)

    let version = await boxContract1.version()
    console.log(`Version before updating implementation: ${version.toString()}`)

    const boxV2 = await ethers.getContract("BoxV2")
    const upgradeTx = await boxProxyAdmin.upgrade(boxProxy.address, boxV2.address)
    await upgradeTx.wait(1)

    const boxContract2: BoxV2 = await ethers.getContract("BoxV2", boxProxy.address)
    version = await boxContract2.version()
    console.log(`Version after upgrade implementation: ${version}`)
}

upgradeImplementation()
    .then(() => {
        console.log(" Implementation contract upgraded to V2")
        process.exit(0)
    })
    .catch((e) => {
        console.log("error while upgrading implementation")
        console.error(e)
        process.exit(1)
    })
