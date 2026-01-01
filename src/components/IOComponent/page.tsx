'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState, useRef } from "react";
import dynamic from 'next/dynamic'
//import { notIO } from '../../app/lib/actions'

const options = {
    root: null,//document.querySelector("#scrollArea"),
    rootMargin: "100px",//-px not work
    //scrollMargin: "-80px",
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
    const router = useRouter()
    //path = usePathname()
    searchParams = useSearchParams()
    const [page, setPage] = useState(0);
    const currentViewtype = searchParams.get('viewtype')
    //const currentPage = searchParams.get('page')
    const ref = useRef(null)
    /*if (!path.includes('items')) {
        add = true
    }*/

    callbackFunction = useCallback(async (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        if (entry.isIntersecting) {// && add) {
            console.log('input')
            /*setPage((page) => {
                let newPage = page + 1
                return newPage
            })*/
            setPage(1)
            //router.push(`/categories?viewtype=${currentViewtype}&page=${0}&scroll=down`, { scroll: true });
        } else {
            setPage(-1)
            console.log('output')
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
        router.push(`/categories?viewtype=${currentViewtype}&scroll1=${page}&page=${0}`, { scroll: true });
        //router.refresh()
    }, [page])
    return <p ref={ref}></p>
}
//export default IOComponent
export default dynamic(() => Promise.resolve(IOComponent), { ssr: false });