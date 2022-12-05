fs = open('../input.txt', 'r')

def parseAssignmentPair(line):
    assignments = line.split(',')
    assign1 = assignments[0].split('-')
    assign2 = assignments[1].split('-')
    return [
        [int(assign1[0]),int(assign1[1])],
        [int(assign2[0]),int(assign2[1])]
    ]

def pairSharesBoundaries(assign1, assign2):
    return ((assign1[0] == assign2[0]) or 
            (assign1[0] == assign2[1]) or 
            (assign1[1] == assign2[0]) or 
            (assign1[1] == assign2[1]))

def isEnvelopingPair(assign1, assign2):
    return ((assign1[0] < assign2[0] and assign1[1] > assign2[0]) or 
            (assign2[0] > assign1[0] and assign2[1] < assign1[0]))

def pairHasPartialOverlap(assign1, assign2):
    return ((assign1[0] > assign2[0] and assign1[0] < assign2[1]) or 
            (assign2[0] > assign1[0] and assign2[0] < assign1[1]) or 
            (assign1[1] < assign2[1] and assign1[1] > assign2[0]) or 
            (assign2[1] < assign1[1] and assign2[1] > assign1[0]))

def pairOverlaps(assign1, assign2):
    sharesBoundaries = pairSharesBoundaries(assign1, assign2)
    envelopingPair = isEnvelopingPair(assign1, assign2)
    partialOverlap = pairHasPartialOverlap(assign1, assign2)
    # print('sharesBoundaries=' + str(sharesBoundaries) + '\nenvelopingPair=' + str(envelopingPair) + '\npartialOverlap=' + str(partialOverlap))
    overlaps = sharesBoundaries or envelopingPair or partialOverlap
    return overlaps

numOverlappingPairs = 0

line = fs.readline().strip()

while line:
    # print(line)
    assignments = parseAssignmentPair(line)
    isOverlappingPair = pairOverlaps(assignments[0], assignments[1])
    numOverlappingPairs += 1 if isOverlappingPair else 0
    line = fs.readline().strip()

print('Total num overlapping pairs: ' + str(numOverlappingPairs))
