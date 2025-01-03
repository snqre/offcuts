import { useState } from "react";
import { useEffect } from "react";

export type Device = 
    | "DEVICE.LAPTOP"
    | "DEVICE.TABLET"
    | "DEVICE.MOBILE";

export function useDevice(): Device {
    let [device, setDevice] = useState<Device>("DEVICE.LAPTOP");

    useEffect(() => {
        function resize(): void {
            if (window.innerWidth >= 1024) setDevice("DEVICE.LAPTOP");
            else if (window.innerWidth >= 768) setDevice("DEVICE.TABLET");
            else if (window.innerWidth >= 320) setDevice("DEVICE.MOBILE");
            else return;
        }

        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    return device;
}