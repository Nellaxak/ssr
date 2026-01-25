'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState, useRef } from "react";
import dynamic from 'next/dynamic'
//import { notIO } from '../../app/lib/actions'

const options = {
    root: null,//document.querySelector("#scrollArea"),
    rootMargin: "0px 0px 10px 0px",//-px not work?
    //scrollMargin: "-80px",//footer height
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
    const searchParams = useSearchParams()
    const [page, setPage] = useState(0);
    //const [scroll, setScroll] = useState(0);

    const currentViewtype = searchParams.get('viewtype')
    //const currentPage = searchParams.get('page')
    const ref = useRef(null)
    /*if (!path.includes('items')) {
        add = true
    }*/

    callbackFunction = useCallback(async (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        if (entry.isIntersecting) {// && add) {
            //console.log('input')
            setPage((page) => {
                let newPage = page + 1
                return newPage
            })
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
        router.push(`/categories?viewtype=${currentViewtype}&page=${page}`, { scroll: false });
        const elem = document.querySelector('ol').firstElementChild
        if (elem) {
            elem.scrollIntoView({
                behavior: 'smooth', // Optional: animation effect
                block: 'start', // Vertical alignment (MANDATORY for vertical scroll)
                inline: 'nearest' // Horizontal alignment
            })
        }
        /*const elem = document.querySelector('ol')
        elem.scrollIntoView(true)/*{//mount scroll to center
            behavior: 'smooth', // Optional: smooth or auto
            block: 'center',    // Required for vertical centering
            //inline: 'center'    // Optional: for horizontal centering
        })*/
    }, [page])
    return <p ref={ref}></p>
}
//export default IOComponent
export default dynamic(() => Promise.resolve(IOComponent), { ssr: false });