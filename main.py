def on_received_number(receivedNumber):
    global Connected
    if receivedNumber == 787:
        Connected = True
radio.on_received_number(on_received_number)

def calculateResult():
    if Opponent == "Schere":
        if Random == 1:
            basic.show_icon(IconNames.ASLEEP)
        elif Random == 2:
            basic.show_icon(IconNames.HAPPY)
        else:
            basic.show_icon(IconNames.SAD)
    elif Opponent == "Stein":
        if Random == 1:
            basic.show_icon(IconNames.SAD)
        elif Random == 2:
            basic.show_icon(IconNames.ASLEEP)
        else:
            basic.show_icon(IconNames.HAPPY)
    elif Opponent == "Papier":
        if Random == 1:
            basic.show_icon(IconNames.HAPPY)
        elif Random == 2:
            basic.show_icon(IconNames.SAD)
        else:
            basic.show_icon(IconNames.ASLEEP)
    else:
        basic.show_icon(IconNames.CONFUSED)
    basic.pause(5000)

def on_received_string(receivedString):
    global Opponent
    Opponent = receivedString
radio.on_received_string(on_received_string)

def on_gesture_shake():
    global Random
    Random = randint(1, 3)
    if Random == 1:
        radio.send_string("Schere")
    elif Random == 2:
        radio.send_string("Stein")
    else:
        radio.send_string("Papier")
    while Opponent == "":
        Lord()
    if Random == 1:
        basic.show_leds("""
            # . . . #
                        . # . # .
                        . . # . .
                        # # . # #
                        # # . # #
        """)
    elif Random == 2:
        basic.show_leds("""
            . . # . .
                        . # # # .
                        # # # # #
                        . # # # .
                        . . # . .
        """)
    else:
        basic.show_leds("""
            . . . . .
                        . # # # .
                        . # # # .
                        . # # # .
                        . # # # .
        """)
    basic.pause(5000)
    calculateResult()
    Reset()
input.on_gesture(Gesture.SHAKE, on_gesture_shake)

def Lord():
    basic.show_leds("""
        . . . . .
                # . . . .
                . . # . #
                . . . . .
                . . . . .
    """)
    control.wait_micros(400)
    basic.show_leds("""
        . . . . .
                . . # . .
                # . . . #
                . . . . .
                . . . . .
    """)
    control.wait_micros(400)
    basic.show_leds("""
        . . . . .
                . . . . #
                # . # . .
                . . . . .
                . . . . .
    """)
    control.wait_micros(400)
def Reset():
    global Connected, Opponent
    Connected = False
    Opponent = ""
    while not (Connected):
        basic.show_leds("""
            . # # # .
                        # # . # #
                        # . # . #
                        # # . # #
                        . # # # .
        """)
        radio.send_number(787)
    basic.show_leds("""
        . . # . .
                . . # . .
                # . # . #
                . # # # .
                . . # . .
    """)
Random = 0
Opponent = ""
Connected = False
radio.set_group(187)
Reset()