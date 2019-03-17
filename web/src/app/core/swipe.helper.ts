export class SwipeHelper {

    private static LeftBorderOffset = 50;

    public static IsFromLeftBorder(event: any) {
        if (!event) {
            return false;
        }

        const startX = event.changedPointers[0].screenX - event.deltaX;
        return startX <= SwipeHelper.LeftBorderOffset;
    }
}
