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
function scrollElementToCenter(element) {
    const elementRect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    //const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

    // Calculate the adjustment needed to center the element
    const scrollTopAdjustment = elementRect.top - (viewportHeight / 2) + (elementRect.height / 2);
    //const scrollLeftAdjustment = elementRect.left - (viewportWidth / 2) + (elementRect.width / 2);

    // Calculate the final scroll coordinates
    const currentScrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    //const currentScrollLeft = window.scrollX || window.pageXOffset || document.documentElement.scrollLeft;

    const targetScrollTop = currentScrollTop + scrollTopAdjustment;
    //const targetScrollLeft = currentScrollLeft + scrollLeftAdjustment;

    window.scrollTo({
        top: targetScrollTop,
        //left: targetScrollLeft,
        behavior: 'smooth' // Optional: smooth scrolling
    });
}

function ScrollComponent() {
    //ref = useRef()
    const router = useRouter()
    const searchParams = useSearchParams()
    //const currentPage = searchParams.get('page')
    const currentViewtype = searchParams.get('viewtype')
    const [startRow, setStartRow] = useState(0)
    //const [startAction, setStartAction] = useState('start')
    const [page, setPage] = useState(0)
    const [scroll, setScroll] = useState('start');
    const [dataLength, setDataLength] = useState(0)
    const [countScroll, setCountScroll] = useState(0)
    /*const getBottomHeight = useCallback(() => {
        //return rowHeight * startRow //* (startRow + visibleRows + 1);
        //console.log('usestate dataLength', dataLength)
        //(rowHeight * (dataLength - (startRow + visibleRows + 1)))
        if (startAction === 'top' || startAction === 'start') {
            return 0
        }
        return rowHeight * Math.abs(startRow)
    }, [startRow])*/
    const handleScroll = useCallback(async (e) => {
        let maxScrollTop = window.scrollY;
        //console.log('maxScrollTop', maxScrollTop)
        let maxScrollBottom = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
        //console.log('maxScrollBottom', maxScrollBottom, document.documentElement.scrollHeight, window.scrollY, window.innerHeight)
        if (maxScrollBottom <= 0) {
            //change url page increment
            //change col action
            setPage((page) => {
                let newPage = page + 1
                return newPage
            })
            //scrollBottom(0)
            setScroll('bottom')
        }
        if (maxScrollTop <= 0) {
            //change url page increment
            //change col action
            setPage((page) => {
                let newPage = page - 1
                return newPage
            })
        }
        //vertical = rect.y
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
        router.push(`?viewtype=${currentViewtype}&page=${page}&scroll=${scroll}&col=${countScroll}`, { scroll: false });
        //router.refresh()
        const element = document.querySelector('ol');
        scrollElementToCenter(element);
    }, [startRow, page, scroll, countScroll])
    useEffect(() => {
        //find first li , get Height
        //scrollStart(0)
        document.addEventListener('scrollend', handleScroll)
        return () => {
            document.removeEventListener('scrollend', handleScroll)
        };
    }, [])
    //<div style={{ height: getBottomHeight() }}></div>
    return (
        <span className={isPending ? 'loader' : ''}></span>
    )
    // }
}
export default ScrollComponent
//export default dynamic(() => Promise.resolve(IOComponent), { ssr: false });
