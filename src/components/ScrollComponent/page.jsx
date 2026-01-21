'use client'
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState, useTransition, Suspense } from "react";
//import { buttonIO } from "@/app/actions/IntersectionButton";
import { scrollStart, scrollBottom } from '../../app/lib/actions'
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
const options = {
    root: null,//document.querySelector("#scrollArea"),
    rootMargin: "0px 0px 10px 0px",//-px not work?
    //scrollMargin: "-80px",
    threshold: 1.0,
}
let callbackFunction
function ScrollComponent() {
    //ref = useRef()
    const router = useRouter()
    const searchParams = useSearchParams()
    //const currentPage = searchParams.get('page')
    const currentViewtype = searchParams.get('viewtype')
    const [startRow, setStartRow] = useState(0)
    const [startAction, setStartAction] = useState('start')
    const [page, setPage] = useState(0)
    const [scroll, setScroll] = useState('start');
    const [dataLength, setDataLength] = useState(0)
    callbackFunction = useCallback(async (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {// && add) {
            console.log('input li', entry.target)
            /*setPage((page) => {
                let newPage = page + 1
                return newPage
            })*/
        } else {
            console.log('output li', entry.target)
        }
    }, []);
    const getBottomHeight = useCallback(() => {
        //return rowHeight * startRow //* (startRow + visibleRows + 1);
        //console.log('usestate dataLength', dataLength)
        //(rowHeight * (dataLength - (startRow + visibleRows + 1)))
        if (startAction === 'top' || startAction === 'start') {
            return 0
        }
        return rowHeight * Math.abs(startRow)
    }, [startRow])
    const handleScroll = useCallback(async (e) => {
        const elem = document.querySelector('#header')
        const rect = elem.getBoundingClientRect()
        //const col = Math.ceil(rect.y / rowHeight)
        /*const paragraphs = document.querySelectorAll('li')
        console.log('paragraphs', paragraphs)
        const observerIO = new IntersectionObserver(callbackFunction, options);
        paragraphs.forEach(el => {
            observerIO.observe(el);
        });*/
        //setStartRow(col)
        //setStartAction('down')
        let maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
        let maxScrollBottom = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
        console.log('maxScrollBottom', maxScrollBottom, document.documentElement.scrollHeight, window.scrollY, window.innerHeight)
        if (maxScrollBottom <= 0) {
            //change url page increment
            //change col action
            /*setPage((page) => {
                let newPage = page + 1
                return newPage
            })*/
            //scrollBottom(0)
            setScroll('bottom')
        }
        vertical = rect.y
    }, [])
    useEffect(() => {
        //scrollEnd({ action: startAction, col: startRow })
        /*(async () => {
            // Your async logic here
            //const dataLength1 = await scrollEnd()
            //setDataLength(dataLength1)
            //console.log('dataLength', dataLength)
            // Update state, etc.
        })();*/
        router.push(`?viewtype=${currentViewtype}&page=${page}&scroll=${scroll}`, { scroll: false });
        router.refresh()
    }, [startRow, startAction, page, scroll])
    useEffect(() => {
        //find first li , get Height
        //scrollStart(0)
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
