fs = open('/Users/rsegda/development/adventOfCode/2022/day-10/input.txt', 'r')
commands = fs.readlines()
fs.close()

cycleCount = 1
commandIndex = 0
x = 1
xRegValues = []
maxCycleValue = 220
currentAddVal = 0
addCycleCount = 0
numAddCycles = 2

'''
Process cycle:
1. Check if add in progress (can be not in progress, 
    been running for 1 cycle, or been running for 2 
    cycles aka about to complete)
2. If running for 2 cycles, increment x by add value &
    restart add counter. Then process current command
3. If been running for 1 cycle, increment add counter
4. Else, check current command. If noop, go to next cycle.
    Else, command must be add. Set add value and increment add counter.
'''

for i in range(maxCycleValue):
    currentCommand = commands[commandIndex].strip().split(" ")
    if (addCycleCount > 0 and addCycleCount < numAddCycles):
        addCycleCount += 1
    else:
        if (addCycleCount == numAddCycles):
            x += currentAddVal
            addCycleCount = 0
            commandIndex += 1
            currentCommand = commands[commandIndex].strip().split(" ")
            # print('New command: ' + commands[commandIndex])
        if (currentCommand[0] != 'noop'):
            currentAddVal = int(currentCommand[1])
            addCycleCount += 1
        else:
            commandIndex += 1
        

    # print('Cycle ' + str(i + 1) + ' x = ' + str(x))
    # Get x value of current turn if 20 or 20 + 40x cycle
    if ((i + 1) == (20 + 40*len(xRegValues))):
        signalStrength = x * (20 + 40*len(xRegValues))
        # print('Turn ' + str(i) + ': strength ' + str(signalStrength))
        xRegValues.append(signalStrength)

signalStrengthSum = 0

for i in range(len(xRegValues)):
    signalStrengthSum += xRegValues[i]

print("Sum of signal strengths: " + str(signalStrengthSum))