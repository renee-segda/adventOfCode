fs = open("../input.txt", "r")

def nextLine(fs):
    line = fs.readline().strip()
    return line

currentLine = nextLine(fs)

maxCalories = 0;

while currentLine:
    calorieTally = 0;
    while currentLine != '':
        calories = int(currentLine, 10)
        calorieTally += calories
        currentLine = nextLine(fs)
    maxCalories = max(maxCalories, calorieTally)
    currentLine = nextLine(fs)
    

fs.close()

print("Max calories = " + str(maxCalories))