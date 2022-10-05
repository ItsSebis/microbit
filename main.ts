radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 787) {
        Connected = true
    }
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
    if (Opponent == "Schere") {
        if (Random == 1) {
            basic.showString("Unentschieden")
        } else if (Random == 2) {
            basic.showString("Gewonnen")
        } else {
            basic.showString("Verloren")
        }
    } else if (Opponent == "Stein") {
        if (Random == 1) {
            basic.showString("Verloren")
        } else if (Random == 2) {
            basic.showString("Unentschieden")
        } else {
            basic.showString("Gewonnen")
        }
    } else if (Opponent == "Papier") {
        if (Random == 1) {
            basic.showString("Gewonnen")
        } else if (Random == 2) {
            basic.showString("Verloren")
        } else {
            basic.showString("Unentschieden")
        }
    } else {
        basic.showString("Input Fehler")
    }
    Reset()
})
radio.onReceivedString(function (receivedString) {
    Opponent = receivedString
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
let Opponent = ""
let Random = 0
let Connected = false
radio.setGroup(187)
Reset()
