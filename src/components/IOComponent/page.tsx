'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState, useRef } from "react";
import dynamic from 'next/dynamic'
import Form from 'next/form';
import { pagination } from '../../app/actions/pagination'
import CountPage from '../../app/CountPage'
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
    const searchParams = useSearchParams()
    const [page, setPage] = useState(0);
    const currentViewtype = searchParams.get('viewtype')
    const ref = useRef(null)
    let add = false
    if (!path.includes('items')) {
        add = true
    }

    const callbackFunction = useCallback(async (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        if (entry.isIntersecting && add) {
            //socket.emit('addPage')
            setPage((page) => {
                const newPage = page + 1
                return newPage
            })
        }
    }, []);
    useEffect(() => {
        //socket.emit('addPage')
        const observer = new IntersectionObserver(callbackFunction, options);
        //const el = document.querySelector("#forScroll") as HTMLElement;
        observer.observe(ref.current);
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
    return <p ref={ref}></p>/*<Form action={pagination} >
        <input type='number' name='id' value={0} hidden></input>
        <button type="submit"></button>
    </Form>*/
    //ref
    //(<></>)
}
//export default IOComponent
export default dynamic(() => Promise.resolve(IOComponent), { ssr: false });