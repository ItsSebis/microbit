radio.onReceivedNumber(function (receivedNumber) {
    if (!(settingUp)) {
        if (receivedNumber == 787) {
            enemy = radio.receivedPacket(RadioPacketProperty.SerialNumber)
            Connected = true
        }
    }
})
function calculateResult () {
    if (enemyResult == "Schere") {
        if (Random == 1) {
            basic.showIcon(IconNames.Asleep)
        } else if (Random == 2) {
            basic.showIcon(IconNames.Happy)
        } else {
            basic.showIcon(IconNames.Sad)
        }
    } else if (enemyResult == "Stein") {
        if (Random == 1) {
            basic.showIcon(IconNames.Sad)
        } else if (Random == 2) {
            basic.showIcon(IconNames.Asleep)
        } else {
            basic.showIcon(IconNames.Happy)
        }
    } else if (enemyResult == "Papier") {
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
input.onButtonPressed(Button.A, function () {
    if (!(channel == 0) && settingUp) {
        channel += -1
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
    }
})
input.onGesture(Gesture.Shake, function () {
    if (!(settingUp) && Connected) {
        basic.showIcon(IconNames.Yes)
        Random = randint(1, 3)
        if (Random == 1) {
            radio.sendString("Schere")
        } else if (Random == 2) {
            radio.sendString("Stein")
        } else {
            radio.sendString("Papier")
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
        basic.pause(2000)
        calculateResult()
        Reset()
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
    Connected = false
    enemyResult = ""
    while (!(Connected)) {
        basic.showNumber(channel)
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
let enemyResult = ""
let Connected = false
let enemy = 0
let channel = 0
let settingUp = false
settingUp = true
channel = 127
while (!(input.buttonIsPressed(Button.AB))) {
    basic.showNumber(channel)
}
basic.showIcon(IconNames.Yes)
radio.setGroup(channel)
settingUp = false
Reset()
