'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState, useRef } from "react";
import dynamic from 'next/dynamic'
import Form from 'next/form';
import { pagination } from '../../app/lib/actions'
//import CountPage from '../../app/CountPage'
//import io from 'socket.io-client';

//const socket = io('ws://localhost:3456')
const options = {
    root: null,
    rootMargin: "100px",
    threshold: 1.0,
}
const config = {
    attributes: true,
    childList: true,
    subtree: true,
};


const MOComponent = () => {
    const router = useRouter()
    const path = usePathname()
    const searchParams = useSearchParams()
    const [page, setPage] = useState(0);
    const currentViewtype = searchParams.get('viewtype')
    //const currentPage = searchParams.get('page')
    const ref = useRef(null)
    let add = false
    if (!path.includes('items')) {
        add = true
    }

    const callbackFunction = useCallback(async (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        if (entry.isIntersecting && add) {
            //const page = Number(currentPage) + 1
            //router.push(`?viewtype=${currentViewtype}&page=${page}`, { scroll: false });
            //socket.emit('addPage')
            console.log('input button')
            /*setPage((page) => {
                const newPage = page + 1
                return newPage
            })*/
        } else {
            console.log('output button')
        }
    }, []);
    // Колбэк-функция при срабатывании мутации
    const callback = function (mutationsList: any, observer: any) {
        const paragraphs = document.querySelectorAll('button')
        console.log('paragraphs', paragraphs)
        const observerIO = new IntersectionObserver(callbackFunction, options);
        paragraphs.forEach(el => {
            //el.style.color = 'blue';
            observerIO.observe(el);
        });
        for (let mutation of mutationsList) {
            if (mutation.type === "childList") {
                console.log("A child node has been added or removed.");
            } else if (mutation.type === "attributes") {
                console.log("The " + mutation.attributeName + " attribute was modified.");
            }
        }
    };
    useEffect(() => {
        //socket.emit('addPage')
        const observer = new MutationObserver(callback)
        //const observer = new IntersectionObserver(callbackFunction, options);
        const el = document.querySelector("ol") as HTMLElement;
        console.log('el', el)
        observer.observe(el, config);
        //socket.on('page', data => {
        //router.refresh()
        //})
        return () => {
            observer.disconnect();
            //socket.off('page')
        };

    }, [])
    useEffect(() => {
        //serverActions Post request nasa fetch add
        router.push(`?viewtype=${currentViewtype}&page=${page}`, { scroll: false });
        //router.refresh()
    }, [page])
    return <p ref={ref}></p>
    /*return <Form action={pagination} ref={ref}>
        <input type='number' name='page' value={page} hidden></input>
        <button type="submit"></button>
    </Form>*/
    //(<></>)
}
export default MOComponent
//export default dynamic(() => Promise.resolve(IOComponent), { ssr: false });