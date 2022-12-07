import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;

public class StreamProcessor {

    private static Map<String, Integer> charIndexMap = new HashMap<String, Integer>();
    private static int groupStartIndex = 0;
    private static int currentIndex = 0;
    private static final int flagMessageSize = 14;

    public static void main(String[] args) throws IOException {
        String filepath = "../input.txt";
        String message = "";
        Scanner fs = null;
        try {
            fs = new Scanner(new File(filepath));
            message = fs.nextLine().trim();
            fs.close();
        } catch (FileNotFoundException ignored) {
            
        } finally {
            fs.close();
        }

        while (currentIndex - groupStartIndex < flagMessageSize && currentIndex < message.length()) {
            String currentChar = message.substring(currentIndex, currentIndex + 1);
            if (charIndexMap.keySet().contains(currentChar)) {
                int previousIndex = charIndexMap.get(currentChar);
                groupStartIndex = currentIndex = previousIndex + 1;
                charIndexMap.clear();
            } else {
                charIndexMap.put(currentChar, currentIndex);
                currentIndex++;
            }
        }
        if (currentIndex == message.length()) {
            System.out.println("No quartet found");
        } else {
            System.out.println(String.format("Substring: %s", message.substring(groupStartIndex, currentIndex)));
            System.out.println(String.format("Num processed chars: %d", currentIndex));
        }


    }
}