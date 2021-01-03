/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/
// Define Global Variables
const start= performance.now();
var allSections= document.querySelectorAll('section');
var fragment= document.createDocumentFragment();
const unorderedList= document.getElementById('navbar__list');
const links= document.getElementsByTagName('a');
var section;
var x= 1;
const nav= document.querySelector('.navbar__menu');
var isScrolling;
var link;
// end of Global Variables
//start nav bar
for (section of allSections)
{
    const item= document.createElement('li');
    const link= document.createElement('a');
    link.className="menu__link";
    link.setAttribute('href','#');
    link.setAttribute('id','a'+x);
    link.textContent= section.getAttribute('data-nav');
    item.appendChild(link);
    fragment.appendChild(item); 
    x++; 
}
unorderedList.appendChild(fragment);
//end of nav bar
// make click event
for (link of links)
{
    link.addEventListener("click",respondToClick);
}
//start of helper functions
function respondToScroll()
{
    window.clearTimeout( isScrolling );
    isScrolling = setTimeout(function()
    {
        nav.style.display= 'none';
    }, 1500);
    nav.style.display= 'block';
    for (section of allSections)
    {
        if (section.className == "your-active-class")
        {
            section.className ="";
        }
        var bounding = section.getBoundingClientRect();
        if (!(bounding.top > innerHeight || bounding.bottom < 0) )
        {
            // Add class 'active' to section when near top of viewport
            section.className= "your-active-class";
            // Scroll to anchor data-nav using scrollTO event
            for (link of links)
            {
                if(link.textContent==section.getAttribute('data-nav'))
                {
                    link.style.backgroundColor='black';
                    link.style.color='white';
                }
                else
                {
                    link.style.backgroundColor='';
                    link.style.color='';
                }
            }
        }
    }
}
function respondToClick(event)
{
    event.preventDefault();
    var clickedlink= event.target;
    var linkid= clickedlink.id;
    var num= linkid.slice(1,2);
    var ressec;
    for (section of allSections)
    {
        if(section.id==='section'+num)
        {
            ressec= section;
            break;
        }
    }
    ressec.scrollIntoView({behavior: "smooth"});
}
//end of helper functions
// make scroll event
window.addEventListener("scroll",respondToScroll);
// calculate performance
const end= performance.now();
const sub= end-start;
console.log('It takes '+ sub+' milliseconds');