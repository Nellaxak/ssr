'use client'
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState, useTransition, Suspense } from "react";
//import { buttonIO } from "@/app/actions/IntersectionButton";
import { scrollEnd } from '../../app/lib/actions'
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
let visibleRows = 8
function ScrollComponent() {
    //ref = useRef()
    const router = useRouter()
    const searchParams = useSearchParams()
    //const currentPage = searchParams.get('page')
    const currentViewtype = searchParams.get('viewtype')
    const [startRow, setStartRow] = useState(0)
    const [startAction, setStartAction] = useState('start')
    const [page, setPage] = useState(0)
    const dataLength = scrollEnd()
    function getBottomHeight() {
        //return rowHeight * startRow //* (startRow + visibleRows + 1);
        return rowHeight * (dataLength - (startRow + visibleRows + 1))
    }
    const handleScroll = useCallback(async (e) => {
        const elem = document.querySelector('#header')
        const rect = elem.getBoundingClientRect()
        let maxScrollBottom = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
        //console.log('maxScrollBottom', maxScrollBottom)
        if (maxScrollBottom <= 0) {
            //change url page increment
            //change col action
            setPage((page) => {
                let newPage = page + 1
                return newPage
            })
            const col = Math.ceil(Math.abs(rect.y / rowHeight))
            setStartRow(col)
            setStartAction('down')
        }
        vertical = rect.y
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
    return (<div>
        <div style={{ height: getBottomHeight() }}></div>
        <span className={isPending ? 'loader' : ''}></span>
    </div>)
    // }
}
export default ScrollComponent
//export default dynamic(() => Promise.resolve(IOComponent), { ssr: false });
