let a = [new Audio("Audio/40.mp3"), new Audio("Audio/44.mp3"), new Audio("Audio/47.mp3"), new Audio("Audio/52.mp3")];

document.querySelector(".generate").addEventListener("click", () => {
    a[0].play();
    a[1].play();
    a[2].play();
    a[3].play();
    generate();
});

document.querySelector(".controls [value='previous']").addEventListener("click", () => {
    currentSoundNumber.number--;
});

document.querySelector(".controls [value='play']").addEventListener("click", () => {
    setTimeout(() => {
        document.querySelector(".controls [value='play']").removeAttribute("disabled");
    }, 7000);
    document.querySelector(".controls [value='play']").setAttribute("disabled", "disabled");
    playSound();
});

document.querySelector(".controls [value='next']").addEventListener("click", () => {
    currentSoundNumber.number++;
});

document.querySelector(".startSound-sound").addEventListener("change", () => {
    let currentValue = document.querySelector(".startSound-sound").value;

    if (currentValue == "random") {
        document.querySelector(".startSound-special").setAttribute("disabled", "disabled");
    } else {
        document.querySelector(".startSound-special").removeAttribute("disabled");
    }
});


const sounds = {
    "int": [{ name: "Ч.1", type: "int", numberOfHalftones: [0] },
    { name: "М.2", type: "int", numberOfHalftones: [1] },
    { name: "Б.2", type: "int", numberOfHalftones: [2] },
    { name: "М.3", type: "int", numberOfHalftones: [3] },
    { name: "Б.3", type: "int", numberOfHalftones: [4] },
    { name: "Ч.4", type: "int", numberOfHalftones: [5] },
    { name: "Ч.5", type: "int", numberOfHalftones: [7] },
    { name: "М.6", type: "int", numberOfHalftones: [8] },
    { name: "Б.6", type: "int", numberOfHalftones: [9] },
    { name: "М.7", type: "int", numberOfHalftones: [10] },
    { name: "Б.7", type: "int", numberOfHalftones: [11] },
    { name: "Ч.8", type: "int", numberOfHalftones: [12] },],
    "3s": [{ name: "", type: "", numberOfHalftones: [] },
    { name: "", type: "", numberOfHalftones: [] },
    { name: "", type: "", numberOfHalftones: [] },
    { name: "", type: "", numberOfHalftones: [] },
    { name: "", type: "", numberOfHalftones: [] },
    { name: "", type: "", numberOfHalftones: [] },
    { name: "", type: "", numberOfHalftones: [] },
    { name: "", type: "", numberOfHalftones: [] },
    { name: "", type: "", numberOfHalftones: [] },
    { name: "", type: "", numberOfHalftones: [] },
    { name: "", type: "", numberOfHalftones: [] },
    { name: "", type: "", numberOfHalftones: [] },],
};
const keyboard = { octavas: ["m", "1", "2"], notes: { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, h: 11 }, signs: { c: 0, is: 1, es: -1 } }

let currentList = [];
let currentSoundNumber = { number: 0 };
currentSoundNumber = new Proxy(currentSoundNumber, {
    set(target, prop, receiver) {
        target[prop] = receiver;
        document.querySelector(".progressbar progress").value = currentSoundNumber.number + 1;
        document.querySelector(".progressbar .current").textContent = currentSoundNumber.number + 1;


        if (currentSoundNumber.number == 0) {
            document.querySelector(".controls [value='previous']").setAttribute("disabled", "disabled");
        } else {
            document.querySelector(".controls [value='previous']").removeAttribute("disabled");
        }

        if (currentSoundNumber.number == (currentList.length - 1)) {
            document.querySelector(".controls [value='next']").setAttribute("disabled", "disabled");
        } else {
            document.querySelector(".controls [value='next']").removeAttribute("disabled");
        }

    }
});

function generate() {
    currentList = [];

    let numberOfSounds = document.querySelector(".numberOfSounds").value;
    let soundsTypes = [];
    let soundsTypesCheckboxes = document.querySelectorAll("input[type='checkbox'][name='soundsTypes']:checked");
    soundsTypesCheckboxes.forEach((element, index) => {
        soundsTypes[index] = element.getAttribute("value");
    });

    let startSound = document.querySelector(".startSound-sound").value;
    let startSoundSign = "c";
    let level;
    if (startSound != "random") {
        startSoundSign = document.querySelector(".startSound-special").value;

        level = 28 + keyboard["octavas"].indexOf(startSound[0]) * 12 + keyboard["notes"][startSound[2]] + keyboard["signs"][startSoundSign];
    }

    let currentSounds = [];
    soundsTypes.forEach(element => {
        sounds[element].forEach(el => {
            currentSounds.push(el)
        });
    });

    for (let i = 0; i < numberOfSounds; i++) {
        let r1 = Math.floor(Math.random() * currentSounds.length);
        if (r1 == currentSounds.length) { r1--; }

        let currentLevel;
        if (startSound == "random") {
            currentLevel = Math.floor(Math.random() * 24) + 28;
            if (currentLevel == 52) { currentLevel--; }
        } else {
            currentLevel = level;
        }

        // console.log(i)
        currentList[i] = { "sound": currentSounds[r1], "level": currentLevel };
    }


    currentSoundNumber.number = 0;
    document.querySelector(".progressbar progress").setAttribute("max", currentList.length);
    document.querySelector(".progressbar .total").textContent = currentList.length;

    document.querySelector(".controls [value='play']").removeAttribute("disabled");
    document.querySelector(".controls [value='next']").removeAttribute("disabled");

    document.querySelector(".answers ol").innerHTML = "";
    currentList.forEach((element) => {
        let li = document.createElement('li');
        li.textContent = element.sound.name;
        document.querySelector(".answers ol").append(li);
    });
    console.log(currentList)
    return currentList;
}

function playSound() {
    let startNote1 = new Audio("Audio/" + currentList[currentSoundNumber.number].level + ".mp3");
    let startNote2 = new Audio("Audio/" + currentList[currentSoundNumber.number].level + ".mp3");
    let endNote1 = new Audio("Audio/" + (currentList[currentSoundNumber.number].level + currentList[currentSoundNumber.number].sound.numberOfHalftones[0]) + ".mp3");
    let endNote2 = new Audio("Audio/" + (currentList[currentSoundNumber.number].level + currentList[currentSoundNumber.number].sound.numberOfHalftones[0]) + ".mp3");


    startNote1.play();
    setTimeout(() => {
        endNote1.play();
        setTimeout(() => {
            startNote2.play();
            endNote2.play();
        }, 2000)
    }, 1000);
}