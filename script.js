window.onload = () => {
    restoreSettings();

    window.onbeforeunload = () => {
        saveSettings();
    };

    setInterval(() => { saveSettings() }, 60000);


    document.querySelector(".generate").addEventListener("click", () => {
        audios1[40].sound.play();
        audios1[44].sound.play();
        audios1[47].sound.play();
        audios1[52].sound.play();
        generate();
    });

    document.querySelector(".controls [value='previous']").addEventListener("click", () => {
        currentSoundNumber.number--;
    });

    document.querySelector(".controls [value='play']").addEventListener("click", () => {
        document.querySelector(".controls [value='play']").setAttribute("disabled", "disabled");
        setTimeout(() => {
            document.querySelector(".controls [value='play']").removeAttribute("disabled");
        }, playSound());
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

    document.querySelector("#numberOfSounds").onchange = () => {
        let soundsTypesCheckboxes = document.querySelectorAll("input[type='checkbox'][name='soundsTypes']:checked");

        if (document.querySelector("#numberOfSounds").value == "" || Number(document.querySelector("#numberOfSounds").value) < 2 || Number(document.querySelector("#numberOfSounds").value) > 100 || Number(document.querySelector("#numberOfSounds").value) % 1 != 0 || soundsTypesCheckboxes.length == 0) {
            document.querySelector(".generate").setAttribute("disabled", "disabled");
        } else {
            document.querySelector(".generate").removeAttribute("disabled");
        }
    }

    document.querySelector("#numberOfSounds").onkeyup = () => {
        let soundsTypesCheckboxes = document.querySelectorAll("input[type='checkbox'][name='soundsTypes']:checked");

        if (document.querySelector("#numberOfSounds").value == "" || Number(document.querySelector("#numberOfSounds").value) < 2 || Number(document.querySelector("#numberOfSounds").value) > 100 || Number(document.querySelector("#numberOfSounds").value) % 1 != 0 || soundsTypesCheckboxes.length == 0) {
            document.querySelector(".generate").setAttribute("disabled", "disabled");
        } else {
            document.querySelector(".generate").removeAttribute("disabled");
        }
    }

    document.querySelectorAll("input[type='checkbox'][name='soundsTypes']").forEach((element) => {
        element.addEventListener("change", () => {
            let soundsTypesCheckboxes = document.querySelectorAll("input[type='checkbox'][name='soundsTypes']:checked");

            if (document.querySelector("#numberOfSounds").value == "" || Number(document.querySelector("#numberOfSounds").value) < 2 || Number(document.querySelector("#numberOfSounds").value) > 100 || Number(document.querySelector("#numberOfSounds").value) % 1 != 0 || soundsTypesCheckboxes.length == 0) {
                document.querySelector(".generate").setAttribute("disabled", "disabled");
            } else {
                document.querySelector(".generate").removeAttribute("disabled");
            }
        });
    });
};



function saveSettings() {
    let settings = {};

    document.querySelectorAll("input").forEach(element => {
        if (element.type == "number") {
            settings["#" + element.getAttribute("id")] = element.value;
        } else if (element.type == "checkbox") {
            settings["#" + element.getAttribute("id")] = element.checked;
        }
    });
    document.querySelectorAll("select").forEach(element => {
        settings["#" + element.getAttribute("id")] = element.value;
    });

    localStorage.setItem("MT-settings", JSON.stringify(settings));
}

function restoreSettings() {
    let settings = JSON.parse(localStorage.getItem("MT-settings"));

    if (settings) {
        Object.keys(settings).forEach((element) => {
            if (document.querySelector(element).getAttribute("type") == "checkbox") {
                document.querySelector(element).checked = settings[element];
            } else {
                document.querySelector(element).value = settings[element];
            }
        });

        if (document.querySelector("#startSound-sound").value != "random") {
            document.querySelector("#startSound-special").removeAttribute("disabled");
        } else {
            document.querySelector("#startSound-special").setAttribute("disabled", "disabled");
        }
    }
}


const sounds = {
    "int": [
        { name: "Ч. 1", type: "int", numberOfHalftones: [0] },
        { name: "М. 2", type: "int", numberOfHalftones: [1] },
        { name: "В. 2", type: "int", numberOfHalftones: [2] },
        { name: "М. 3", type: "int", numberOfHalftones: [3] },
        { name: "В. 3", type: "int", numberOfHalftones: [4] },
        { name: "Ч. 4", type: "int", numberOfHalftones: [5] },
        { name: "Ч. 5", type: "int", numberOfHalftones: [7] },
        { name: "М. 6", type: "int", numberOfHalftones: [8] },
        { name: "В. 6", type: "int", numberOfHalftones: [9] },
        { name: "М. 7", type: "int", numberOfHalftones: [10] },
        { name: "В. 7", type: "int", numberOfHalftones: [11] },
        { name: "Ч. 8", type: "int", numberOfHalftones: [12] }
    ],
    "specialAnd3tones": [
        { name: "Зб. 5 (характ. інт.)", type: "specialAnd3tones", numberOfHalftones: [] },
        { name: "Зм. 4 (характ. інт.)", type: "specialAnd3tones", numberOfHalftones: [] },
        { name: "Зб. 2 (характ. інт.)", type: "specialAnd3tones", numberOfHalftones: [] },
        { name: "Зм. 7 (характ. інт.)", type: "specialAnd3tones", numberOfHalftones: [] },
        { name: "Зб. 4 (тритон)", type: "specialAnd3tones", numberOfHalftones: [6] },
        { name: "Зм. 5 (тритон)", type: "specialAnd3tones", numberOfHalftones: [6] }
    ],
    "3s": [
        { name: "В⁵₃", type: "3s", numberOfHalftones: [4, 3] },
        { name: "М⁵₃", type: "3s", numberOfHalftones: [3, 4] },
        { name: "В⁶₃", type: "3s", numberOfHalftones: [3, 5] },
        { name: "М⁶₃", type: "3s", numberOfHalftones: [4, 5] },
        { name: "В⁶₄", type: "3s", numberOfHalftones: [5, 4] },
        { name: "М⁶₄", type: "3s", numberOfHalftones: [5, 3] },
        { name: "Зб⁵₃", type: "3s", numberOfHalftones: [4, 4] },
        { name: "Зм⁵₃", type: "3s", numberOfHalftones: [3, 3] },
    ], "4s": [
        { name: "В⁵₃", type: "3s", numberOfHalftones: [4, 3] },
        { name: "М⁵₃", type: "3s", numberOfHalftones: [3, 4] },
        { name: "В⁶₃", type: "3s", numberOfHalftones: [3, 5] },
        { name: "М⁶₃", type: "3s", numberOfHalftones: [4, 5] },
        { name: "В⁶₄", type: "3s", numberOfHalftones: [5, 4] },
        { name: "М⁶₄", type: "3s", numberOfHalftones: [5, 3] },
        { name: "Зб⁵₃", type: "3s", numberOfHalftones: [4, 4] },
        { name: "Зм⁵₃", type: "3s", numberOfHalftones: [3, 3] },
    ],
};
const keyboard = { octavas: ["m", "1", "2"], notes: { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, h: 11 }, signs: { c: 0, is: 1, es: -1 } };

const audios1 = {};
for (let i = 27; i <= 68; i++) {
    audios1[i] = { "canPlay": true, "sound": new Audio("Audio/" + i + ".mp3") };
    audios1[i].sound.onplay = (event) => {
        audios1[event.target.getAttribute("src").slice(6, -4)].canPlay = false;
    };
    audios1[i].sound.onended = (event) => {
        audios1[event.target.getAttribute("src").slice(6, -4)].canPlay = true;
    };
}
const audios2 = {};
for (let i = 27; i <= 68; i++) {
    audios2[i] = { "canPlay": true, "sound": new Audio("Audio/" + i + ".mp3") };
    audios2[i].sound.onplay = (event) => {
        audios2[event.target.getAttribute("src").slice(6, -4)].canPlay = false;
    };
    audios2[i].sound.onended = (event) => {
        audios2[event.target.getAttribute("src").slice(6, -4)].canPlay = true;
    };
}



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

    let isUniqueSound = document.querySelector(".uniqueSound input").checked;
    if (isUniqueSound) {
        if (numberOfSounds > currentSounds.length) { numberOfSounds = currentSounds.length }
    }


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

        currentList[i] = { "sound": currentSounds[r1], "level": currentLevel };

        if (isUniqueSound) {
            currentSounds.splice(r1, 1);
        }
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

    return currentList;
}

function playSound() {
    let notes = [currentList[currentSoundNumber.number].level];

    let currentLevel = currentList[currentSoundNumber.number].level;
    currentList[currentSoundNumber.number].sound.numberOfHalftones.forEach((element) => {
        currentLevel += element;
        notes.push(currentLevel);
    });


    let soundOrder = document.querySelector("#soundOrder").value;

    if (soundOrder == "mel") {
        notes.forEach((element, index) => {
            setTimeout(() => {
                if (audios1[element].canPlay) {
                    audios1[element].sound.play();
                } else if (audios2[element].canPlay) {
                    audios2[element].sound.play();
                } else {
                    let currentSound = new Audio("Audio/" + element + ".mp3");
                    currentSound.play();
                }
            }, (1000 * index));
        });

        return (1000 * notes.length + 2000);
    } else if (soundOrder == "harm") {
        notes.forEach(element => {
            if (audios1[element].canPlay) {
                audios1[element].sound.play();
            } else if (audios2[element].canPlay) {
                audios2[element].sound.play();
            } else {
                let currentSound = new Audio("Audio/" + element + ".mp3");
                currentSound.play();
            }
        });

        return 3000;
    } else if (soundOrder == "mel-harm") {
        notes.forEach((element, index) => {
            setTimeout(() => {
                if (audios1[element].canPlay) {
                    audios1[element].sound.play();
                } else if (audios2[element].canPlay) {
                    audios2[element].sound.play();
                } else {
                    let currentSound = new Audio("Audio/" + element + ".mp3");
                    currentSound.play();
                }
            }, (1000 * index));
        });

        setTimeout(() => {
            notes.forEach(element => {
                if (audios1[element].canPlay) {
                    audios1[element].sound.play();
                } else if (audios2[element].canPlay) {
                    audios2[element].sound.play();
                } else {
                    let currentSound = new Audio("Audio/" + element + ".mp3");
                    currentSound.play();
                }
            });
        }, (1000 * notes.length + 1000));

        return (1000 * notes.length + 4000);
    } else if (soundOrder == "harm-mel") {
        notes.forEach(element => {
            if (audios1[element].canPlay) {
                audios1[element].sound.play();
            } else if (audios2[element].canPlay) {
                audios2[element].sound.play();
            } else {
                let currentSound = new Audio("Audio/" + element + ".mp3");
                currentSound.play();
            }
        });

        setTimeout(() => {
            notes.forEach((element, index) => {
                setTimeout(() => {
                    if (audios1[element].canPlay) {
                        audios1[element].sound.play();
                    } else if (audios2[element].canPlay) {
                        audios2[element].sound.play();
                    } else {
                        let currentSound = new Audio("Audio/" + element + ".mp3");
                        currentSound.play();
                    }
                }, (1000 * index));
            });
        }, 2000);

        return (notes.length * 1000 + 4000);
    }
}