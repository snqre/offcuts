import { Ok } from "ts-results";
import { Err } from "ts-results";
import { Result } from "ts-results";

const _MAX_ITER = 2000000n;

export type LoopR = Result<LoopT, LoopE>;
export type LoopT = Loop;
export type LoopE =
    | "LOOP.ERR_LENGTH_ABOVE_MAX_ITER"
    | "LOOP.ERR_LENGTH_BELOW_ZERO";
export type Loop = {
    checkMaxIter(length: bigint): Result<void, LoopE>;
};
export const Loop: Loop = (() => {

    /** @constructor */ {
        return {
            checkMaxIter
        };
    }

    function checkMaxIter(... [length]: Parameters<Loop["checkMaxIter"]>): ReturnType<Loop["checkMaxIter"]> {
        if (length > _MAX_ITER) return Err("LOOP.ERR_LENGTH_ABOVE_MAX_ITER");
        if (length < 0) return Err("LOOP.ERR_LENGTH_BELOW_ZERO");
        return Ok(undefined);
    }
})();