'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect,useRef } from "react";
import dynamic from 'next/dynamic'
//import io from 'socket.io-client';

//const socket = io('ws://localhost:3456')
const options = {
    root: null,
    rootMargin: "100px",
    threshold: 1.0,
}

const IOComponent = () => {
    const router = useRouter()
    const path = usePathname()
    let add = false
    if (!path.includes('items')) {
        add = true
    }

    const callbackFunction = useCallback(async (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        //console.log('add', add)
        if (entry.isIntersecting && add) {
            //socket.emit('addPage')
        }
    }, []);
    useEffect(() => {
        //socket.emit('addPage')
        const observer = new IntersectionObserver(callbackFunction, options);
        const el = document.querySelector("#forScroll") as HTMLElement;
        observer.observe(el);
        //socket.on('page', data => {
            router.refresh()
        //})
        return () => {
            observer.disconnect();
            //socket.off('page')
        };

    }, [])
    return null//ref
    //(<></>)
}
//export default IOComponent
export default dynamic(() => Promise.resolve(IOComponent), { ssr: false });