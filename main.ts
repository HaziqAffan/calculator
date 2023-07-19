type KeyValueObject = {
    [key: string]: Number;
  };
  let btnid=0
let textbox = document.getElementById("panel") as HTMLInputElement;
let str=textbox.value 
let evalstr=textbox.value
let ansbox = document.getElementById("ans") as HTMLInputElement;
let start
let end
let constants:KeyValueObject={
    "PI":3.1415,
    "e":2.7182
}
function append(val: any){
    if (textbox != null) {
        textbox.focus();
        start = textbox.selectionStart;
        end = textbox.selectionEnd;
      textbox.setSelectionRange(start, end);
      const curvalue = textbox.value;
      textbox.value += val;
      const inserted =curvalue.substring(0, Number(start)) + val + curvalue.substring(Number(end));
      textbox.value = inserted;
      // Move the cursor to the end of the inserted value
      textbox.selectionStart = start + val.length;
      textbox.selectionEnd = start + val.length;
      end = textbox.selectionStart!;
      str = inserted;
    }
  };
function equal()
{
    str=textbox.value
    evalstr=str
    evalstr=replaceAllOccurrences(evalstr,'sin','Math.sin')
    evalstr=replaceAllOccurrences(evalstr,'cos','Math.cos')
    evalstr=replaceAllOccurrences(evalstr,'tan','Math.tan')
    evalstr=replaceAllOccurrences(evalstr,'sqrt','Math.sqrt')
    evalstr=replaceAllOccurrences(evalstr,'e','2.7182')
    evalstr=replaceAllOccurrences(evalstr,'PI','3.1415')

    for(let a in constants)
    {
        let tostr=String(constants[a])
        evalstr=replaceAllOccurrences(evalstr,a,tostr)
    }
    console.log(evalstr,str)
    try{
        let answer = eval(evalstr) as string;
        answer=Number(answer).toFixed(4)
        ansbox.value=answer
    }
    catch(e){
        ansbox.value="Invalid EXPRESSION"
    }
}
function clearscreen(){
    console.log("in clear")
    textbox.value=''
    str=''
    evalstr=''
    ansbox.value=''
}
function delindex(){
    let temp=str.slice(0,-1)
    str=temp
    textbox.value=str
}
function calsin(){
    evalstr=evalstr+"Math.sin("
    append("sin(")
}
function calcos(){
    evalstr=evalstr+"Math.cos("
    append("cos(")
}
function caltan(){
    evalstr=evalstr+"Math.tan("
    append("tan(")
}
function calsqrt(){
    evalstr=evalstr+"Math.sqrt("
    append("sqrt(")
}
function expo(){
    evalstr=evalstr+"**"
    append("^")
}
function replaceAllOccurrences(inputString: string, wordToReplace: string, newWord: string): string {
    const regex = new RegExp('\\b' + wordToReplace + '\\b', 'gi');
    return inputString.replace(regex, newWord);
  }
  function cale(){
    evalstr=evalstr+"2.7182"
    append("e")
  }
  function calpi(){
    evalstr=evalstr+"3.1415"
    append("PI")
  }
  function addconst(){
    let name=prompt("enter variable name")
    let val=prompt(`enter value of ${name} varibale`)
     let value=parseInt(val ?? '0')
     addNewButton(name as string,value as number)
   
  }
  function addNewButton(btnname:string,btnvalue:number)
   {
         if(btnname==="")
         {
            alert("Invalid entry !! You did not enter the name")
         }
         else
         {
            if(exists(btnname))
            {
                // if var exists
                alert("Variable name already exists")
            }
            else
            {
                constants[`${btnname}`]=btnvalue
              const newButton: HTMLButtonElement = document.createElement("button");
              // Set the button's attributes and properties
             
              newButton.textContent = btnname;
              newButton.id=btnname;
              newButton.className="btn btn-primary"
              newButton.style.margin="7px"

            // Append the button to the buttonContainer div
            const buttonContainer: HTMLElement | null = document.getElementById("con");
        
            if (buttonContainer !=null)
            {
            
                 newButton.onclick=function()
                {
               
                    append(newButton.id)
                    let conval;
                    for(let i in constants)
                    {
                        if(i==newButton.id){
                            conval=constants[i]
                        }
                    }
                    evalstr=evalstr+String(conval)
                    textbox.value=str
                
                }
                 buttonContainer.appendChild(newButton);
            }
          }
               // Create a new button element
        
         }
     
  }
  function buttonClickHandler(event: MouseEvent) {
    const clickedButton: HTMLButtonElement = event.target as HTMLButtonElement;
    const buttonId: string = clickedButton.id
    return buttonId
  }
  function exists(key:string)
  {
    let ret:boolean=false
    for(let a in constants)
    {
        if(a===key)
        {
            ret=true
            break
        }
    }
    return ret
  }