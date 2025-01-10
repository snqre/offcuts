export type ClientShowRoomTag = {
    get(): string | null;
    set(tag: string): void;
};

export function ClientShowRoomTag(): ClientShowRoomTag;
export function ClientShowRoomTag(_tag: string | null): ClientShowRoomTag;
export function ClientShowRoomTag(
    _args0?: string | null
): ClientShowRoomTag {
    let _tag: string | null;

    /** @constructor */ {
        _tag ??= null;
        return { get, set };
    }

    function get(): string | null {
        return _tag;
    }

    function set(tag: string): void {
        _tag = tag;
        return;
    }
}