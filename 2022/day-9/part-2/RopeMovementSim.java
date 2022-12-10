import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Scanner;
import java.util.Set;

public class RopeMovementSim {
    
    private static Set<RopeKnot> tailLocations = new HashSet<>();

    private static RopeKnot[] ropeKnots = new RopeKnot[10];

    private enum HeadMoveDirection {
        UP,
        DOWN,
        LEFT,
        RIGHT,
        UPRIGHT,
        UPLEFT,
        DOWNLEFT,
        DOWNRIGHT
    }

    private static boolean isHeadCloseToTail(RopeKnot head, RopeKnot tail) {
        return (head.equals(tail) || 
                (Math.abs(head.getXCor() - tail.getXCor()) <= 1 && 
                Math.abs(head.getYCor() - tail.getYCor()) <= 1));
    }

    private static void moveHeadOneUnit(HeadMoveDirection direction) {
        RopeKnot head = ropeKnots[0];
        switch (direction) {
            case UP:
                head.moveUp();
                break;
            case DOWN:
                head.moveDown();
                break;
            case LEFT:
                head.moveLeft();
                break;
            case RIGHT:
                head.moveRight();
                break;
            default:
                break;
        }

        HeadMoveDirection headMoveDirection = direction;
        for (int i = 1; i < ropeKnots.length; i++) {
            RopeKnot currentHead = ropeKnots[i-1];
            RopeKnot currentTail = ropeKnots[i];
            if (!isHeadCloseToTail(currentHead, currentTail)) {
                switch(headMoveDirection) {
                    case UP:
                        if (currentTail.getXCor() == currentHead.getXCor()) {
                            currentTail.moveUp();
                        } else if (currentTail.getXCor() > currentHead.getXCor()) {
                            currentTail.moveUpAndLeft();
                            headMoveDirection = HeadMoveDirection.UPLEFT;
                        } else {
                            currentTail.moveUpAndRight();
                            headMoveDirection = HeadMoveDirection.UPRIGHT;
                        }
                        break;
                    case LEFT:
                        if (currentTail.getYCor() == currentHead.getYCor()) {
                            currentTail.moveLeft();
                        } else if (currentTail.getYCor() < currentHead.getYCor()) {
                            currentTail.moveUpAndLeft();
                            headMoveDirection = HeadMoveDirection.UPLEFT;
                        } else {
                            currentTail.moveDownAndLeft();
                            headMoveDirection = HeadMoveDirection.DOWNLEFT;
                        }
                        break;
                    case RIGHT:
                        if (currentTail.getYCor() == currentHead.getYCor()) {
                            currentTail.moveRight();
                        } else if (currentTail.getYCor() < currentHead.getYCor()) {
                            currentTail.moveUpAndRight();
                            headMoveDirection = HeadMoveDirection.UPRIGHT;
                        } else {
                            currentTail.moveDownAndRight();
                            headMoveDirection = HeadMoveDirection.DOWNRIGHT;
                        }
                        break;
                    case DOWN:
                        if (currentTail.getXCor() == currentHead.getXCor()) {
                            currentTail.moveDown();
                        } else if (currentTail.getXCor() < currentHead.getXCor()) {
                            currentTail.moveDownAndRight();
                            headMoveDirection = HeadMoveDirection.DOWNRIGHT;
                        } else {
                            currentTail.moveDownAndLeft();
                            headMoveDirection = HeadMoveDirection.DOWNLEFT;
                        }
                        break;
                    case UPRIGHT:
                        if (currentTail.getXCor() == currentHead.getXCor()) {
                            currentTail.moveUp();
                            headMoveDirection = HeadMoveDirection.UP;
                        } else if (currentTail.getYCor() == currentHead.getYCor()) {
                            currentTail.moveRight();
                            headMoveDirection = HeadMoveDirection.RIGHT;
                        } else {
                            currentTail.moveUpAndRight();
                        }
                        break;
                    case UPLEFT:
                        if (currentTail.getXCor() == currentHead.getXCor()) {
                            currentTail.moveUp();
                            headMoveDirection = HeadMoveDirection.UP;
                        } else if (currentTail.getYCor() == currentHead.getYCor()) {
                            currentTail.moveLeft();
                            headMoveDirection = HeadMoveDirection.LEFT;
                        } else {
                            currentTail.moveUpAndLeft();
                        }
                        break;
                    case DOWNRIGHT:
                        if (currentTail.getXCor() == currentHead.getXCor()) {
                            currentTail.moveDown();
                            headMoveDirection = HeadMoveDirection.DOWN;
                        } else if (currentTail.getYCor() == currentHead.getYCor()) {
                            currentTail.moveRight();
                            headMoveDirection = HeadMoveDirection.RIGHT;
                        } else {
                            currentTail.moveDownAndRight();
                        }
                        break;
                    case DOWNLEFT:
                        if (currentTail.getXCor() == currentHead.getXCor()) {
                            currentTail.moveDown();
                            headMoveDirection = HeadMoveDirection.DOWN;
                        } else if (currentTail.getYCor() == currentHead.getYCor()) {
                            currentTail.moveLeft();
                            headMoveDirection = HeadMoveDirection.LEFT;
                        } else {
                            currentTail.moveDownAndLeft();
                        }
                        break;
                }
                if (i == ropeKnots.length - 1) {
                    tailLocations.add(currentTail);
                }
            } else {
                break;
            }
        }
        
    }

    private static void executeStep(String step) {
        String[] stepParts = step.split(" ");
        String direction = stepParts[0];
        int numMovements = Integer.parseInt(stepParts[1]);
        HeadMoveDirection headDir = null;
        switch(direction) {
            case "D":
                headDir = HeadMoveDirection.DOWN;
                break;
            case "U":
                headDir = HeadMoveDirection.UP;
                break;
            case "L":
                headDir = HeadMoveDirection.LEFT;
                break;
            case "R":
                headDir = HeadMoveDirection.RIGHT;
                break;
        }

        for (int i = 0; i < numMovements; i++) {
            moveHeadOneUnit(headDir);
        }
    }

    public static void main(String[] args) {
        String inputPath = "../input.txt";
        List<String> instructions = new ArrayList<String>();
        try {
            Scanner fs = new Scanner(new File(inputPath));
            while (fs.hasNextLine()) {
                instructions.add(fs.nextLine());
            }
        } catch (IOException e) {
            throw new IllegalArgumentException(String.format("No file found with path %s", inputPath));
        }

        for (int i = 0; i < ropeKnots.length; i++) {
            ropeKnots[i] = new RopeKnot();
        }

        tailLocations.add(new RopeKnot());

        for (String step : instructions) {
            executeStep(step);
        }

        System.out.println(String.format("Num tail locations: %d", tailLocations.size()));

    }
}
