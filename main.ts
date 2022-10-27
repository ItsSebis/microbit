radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 787 && !(Connected)) {
        enemy = radio.receivedPacket(RadioPacketProperty.SerialNumber)
        Connected = true
    }
})
function calculateResult () {
    if (enemyResult == "schere") {
        if (Random == 1) {
            basic.showIcon(IconNames.Asleep)
        } else if (Random == 2) {
            basic.showIcon(IconNames.Happy)
            pSelf += 1
        } else {
            basic.showIcon(IconNames.Sad)
            pEnemy += 1
        }
        games += 1
    } else if (enemyResult == "stein") {
        if (Random == 1) {
            basic.showIcon(IconNames.Sad)
            pEnemy += 1
        } else if (Random == 2) {
            basic.showIcon(IconNames.Asleep)
        } else {
            basic.showIcon(IconNames.Happy)
            pSelf += 1
        }
        games += 1
    } else if (enemyResult == "papier") {
        if (Random == 1) {
            basic.showIcon(IconNames.Happy)
            pSelf += 1
        } else if (Random == 2) {
            basic.showIcon(IconNames.Sad)
            pEnemy += 1
        } else {
            basic.showIcon(IconNames.Asleep)
        }
        games += 1
    } else {
        basic.showIcon(IconNames.Confused)
    }
}
input.onButtonPressed(Button.A, function () {
    if (!(channel == 0) && settingUp) {
        channel += -1
        Connected = false
        radio.setGroup(channel)
        basic.showNumber(channel)
    }
})
input.onGesture(Gesture.Shake, function () {
    if (!(settingUp) && Connected && !(gaming)) {
        gaming = true
        basic.showIcon(IconNames.Yes)
        Random = randint(1, 3)
        if (Random == 1) {
            radio.sendString("schere")
        } else if (Random == 2) {
            radio.sendString("stein")
        } else {
            radio.sendString("papier")
        }
        while (enemyResult == "") {
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
                . # # # .
                # # # # #
                # # # # #
                # # # # #
                . # # # .
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
        basic.pause(500)
        calculateResult()
        Reset()
    }
})
function newGame () {
    gaming = false
    Connected = false
    settingUp = true
    enemy = 0
    channel = 127
    radio.setGroup(channel)
    while (!(Connected)) {
        basic.showLeds(`
            . . . . .
            . . # . .
            . # . # .
            . . # . .
            . . . . .
            `)
        radio.sendNumber(787)
    }
    games = 0
    pEnemy = 0
    pSelf = 0
    settingUp = false
    basic.showLeds(`
        . . # . .
        . # . # .
        # . . . #
        . # . # .
        . . # . .
        `)
    Reset()
}
input.onButtonPressed(Button.AB, function () {
    if (!(settingUp)) {
        newGame()
    }
})
radio.onReceivedString(function (receivedString) {
    if (!(settingUp) && radio.receivedPacket(RadioPacketProperty.SerialNumber) == enemy) {
        enemyResult = receivedString
    }
})
input.onButtonPressed(Button.B, function () {
    if (!(channel == 255) && settingUp) {
        channel += 1
        radio.setGroup(channel)
        basic.showNumber(channel)
    }
})
function Lord () {
    basic.showLeds(`
        . . . . .
        # . . . .
        . . # . #
        . . . . .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        . . # . .
        # . . . #
        . . . . .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . #
        # . # . .
        . . . . .
        . . . . .
        `)
}
function Reset () {
    enemyResult = ""
    if (games != 0) {
        basic.clearScreen()
        basic.showLeds(`
            . . # . .
            . . # . .
            . . # . .
            . . # . .
            . . # . .
            `)
        if (pSelf <= 5) {
            for (let index = 0; index <= pSelf - 1; index++) {
                led.plot(0, index)
            }
        } else {
            for (let index = 0; index <= 4; index++) {
                led.plot(0, index)
            }
            for (let index = 0; index <= pSelf - 6; index++) {
                led.plot(1, index)
            }
        }
        if (pEnemy <= 5) {
            for (let index = 0; index <= pEnemy - 1; index++) {
                led.plot(3, index)
            }
        } else {
            for (let index = 0; index <= 4; index++) {
                led.plot(3, index)
            }
            for (let index = 0; index <= pEnemy - 6; index++) {
                led.plot(4, index)
            }
        }
        basic.pause(2000)
        if (pSelf == 10) {
            basic.showString("Gewonnen!")
            newGame()
        } else if (pEnemy == 10) {
            basic.showString("Verloren!")
            newGame()
        }
    }
    basic.showLeds(`
        . . # . .
        . . # . .
        # . # . #
        . # # # .
        . . # . .
        `)
    gaming = false
}
let gaming = false
let settingUp = false
let channel = 0
let games = 0
let pEnemy = 0
let pSelf = 0
let Random = 0
let enemyResult = ""
let enemy = 0
let Connected = false
newGame()
