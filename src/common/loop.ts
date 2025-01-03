import { require } from "reliq";

const _MAX_ITER: bigint = 2000000n;

export type Loop = {
    checkMaxIter(length: bigint): void;
};

export const Loop: Loop = (() => {
    /** @constructor */ {
        return { checkMaxIter };
    }

    function checkMaxIter(... [length]: Parameters<Loop["checkMaxIter"]>): ReturnType<Loop["checkMaxIter"]> {
        require(length <= _MAX_ITER, "LOOP.ERR_LENGTH_ABOVE_MAX_ITER");
        require(length >= 0, "LOOP.ERR_LENGTH_BELOW_ZERO");
        return;
    }
})();