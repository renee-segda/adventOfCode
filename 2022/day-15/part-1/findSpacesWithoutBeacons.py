import re

# Classes

class Sensor:
    def __init__(self, x: int, y: int, beaconX: int, beaconY: int) -> None:
        self.x = x
        self.y = y
        self.__calculateDistance(beaconX, beaconY)

    def __calculateDistance(self, beaconX: int, beaconY: int) -> int:
        self.dist = abs(self.x - beaconX) + abs(self.y - beaconY)

# Evaluation

file = open("../input.txt", "r")
sensorLines = file.readlines()

regexStr = 'x=(-?\d+), y=(-?\d+)'

yIndex = 2000000

xValsBeaconsOnLine = set()

sensors = []

for line in sensorLines:
    parsedLine = re.search(regexStr, line)
    sensorX = int(parsedLine.group(1))
    sensorY = int(parsedLine.group(2))
    parsedLine = re.search(regexStr, line[parsedLine.span()[1]:])
    beaconX = int(parsedLine.group(1))
    beaconY = int(parsedLine.group(2))
    sensor = Sensor(sensorX, sensorY, beaconX, beaconY)
    if (beaconY == yIndex):
        xValsBeaconsOnLine.add(beaconX)
    if (sensor.y == yIndex):
        sensors.append(sensor)
    else:
        if (sensor.y - sensor.dist <= yIndex and sensor.y + sensor.dist >= yIndex):
            sensors.append(sensor)

sensor: Sensor
yValSet = set()
for sensor in sensors:
    rightSide = sensor.dist - abs(sensor.y - yIndex)
    xGreaterThan = sensor.x - rightSide
    xLessThan = sensor.x + rightSide
    for i in range(xGreaterThan, xLessThan + 1):
        yValSet.add(i)

print(f'Number non-beacon points on y={yIndex}: {len(yValSet) - len(xValsBeaconsOnLine)}')

