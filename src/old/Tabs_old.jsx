import React, { useState, useRef, useEffect } from 'react'

function Tabs() {

    const [text, setText] = useState("");

    const text_btn = useRef(null);
    const img_btn = useRef(null);
    const qr_btn = useRef(null);

    const text_div = useRef(null);
    const img_div = useRef(null);
    const qr_div = useRef(null);
    
    const divs = [text_div, img_div, qr_div];

    function handle_text(event) {
        setText(event.target.value);
    }

    function submit_data() {
        console.log(text);
    }

    function show_content(div_id) {
        for(const div of divs) {
            if(div == div_id) {
                div.current.style.display = "block";
            } else {
                div.current.style.display = 'none';
            }
        }
    }

    return (
    <>
        <h1>Print your Receipt!</h1>
        <div className="btns-panel">
            <button ref={text_btn} onClick={() => show_content(text_div)}><img src="../src/assets/text-tool.svg"></img></button>
            <button ref={img_btn} onClick={() => show_content(img_div)}><img src="../src/assets/image-1.svg"></img></button>
            <button ref={qr_btn} onClick={() => show_content(qr_div)}><img src="../src/assets/qr-code-scan.svg"></img></button>
        </div>

        <div className="tab-content" id="text-content" ref={text_div}>
            <textarea placeholder="Type some text..." onChange={handle_text}/><br/>
            <button onClick={submit_data}>Submit</button>
        </div>

        <div className="tab-content" id="img-content" ref={img_div}>
            <input type="file" /><br/>
            <button onClick={submit_data}>Submit</button>
        </div>

        <div className="tab-content" id="qr-content" ref={qr_div}>
            <textarea placeholder="Enter a link or type some text..." onChange={handle_text}/><br/>
            <button onClick={submit_data}>Submit</button>
        </div>
    </>
    )
}

export default Tabs
