fs = open("../input.txt", "r")

def nextLine(fs):
    line = fs.readline().strip()
    return line

currentLine = nextLine(fs)

calorieSums = [];

while currentLine:
    calorieTally = 0;
    while currentLine != '':
        calories = int(currentLine, 10)
        calorieTally += calories
        currentLine = nextLine(fs)
    calorieSums.append(calorieTally)
    currentLine = nextLine(fs)
    
calorieSums.sort()

maxSum = 0
for i in range(3):
    val = calorieSums.pop()
    print(val)
    maxSum += val

print("Sum of max three calories = " + str(maxSum))



fs.close()