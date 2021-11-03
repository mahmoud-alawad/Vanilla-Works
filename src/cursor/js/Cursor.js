class Cursor {
    constructor(){
        this.mouseElement = document.createElement('span');
    }

    selectors = {
        root: document.querySelector(':root'),
    }
    defaultUser = {}
    default = {}


    start = (parameters) => {

        this.default = {
            cursor_color: 'white',
            cursor_type: 'cursor-pointed',
            cursor_animation: true,
            cursor_color_2 : '',
            
        }

        this.defaultUser = Object.assign(this.default, parameters);


        this.mouseElement.className = this.default.cursor_type ? this.default.cursor_type : this.defaultUser.cursor_type
        document.body.appendChild(this.mouseElement)
        this.selectors.root.style.setProperty('--cursor', this.default.cursor_color ? this.default.cursor_color : this.defaultUser.cursor_color )

        //mouse moving functionality
        window.addEventListener('click', () => {

            if (this.defaultUser.cursor_animation) {
                this.mouseElement.classList.add('cursor-animate')
            }
            setTimeout(() => {
                this.mouseElement.classList.remove('cursor-animate')
            }, 1000);
            
        })

        console.log(this.defaultUser);
        console.log(this.mouseElement, this.selectors.root);
          // change mouse position event
        document.addEventListener('mousemove' , this.mouseMove)
        document.addEventListener('mouseout', this.mouseHide)
    }

       //positining the cursor mouse
    mouseMove = (e) => {
            this.mouseElement.style.display = 'flex'
            this.mouseElement.style.left = `${e.pageX}px`
            this.mouseElement.style.top = `${e.pageY}px`
    }

    //hide the cursor
    mouseHide = (e) => {
        this.mouseElement.style.display = 'none'
    }
}

// let n = new Cursor();

// n.start({
//         cursor_color: '#eee',
//             cursor_type: 'cursor-pointed',
//             cursor_animation: false,
// })