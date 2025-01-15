import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios';

function Tabs() {

    const text_btn = useRef(null);
    const img_btn = useRef(null);
    const qr_btn = useRef(null);
    const btns = [text_btn, img_btn, qr_btn];

    const text_div = useRef(null);
    const img_div = useRef(null);
    const qr_div = useRef(null);
    const divs = [text_div, img_div, qr_div]

    const [color, setColor] = useState("");
    const [text, setText] = useState("");
    const [img, setImg] = useState("");
    const [imgDisp, setImgDisp] = useState("");

    useEffect(() => {
        text_btn.current.style.border = "3px solid #ffa07a";
        img_btn.current.style.border = "3px solid #00bfff";
        qr_btn.current.style.border = "3px solid #26d4b7";
    }, [])

    function change_text(event) { setText(event.target.value); }
    function show_image(event) {
        setImg(event.target.files[0]);
        setImgDisp(URL.createObjectURL(event.target.files[0]));
    }

    function show_content(btn, div, color) {
        for(const _div of divs) { _div.current.style.display = 'none'; }
        for(const _btn of btns) { _btn.current.style.backgroundColor = ''; }
        div.current.style.display = 'block';
        btn.current.style.backgroundColor = color;
        setColor(color);
    }

    function submit_text_qr(type) {
        console.log(text);
        const config = {
            "headers": { "Content-Type": "application/json" }
        };
        const body = JSON.stringify({
            "type": type,
            "data": text
        });
        axios.post("http://localhost:5000/data", body, config)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
        setText("");
    }

    const submit_img = (e) => {
        e.preventDefault();
        console.log(img);
        const config = {
            "headers": { 'Content-Type': 'multipart/form-data' }
            //"headers": { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        }
        const FD = new FormData();
        FD.append('img', img);
        console.log(FD.get('img'));
        axios.post("http://localhost:5000/data", FD, config)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    }

    return (
    <>
        <h1>Print your Receipt!</h1>
        <hr />
        <div className="btns-panel">
            <button ref={text_btn} onClick={() => show_content(text_btn, text_div, '#ffa07a')}><img src="../src/assets/text-tool.svg"></img></button>
            <button ref={img_btn} onClick={() => show_content(img_btn, img_div, '#00bfff')}><img src="../src/assets/image-1.svg"></img></button>
            <button ref={qr_btn} onClick={() => show_content(qr_btn, qr_div, '#26d4b7')}><img src="../src/assets/qr-code-scan.svg"></img></button>
        </div>

        <div ref={text_div} className="tab-content" id="text-content">
            <textarea onChange={change_text} placeholder="Type some text..."/><br/>
            <button className="submit" onClick={() => submit_text_qr('text')} style={{backgroundColor: color}}>Submit</button>
        </div>

        <div ref={img_div} className="tab-content" id="img-content">
            <input type="file" accept="image/*" onChange={show_image}/><br/>
            <img src={imgDisp}/>
            <button className="submit" onClick={submit_img} style={{backgroundColor: color}}>Submit</button>
        </div>

        <div ref={qr_div} className="tab-content" id="qr-content">
            <textarea onChange={change_text} placeholder="Enter a link or type some text..."/><br/>
            <button className="submit" onClick={() => submit_text_qr('qr')} style={{backgroundColor: color}}>Submit</button>
        </div>
    </>
    )
}

export default Tabs