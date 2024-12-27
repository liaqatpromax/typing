import { useState,useEffect, useRef } from "react";

function Paragraph ({whichPara}) {
    const [para, setPara] = useState(null)
    const hasUpdated = useRef(false);
const paras = ["The city is full of vibrant culture, bustling markets, and diverse communities, creating dynamic energy","Technology continues to evolve, shaping how we communicate, work, and interact with the world daily","Nature offers peace and beauty, inspiring creativity and providing a sense of tranquility and connection."]
useEffect(() => {
    if(!hasUpdated.current){
        const selectedPara = paras[Math.floor(Math.random() * paras.length)];
        setPara(selectedPara);  // Update the local state
        whichPara(selectedPara); // Pass the selected paragraph to the parent component
        hasUpdated.current = true
    }
    // Randomly select a paragraph after the component mounts
  }, [whichPara]); // Empty dependency array to run only once after mount

    return (
        <>
       
        </>

    )
}
export default Paragraph