"use client";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  useChainId,
  useConnection,
  useWriteContract,
  useReadContracts,
  type UseReadContractsParameters,
} from "wagmi";
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import { chainsToTSender, tsenderAbi, erc20Abi } from "@/lib/contstants";
import { calculateTotal } from "@/utils/calculateTotal";
import config from "@/rainbowkitConfig";
export function AirdropForm() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [recipients, setRecipients] = useState("");
  const [amount, setAmount] = useState("");
  const chainId = useChainId();
  const connection = useConnection();
  const { mutateAsync } = useWriteContract();

  const amountTotal = useMemo(() => calculateTotal(amount), [amount]);

  const wagmigotchiContract = {
    address: tokenAddress as `0x${string}`,
    abi: erc20Abi,
  };
  const result = useReadContracts({
    contracts: [
      {
        ...wagmigotchiContract,
        functionName: "name",
      },
    ],
  });

  console.log(result, "result");

  const submit = async () => {
    const tSenderAddress = chainsToTSender[chainId].tsender;
    const approvedAmount = await getApprovedAmount(tSenderAddress);
    console.log(approvedAmount);
    if (approvedAmount < amountTotal) {
      const hash = await mutateAsync({
        abi: erc20Abi,
        functionName: "approve",
        address: tokenAddress as `0x${string}`,
        args: [tSenderAddress as `0x${string}`, BigInt(amountTotal)],
      });
      await waitForTransactionReceipt(config, {
        hash,
      });
    }
    await mutateAsync({
      abi: tsenderAbi,
      address: tSenderAddress as `0x${string}`,
      functionName: "airdropERC20",
      args: [
        tokenAddress,
        // Comma or new line separated
        recipients
          .split(/[,\n]+/)
          .map((addr) => addr.trim())
          .filter((addr) => addr !== ""),
        amount
          .split(/[,\n]+/)
          .map((amt) => amt.trim())
          .filter((amt) => amt !== ""),
        BigInt(amountTotal),
      ],
    });
    // 1a.If already approved,moved to step 2
    // 1b. Approve our tsender contract to send our tokens
    // 2. Call the airdrop function on the tsender contract
    // 3. Wait for the transaction to be mined
  };

  const getApprovedAmount = async (
    tSenderAddress: string | null
  ): Promise<number> => {
    if (!tSenderAddress) return 0;

    const response = await readContract(config, {
      abi: erc20Abi,
      functionName: "allowance",
      address: tokenAddress as `0x${string}`,
      args: [connection.address, tSenderAddress as `0x${string}`],
    });
    return response as number;
  };

  return (
    <div className="p-10 w-3xl self-center mx-auto">
      <Card className="p-10 ">
        <Field>
          <FieldLabel htmlFor="input-field-TokenAddress">
            TokenAddress
          </FieldLabel>
          <Input
            id="input-field-TokenAddress"
            type="text"
            placeholder="Enter your TokenAddress 0x.."
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="textarea-Recipients">Recipients</FieldLabel>
          <Textarea
            id="textarea-Recipients"
            placeholder="Type your Recipients here.0xxxxx,0xbxxxxxx"
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="textarea-Amount">Amount</FieldLabel>
          <Textarea
            id="textarea-Amount"
            placeholder="100,200,300"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Field>
        <Button variant="outline" type="submit" onClick={submit}>
          click
        </Button>
      </Card>
      <Card>{result.data?.[0]?.result as string}</Card>
    </div>
  );
}
