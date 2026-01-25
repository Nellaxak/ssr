'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState, useRef } from "react";
import dynamic from 'next/dynamic'
import styles from "./page.module.css";

//import { notIO } from '../../app/lib/actions'

const options = {
    root: null,//document.querySelector("#scrollArea"),
    rootMargin: "0px 0px 10px 0px",//-px not work?
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
const IOComponentTop = () => {
    const router = useRouter()
    //path = usePathname()
    const searchParams = useSearchParams()
    const currentPage = searchParams.get('page')
    const [page, setPage] = useState(Number(currentPage));
    //const [scroll, setScroll] = useState('start');

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
                let newPage = page - 1
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
        const elem = document.querySelector('ol').lastElementChild
        //console.log('elem scrollIntoView', elem)
        if (elem) {
            elem.scrollIntoView({
                behavior: 'smooth', // Optional: animation effect
                block: 'end', // Vertical alignment (MANDATORY for vertical scroll)
                inline: 'nearest' // Horizontal alignment
            })
        }
    }, [page])
    //className={styles.main_footer}
    return <p ref={ref} ></p>
}
//export default IOComponent
export default dynamic(() => Promise.resolve(IOComponentTop), { ssr: false });