import React,{useState} from 'react';
import {useHistory, useLocation } from 'react-router-dom';
import styles from "./styles.module.css";
import { useClipboard } from "use-clipboard-copy";
export const MemeGenerated = () =>{
    const clipboard = useClipboard();
    const history = useHistory();
    const [copied,setCopied] = useState(false);
    const location = useLocation();
    const url = new URLSearchParams(location.search).get('url');
    const copyLink = () =>{
        clipboard.copy(url);
        setCopied(true);
    }
  return(
    <div className={styles.container}>
         <button className= {styles.home} onClick={()=> history.push("/")}>Make more Memes</button>
        { url && <img src={url} alt=""/>}
        <button className = {styles.copy} onClick = {copyLink}>
        {
            copied ? "Link Copied" : "Copy Link"
           
        }
        </button>
       
        
    </div>
    
  )
}