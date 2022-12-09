export interface TreeGridCell {
    height: number,
    maxHeightNorth: number,
    maxHeightSouth: number,
    maxHeightEast: number,
    maxHeightWest: number
}

export interface TreeGridScenicCell {
    scenicScoreNorth: number,
    scenicScoreSouth: number,
    scenicScoreWest: number,
    scenicScoreEast: number,
    totalScore: number,
    height: number
}