radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 787) {
        Connected = true
    }
})
function calculateResult () {
    if (Opponent == "Schere") {
        if (Random == 1) {
            basic.showIcon(IconNames.Asleep)
        } else if (Random == 2) {
            basic.showIcon(IconNames.Happy)
        } else {
            basic.showIcon(IconNames.Sad)
        }
    } else if (Opponent == "Stein") {
        if (Random == 1) {
            basic.showIcon(IconNames.Sad)
        } else if (Random == 2) {
            basic.showIcon(IconNames.Asleep)
        } else {
            basic.showIcon(IconNames.Happy)
        }
    } else if (Opponent == "Papier") {
        if (Random == 1) {
            basic.showIcon(IconNames.Happy)
        } else if (Random == 2) {
            basic.showIcon(IconNames.Sad)
        } else {
            basic.showIcon(IconNames.Asleep)
        }
    } else {
        basic.showIcon(IconNames.Confused)
    }
    basic.pause(5000)
}
radio.onReceivedString(function (receivedString) {
    Opponent = receivedString
})
input.onGesture(Gesture.Shake, function () {
    Random = randint(1, 3)
    if (Random == 1) {
        radio.sendString("Schere")
    } else if (Random == 2) {
        radio.sendString("Stein")
    } else {
        radio.sendString("Papier")
    }
    while (Opponent == "") {
        Lord()
    }
    if (Random == 1) {
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            # # . # #
            # # . # #
            `)
    } else if (Random == 2) {
        basic.showLeds(`
            . . # . .
            . # # # .
            # # # # #
            . # # # .
            . . # . .
            `)
    } else {
        basic.showLeds(`
            . . . . .
            . # # # .
            . # # # .
            . # # # .
            . # # # .
            `)
    }
    basic.pause(5000)
    calculateResult()
    Reset()
})
function Lord () {
    basic.showLeds(`
        . . . . .
        # . . . .
        . . # . #
        . . . . .
        . . . . .
        `)
    control.waitMicros(400)
    basic.showLeds(`
        . . . . .
        . . # . .
        # . . . #
        . . . . .
        . . . . .
        `)
    control.waitMicros(400)
    basic.showLeds(`
        . . . . .
        . . . . #
        # . # . .
        . . . . .
        . . . . .
        `)
    control.waitMicros(400)
}
function Reset () {
    Connected = false
    Opponent = ""
    while (!(Connected)) {
        basic.showLeds(`
            . # # # .
            # # . # #
            # . # . #
            # # . # #
            . # # # .
            `)
        radio.sendNumber(787)
    }
    basic.showLeds(`
        . . # . .
        . . # . .
        # . # . #
        . # # # .
        . . # . .
        `)
}
let Random = 0
let Opponent = ""
let Connected = false
radio.setGroup(187)
Reset()
