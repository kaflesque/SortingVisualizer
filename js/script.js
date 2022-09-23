
//popup
disable();
document.getElementById("speed").disabled = true;
document.querySelector("#popup").addEventListener("click",function(){
    document.querySelector(".popup").style.display = "none"
    enable();
    document.getElementById("speed").disabled = false;
})

//Array stuff
let arraysize = document.getElementById("size")

//change array size using range
arraysize.addEventListener('input', function(){
    document.getElementById("arrayValue").innerHTML = arraysize.value
    deleteChild();
    createanarray(parseInt(arraysize.value));
});


//creating array with bars
function createanarray(size){
    array = []
    for (let i = 0; i < size; i++){
        array.push(Math.floor(Math.random()*300 + 1));
    }
    
    var bar = document.getElementById("bar")
    for (let i=0; i<size; i++){
        var BarLine = document.createElement("div");
        let barsize = array[i]
        BarLine.style.height = barsize*1.3 + "px";
        BarLine.classList.add("bar");
        bar.appendChild(BarLine)
    }
}

//deleting bars
function deleteChild() {
    const bar = document.getElementById("bar");
    bar.innerHTML = "";
}

//new array
const newArray = document.getElementById("NewArray");
newArray.addEventListener("click", function(){
    deleteChild();
    createanarray(arraysize.value);
});

createanarray(arraysize.value);



// disabling and enabling function
function disable(){
    document.getElementById("algorithms").disabled = true;
    document.getElementById("SubmitAlgorithm").disabled = true;
    document.getElementById("size").disabled = true;
    document.getElementById("NewArray").disabled=true;
}

function enable(){
    document.getElementById("algorithms").disabled = false;
    document.getElementById("SubmitAlgorithm").disabled = false;
    document.getElementById("size").disabled = false;
    document.getElementById("NewArray").disabled=false;
}


//setting speed from range
var delay = 180;
var speed = document.getElementById("speed");
speed.addEventListener("input",function(){
    delay = (310 - parseInt(speed.value))  //subtracting to maintain speed range well feasible...
    //console.log(delay)
});

function sleep(delay){
    return new Promise(resolve=>{
        setTimeout(()=>{resolve("")},delay)
    });
}


//sorting algorithms
//bubble sort
async function bubbleSort() {
    var stuff = document.getElementsByClassName("bar");
    for(let i = 0; i < stuff.length-1; i++){
        for(let j = 0; j < stuff.length-i-1; j++){
            stuff[j].style.background = 'rgb(5, 62, 85)';
            stuff[j+1].style.background = 'rgb(5, 62, 85)';
            if(parseInt(stuff[j].style.height) > parseInt(stuff[j+1].style.height)){
                await sleep(delay);  
                //console.log(delay);   
                var temp = stuff[j]
                stuff[j] = stuff[j + 1]
                stuff[j+1] = temp
                document.getElementById("SubmitAlgorithm").innerHTML = "Sorting.."
                disable();

                let tempheight = stuff[j].style.height;
                stuff[j].style.height = stuff[j+1].style.height;
                stuff[j+1].style.height = tempheight;
            }
            stuff[j].style.background = 'skyblue';
            stuff[j+1].style.background = 'skyblue';
        }
        stuff[stuff.length-1-i].style.background = 'green';
    }
    stuff[0].style.background = 'green';
    document.getElementById("SubmitAlgorithm").innerHTML = "Sort"
    enable();
}


//insertionsort
async function insertionsort(){
    var stuff = document.getElementsByClassName("bar");
    var l = stuff.length;
    document.getElementById("SubmitAlgorithm").innerHTML = "Sorting.."
    disable();
    stuff[0].style.background = "green";
    for (let i = 1; i<l; i++){
        let j = i - 1;
        let current = stuff[i].style.height;
        stuff[i].style.background = "blue";
        await sleep(delay);
        while ( j >= 0 && parseInt(stuff[j].style.height)>parseInt(current)){
            stuff[j].style.background = "blue";
            stuff[j+1].style.height = stuff[j].style.height;
            j--;
            
            await sleep(delay);

            for(let r = i; r>=0; r--){
                stuff[r].style.background="green";
            }
        }
        stuff[j+1].style.height = current;
        stuff[i].style.background = "green";
    }  
    document.getElementById("SubmitAlgorithm").innerHTML = "Sort"
    enable();
}

//merge sort
async function mergeSort(){
    console.log("merge sort is sorted")
}


//selection sort
async function selectionSort(){
    var stuff = document.getElementsByClassName("bar");
    var l = stuff.length;
    document.getElementById("SubmitAlgorithm").innerHTML = "Sorting.."
    disable();
    for (let i=0; i<l; i++){
        let minPosition = i;
        stuff[i].style.background = "yellow";
        for (let j=i+1; j<l; j++){
            stuff[j].style.background = "blue";
            await sleep(delay);
            if (parseInt(stuff[j].style.height) < parseInt(stuff[minPosition].style.height)){
                if (minPosition !== i){
                    stuff[minPosition].style.background = "skyblue";
                }
                minPosition = j;
                stuff[j].style.background = "red";
            }
            else{
                stuff[j].style.background="skyblue";
            }
        }
        await sleep(delay);
        let temp = stuff[i].style.height;
        stuff[i].style.height = stuff[minPosition].style.height;
        stuff[minPosition].style.height = temp;

        stuff[minPosition].style.background = "skyblue";
        stuff[i].style.background = "green";
    }

    document.getElementById("SubmitAlgorithm").innerHTML = "Sort"
    enable();
}

algorithmSelect = document.getElementById("algorithms")

let selected=""
algorithmSelect.addEventListener("change",function(){
    selected = algorithmSelect.options[algorithmSelect.selectedIndex].text;
    switch(selected){
        case "Bubble sort":
            document.querySelector("#bubble-sort-index").style.display = "flex";
            document.querySelector("#insertion-sort-index").style.display = "none";
            document.querySelector("#selection-sort-index").style.display = "none";
        case "Insertion sort":
            document.querySelector("#bubble-sort-index").style.display = "none";
            document.querySelector("#insertion-sort-index").style.display = "flex";
            document.querySelector("#selection-sort-index").style.display = "none";
            break;
        case "Selection sort":
            document.querySelector("#selection-sort-index").style.display = "flex";
            document.querySelector("#bubble-sort-index").style.display = "none";
            document.querySelector("#insertion-sort-index").style.display = "none";
            break;
        default:
            document.querySelector("#bubble-sort-index").style.display = "flex";
            document.querySelector("#insertion-sort-index").style.display = "none";
            document.querySelector("#selection-sort-index").style.display = "none";
            break;
    }
})

SubmitAlgorithm.addEventListener("click",function(){
    //console.log("selected:",selected)
    switch(selected){
        case "Bubble sort":
            bubbleSort();
            break;
        case "Insertion sort":
            insertionsort();
            break;
        case "Merge sort":
            alert("Not completed yet");
            break;
        case "Quick sort":
            alert("Not completed yet");
            break;
        case "Selection sort":
            selectionSort();
            break;
        default:
            bubbleSort();
            break;
    }
})

//written by akhilesh




