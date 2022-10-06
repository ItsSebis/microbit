radio.onReceivedNumber(function (receivedNumber) {
    if (!(settingUp)) {
        if (receivedNumber == 787) {
            enemy = radio.receivedPacket(RadioPacketProperty.SerialNumber)
            Connected = true
        }
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
    enemyResult = ""
    while (!(Connected)) {
        basic.showNumber(channel)
        radio.sendNumber(787)
    }
    if (games != 0) {
        basic.showString("S: " + convertToText(pSelf) + " | " + "E: " + convertToText(pSelf))
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
let enemy = 0
let pSelf = 0
let games = 0
let Connected = false
let channel = 0
let settingUp = false
settingUp = true
channel = 127
while (!(input.buttonIsPressed(Button.AB))) {
    basic.showNumber(channel)
}
music.playSoundEffect(music.createSoundEffect(WaveShape.Sine, 2162, 3098, 255, 255, 50, SoundExpressionEffect.Tremolo, InterpolationCurve.Logarithmic), SoundExpressionPlayMode.UntilDone)
basic.showIcon(IconNames.Yes)
radio.setGroup(channel)
Connected = false
games = 0
let pEnemy = 0
pSelf = 0
settingUp = false
Reset()
