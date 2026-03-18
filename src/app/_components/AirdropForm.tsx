"user client"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useChainId } from "wagmi"
export function AirdropForm() {
    const [tokenAddress, setTokenAddress] = useState("")
    const [recipients, setRecipients] = useState("")
    const [amount, setAmount] = useState("")
    const chainId = useChainId()
    const submit = () => {
        // 1a.If already approved,moved to step 2
        // 1b. Approve our tsender contract to send our tokens
        // 2. Call the airdrop function on the tsender contract
        // 3. Wait for the transaction to be mined

    }
    return (
        <>
            <Field>
                <FieldLabel htmlFor="input-field-TokenAddress">TokenAddress</FieldLabel>
                <Input
                    id="input-field-TokenAddress"
                    type="text"
                    placeholder="Enter your TokenAddress 0x.."
                    value={tokenAddress}
                    onChange={e => setTokenAddress(e.target.value)}
                />
            </Field>
            <Field>
                <FieldLabel htmlFor="textarea-Recipients">Recipients</FieldLabel>
                <Textarea id="textarea-Recipients" placeholder="Type your Recipients here.0xxxxx,0xbxxxxxx" value={recipients}
                    onChange={e => setRecipients(e.target.value)}
                />
            </Field>
            <Field>
                <FieldLabel htmlFor="textarea-Amount">Amount</FieldLabel>
                <Textarea id="textarea-Amount" placeholder="100,200,300" value={amount}
                    onChange={e => setAmount(e.target.value)}
                />
            </Field>
            <Button variant="outline" type="submit" onClick={submit}>click</Button>
        </>
    )
}