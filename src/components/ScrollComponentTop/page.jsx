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
    //const currentPage = searchParams.get('page')
    const currentViewtype = searchParams.get('viewtype')
    const [startRow, setStartRow] = useState(0)
    const [startAction, setStartAction] = useState('start')
    const [page, setPage] = useState(0)
    function getTopHeight() {
        return rowHeight * startRow;
    }
    const handleScroll = useCallback(async (e) => {
        //console.log('target', e.target)
        //console.log('scrollend')
        const elem = document.querySelector('#header')
        const rect = elem.getBoundingClientRect()
        //const hh = rect.height
        //console.log('scrollend', rect, vertical, rect.y < vertical)
        //let item = Math.abs(rect.y - vertical)
        //console.log('abs', item, hh)
        let maxScrollBottom = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
        //console.log('maxScrollBottom', maxScrollBottom)
        if (maxScrollBottom <= 0) {
            //change url page increment
            //change col action
            setPage((page) => {
                let newPage = page + 1
                return newPage
            })
            const col = Math.ceil(rect.y / rowHeight)
            setStartRow(col)
            setStartAction('down')
        }
        //Math.round(Math.abs((item - hh) / hh))
        //console.log('scroll col', col)
        /*if (rect.y < vertical) {
            
        } else {
            setStartRow(col)
            setStartAction('up')
        }*/
        vertical = rect.y
        /*setStartRow(Math.min(
            data.length - visibleRows - 1,
            Math.floor(e.target.scrollTop / rowHeight)
        ));*/
    }, [])
    useEffect(() => {
        //scrollEnd({ action: startAction, col: startRow })
        router.push(`?viewtype=${currentViewtype}&page=${page}&action=${startAction}&col=${startRow}`, { scroll: false });
    }, [startRow, startAction, page])
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
        <div style={{ height: getTopHeight() }}  id='scroll_up'></div>
    )
    // }
}
export default ScrollComponentTop
//export default dynamic(() => Promise.resolve(IOComponent), { ssr: false });
