# cursorJS

cursorJS is a simple library to change and animate cursor mouse in your oroject


### [DEMO]( https://cursorjsjs.netlify.app/)


### USAGE

#### first you have to link the css file to the head tag 
``` 
<link rel="stylesheet" href="css/cursor.css" />
``` 

#### and the script tag 

``` 
<script src="js/Cursor.js"></script>
``` 

####  set new Cursor and a assign it to variable for example
``` 
let mouse = new Cursor();
```

### then call the start method takes three arguments

first argumnt take the color value and the second argument for the mouse type you can chose these classes
##### the default one is 'cursor'
##### the rectangle  'cursor-rectangle'
##### the rounded  'cursor-rounded'
##### the pointed  'cursor-poindted'

the third argument true or false for animation
```
mouse.start({
       cursor_color: 'coral',
       cursor_type: 'cursor-pointed',
       cursor_animation: true,
})
```
