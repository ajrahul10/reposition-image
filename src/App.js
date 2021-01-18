import {useEffect} from 'react';
import './App.css';
import food_pan from './assets/food_pan.jpg'

function App() {

  const IMAGE_TOP_POSITION_KEY = "image.top.position.key";
  const IMAGE_LEFT_POSITION_KEY = "image.left.position.key";

  let newx = 0, prevx = localStorage.getItem(IMAGE_LEFT_POSITION_KEY) || 0;
  let newy = 0, prevy = localStorage.getItem(IMAGE_TOP_POSITION_KEY) || 0;
  
  let newstyletop = 0, newstyleleft = 0;
  let t;

  useEffect(()=> {
    t = document.querySelector(".reposition-image");
    t.style.top = prevy + "px";
    // t.style.left = prevx + "px";
  }, [])

  function mousedown(e) {
    e.preventDefault();
    
    t.addEventListener("mousemove", mousemove);
    t.addEventListener("mouseup", mouseup);
    prevx = e.clientX;
    prevy = e.clientY;

  }

  function mousemove(e) {
    newx = e.clientX
    newy = e.clientY;
    newstyletop = t.offsetTop+newy-prevy;
    newstyleleft = t.offsetLeft+newx-prevx;
    if(newstyletop> -1000 && newstyletop < 0)
      t.style.top = newstyletop + "px";
    // t.style.left = newstyleleft + "px";
    
    console.log(newstyletop);
    prevx = e.clientX;
    prevy = e.clientY;
  }

  function mouseup(e) {
    t.removeEventListener("mousemove", mousemove);
    t.removeEventListener("mouseup", mouseup);
  }

  function handleMoveBackground() {
    t.style.cursor = 'move';
    t.addEventListener("mousedown", mousedown);
  }

  function handleupdateBackground() {
    localStorage.setItem(IMAGE_TOP_POSITION_KEY, t.offsetTop+newy-prevy);
    localStorage.setItem(IMAGE_LEFT_POSITION_KEY, t.offsetLeft+newx-prevx);
    t.style.cursor = 'auto';
    t.removeEventListener("mousedown", mousedown);
  }

  return (
    <>
    <div class="container">
      <img src={food_pan} className="reposition-image" />
    </div>
    <div class="button-layer">
      <button onClick={handleMoveBackground}>Move background</button>
      <button onClick={handleupdateBackground}>Update background</button>
    </div>
    </>
  );
}

export default App;
