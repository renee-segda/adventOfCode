fs = open('../input.txt', 'r')

def parseAssignmentPair(line):
    assignments = line.split(',')
    assign1 = assignments[0].split('-')
    assign2 = assignments[1].split('-')
    return [
        [int(assign1[0]),int(assign1[1])],
        [int(assign2[0]),int(assign2[1])]
    ]

def pairMemberEnvelopesAnother(assign1, assign2):
    secondContainsFirst = assign1[0] >= assign2[0] and assign1[1] <= assign2[1]
    firstContainsSecond = assign2[0] >= assign1[0] and assign2[1] <= assign1[1]
    envelops = secondContainsFirst or firstContainsSecond
    return envelops

numEnvelopingPairs = 0

line = fs.readline().strip()

while line:
    assignments = parseAssignmentPair(line)
    isEnvelopingPair = pairMemberEnvelopesAnother(assignments[0], assignments[1])
    numEnvelopingPairs += 1 if isEnvelopingPair else 0
    line = fs.readline().strip()

print('Total num enveloping pairs: ' + str(numEnvelopingPairs))
