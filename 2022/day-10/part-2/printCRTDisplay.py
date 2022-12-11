fs = open('/Users/rsegda/development/adventOfCode/2022/day-10/input.txt', 'r')
commands = fs.readlines()
fs.close()

displayIndex = 0
commandIndex = 0
x = 1
maxCycleValue = 220
currentAddVal = 0
addCycleCount = 0
numAddCycles = 2

crtDisplay = ''
litPixel = '#'
darkPixel = '.'
displayLength = 40

def isCurrentPixelInSprite():
    return displayIndex >= (x - 1) and displayIndex <= (x + 1)

'''
Process cycle:
1. Check if add in progress (can be not in progress, 
    been running for 1 cycle, or been running for 2 
    cycles aka about to complete)
2. If running for 2 cycles, increment x by add value &
    restart add counter. Then process current command
3. If been running for 1 cycle, increment add counter
4. Else, check current command. If not noop, command must be add. 
    Set add value and increment add counter.
5. Add lit or unlit character to display.
'''

while (commandIndex < len(commands)):
    currentCommand = commands[commandIndex].strip().split(" ")
    if (addCycleCount > 0 and addCycleCount < numAddCycles):
        addCycleCount += 1
    else:
        if (addCycleCount == numAddCycles):
            x += currentAddVal
            addCycleCount = 0
            commandIndex += 1
            currentCommand = commands[commandIndex].strip().split(" ")
        if (currentCommand[0] != 'noop'):
            currentAddVal = int(currentCommand[1])
            addCycleCount += 1
        else:
            commandIndex += 1
    crtDisplay += litPixel if isCurrentPixelInSprite() else darkPixel
    if ((displayIndex + 1) % displayLength == 0):
        crtDisplay += '\n'
        displayIndex = 0
    else:
        displayIndex += 1

print(crtDisplay)

