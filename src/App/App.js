import React from 'react';
import {Meme} from '../Memes/meme';
import {MemeGenerated} from "../MemeGenerator/memeGenerated";
import {Switch,Route} from "react-router-dom";

export const App = () =>{
  return(
    <div>
      <h1>Let's Create Memes</h1>
      <Switch>
        <Route exact path= '/'>
          <Meme/>
        </Route>
        <Route path="/generated">
          <MemeGenerated/>
        </Route>
      </Switch>
    </div>
    
  )
}


