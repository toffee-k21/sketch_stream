import React, { useEffect, useMemo, useRef, useState } from 'react'
import { sketch } from '../draw/sketch';
import Image from 'next/image';
import Link from 'next/link';

const Canvas = ({id,socket}:{id:number,socket:WebSocket}) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
  const joinedRef = useRef(false);

    useEffect(()=>{
        const canvas = canvasRef.current;
      let cleanup: () => void | undefined;
      if(joinedRef.current)return;
        if(canvas ){
          sketch(canvas, socket, id).then(res => {
            // @ts-ignore
            cleanup = res;
          });
        }
      joinedRef.current = true;
      return () => {
        if (cleanup) cleanup();
        };
    }, []);


  return (
    <div className='z-10'>
          <canvas id="myCanvas" ref={canvasRef} width={1000} height={window.innerHeight} className='rounded-md shadow-lg'></canvas>
      <div className='absolute bottom-5 left-15'>
          <Link href={"/"}><Image className='mr-4' width={40} height={40} src="/images/sketch_stream_logo.png" alt="logo" /></Link>
      </div>
    </div>
  )
}

export default Canvas