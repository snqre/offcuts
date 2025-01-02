export function require<T extends string>(condition: boolean, errcode?: T): asserts condition {
    if (condition === false) throw Error(errcode);
    return;
}