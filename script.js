const paragraphs=[
    "The sun dipped below the horizon, casting a warm, golden glow across the tranquil landscape. Trees stood tall, their leaves gently rustling in the evening breeze. ",
    "The sun cast a warm glow over the tranquil meadow, where wildflowers swayed gently in the breeze. Birds chirped merrily, their songs creating a symphony of nature's melodies.",
    "The process of photosynthesis is a crucial aspect of plant biology. Through this intricate mechanism, plants convert light energy from the sun into chemical energy stored in glucose molecules.",
    "The advent of artificial intelligence (AI) has revolutionized industries worldwide. ",
    "AI involves the development of computer systems that can perform tasks that typically require human intelligence, such as problem-solving, language understanding, and pattern recognition. ",
    "Machine learning, a subset of AI, enables systems to improve their performance through experience. As AI continues to advance, it's expected to impact areas like healthcare, finance, and transportation.",
    "Jane Austen, a renowned English novelist from the 19th century, is celebrated for her novels that explore social and romantic relationships. ","Her works, including Pride and Prejudice and observations of society. ",
    "Austen's characters often navigate the complexities of love, marriage, and class distinctions, making her novels timeless and beloved by readers around the world.",
    "A balanced diet is essential for maintaining optimal health and well-being. It should include a variety of nutrient-rich foods such as fruits, vegetables, and healthy fats. ",
    "These nutrients provide the body with energy, support immune function, and aid in various bodily processes. Additionally, staying hydrated by consuming an adequate amount of water throughout the overall health.",
    "Exploring new cultures through travel can be a transformative experience. Immersing oneself in unfamiliar traditions, cuisines, and landscapes fosters personal growth and broadens perspectives.",
    "The universe, with its vast expanse of galaxies, stars, and planets, continues to captivate human curiosity. Telescopes and space probes have revealed breathtaking images of celestial bodies of the cosmos.",
    " As space exploration advances, humanity's understanding of the universe's mysteries deepens, sparking discussions about the possibility of extraterrestrial life and the potential for interplanetary travel."
];
const typingText = document.querySelector(".typing-text p")
const inpField = document.querySelector(".wrapper .input-field")
const tryAgainBtn = document.querySelector(".content button")
const timeTag = document.querySelector(".time span b")
const mistakeTag = document.querySelector(".mistake span ")
const wpmTag = document.querySelector(".wpm span")
const cpmTag = document.querySelector(".cpm span") 


let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex =0;
let mistakes =0;
let isTyping = 0;

function loadParagraph(){
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML ="";
    paragraphs[ranIndex].split("").forEach(char => {
        let span =`<span>${char}</span>`
        typingText.innerHTML+= span;
        
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
    
}

let passWPMThreshold = 15; // Adjust this threshold as needed

function showPopupResult(wpm) {
    let result = document.querySelector(".result");
    let resultText = document.querySelector(".result-text");
    
    result.style.display = "block";
    if (wpm >= passWPMThreshold) {
        resultText.innerHTML = "Congratulations! You passed.";
        resultText.style.color = "green";
        
    } else {
        resultText.innerHTML = "Oops! You didn't meet the requirement. Try again.";
        resultText.style.color = "red";
    }
    
}
function initTyping(){
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft >0){
        if(!isTyping){
            timer = setInterval(initTimer,1000);
            isTyping = true;
        }
        if(typedChar==null){
            if(charIndex>0){
                charIndex--;
                if(characters[charIndex].classList.contains("incorrect")){
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct","incorrect");
            }
        }
        else{
            if(characters[charIndex].innerHTML ==typedChar){
                characters[charIndex].classList.add("correct");
            }
            else{
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm=Math.round(((charIndex - mistakes)/5) / (maxTime -timeLeft)*60);
        wpm = wpm<0 || !wpm || wpm ===Infinity ? 0:wpm;

        wpmTag.innerHTML = wpm;
        mistakeTag.innerHTML=mistakes;
        cpmTag.innerHTML=charIndex-mistakes;

    }
    else{
        clearInterval(timer);
        inpField.value="";
        showPopupResult(wpmTag.innerHTML); 
    }
}

function showPopup() {
    const popup = document.querySelector(".popup");
    popup.style.display = "block";
    popup.innerHTML = "Time's Up! ";
    tryAgainBtn.addEventListener("click", () => {
        resetGame();
        popup.style.display = "none";
    });
}
 
function initTimer(){
    if(timeLeft>0){
        timeLeft--;
        timeTag.innerHTML=timeLeft;
        let wpm = Math.round(((charIndex-mistakes)/5)/(maxTime-timeLeft)*60);
        wpmTag.innerHTML=wpm;
    }
    else{
        clearInterval(timer);
        showPopup();
        
    }
}

function resetGame(){
    loadParagraph();
    clearInterval(timer);
    timeLeft=maxTime;
    charIndex=mistakes =isTyping=0;
    inpField.value="";
    timeTag.innerHTML=timeLeft;
    wpmTag.innerHTML=0;
    mistakeTag.innerHTML=0;
    cpmTag.innerHTML=0;

}

loadParagraph();
inpField.addEventListener("input",initTyping);
tryAgainBtn.addEventListener("click",resetGame);






















































































