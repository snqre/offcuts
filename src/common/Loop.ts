import { require } from "reliq";

const _MAX_ITER: bigint = 2000000n;

export type LoopError =
    | "LOOP.ERR_LENGTH_ABOVE_MAX_ITER"
    | "LOOP.ERR_LENGTH_BELOW_ZERO";

export type Loop = {
    checkMaxIter(length: bigint): void;
};

export const Loop: Loop = (() => {
    /** @constructor */ {
        return {
            checkMaxIter
        };
    }

    function checkMaxIter(... [length]: Parameters<Loop["checkMaxIter"]>): ReturnType<Loop["checkMaxIter"]> {
        require<LoopError>(length <= _MAX_ITER, "LOOP.ERR_LENGTH_ABOVE_MAX_ITER");
        require<LoopError>(length >= 0, "LOOP.ERR_LENGTH_BELOW_ZERO");
        return;
    }
})();