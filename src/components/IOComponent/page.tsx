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
    const [scrollDirection, setScroll] = useState('start');//set in url

    const currentViewtype = searchParams.get('viewtype')
    //const currentPage = searchParams.get('page')
    const ref = useRef(null)
    /*if (!path.includes('items')) {
        add = true
    }*/
    const handleScroll = useCallback(async () => {
        let maxScrollTop = window.scrollY
        console.log('www', window.scrollX)
        //let maxScrollBottom = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
        //console.log('maxScrollTop', maxScrollTop)
        if (maxScrollTop <= 0) {
            setPage((page) => {
                let newPage = page - 1
                return newPage
            })
            setScroll('top')
        }
    }, [])
    callbackFunction = useCallback(async (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        if (entry.isIntersecting) {// && add) {
            //console.log('input')
            setPage((page) => {
                let newPage = page + 1
                return newPage
            })
            setScroll('bottom')
        }
    }, []);
    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunction, options);
        //as HTMLElement
        document.addEventListener('scrollend', handleScroll)

        observer.observe(ref.current);
        return () => {
            observer.disconnect();
            document.removeEventListener('scrollend', handleScroll)
        };
    }, [])
    useEffect(() => {
        router.push(`/categories?viewtype=${currentViewtype}&page=${page}&scroll=${scrollDirection}`, { scroll: false });
        //console.log('elem scrollIntoView', elem)
        const elem = document.querySelector('ol')//lastElementChild

        if (elem && page > 0 && scrollDirection === 'bottom') {//scrollDirection
            const el = elem.firstElementChild
            el.scrollIntoView({
                behavior: 'smooth', // Optional: animation effect
                block: 'start', // Vertical alignment (MANDATORY for vertical scroll)
                inline: 'start' // Horizontal alignment nearest
            })
        } else if (elem && page > 0 && scrollDirection === 'top') {
            const el = elem.lastElementChild
            el.scrollIntoView({
                behavior: 'smooth', // Optional: animation effect
                block: 'end', // Vertical alignment (MANDATORY for vertical scroll)
                inline: 'start' // Horizontal alignment nearest
            })
        }
    }, [page])
    return <p ref={ref}></p>
}
//export default IOComponent
export default dynamic(() => Promise.resolve(IOComponent), { ssr: false });