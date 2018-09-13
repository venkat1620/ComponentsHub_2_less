class TextItem {
    public text: number;
    public active = false;

    constructor(text: number) {
        this.text = text;
    }
}

const textItemsCapacity = new Map<number, number>([
    [800, 3],
    [1200, 4],
    [1280, 4],
    [640, 3],
    [962, 3]
  ]);

export { textItemsCapacity, TextItem };
