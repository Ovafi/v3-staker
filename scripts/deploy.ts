import { ethers } from "hardhat";

// mainnet
const UNIV3_FACTORY = "0x1F98431c8aD98523631AE4a59f267346ea31F984";
const UNIV3_NFT_POSITION_MANAGER = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";

export async function deploy(
): Promise<string> {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying Liquidity contract with signer:", deployer.address);

  const ContractSource = await ethers.getContractFactory("UniswapV3Staker");
  const deployedContract = await ContractSource.deploy(UNIV3_FACTORY, UNIV3_NFT_POSITION_MANAGER, 10 ,10);

  await deployedContract.waitForDeployment();

  console.log("Contract deployed at:", await deployedContract.getAddress());
  return await deployedContract.getAddress();
}

deploy().catch((error) => {
  console.error("Deployment failed ->", error);
});