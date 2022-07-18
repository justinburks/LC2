# THINKING OUT LOUD

# JULY 2022

## 7/13/22
commit activity not showing up from git --> github so I'll manually update here and document any fixes as needed 

## 7/15/22
Basic Model & Architecture finish, now basic module styles must start, then bring it together to finish main features for a MVP before moving on.
--> comeback and update as you learn

## 7/16/22 
Figuring out a coherent style to suite the application seems a bit more challenging than writing the actual javascript for some reason... Trying to 
strike a balance between modern & functional without making it look too playful. I want things to standout but they come out too playful.
Maybe the answer is in the simple things like z-index,box-shadows,color contrast, and font choices.

## 7/16/22
Also it seems like the more I get into it the ideas for features come faster than the pace I'm actually equiped to develop.. So I guess I'll mind map them here

## 7/17/22
I begin to see the importance of mental framworks, and ways to build and structure any given file. In creating different modules & elements I think I need to use a convention like smaccs, or bem... at the same time, while writing it I think I'm doing it... It's not until things get to cluttered/redundant that I realize that I'm either not doing it right, or not doing it at all. However, that is the same time I recall the explanation of such conventions and realize I'm getting much better at seeing opportunities to use them before getting to deep in the weeds.

## 7/17/22
In learning about higher order functions like filter/map/reduce, higher - higher order functions like transducers/trampolines/curried functions and composers, its safe to say that my brain is fried. I initially created classes in what I believed to be a MVC pattern, these methods returned other methods and so on to do several tasks and called them all in succession with a single function, I now know that I was on the right track however what I was doing was in the spirit of functional programming but was not at all that. It was imperative, hard to pick back up and keep building on. It also gave me the feeling that if I wasn't careful i could've turned to spagetti at any point and I felt there was a way to compose/pipe and abstract all of these methods and eventually create a declarative interface. Well this 9 hour course. This 9 hour course is proving that but I need time to process all of this information. I still plan to write css modules so that when I do start hacking away at the javascript again, it will begin to look feel and behave like an application with real potential for production, and more importantly, an application tbuilt on foundational concepts that can be applied to different applications looking for a similar result. 

## 7/17/22

I think it's better to create the document elements during compile time. Although the first paint may take some miliseconds to load, I think this will limit the need to reference the main array several times during run time. I can build the elements, attatching necessary properties once... then reference the document rather than the database during run time. For building/saving collections I can use local storage for now.

# 7/17/22

This is gonna suck, but I'm going to rewrite the entire application.... but this time with new utilities I've learned how to create. Hopefully I can build it faster and easier to update/maintain this time around. The goal is not the application... but being able to write an application that is simple, effective, and plays well with others and do it quickly.

**When I started this project, I was afraid of using objects and classes, learning about functional programming vs OOP, it felt dirty resorting to different Classes that rely on methods for manipulating the datastructure, getting/setting state, and manipulating the dom. I think a better route is to create abstracted utility functions that resolve alot of the work but in a generic, and reusable way. Independent functions that result in declarative operations derived from an immutable data structures seems like a safer, more maintainable route from a long term perspective.

**I've even considered rewriting the program to fit the FP paradigm, ditching OOP altogether, but as I get deeper into the FP rabbit hole I am realizing that both paradigms exist in the programming world at large and I should continue with writing my program to primarily utilize object oreiented methods until I can fully grasp FP, learning OOP a bit more in the process.

# MIND MAPS
**MAKE A DOWNLOAD BUTTON THAT UPDATES AN EXTERNAL API... MAYBE SOMETHING LIKE A NPM PACKAGE. SO THAT I CAN IMPORT COLLECTIONS WITH A FEW LINES OF CODE

**INSTEAD OF DOWNLOAD BUTTON, USE AN IMPORT BUTTON, THAT HAS AN OPTION TO CREATE A CSS MODULE, VIA NODEJS, THAT HAS THE SELECTED STYLES AND ANIMATIONS ATTATCHED TO IT, OR WRITE SPIT OUT A WEBCOMPONENT AS A FILE

**SAVE COLLECTIONS TO LOCAL HOST
