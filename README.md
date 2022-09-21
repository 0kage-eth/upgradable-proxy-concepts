# UPGRADE-PROXY-EXAMPLE


1. Upgrade Box to BoxV2 contract in proxy contract
2. Proxy contract -> initially points to -> Box
3. We will learn how to upgrade implementation from Box -> BoxV2. So the implementation contract that Proxy points to will be BoxV2
4. There are 3 ways of doing this
    - First is to do this manually
    - Second is to use Hardhat built-in support for upgradeable proxy
    - Thirs, we use Open Zeppelin contracts

