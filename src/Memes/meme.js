import React,{useEffect, useState} from 'react';
import styles from "./styles.module.css";
import { useHistory } from 'react-router-dom';

export const Meme = () =>{
    const [memes,setMemes] = useState([]);
    const [memeIndex,setMemeIndex] = useState(0);
    const [captions, setCaptions] = useState([]);
    const history = useHistory();
    const shuffleMemes = (arr) =>{
        for(let i=arr.length -1; i>0 ; i-- ){
            const j = Math.floor(Math.random()*i);
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;

        }
    }
    const updateCaptions = (e,index) => {
        const text = e.target.value || '';
        setCaptions(
            captions.map((c,i) => {
                if (index === i){
                    return text;
                }else{
                    return c;
                }
            })

        )
    };
    const generateMemes = () =>{ 
        const currentMeme = memes[memeIndex];
        const formData = new FormData();
        formData.append('username','tonymaung01')
        formData.append('password',"40208313")
        formData.append('template_id',currentMeme.id);
        captions.forEach((c,index) => formData.append(`boxes[${index}][text]`,c));
        fetch('https://api.imgflip.com/caption_image', {
            method: 'POST',
            body:formData
        }).then(res=>{
            res.json().then(res=> {
                history.push(`/generated?url=${res.data.url}`);
            })
        })

    }
    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes').then(res=>
            res.json().then(
                res=>{
                    const _memes = res.data.memes;
                    shuffleMemes(_memes);
                    setMemes(_memes)
                }
            ) 
        );
    }, []);
    useEffect(()=>{
        if(memes.length){
            setCaptions(Array(memes[memeIndex].box_count).fill(''));

        }
    }, [memeIndex,memes]);
    useEffect(()=>{
        console.log(captions)
    },[captions]);
    const handleKeyDown = (e) =>{
        if(e.keyCode === 13){
            this.generateMemes();
        }
    }
    return(<div>

        
        {
            memes.length ? <div className ={styles.container}>
            
            <button onClick={generateMemes} onKeyDown={handleKeyDown} className={styles.generate}>Generate</button>
            <button onClick={()=>setMemeIndex(memeIndex+1)} className={styles.skip}>Skip</button>
            {
                captions.map((c,index) => (
                    <input onChange = {(e)=> updateCaptions(e,index)} key={index}/>
                ))
            }
            <img src={memes[memeIndex].url} alt="memes-photo" className={styles.img}/>
            
        </div> : <></>
        }
    </div>
        
    )
}


