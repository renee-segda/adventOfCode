import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

public class Monkey {

    private List<Item> items;
    private Function<Item,Void> examineItem;
    private Function<Item,Void> testItem;
    private long numItemsInspected = 0;
    public static long productOfDivisors = 1;
    public static List<Monkey> monkeys;

    public Monkey(List<Item> items) {
        this.items = items;
        if (monkeys == null) {
            monkeys = new ArrayList<>();
        }
        monkeys.add(this);
    }

    public void giveItemToMonkey(Item item, Monkey monkey) {
        monkey.items.add(item);
        this.items.remove(item);
    }

    private long evaluateExpression(String expression) {
        String[] expressionParts = expression.split(" ");
        long opp1 = Long.parseLong(expressionParts[0].trim());
        long opp2 = Long.parseLong(expressionParts[2].trim());
        long result = 0;
        switch (expressionParts[1].trim()) {
            case "*":
                result = opp1 * opp2;
                break;
            case "+":
                result = opp1 + opp2;
                break;
            default:
                throw new IllegalArgumentException("Unexpected operator: " + expressionParts[1]);
        }
        return result;
    }

    public void createExamineFunction(String examineOperation) {
        String[] lineParts = examineOperation.split(":");
        String operation = lineParts[1].trim();
        String operationWithoutAssignment = (operation.split("="))[1].trim();
        examineItem = (item) -> {
            // System.out.println(String.format("- Monkey inspects item of worry level %d", item.getWorryLevel()));
            String expression = operationWithoutAssignment.replaceAll(
                "old", String.valueOf(item.getWorryLevel()));
            // System.out.println(String.format("- Evaluating expression %s", expression));
            long responseVal = evaluateExpression(expression);
            long reducedWorryLevel = responseVal % Monkey.productOfDivisors;
            item.setWorryLevel(reducedWorryLevel);
            numItemsInspected++;
            // System.out.println(String.format("- After examining, worry level for item is now %d", item.getWorryLevel()));
            return null;
        };
    }

    public void createTestFunction(String[] testFunctionLines) {
        String[] testLineParts = testFunctionLines[0].split(":");
        String operation = testLineParts[1].trim();
        String[] operationParts = operation.split(" ");
        int divisor = Integer.parseInt(operationParts[operationParts.length - 1]);
        productOfDivisors *= divisor;
        String[] trueLineParts = testFunctionLines[1].split(" ");
        int trueMonkeyIndex = Integer.parseInt(trueLineParts[trueLineParts.length - 1]);
        String[] falseLineParts = testFunctionLines[2].split(" ");
        int falseMonkeyIndex = Integer.parseInt(falseLineParts[falseLineParts.length - 1]);
        testItem = (item) -> {
            if (item.getWorryLevel() % divisor == 0) {
                // System.out.println(String.format("- Worry level %d is divisible by %d. Giving to Monkey %d", item.getWorryLevel(), divisor, trueMonkeyIndex));
                giveItemToMonkey(item, monkeys.get(trueMonkeyIndex));
            } else {
                // System.out.println(String.format("- Worry level %d is not divisible by %d. Giving to Monkey %d", item.getWorryLevel(), divisor, falseMonkeyIndex));
                giveItemToMonkey(item, monkeys.get(falseMonkeyIndex));
            }
            return null;
        };
    }

    public void takeTurn() {
        List<Item> itemsCopy = List.copyOf(items);
        for (Item i : itemsCopy) {
            examineItem.apply(i);
            testItem.apply(i);
        }
    }

    public long getNumItemsInspected() {
        return numItemsInspected;
    }
}