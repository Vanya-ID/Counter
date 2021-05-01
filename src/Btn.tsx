import React from 'react';
import './App.css';
import c from './counter.module.css'

type BtnType = {
    title: string
    disabled: boolean
    function: ()=> void
}

function Btn(props: BtnType) {
    return (
        <button className={c.btn} style={
            {
                cursor: !props.disabled ? "pointer" : '',
                color: !props.disabled ? "#09ff00" : "red"
            }
        }
                disabled={props.disabled} onClick={props.function} >

            {props.title}
        </button>
    )
}

export default Btn;
