import re

# Classes

class Sensor:
    def __init__(self, x: int, y: int, beaconX: int, beaconY: int) -> None:
        self.x = x
        self.y = y
        self.__calculateDistance(beaconX, beaconY)

    def __calculateDistance(self, beaconX: int, beaconY: int) -> int:
        self.dist = abs(self.x - beaconX) + abs(self.y - beaconY)

    def __str__(self) -> str:
        return f'{self.x},{self.y}'

    def __repr__(self) -> str:
        return self.__str__()

class Range:
    def __init__(self, start: int, end: int) -> None:
        self.start = start
        self.end = end
    
    def overlapsWith(self, r) -> bool:
        if (self.start <= r.start and self.end >= r.start):
            return True
        if (self.start >= r.start and self.start <= r.end):
            return True
        return False

    def __str__(self) -> str:
        return f'{self.start}-{self.end}'

    def __repr__(self) -> str:
        return self.__str__()

# Functions

def combineRanges(r1: Range, r2: Range) -> Range:
    if (not r1.overlapsWith(r2)):
        raise ValueError('Ranges must overlap')
    minStart = min(r1.start, r2.start)
    maxEnd = max(r1.end, r2.end)
    return Range(minStart, maxEnd)

def getValuesBetweenRanges(r1: Range, r2: Range) -> list:
    if (r1.overlapsWith(r2)):
        return []
    minEnd = min(r1.end, r2.end)
    maxStart = max(r1.start, r2.start)
    vals = []
    for i in range(minEnd + 1, maxStart):
        vals.append(i)
    return vals

# Evaluation

file = open("../input.txt", "r")
sensorLines = file.readlines()

regexStr = 'x=(-?\d+), y=(-?\d+)'
maxDim = 4000000
tuningMultiplier = 4000000

allSensors = []

for line in sensorLines:
    parsedLine = re.search(regexStr, line)
    sensorX = int(parsedLine.group(1))
    sensorY = int(parsedLine.group(2))
    parsedLine = re.search(regexStr, line[parsedLine.span()[1]:])
    beaconX = int(parsedLine.group(1))
    beaconY = int(parsedLine.group(2))
    sensor = Sensor(sensorX, sensorY, beaconX, beaconY)
    allSensors.append(sensor)

foundSpot = False
yIndex = 0
while (not foundSpot and yIndex < maxDim + 1):
    sensors = list(filter(lambda s: (s.y == yIndex) or (s.y - s.dist <= yIndex and s.y + s.dist >= yIndex), allSensors))
    sensor: Sensor
    yVals = list()
    for sensor in sensors:
        rightSide = sensor.dist - abs(sensor.y - yIndex)
        xGreaterThan = max(sensor.x - rightSide, 0)
        xLessThan = min(sensor.x + rightSide, maxDim)
        newRange = Range(xGreaterThan, xLessThan)
        if len(yVals) == 0:
            yVals.append(newRange)
        else:
            for i in range(0, len(yVals)):
                if (i == len(yVals) - 1):
                    yVals.append(newRange) 
                    break
                if (yVals[i].start > newRange.start):
                    yVals.insert(i, newRange)
                    break
            for i in range(len(yVals) - 1, 0, -1):
                currentRange = yVals[i]
                for j in range(i - 1, -1, -1):
                    if currentRange.overlapsWith(yVals[j]):
                        yVals[j] = combineRanges(currentRange, yVals[j])
                        yVals.pop(i)
                        break
    if len(yVals) > 1:
        print('Split ranges detected. Locating values in between')
        for r in range(1, len(yVals)):
            if (not yVals[r].overlapsWith(yVals[r-1])):
                values = getValuesBetweenRanges(yVals[r-1], yVals[r])
                print(f'Found index {values[0]},{yIndex}. Tuning frequency {values[0] * tuningMultiplier + yIndex}')
                foundSpot = True
                break
    else:
        yIndex += 1