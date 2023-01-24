let rotateBlock = document.querySelector('.rotate-block');
let rouletteButton = document.querySelector('.roulette-button');
let userEmail = document.querySelector('#user-email');
let itemOfHide = document.querySelectorAll('.hide');
let rotateSections = document.querySelector('.rotate-sections');
let rotateTextBlock = document.querySelector('.rotate-text-block');
let arrow = document.querySelector('.arrow');
let closeButton = document.querySelector('.popup-window-close-button');
let popup = document.querySelector('.popup');
let rotateSector = document.querySelectorAll('.rotate-sector');
let rotateText = document.querySelectorAll('.rotate-text')


const spinClass = "is-spinning";
const prizeSelectedClass = "active-text";
const sectorSelectedClass = "active-sector";

let rotation = 0;
let prizeNodes;
let sectorNodes;
let currentItem = 0;

function prizeSlice(arr) {
  return 360 / arr.length;
}
function prizeOffset(arr) {
  return Math.floor(180 / arr.length);
}


  rotateText.forEach((item, indx) => {
       if (rotateText.length === 2) {
    const itemRotation = ((prizeSlice(rotateText) * indx))
    item.style.transform = `rotate(${itemRotation}deg) translateY(-50%)`
  }else if(rotateText.length === 3){
    const itemRotation = ((prizeSlice(rotateText) * indx) - 30)
    item.style.transform = `rotate(${itemRotation}deg) translateY(-50%)`
  }else{
    const itemRotation = -(((90-prizeSlice(rotateText))+(prizeSlice(rotateText) * indx)*(-1)) + prizeOffset(rotateText))
    item.style.transform = `rotate(${itemRotation}deg) translateY(-50%)`
  }
      
    });

  rotateSector.forEach((item, indx) => {
     const itemRotation = ((prizeSlice(rotateSector) * indx));
    let skewDeg = 90 + prizeSlice(rotateSector);
    if (rotateSector.length === 2) {
      item.style.transform = `rotate(${itemRotation}deg)`;
      item.classList.toggle('rotate-two-sector')
    }else if(rotateSector.length === 3){
      item.style.transform = `rotate(${itemRotation}deg) skewY(${skewDeg}deg`;
      item.classList.toggle('rotate-three-sector')
    }else{
      item.style.transform = `rotate(${itemRotation}deg) skewY(${skewDeg}deg`;
    }
    
  });

const spinertia = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor( (max - min + 1)) + min;
};
function getRndItem(arr) {
  for (const el of arr) {
    return  Math.floor(Math.random() * arr.length);
  }
}
currentItem = getRndItem(rotateSector);
rouletteButton.addEventListener("click", () => {
  rouletteButton.disabled = false;
  let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  let userEmailValue = userEmail.value
  if (userEmailValue.match(emailPattern) ) {
    rouletteButton.disabled = false;
    document.querySelector('.not-vali-email').style.display = 'none'
    if (userEmail.value != '') {
      let res = prizeSlice(rotateSector) * currentItem;
      rotation = (360 - res);
      console.log(currentItem, res, rotation)
      rotation = Math.floor((rotation + spinertia(2000, 5000) ));
      console.log(rotation)
      rotateBlock.classList.add(spinClass);
      rotateBlock.setAttribute("style", `transform: rotate(${(rotation + 112.5)}deg)`);
     rouletteButton.disabled = true
    }else{
        userEmail.style.backgroundColor = 'red';
    }
  } else{
    document.querySelector('.not-vali-email').style.display = 'block'
  }
   
});

rotateBlock.addEventListener("transitionend", () => {
    rotateBlock.classList.remove(spinClass);
    rotateBlock.classList.add('anim');
    selectPrize();
  });

const selectPrize = () => {
    const selectedPrize = currentItem;
    const selectedSector = currentItem;
    rotateText[selectedPrize].classList.add(prizeSelectedClass);
    rotateSector[selectedSector].classList.add(sectorSelectedClass);
    if (rotateSector[selectedPrize].classList.contains('sale')) {
      document.querySelector('.roulette-result').style.display = 'block';
      document.querySelector('.roulette-result-nothing').style.display = 'none';
      document.querySelector('.empty').innerHTML = prizeNodes[selectedPrize].innerHTML;
      for (const item of itemOfHide) {
        item.style.display = 'none';
      }  
    }else{
      document.querySelector('.roulette-result-nothing').style.display = 'block';
      document.querySelector('.roulette-result').style.display = 'none';
      document.querySelector('.empty').innerHTML = rotateSector[selectedPrize].innerHTML;
      for (const item of itemOfHide) {
        item.style.display = 'none';
      }
    }
      for (const el of rotateSector) {
        if (el.classList.contains('active-sector') == false) {
          el.classList.add('negative');
        }
      }
};

closeButton.addEventListener('click', function () {
    popup.style.display = 'none';
})




