import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios';

function Tabs() {

    const textBtn = useRef(null);
    const imgBtn = useRef(null);
    const qrBtn = useRef(null);
    const btns = [textBtn, imgBtn, qrBtn];

    const textDiv = useRef(null);
    const imgDiv = useRef(null);
    const qrDiv = useRef(null);
    const divs = [textDiv, imgDiv, qrDiv]

    const [color, setColor] = useState("");
    const [text, setText] = useState("");
    const [img, setImg] = useState("");
    const [imgDisp, setImgDisp] = useState("");

    useEffect(() => {
        textBtn.current.style.border = "3px solid #ffa07a";
        imgBtn.current.style.border = "3px solid #00bfff";
        qrBtn.current.style.border = "3px solid #26d4b7";
    }, [])

    function changeText(event) { setText(event.target.value); }
    function showImage(event) {
        setImg(event.target.files[0]);
        setImgDisp(URL.createObjectURL(event.target.files[0]));
    }

    function showContent(btn, div, color) {
        for(const _div of divs) { _div.current.style.display = 'none'; }
        for(const _btn of btns) { _btn.current.style.backgroundColor = ''; }
        div.current.style.display = 'block';
        btn.current.style.backgroundColor = color;
        setColor(color);
    }

    function submitTextQr(type) {
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

    const submitImg = (e) => {
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
            <button ref={textBtn} onClick={() => showContent(textBtn, textDiv, '#ffa07a')}><img src="../src/assets/text-tool.svg"></img></button>
            <button ref={imgBtn} onClick={() => showContent(imgBtn, imgDiv, '#00bfff')}><img src="../src/assets/image-1.svg"></img></button>
            <button ref={qrBtn} onClick={() => showContent(qrBtn, qrDiv, '#26d4b7')}><img src="../src/assets/qr-code-scan.svg"></img></button>
        </div>

        <div ref={textDiv} className="tab-content" id="text-content">
            <textarea onChange={changeText} placeholder="Type some text..."/><br/>
            <button className="submit" onClick={() => submitTextQr('text')} style={{backgroundColor: color}}>Submit</button>
        </div>

        <div ref={imgDiv} className="tab-content" id="img-content">
            <input type="file" accept="image/*" onChange={showImage}/><br/>
            <img src={imgDisp}/>
            <button className="submit" onClick={submitImg} style={{backgroundColor: color}}>Submit</button>
        </div>

        <div ref={qrDiv} className="tab-content" id="qr-content">
            <textarea onChange={changeText} placeholder="Enter a link or type some text..."/><br/>
            <button className="submit" onClick={() => submitTextQr('qr')} style={{backgroundColor: color}}>Submit</button>
        </div>
    </>
    )
}

export default Tabs