import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;

public class MonkeyBusiness {

    public static void main(String[] args) {
        List<String> inputLines = new ArrayList<>();
        try {
            Scanner fs = new Scanner(new File("/Users/rsegda/development/adventOfCode/2022/day-11/input.txt"));
            while (fs.hasNextLine()) {
                inputLines.add(fs.nextLine());
            }
        } catch (IOException e) {
            throw new IllegalArgumentException("File not found!");
        }

        //Initialize monkeys and items
        int lineIndex = 0;

        while (lineIndex < inputLines.size()) {
            lineIndex++; // skip first line of monkey input
            List<Item> items = Item.parseItems(inputLines.get(lineIndex++));
            Monkey m = new Monkey(items);
            m.createExamineFunction(inputLines.get(lineIndex++));
            m.createTestFunction(new String[]{
                inputLines.get(lineIndex), 
                inputLines.get(lineIndex + 1), 
                inputLines.get(lineIndex + 2)
            });
            lineIndex += 4;
        }

        int numRounds = 10000;

        for (int round = 1; round <= numRounds; round++) {
            System.out.println(String.format("****** Round %d / %d ******", round, numRounds));
            // System.out.println(String.format("Round %d start\n", round));
            for (int i = 0; i < Monkey.monkeys.size(); i++) {
                // System.out.println(String.format("Monkey %d starting turn\n", i));
                Monkey.monkeys.get(i).takeTurn();
                // System.out.println(String.format("Monkey %d done with turn\n", i));
            }

        }

        List<Long> numTimesInspected = new ArrayList<>();

        for (int i = 0; i < Monkey.monkeys.size(); i++) {
            Monkey m = Monkey.monkeys.get(i);
            numTimesInspected.add(m.getNumItemsInspected());
            System.out.println(String.format("Monkey %d inspected items %d times", i, m.getNumItemsInspected()));
        }

        Collections.sort(numTimesInspected, Collections.reverseOrder());
        System.out.println(String.format("Monkey business level: %d", numTimesInspected.get(0) * numTimesInspected.get(1)));



    }

}
