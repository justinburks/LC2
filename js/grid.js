// refactor as export
let layouts = {
    eShape: `
    <div class="grid three-panel eShape">
    <div class="box a"></div>
    <div class="box b"></div>
    <div class="box c"></div>
    </div>
    `,
    tShape: `
    <div class="grid three-panel tShape">
    <div class="box a"></div>
    <div class="box b"></div>
    <div class="box c"></div>
    </div>
    `,
    slider: `
    <div class="grid three-panel slider">
    <div class="row a"></div>
    <div class="row b"></div>
    <div class="row c"></div>
    </div>
    `,
    lShapeL: `
    <div class="grid three-panel lShape-l">
    <div class="box a"></div>
    <div class="box b"></div>
    <div class="box c"></div>
    </div>
    `,
    lShapeR: `
    <div class="grid four-panel lShape-r">
    <div class="box a"></div>
    <div class="box b"></div>
    <div class="box c"></div>
    </div>
    `,
    fourSquare: `
    <div class="grid four-panel fourSquare">
    <div class="box a"></div>
    <div class="box b"></div>
    <div class="box c"></div>
    <div class="box d"></div>
    </div>
    `,
    fivePanUI: `
    <div class="grid five-panel fivePanUI">
    <div class="row header"></div>
    <div class="pad col-l"></div>
    <div class="pad col-r"></div>
    <div class="box a"></div>
    <div class="box b"></div>
    <div class="box c"></div>
    <div class="box ui"></div>
    </div>
    `,
    golden: `
    <div class="grid golden">
    <div class="box a"></div>
    <div class="box b"></div>
    <div class="box c"></div>
    <div class="box d"></div>
    <div class="box e"></div>
    </div>
    `,
    ninePan: `
    <div class="grid ninePan">
    <div class="box a"></div>
    <div class="box b"></div>
    <div class="box c"></div>
    <div class="box d"></div>
    <div class="box e"></div>
    <div class="box f"></div>
    <div class="box g"></div>
    <div class="box h"></div>
    <div class="box i"></div>
    </div>
    `,
    sixteenPan: `
    <div class="grid sixteenPan">
    <div class="box a"></div>
    <div class="box b"></div>
    <div class="box c"></div>
    <div class="box d"></div>
    <div class="box e"></div>
    <div class="box f"></div>
    <div class="box g"></div>
    <div class="box h"></div>
    <div class="box i"></div>
    <div class="box j"></div>
    <div class="box k"></div>
    <div class="box l"></div>
    <div class="box m"></div>
    <div class="box n"></div>
    <div class="box o"></div>
    <div class="box p"></div>
    </div>
    `,
}

document.querySelector('.overlay').innerHTML = layouts.eShape;

document.querySelector('.btn').addEventListener('click', () => {
    document.querySelector('.overlay').classList.toggle('show')
})