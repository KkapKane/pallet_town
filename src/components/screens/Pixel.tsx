import {useState, useEffect} from 'react'
interface Props {
    content: any;
}

export default function Pixel({content} : Props) {

    let HOW_MANY_BOXES_PER_ROW = 20; 
    
    if(window.innerWidth < 900){
        HOW_MANY_BOXES_PER_ROW = 13
    }

    let pixelWidth = window.innerWidth / HOW_MANY_BOXES_PER_ROW;
    const [select, setSelect] = useState(false)
 
    // if the boxArray element is == black/ make it's background color to black
    useEffect(() =>{
        if(content == "black"){
            setSelect(true)
        }
        else if (content == "white") {
            setSelect(false)
        }
    
      
    }, [content])
    return (
        <div style={{ height: 100, width: pixelWidth, border: "1px solid black",backgroundColor: select == true ? "black" : "white", zIndex: 99}}>
            YO
        </div>
    )
}