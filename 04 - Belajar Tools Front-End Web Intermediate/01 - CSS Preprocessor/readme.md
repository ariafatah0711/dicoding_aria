npm install sass --global
sass --version

sass scss/debug.scss
sass scss/styles.scss css/styles.css

#debug
@function
@mixin
@use
#include
@if
@else

```
@function sumTwoNumber($firstNumber, $secondNumber) {
  @return $firstNumber + $secondNumber;
}
 
.sidebar {
  float: left;
  margin-left: sumTwoNumber(4, 3) * 1px;
}
```

```
@mixin reset-list {
 margin: 0;
 padding: 0;
 list-style: none;
}
 
@mixin horizontal-list {
 @include reset-list;
 
 li {
   display: inline-block;
   margin: {
     left: -2px;
     right: 2em;
   }
 }
}
 
nav ul {
 @include horizontal-list;
}
```

## built in modules
```
sass:color,
sass:list,
sass:map,
sass:math,
sass:meta,
sass:selector, dan
sass:string.
```

```
@debug list.append(10px 20px, 30px); // 10px 20px 30px
@debug list.append((blue, red), green); // blue, red, green
@debug list.append(10px 20px, 30px 40px); // 10px 20px (30px 40px)
@debug list.append(10px, 20px, $separator: comma); // 10px, 20px
@debug list.append((blue, red), green, $separator: space); // blue red green

@debug list.join(10px 20px, 30px 40px); // 10px 20px 30px 40px
@debug list.join((blue, red), (#abc, #def)); // blue, red, #abc, #def
@debug list.join(10px, 20px); // 10px 20px
@debug list.join(10px, 20px, $separator: comma); // 10px, 20px
@debug list.join((blue, red), (#abc, #def), $separator: space); // blue red #abc #def
@debug list.join([10px], 20px); // [10px 20px]
@debug list.join(10px, 20px, $bracketed: true); // [10px 20px]

@debug list.nth(10px 12px 16px, 2); // 12px
@debug list.nth([line1, line2, line3], -1); // line3
```

