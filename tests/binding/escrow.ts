import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const deposit_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
const release_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
export class Escrow {
    address: string | undefined;
    constructor(address: string | undefined = undefined) {
        this.address = address;
    }
    get_address(): att.Address {
        if (undefined != this.address) {
            return new att.Address(this.address);
        }
        throw new Error("Contract not initialised");
    }
    async get_balance(): Promise<att.Tez> {
        if (null != this.address) {
            return await ex.get_balance(new att.Address(this.address));
        }
        throw new Error("Contract not initialised");
    }
    async deploy(params: Partial<ex.Parameters>) {
        const address = (await ex.deploy("./contracts/escrow.arl", {}, params)).address;
        this.address = address;
    }
    async deposit(params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "deposit", deposit_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async release(params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "release", release_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_deposit_param(params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "deposit", deposit_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_release_param(params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "release", release_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_value(): Promise<att.Tez> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.Tez.from_mich(storage);
        }
        throw new Error("Contract not initialised");
    }
    errors = {
        INVALID_CALLER: att.string_to_mich("\"INVALID_CALLER\""),
        r0: att.string_to_mich("\"Expected more than 0tz\"")
    };
}
export const escrow = new Escrow();
