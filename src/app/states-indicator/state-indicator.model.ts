enum StateIndicatorAlignment {
    Left = 'left',
    Right = 'right',
    Center = 'center'
}

const autosStateIndicatorBackground: { [id: string]: string } = {
    [StateIndicatorAlignment.Center]: 'assets/autos-state-background-center.svg#image',
    [StateIndicatorAlignment.Left]: 'assets/autos-state-background-left.svg#image',
    [StateIndicatorAlignment.Right]: 'assets/autos-state-background-left.svg#image'
};

export { StateIndicatorAlignment, autosStateIndicatorBackground }
