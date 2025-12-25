'use client'
import { useEffect } from "react";
import dynamic from 'next/dynamic'
import { createInstanceLinkedList } from '../../app/lib/actions'

const LinkedListInstance = () => {
    useEffect(() => {
        createInstanceLinkedList()
    }, [])
    return <p></p>
}
//export default IOComponent
export default dynamic(() => Promise.resolve(LinkedListInstance), { ssr: false });