
class Cursor {
    constructor() {
        this.mouseElement = document.createElement('span');
    }

    // all dom elements selectors
    selectors = {
        root :  document.querySelector(':root'),
        cursor_selector: document.querySelector('#cursor-selector'),
        colorDomText : document.querySelector('.color-value-selected'),
        classDomText: document.querySelector('.cursor-class-inner'),
        updateColorBtn : document.querySelector('.btn-color-submit'),
        cursor_animation_true : document.querySelector('#cursor-animate-true'),
        cursor_animation_false : document.querySelector('#cursor-animate-false'),
        side_bar_header : document.querySelector('.side-bar-header'),
        cursor_checkBox : document.querySelector('.cursor-checkBox'),
        cursor_functionUI_Text: document.querySelector('.cursor-function-textholder'),
        cursorColorInput : document.querySelector('#cursor-color'),
        cursorColor : '',
        
    }
    
    defaultUser = {}
    default = {}
    option = {}

    init = (color, type, animate) => {
        

         //set values
        this.default = {
            cursor_color: color,
            cursor_type: type,
            cursor_animation: animate,
            cursor_color_2 : '',
            
        }

        
        this.mouseElement.className = type
        document.body.appendChild(this.mouseElement)
        this.selectors.root.style.setProperty('--cursor', color)

        //mouse moving functionality
        window.addEventListener('click', () => {

            if (animate) {
                this.mouseElement.classList.add('cursor-animate')
            }
            setTimeout(() => {
                this.mouseElement.classList.remove('cursor-animate')
            }, 1000);
            
        })


        //listner on color input
        this.selectors.cursorColorInput.addEventListener("input", function (e) {
        document.documentElement.style.setProperty('--cursor', e.target.value)

               //reset values
        this.default = {
            cursor_color: color,
            cursor_type: type,
            cursor_animation: animate,
            cursor_color_2: '',
            secondColorSelected : e.target.value,
            
            }
            }, false),

            //update state
        this.selectors.updateColorBtn.addEventListener('click', this.update)
        


                  // change mouse position event
        document.addEventListener('mousemove' , this.mouseMove)
        document.addEventListener('mouseout', this.mouseHide)
        
        //check for animtaion
        this.selectors.cursor_checkBox.addEventListener('change', () => {

            if (this.selectors.cursor_checkBox.checked) {
                animate = true
                this.default.cursor_animation = true
                this.option.cursor_animation = true
            } else {
                animate = false
                this.default.cursor_animation = false
                this.option.cursor_animation = false
            }
        })


        //show values to user
        this.selectors.cursor_functionUI_Text.innerHTML =
        `
            <h3>Cursor.init(${color},${type},${animate})</h3>
        `;
        this.selectors.classDomText.innerHTML = `
        <p>cursor color : ${this.default.cursor_color}</p>
        <p>cursor type : ${this.default.cursor_type}</p>
        <p>cursor animation : ${this.default.cursor_animation}</p>
        `;
    }




    


    //upadate color and text only for home page
    update = () => {
        
        //update the state
        this.option = {
            cursor_color: getComputedStyle(document.documentElement).getPropertyValue('--cursor'),
            cursor_type: this.selectors.cursor_selector.selectedOptions[0].value,
            cursor_animation : this.default.cursor_animation,
        }
        
        let radius = 0;

        if (this.option.cursor_type === 'cursor-rectangle') {
            radius = 3;
        }else if (this.option.cursor_type === 'cursor-rounded') {
            radius = 20;
        }
                //update css variable color cursor
        this.selectors.root.style.setProperty('--cursor', this.option.cursor_color)
        

        // style
        const style = `background-color : ${this.option.cursor_color}; border-radius : ${radius}px; padding : 8px; `;

            //this.cursorColor = document.querySelector('#cursor-color').value;
        this.selectors.cursor_functionUI_Text.innerHTML =
        `
            <h3 style="${style}">Cursor.init(${this.option.cursor_color},${this.option.cursor_type},${this.option.cursor_animation})</h3>
        `;
        this.selectors.colorDomText.innerHTML = this.selectors.cursorColor;
        this.selectors.classDomText.innerHTML = `
        <p>cursor color : ${this.option.cursor_color}</p>
        <p>cursor type : ${this.option.cursor_type}</p>
        <p>cursor animation : ${this.option.cursor_animation}</p>
        `;
        this.mouseElement.className = this.selectors.cursor_selector.selectedOptions[0].value

    }


    //start function for  user uses 
    start = ({color, name, animation}) => {
        //set values
        this.defaultUser = {
            cursor_color: color,
            cursor_type: name,
            cursor_animation: animation,
            cursor_color_2 : '',
            
        }
        //update the state
        this.option = {
            cursor_color: getComputedStyle(document.documentElement).getPropertyValue('--cursor'),
            cursor_type: this.selectors.cursor_selector.selectedOptions[0].value,
            cursor_animation : this.default.cursor_animation,
        }

                    //update css variable color cursor
        this.selectors.root.style.setProperty('--cursor', this.option.cursor_color)

                this.mouseElement.className = this.selectors.cursor_selector.selectedOptions[0].value

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
const mainColor = document.documentElement.style.getPropertyValue('--cursor');
const mouse = new Cursor();
mouse.init(mainColor,'cursor',false)
