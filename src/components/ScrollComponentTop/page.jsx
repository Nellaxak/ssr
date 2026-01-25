'use client'
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState, useTransition, Suspense } from "react";
//import { buttonIO } from "@/app/actions/IntersectionButton";
import { scrollEnd } from '../../app/lib/actions'
import styles from "./page.module.css";

//import { throttle } from 'lodash';
//import io from 'socket.io-client';
//import {  } from 'next/navigation-types';
//import type { Route } from 'next'

//import { addPage } from '@/app/actions/intersection'
//const socket = io('ws://localhost:3456')
//import Li from '@/app/api/Li'
import dynamic from 'next/dynamic'
let isPending = false
let vertical = 0
let rowHeight = 85
function ScrollComponentTop() {
    //ref = useRef()
    const router = useRouter()
    const searchParams = useSearchParams()
    const currentPage = searchParams.get('page')
    const currentViewtype = searchParams.get('viewtype')
    const [page, setPage] = useState(Number(currentPage))
    const handleScroll = useCallback(async (e) => {
        let maxScrollTop = window.scrollY// + 239=header height
        console.log('maxScrollTop', maxScrollTop)
        if (maxScrollTop <= 0) {
            setPage((page) => {
                let newPage = page - 1
                return newPage
            })
        }
    }, [])
    useEffect(() => {
        //scrollEnd({ action: startAction, col: startRow })
        router.push(`?viewtype=${currentViewtype}&page=${page}`, { scroll: false });
    }, [page])
    useEffect(() => {
        //find first li , get Height
        document.addEventListener('scrollend', handleScroll)
        return () => {
            document.removeEventListener('scrollend', handleScroll)
        };
    }, [])
    //style={{ height: getTopHeight() }} 
    //className={styles.scroll_top}
    return (
        <div id='scroll_up'></div>
    )
    // }
}
export default ScrollComponentTop
//export default dynamic(() => Promise.resolve(IOComponent), { ssr: false });
