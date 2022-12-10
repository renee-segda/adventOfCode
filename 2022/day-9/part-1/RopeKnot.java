public class RopeKnot {
    private int xCor;
    private int yCor;

    public RopeKnot() {
        xCor = 0;
        yCor = 0;
    }

    public RopeKnot(RopeKnot k) {
        xCor = k.xCor;
        yCor = k.yCor;
    }

    public int getXCor() {
        return xCor;
    }

    public int getYCor() {
        return yCor;
    }

    public void moveUp() {
        yCor++;
    }

    public void moveDown() {
        yCor--;
    }

    public void moveRight() {
        xCor++;
    }

    public void moveLeft() {
        xCor--;
    }

    public void moveUpAndRight() {
        moveUp();
        moveRight();
    }

    public void moveUpAndLeft() {
        moveUp();
        moveLeft();
    }

    public void moveDownAndRight() {
        moveDown();
        moveRight();
    }

    public void moveDownAndLeft() {
        moveDown();
        moveLeft();
    }

    public String toString() {
        return String.format("(%d,%d)", xCor, yCor);
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof RopeKnot)) {
            return false;
        }
        RopeKnot other = (RopeKnot)obj;
        return other.xCor == this.xCor && other.yCor == this.yCor;
    }

    @Override
    public int hashCode() {
        return this.toString().hashCode();
    }
}