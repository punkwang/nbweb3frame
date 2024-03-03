import {ValidationArguments} from "class-validator";
import {Web3} from "web3";
import {SiweMessage} from "siwe";

export function verify64BytesString(hex: string): boolean {

    // 檢查是否有0x開頭
    if (hex.startsWith('0x')) {
        hex = hex.slice(2);
    }

    if (typeof hex !== 'string') {
        return false;
    }
    if (hex.length < 64) {
        return false;
    }

    const hexRegex = /^[0-9a-fA-F]+$/;
    if (!hexRegex.test(hex)) {
        return false;
    }

    return true;
}

export async function validateSignature(address: string, nonce: string, body: string, signature: string): Promise<boolean> {

    if (signature.length < 3) {
        console.log(1)
        return false;
    }
    if (!verify64BytesString(signature)) {
        console.log(2)
        return false;
    }

// const sessionNonce = this.sessionService.getValue('nonce');
    if (!body || body.length == 0) {
        console.log(3)
        return false;
    }

    if (!address || address.length == 0) {
        console.log(4)
        return false;
    }
    const message = new SiweMessage(body);
    if (message.nonce != nonce) {
        return false;
    }
    if (message.address != address) {
        return false;
    }
    try {
        const web3 = new Web3();

        return web3.eth.accounts.recover(body, signature) === address;
    } catch (e) {
        console.log(e)
    }
    return false;
}