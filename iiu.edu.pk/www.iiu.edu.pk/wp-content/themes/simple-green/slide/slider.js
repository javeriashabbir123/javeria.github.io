// ==============================

// Set the following variables...

// ==============================



// Set the slideshow speed (in milliseconds)

var SlideShowSpeed = 7000;



// Set the duration of crossfade (in seconds)

var CrossFadeDuration = 2;



var Picture = new Array(); // don't change this

var Caption = new Array(); // don't change this



// Specify the image files...

// To add more images, just continue

// the pattern, adding to the array below.

// To use fewer images, remove lines

// starting at the end of the Picture array.

// Caution: The number of Pictures *must*

// equal the number of Captions!

//Picture[1]  = 'https://www.iiu.edu.pk/wp-content/themes/simple-green/images/slide-show/001.jpg';
//Picture[1]  = 'https://www.iiu.edu.pk/wp-content/uploads/2021/12/admission-spring-2022.jpg';
Picture[1] = 'https://www.iiu.edu.pk/wp-content/themes/simple-green/images/slide-show/faisal_masjid.jpg';
Picture[2] = 'https://www.iiu.edu.pk/wp-content/themes/simple-green/images/slide-show/002.jpg';
Picture[3] = 'https://www.iiu.edu.pk/wp-content/themes/simple-green/images/slide-show/004.jpg';
Picture[4] = 'https://www.iiu.edu.pk/wp-content/themes/simple-green/images/slide-show/005.jpg';
Picture[5] = 'https://www.iiu.edu.pk/wp-content/themes/simple-green/images/slide-show/inside-view.jpg';

/*

Picture[7]  = 'Image007.jpg';

Picture[8]  = 'Image008.jpg';

Picture[9]  = 'Image009.jpg';

Picture[10] = 'Image010.jpg';

*/



// Specify the Captions...

// To add more captions, just continue

// the pattern, adding to the array below.

// To use fewer captions, remove lines

// starting at the end of the Caption array.

// Caution: The number of Captions *must*

// equal the number of Pictures!




//Caption[1]  = "Admissions Spring 2022";
Caption[1] = "Old Campus of International Islamic University, Islamabad";
Caption[2] = "New Campus of International Islamic University, Islamabad";
Caption[3] = "Newly created auditorium";
Caption[4] = "New Campus, International Islamic University";
Caption[5] = "Inside view of university campus";

/*



Caption[7]  = "This is the seventh caption.";

Caption[8]  = "This is the eighth caption.";

Caption[9]  = "This is the ninth caption.";

Caption[10] = "This is the tenth caption.";

*/

// =====================================

// Do not edit anything below this line!

// =====================================



var tss;

var iss;

var jss = 1;

var pss = Picture.length - 1;



var preLoad = new Array();

for (iss = 1; iss < pss + 1; iss++) {

    preLoad[iss] = new Image();

    preLoad[iss].src = Picture[iss];
}



function runSlideShow() {

    if (document.all) {

        document.images.PictureBox.style.filter = "blendTrans(duration=2)";

        document.images.PictureBox.style.filter = "blendTrans(duration=CrossFadeDuration)";

        document.images.PictureBox.filters.blendTrans.Apply();
    }

    document.images.PictureBox.src = preLoad[jss].src;

    if (document.getElementById) document.getElementById("CaptionBox").innerHTML = Caption[jss];

    if (document.all) document.images.PictureBox.filters.blendTrans.Play();

    jss = jss + 1;

    if (jss > (pss)) jss = 1;

    tss = setTimeout('runSlideShow()', SlideShowSpeed);

}