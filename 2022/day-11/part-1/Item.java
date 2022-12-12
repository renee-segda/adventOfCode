import java.util.ArrayList;
import java.util.List;

public class Item {

    private long worryLevel;
    private int id;
    private static int ID_COUNTER = 0;
    

    public Item(long worryLevel) {
        this.worryLevel = worryLevel;
        id = ID_COUNTER++;
    }

    public static List<Item> parseItems(String itemLine) {
        String[] lineSplit = itemLine.split(":");
        String[] itemWorryVals = lineSplit[1].trim().split(",");
        List<Item> items = new ArrayList<>();
        for (String val : itemWorryVals) {
            int worryLevel = Integer.parseInt(val.trim());
            items.add(new Item(worryLevel));
        }
        return items;
    }

    public void setWorryLevel(long worryLevel) {
        this.worryLevel = worryLevel;
    }

    public long getWorryLevel() {
        return worryLevel;
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof Item)) {
            return false;
        }
        Item item = (Item)obj;
        return item.worryLevel == this.worryLevel && item.id == this.id;
    }

    @Override
    public String toString() {
        return String.format("Item #%d: %d", id, worryLevel);
    }

    @Override
    public int hashCode() {
        return toString().hashCode();
    }
    
}
