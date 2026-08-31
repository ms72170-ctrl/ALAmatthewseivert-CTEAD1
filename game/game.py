# ============================================================
#  THE key_area — a text adventure
#
#  This already works. Run it before you change anything:
#
#      python game.py
#
#  You are not building a game from nothing. You are taking one
#  that runs and making it yours. That is how real software gets
#  written — you almost never start from an empty file.
#
#  Everything in here uses only what you already know from last
#  week: print(), input(), if / elif / else, and a while loop.
#  There is nothing new to learn before you can start.
# ============================================================


# ---- 1. STATE ------------------------------------------------
# "State" is just the stuff the game has to remember while it runs.
# Change these and the game starts differently — try it.

player_name = ""          # we ask for this at the start
room = "room"             # where the player is right now
has_calculator = False           # True or False — do they have the key?
moves = 0                 # how many turns they have taken


# ---- 2. HELPERS ----------------------------------------------
# A function is a name for some lines you want to use more than
# once. `def` makes one. Writing this once beats pasting it into
# every room.

def say(text):
    """Print a message, then one blank line, so the screen breathes.

    Use plain print() for lines that belong TOGETHER, and say() for the
    last line of the thought. Calling say() on every line puts a gap
    between each one and the screen looks broken.
    """
    print(text)
    print()


def ask():
    """Ask the player what they want to do and hand back a tidy answer.

    .strip() removes spaces they typed by accident.
    .lower() means  right and left all work the same.
    Without these two, your game feels broken even when your logic is right.
    """
    return input("> ").strip().lower()


# ---- 3. THE OPENING ------------------------------------------

print("=" * 44)
print("           The calculator")
print("=" * 44)
print()

player_name = input("Enter your name! ").strip()
if player_name == "":
    player_name = "Hi"          # they just pressed enter

print()
print("Welcome, " + player_name + ".")
print("You have no games in your shelf. You can LOOK around, and walk left or right.")
print("There is a calculator on the desk, you can pick it up.")
say("Type HELP if you get stuck, or QUIT to give up.")


# ---- 4. THE GAME LOOP ----------------------------------------
# while True means "keep going forever". The only way out is break.
# Every turn: ask, then decide what that answer means.

while True:
    command = ask()
    moves = moves + 1

    # -- commands that work anywhere ------------------------
    if command == "end":
        say("You ended. " + player_name + " lasted " + str(moves) + " moves.")
        break

    elif command == "help":
        say("Try: LOOK, RIGHT, LEFT, TAKE CALCULATOR, USE CALCULATOR, END")

    # -- the room -------------------------------------------
    elif room == "room":
        if command == "look":
            if has_calculator:
                say("You have grabbed the calculator. You see a door to your left and a key enterance to your right.")
            else:
                say("You see a door to your left and a key enterance to your right. The calculator is on the desk.")

        elif command == "take calculator":
            if has_calculator:
                say("You have the calculator. It last did the expression 2^11. You can either go right or left.")
            else:
                has_calculator = True
                say("You have the calculator. You can either go right or left.")

        elif command == "right":
            room = "key_area"
            print("You go toward a huge key crate. You can unlock it with a calculator code.")
            say("You can also go back with left.")

        elif command == "left":
            room = "door_area"
            print("You walk toward the door. There is nothing out in the hallway.")
            say("You can also go back with right.")

        else:
            say("You cannot do that here.")

    # -- the key_area ------------------------------------------
    elif room == "key_area":
        if command == "look":
            say("There is a space on the key crate where you can place a calculator.")
        elif command == "left":
            room = "room"
            say("You are back in the middle of the room, staring and seeing no games on your shelf.")

        elif command == "use calculator":
            if has_calculator:
                print("The calculator is stamped onto the open space. The key code 2048 is entered.")
                print("The calculator key code opens a door in the wall. You wonder what is there..")
                say("You have beaten the game for now, " + player_name + " — in " + str(moves) + " moves.")
                break
            else:
                say("The key crate is locked. You can use a calculator to unlock.")

        else:
            say("That action is not possible here.")

    # -- the door_area -----------------------------------------
    elif room == "door_area":
        if command == "look":
            say("There is nothing out in the hallway, as it is too dark to see anything. The room is back to your right.")

        elif command == "right":
            room = "room"
            say("You are back in the middle of the room, staring and seeing no games on your shelf.")

        elif command == "left":
            room = "dark_hallway"
            say("You start going down the hallway. You can see something at the end of the hallway emitting light. You can go back with right.")
    # -- the dark hallway -----------------------------------------
    elif room == "dark_hallway":
        if command == "look":
            say("You can see something at the end of the hallway emitting light. You can go back with right, or continue into the dark.")
        elif command == "right":
            room = "door_area"
            say("You are back in the hallway near the door.")
        else:
            say("That action is not possible here.")


# ============================================================
#  NOW MAKE IT YOURS
#
#  Do these in order. Run the game after EVERY one — if it
#  breaks you will know exactly which change did it.
#
#  1. Change the room descriptions so it is your world, not mine. (Complete)
#
#  2. Add a third room. Copy the `elif room == "key_area":` block,
#     change the room name, and give the room a way to reach it. (Complete)
#
#  3. Add something to pick up, the way has_key works. A lamp?
#     Then make one room too dark to LOOK in without it. (Complete)
#
#  4. Add a limit: if moves gets past 20, something happens.
#
#  5. Give the player a real choice with two different endings.
#
#  COMMIT AFTER EACH ONE. That is your undo button.
# ============================================================
