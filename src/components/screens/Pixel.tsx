import {useState, useEffect} from 'react'
interface Props {
    content: any;
}

export default function Pixel({content} : Props) {
    const [select, setSelect] = useState(false)

    useEffect(() =>{
        if(content == "yea"){
            setSelect(true)
        }
        else if (content == "yo") {
            setSelect(false)
        }
    }, [content])
    return (
        <div style={{height: 100, width: 100, border: "1px solid black", backgroundColor: select == true ? "black" : "white", zIndex: 99}}>
            YO
        </div>
    )
}