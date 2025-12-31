'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState, useRef } from "react";
import dynamic from 'next/dynamic'
//import { notIO } from '../../app/lib/actions'

const options = {
    root: null,
    rootMargin: "100px",
    threshold: 1.0,
}
let router: any
let path: any
let searchParams: any
let currentViewtype: any
let ref: any
let add = false
let callbackFunction: any
const IOComponent = () => {
    router = useRouter()
    path = usePathname()
    searchParams = useSearchParams()
    const [page, setPage] = useState(0);
    currentViewtype = searchParams.get('viewtype')
    //const currentPage = searchParams.get('page')
    ref = useRef(null)
    if (!path.includes('items')) {
        add = true
    }

    callbackFunction = useCallback(async (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        if (entry.isIntersecting && add) {
            //console.log('add page')
            setPage((page) => {
                let newPage = page + 1
                return newPage
            })
            //console.log('isIntersecting')
        } else {
            //console.log('not isIntersecting')
        }
    }, []);
    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunction, options);
        //as HTMLElement
        observer.observe(ref.current);
        return () => {
            observer.disconnect();
        };
    }, [])
    useEffect(() => {
        router.push(`/categories?viewtype=${currentViewtype}&page=${page}`, { scroll: true });
        //router.refresh()
    }, [page])
    return <p ref={ref}></p>
}
//export default IOComponent
export default dynamic(() => Promise.resolve(IOComponent), { ssr: false });