import React from 'react';
import './App.css';
import c from './counter.module.css'

type BtnType = {
    title: string
    disabled: boolean | undefined
    function: () => void
}

function Btn(props: BtnType) {
    return (
        <button className={c.btn} style={
            {
                cursor: props.disabled ? "" : 'pointer',
                color: props.disabled ? "red" : "#09ff00"
            }
        }
                disabled={props.disabled} onClick={props.function}>

            {props.title}
        </button>
    )
}

export default Btn;
