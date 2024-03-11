window.onload = () => {
    restoreSettings();

    window.onbeforeunload = () => {
        saveSettings();
    };

    setInterval(() => { saveSettings() }, 60000);


    document.querySelector(".generate").addEventListener("click", () => {
        generate();
    });

    document.querySelector(".controls [value='previous']").addEventListener("click", () => {
        currentSoundNumber.number--;
    });

    document.querySelector(".controls [value='play']").addEventListener("click", () => {
        // Disabling the "Play" button to prevent double activation
        document.querySelector(".controls [value='play']").setAttribute("disabled", "disabled");


        // Preparing data for playing
        let notes = [currentList[currentSoundNumber.number].level];

        let currentLevel = currentList[currentSoundNumber.number].level;
        currentList[currentSoundNumber.number].sound.numberOfHalftones.forEach((element) => {
            currentLevel += element;
            notes.push(currentLevel);
        });

        let soundOrder;
        if (currentList[currentSoundNumber.number].sound.soundOrder) {
            soundOrder = currentList[currentSoundNumber.number].sound.soundOrder;
        }


        let solvingNotes = [];
        if (currentList[currentSoundNumber.number].sound.solving) {
            solvingNotes[0] = currentList[currentSoundNumber.number].level + currentList[currentSoundNumber.number].sound.solving.level[currentList[currentSoundNumber.number].solvingNumber];

            let solving = sounds[currentList[currentSoundNumber.number].sound.solving.id.split("-")[0]][currentList[currentSoundNumber.number].sound.solving.id];

            let currentSolvingLevel = solvingNotes[0];
            solving.numberOfHalftones.forEach((element) => {
                currentSolvingLevel += element;
                solvingNotes.push(currentSolvingLevel);
            });
        }

        // Playing the sounds and creating a setTimeout to enable the "Play" button after the sounds were played
        let timeout = playSound(notes, soundOrder);

        if (solvingNotes.length != 0) {
            setTimeout(() => {
                timeout = playSound(solvingNotes, soundOrder) + 250;

                setTimeout(() => {
                    document.querySelector(".controls [value='play']").removeAttribute("disabled");
                }, timeout);
            }, timeout - 1000);
        } else {
            setTimeout(() => {
                document.querySelector(".controls [value='play']").removeAttribute("disabled");
            }, timeout + 250);
        }
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
    "int": {
        "int-c1": { id: "int-c1", name: "ч. 1", numberOfHalftones: [0] },
        "int-s2": { id: "int-s2", name: "м. 2", numberOfHalftones: [1] },
        "int-b2": { id: "int-b2", name: "в. 2", numberOfHalftones: [2] },
        "int-s3": { id: "int-s3", name: "м. 3", numberOfHalftones: [3] },
        "int-b3": { id: "int-b3", name: "в. 3", numberOfHalftones: [4] },
        "int-c4": { id: "int-c4", name: "ч. 4", numberOfHalftones: [5] },
        "int-c5": { id: "int-c5", name: "ч. 5", numberOfHalftones: [7] },
        "int-s6": { id: "int-s6", name: "м. 6", numberOfHalftones: [8] },
        "int-b6": { id: "int-b6", name: "в. 6", numberOfHalftones: [9] },
        "int-s7": { id: "int-s7", name: "м. 7", numberOfHalftones: [10] },
        "int-b7": { id: "int-b7", name: "в. 7", numberOfHalftones: [11] },
        "int-c8": { id: "int-c8", name: "ч. 8", numberOfHalftones: [12] }
    },
    "specialAnd3tones": {
        "specialAnd3tones-bb5": { id: "specialAnd3tones-bb5", name: "Зб. 5 (характ. інт.)", numberOfHalftones: [8], solving: { id: "int-b6", level: [-1, 0], description: ["у мажорі", "у мінорі"] } },
        "specialAnd3tones-ss4": { id: "specialAnd3tones-ss4", name: "Зм. 4 (характ. інт.)", numberOfHalftones: [4], solving: { id: "int-s3", level: [-1, 0], description: ["у мінорі", "у мажорі"] } },
        "specialAnd3tones-bb2": { id: "specialAnd3tones-bb2", name: "Зб. 2 (характ. інт.)", numberOfHalftones: [3], solving: { id: "int-c4", level: [-1] } },
        "specialAnd3tones-ss7": { id: "specialAnd3tones-ss7", name: "Зм. 7 (характ. інт.)", numberOfHalftones: [9], solving: { id: "int-c5", level: [1] } },
        "specialAnd3tones-bb4": { id: "specialAnd3tones-bb4", name: "Зб. 4 (тритон)", numberOfHalftones: [6], solving: { id: "int-s6", level: [-1] } },
        "specialAnd3tones-ss5": { id: "specialAnd3tones-ss5", name: "Зм. 5 (тритон)", numberOfHalftones: [6], solving: { id: "int-b3", level: [1] } }
    },
    "3s": {
        "3s-b53": { id: "3s-b53", name: "В⁵₃", numberOfHalftones: [4, 3] },
        "3s-s53": { id: "3s-s53", name: "М⁵₃", numberOfHalftones: [3, 4] },
        "3s-b63": { id: "3s-b63", name: "В⁶₃", numberOfHalftones: [3, 5] },
        "3s-s63": { id: "3s-s63", name: "М⁶₃", numberOfHalftones: [4, 5] },
        "3s-b64": { id: "3s-b64", name: "В⁶₄", numberOfHalftones: [5, 4] },
        "3s-s64": { id: "3s-s64", name: "М⁶₄", numberOfHalftones: [5, 3] },
        "3s-bb53": { id: "3s-bb53", name: "Зб⁵₃", numberOfHalftones: [4, 4] },
        "3s-ss53": { id: "3s-ss53", name: "Зм⁵₃", numberOfHalftones: [3, 3] },
    }, "4s": [
        { name: "В⁵₃", type: "3s", numberOfHalftones: [4, 3] },
        { name: "М⁵₃", type: "3s", numberOfHalftones: [3, 4] },
        { name: "В⁶₃", type: "3s", numberOfHalftones: [3, 5] },
        { name: "М⁶₃", type: "3s", numberOfHalftones: [4, 5] },
        { name: "В⁶₄", type: "3s", numberOfHalftones: [5, 4] },
        { name: "М⁶₄", type: "3s", numberOfHalftones: [5, 3] },
        { name: "Зб⁵₃", type: "3s", numberOfHalftones: [4, 4] },
        { name: "Зм⁵₃", type: "3s", numberOfHalftones: [3, 3] },
    ], "gamma": {
        "dur-nat": { id: "gamma-dur-nat", name: "Мажорна натуральна гамма", numberOfHalftones: [2, 2, 1, 2, 2, 2, 1, 0, -1, -2, -2, -2, -1, -2, -2], soundOrder: "mel" },
        "dur-harm": { id: "gamma-dur-harm", name: "Мажорна гармонічна гамма", numberOfHalftones: [2, 2, 1, 2, 1, 3, 1, 0, - 1, -3, -1, -2, -1, -2, -2], soundOrder: "mel" },
        "dur-mel": { id: "gamma-dur-mel", name: "Мажорна мелодична гамма", numberOfHalftones: [2, 2, 1, 2, 1, 2, 2, 0, -1, -2, -2, -2, -1, -2, -2], soundOrder: "mel" },
        "mol-nat": { id: "gamma-mol-nat", name: "Мінорна натуральна гамма", numberOfHalftones: [2, 1, 2, 2, 1, 2, 2, 0, -2, -2, -1, -2, -2, -1, -2], soundOrder: "mel" },
        "mol-harm": { id: "gamma-mol-harm", name: "Мінорна гармонічна гамма", numberOfHalftones: [2, 1, 2, 2, 1, 3, 1, 0, -1, -3, -1, -2, -2, -1, -2], soundOrder: "mel" },
        "mol-mel": { id: "gamma-mol-mel", name: "Мінорна мелодична гамма", numberOfHalftones: [2, 1, 2, 2, 2, 2, 1, 0, -2, -2, -1, -2, -2, -1, -2], soundOrder: "mel" }
    }
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
    // Resetting old sounds list
    currentList = [];

    // Getting the data about types of sounds
    let numberOfSounds = document.querySelector(".numberOfSounds").value;
    let soundsTypes = [];
    let soundsTypesCheckboxes = document.querySelectorAll("input[type='checkbox'][name='soundsTypes']:checked");
    soundsTypesCheckboxes.forEach((element, index) => {
        soundsTypes[index] = element.getAttribute("value");
    });

    // Getting the data about first sound
    let startSound = document.querySelector(".startSound-sound").value;
    let startSoundSign = "c";
    let level;
    if (startSound != "random") {
        startSoundSign = document.querySelector(".startSound-special").value;

        level = 28 + keyboard["octavas"].indexOf(startSound[0]) * 12 + keyboard["notes"][startSound[2]] + keyboard["signs"][startSoundSign];
    }

    // Making an array of sounds
    let currentSounds = [];
    soundsTypes.forEach(element => {
        Object.keys(sounds[element]).forEach(el => {
            currentSounds.push(sounds[element][el])
        });
    });

    // Checking if the "Unique sound" option is enabled
    let isUniqueSound = document.querySelector(".uniqueSound input").checked;
    if (isUniqueSound) {
        if (numberOfSounds > currentSounds.length) { numberOfSounds = currentSounds.length }
    }

    // Creating new sounds list
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

        if (currentSounds[r1].solving) {
            let solvingNumber = Math.floor(Math.random() * currentSounds[r1].solving.level.length);
            if (solvingNumber == currentSounds[r1].solving.level.length) { solvingNumber--; }

            currentList[i].solvingNumber = solvingNumber;
        }

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

        let description = element.sound.name;
        if (element.sound.solving && element.sound.solving.description) {
            let solving = sounds[element.sound.solving.id.split("-")[0]][element.sound.solving.id];
            description += ` з розв. у ${solving.name} (${element.sound.solving.description[element.solvingNumber]})`;
        }

        li.textContent = description;
        document.querySelector(".answers ol").append(li);
    });

    return currentList;
}

function playSound(notes, soundOrder) {
    if (!soundOrder) {
        soundOrder = document.querySelector("#soundOrder").value;
    }

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