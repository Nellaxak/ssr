'use client'
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState, useTransition, Suspense } from "react";
//import { buttonIO } from "@/app/actions/IntersectionButton";

//import { throttle } from 'lodash';
//import io from 'socket.io-client';
//import {  } from 'next/navigation-types';
//import type { Route } from 'next'

//import { addPage } from '@/app/actions/intersection'
//const socket = io('ws://localhost:3456')
//import Li from '@/app/api/Li'
import dynamic from 'next/dynamic'
const options = {
    root: null,
    rootMargin: "100px",//height li item
    threshold: 1.0,
}
let observer
let target
let ref
let router
let params
let isPending = false
let status = 0
let page = 0
let myProps
let vertical = 0
//let start=0
let visibleRows = 6
let rowHeight = 85
function ScrollComponent() {
    ref = useRef()
    router = useRouter()
    const searchParams = useSearchParams()
    const currentPage = searchParams.get('page')
    const currentViewtype = searchParams.get('viewtype')
    const [startRow, setStartRow] = useState(0)
    const [startAction, setStartAction] = useState('start')

    const handleScroll = useCallback(async (e) => {
        console.log('target', e.target)
        //console.log('scrollend')
        const elem = document.querySelector('#header')
        const rect = elem.getBoundingClientRect()
        const hh = rect.height
        //console.log('scrollend', rect, vertical, rect.y < vertical)
        let item = Math.abs(rect.y - vertical)
        //console.log('abs', item, hh)
        const col = Math.round(Math.abs((item - hh) / hh))
        console.log('scroll col', col, rect.y)
        if (rect.y < vertical) {
            setStartRow(col)
            setStartAction('down')
            //router.push(`?action=down&col=${col}`, { scroll: false });
        } else {
            //router.push(`?action=up&col=${col}`, { scroll: false });
            setStartRow(col)
            setStartAction('up')
        }
        vertical = rect.y
        /*setStartRow(Math.min(
            data.length - visibleRows - 1,
            Math.floor(e.target.scrollTop / rowHeight)
        ));*/
    }, [])
    useEffect(() => {
        //console.log('startRow', startRow)
        router.push(`?viewtype=${currentViewtype}&page=${currentPage}&action=${startAction}&col=${startRow}`, { scroll: false });
    }, [startRow, startAction])
    useEffect(() => {
        const elem = document.querySelector('#header')
        elem.addEventListener('scrollend', handleScroll)
        return () => {
            elem.removeEventListener('scrollend', handleScroll)
        };
    }, [])
    return (<p>
        <span className={isPending ? 'loader' : ''}></span>
    </p>)
    // }
}
export default ScrollComponent
//export default dynamic(() => Promise.resolve(IOComponent), { ssr: false });
