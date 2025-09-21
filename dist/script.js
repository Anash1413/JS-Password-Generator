const passwordText = document.querySelector("[passwordText]");
const copyBtn = document.querySelector("[copyBtn]");
const lengthSlider = document.querySelector("[lengthSlider]");
const display_passwordLength = document.querySelector("[passwordLength]");
const uppercase = document.querySelector("[uppercase]");
const lowercase = document.querySelector("[lowercase]");
const numbers = document.querySelector("[numbers]");
const symbols = document.querySelector("[symbols]");
const strengthCol = document.querySelector("[strengthCol]");
const generatePassword = document.querySelector("[generatePassword]");
const copyMsg  = document.querySelector("[copyMsg]");
const allcheckBox = document.querySelectorAll("input[type=checkbox]");
const symbolsStr = "~!@#$%^&*()_+-=[[]\{}|;':,./<>||";

let password = "";
let passwordLength = 12;
let checkCount = 0;
function setStrength(color)
{
 strengthCol.setAttribute("style",`background-color: ${color};`)
}
handleSlider()
getRandomIntger = (min, max) =>{
  return  Math.floor(Math.random() *(max-min)) +min;
}
getNumber = () => getRandomIntger(0,9);
getUppercase = () => String.fromCharCode(getRandomIntger(65,91));
getLowercase = () => String.fromCharCode(getRandomIntger(97,123));
function getSymbols () { 
    return symbolsStr.charAt(getRandomIntger(0, symbolsStr.length));
}
// passwordText.innerText = getLowercase();
function calculateStregth ()
{
  let yUpper = false;
 let yLower = false;
 let yNum = false;
 let ySym = false;
 if(uppercase.checked) yUpper = true;
 if(lowercase.checked) yLower = true;
 if(numbers.checked) yNum = true;
 if(symbols.checked) ySym = true;

 if(passwordLength >= 8 && yNum && ySym && (yUpper||yLower))
 {
    setStrength("green");
 }
 else if(passwordLength>=8 && ySym &&(yNum||yLower||yUpper))
 {
    setStrength("yellow");
 }
 else{
    setStrength("red");
 }
}

function handleSlider() 
{
lengthSlider.value = passwordLength;
display_passwordLength.innerText = passwordLength;
}

async function copyIndicator()
{
    try{
          await navigator.clipboard.writeText(passwordText.innerText);
    }
    catch(e)
    {copyMsg.innerText="Failed!!";
    }
copyMsg.setAttribute("style","scale:1")
setTimeout(() => {
    copyMsg.setAttribute("style","scale:0")
}, 1500);

}
// copy button 
copyBtn.addEventListener("click",()=>{
    
    copyIndicator();
    });

lengthSlider.addEventListener("input", (e)=>
{
     passwordLength = e.target.value;
     handleSlider();
      calculateStregth();
})

function checkBoxChange(){
    checkCount = 0;
    allcheckBox.forEach((checkbox) => 
        {
        if(checkbox.checked)
            checkCount ++;
    })

    // special love 
    if(passwordLength < checkCount){
        passwordLength = checkCount;
    handleSlider();
}
}
allcheckBox.forEach((checkbox) =>{
    checkbox.addEventListener("change", checkBoxChange);
} )

function shufflePassword(array) {
    // Fisher-Yates Shuffle Algorithm for true randomness
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array.join('');
}

generatePassword.addEventListener("click",() =>
{
    if(checkCount=0)
    {
        return;
    }
     if(passwordLength < checkCount){
        passwordLength = checkCount;
     handleSlider();
     }
      password = "";
     FuncArr = [];
     if(uppercase.checked){
        FuncArr.push(getUppercase);
     }
      if(lowercase.checked){
        FuncArr.push(getLowercase);
     }
      if(numbers.checked){
        FuncArr.push(getNumber);
     }
      if(symbols.checked){
        FuncArr.push(getSymbols);
     }
    //  for inserting checked chars in password
     for(let i = 0; i<FuncArr.length;i++){
        password += FuncArr[i]();
        console.log("funk wrrkng")
     }

     for(let i = 0; i < passwordLength - FuncArr.length ; i++)
     {
       let randindex = getRandomIntger(0 , FuncArr.length);
      
       password += FuncArr[randindex]();
      
     }
       password = shufflePassword(Array.from(password));
     console.log("before shuffle: ", password)
     passwordText.innerText = password;
     console.log("final password: ", password)
     calculateStregth();
})
// passwordText.value = "My Name is Anash";