import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Scanner;
import java.util.Set;

public class RopeMovementSim {
    
    private static RopeKnot head = new RopeKnot();
    private static RopeKnot tail = new RopeKnot();
    private static Set<RopeKnot> tailLocations = new HashSet<>();

    private enum HeadMoveDirection {
        UP,
        DOWN,
        LEFT,
        RIGHT
    }

    private static boolean isHeadCloseToTail() {
        return (head.equals(tail) || 
                (Math.abs(head.getXCor() - tail.getXCor()) <= 1 && 
                Math.abs(head.getYCor() - tail.getYCor()) <= 1));
    }

    private static void moveHeadOneUnit(HeadMoveDirection direction) {
        RopeKnot headInitialSpot = new RopeKnot(head);
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
        }

        if (!isHeadCloseToTail()) {
            tail = headInitialSpot;
            tailLocations.add(headInitialSpot);
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
        String inputPath = "/Users/rsegda/development/adventOfCode/2022/day-9/input.txt";
        List<String> instructions = new ArrayList<String>();
        try {
            Scanner fs = new Scanner(new File(inputPath));
            while (fs.hasNextLine()) {
                instructions.add(fs.nextLine());
            }
        } catch (IOException e) {
            throw new IllegalArgumentException(String.format("No file found with path %s", inputPath));
        }

        tailLocations.add(new RopeKnot());

        for (String step : instructions) {
            executeStep(step);
        }

        System.out.println(String.format("Num tail locations: %d", tailLocations.size()));

    }
}
