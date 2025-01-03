import type { AxiosResponse } from "axios";
import { default as Axios } from "axios";
import { z as ZodValidator } from "zod";
import { ProductDataSchema } from "@common";
import { ProductData } from "@common";
import { require } from "reliq";
import * as React from "react";

export function useTags(): Array<string> {
    let [_tags$, _setTags] = React.useState<Array<string>>([]);

    React.useEffect(() => {
        (async () => {
            let products: Array<ProductData> = (await _products());
            _setTags((_tags(products)));
            return;
        })();
        return;
    }, []);

    return _tags$;
}

export function useSortedProducts(): Map<string, Array<ProductData> | undefined> {
    let [_map, _setMap] = React.useState<Map<string, Array<ProductData> | undefined>>(new Map());
    let _tags: Array<string> = useTags();

    React.useEffect(() => {
        (async () => {
            /// WARNING Not an optimal solution for large amounts of products but should be
            ///         enough for the time being.
            let products: Array<ProductData> = (await _products());
            _setMap((_sort(products, _tags)));
            return;
        })();
        return;
    }, []);

    return _map;
}

function _sort(products: Array<ProductData>, tags: Array<string>): Map<string, Array<ProductData> | undefined> {
    let map: Map<string, Array<ProductData>> = new Map();
    tags.forEach(tag => map.set(tag, []));
    products.forEach(product => {
        product.tags.forEach(tag => {
            let set: Array<ProductData> = map.get(tag) || [];
            set.push(product);
            map.set(tag, set);
            return;
        });
        return;
    });
    return map;
}

function _tags(products: Array<ProductData>): Array<string> {
    let result: Array<string> = [];
    let i: bigint = 0n;
    while (i < products.length) {
        let product: ProductData = products[Number(i)];
        let x: bigint = 0n;
        while (x < product.tags.length) {
            let tag: string = product.tags[Number(x)];
            if (!result.includes(tag)) result.push(tag);
            x++;
        }
        i++;
    }
    return result;
}

async function _products(): Promise<Array<ProductData>> {
    let response: AxiosResponse = await Axios.get("/products");
    let data: unknown = response.data;
    let match: boolean = ZodValidator.array(ProductDataSchema).safeParse(data).success;
    require(match, "NAV.ERR_INVALID_RESPONSE");
    return (data as Array<ProductData>);
}