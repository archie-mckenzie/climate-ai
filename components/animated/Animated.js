'use client'

import { useEffect, useState } from 'react'

export function DownwardsAnimated( { WrappedComponent, ...rest } ) {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    return (
        <div className={`downwards-animated-container ${isMounted ? 'sink-down' : ''}`}>
            <WrappedComponent {...rest}/>
        </div>
    )
}

export function SideAnimated( { WrappedComponent, ...rest}) {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    return (
        <div className={`side-animated-container ${isMounted ? 'move-over' : ''}`}>
            <WrappedComponent {...rest}/>
        </div>
    )
}

export function FadeAnimated( { WrappedComponent, ...rest}) {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    return (
        <div className={`fade-animated-container ${isMounted ? 'move-over' : ''}`}>
            <WrappedComponent {...rest}/>
        </div>
    )
}

export default function Animated( { WrappedComponent,...rest } ) {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    return (
        <div className={`animated-container ${isMounted ? 'rise-up' : ''}`}>
            <WrappedComponent {...rest}/>
        </div>
    )
}
  