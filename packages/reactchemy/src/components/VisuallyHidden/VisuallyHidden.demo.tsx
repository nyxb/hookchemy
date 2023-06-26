import { useEffect, useState } from 'react'
import type { CSSProperties, KeyboardEvent, ReactNode } from 'react'

const hiddenStyles: CSSProperties = {
   display: 'inline-block',
   position: 'absolute',
   overflow: 'hidden',
   clip: 'rect(0 0 0 0)',
   height: 1,
   width: 1,
   margin: -1,
   padding: 0,
   border: 0,
}

interface Props {
   children: ReactNode
   [x: string]: any
}

export function VisuallyHidden({ children, ...delegated }: Props) {
   const [forceShow, setForceShow] = useState(false)
   useEffect(() => {
      if (process.env.NODE_ENV !== 'production') {
         const handleKeyDown = (ev: KeyboardEvent) => {
            if (ev.key === 'Alt')
               setForceShow(true)
         }
         const handleKeyUp = (ev: KeyboardEvent) => {
            if (ev.key === 'Alt')
               setForceShow(false)
         }
         window.addEventListener('keydown', handleKeyDown as any)
         window.addEventListener('keyup', handleKeyUp as any)
         return () => {
            window.removeEventListener('keydown', handleKeyDown as any)
            window.removeEventListener('keyup', handleKeyUp as any)
         }
      }
   }, [])
   if (forceShow)
      return children

   return (
     <span style={hiddenStyles} {...delegated}>
       {children}
     </span>
   )
}
