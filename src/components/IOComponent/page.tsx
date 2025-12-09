'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState, useRef } from "react";
import dynamic from 'next/dynamic'
//import CountPage from '../../app/CountPage'

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
    //const currentPage = searchParams.get('page')
    const ref = useRef(null)
    let add = false
    if (!path.includes('items')) {
        add = true
    }

    const callbackFunction = useCallback(async (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        if (entry.isIntersecting && add) {
            console.log('add page')
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
        router.push(`?viewtype=${currentViewtype}&page=${page}`, { scroll: false });
        router.refresh()
    }, [page])
    return <p ref={ref}></p>
}
//export default IOComponent
export default dynamic(() => Promise.resolve(IOComponent), { ssr: false });