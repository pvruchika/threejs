import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';

import state from '../store';


const CameraRig = ({children}) => {
    const group = useRef();
    const snap = useSnapshot(state);

    useFrame((state,delta)=>{
        const isBreakpoint = window.innerwidth <= 1260;
        const isMobile = window.innerwidth <= 600;
        //set initial position
        let targetPosition =[-0.4,0,2];
        if(snap.intro){
            if(isBreakpoint) targetPosition = [0,0,2];
            if(isMobile) targetPosition =[0,0.2,2.5];
        }else{
            if(isMobile) targetPosition =[0,0,2.5];
            else targetPosition = [0,0,2];
        }

        //set model camera position
        easing.damp3(state.camera.position, targetPosition, 0.25, delta);
        //set the model roation smoothly
        easing.dampE(
            group.current.rotation,
            [state.pointer.y/10,-state.pointer.x/5,0],
            0.25,
            delta
        )
    })
    //set the model rotation
    
  return <group ref={group}>{children}</group>
}

export default CameraRig