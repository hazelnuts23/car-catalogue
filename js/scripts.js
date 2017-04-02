/* Credit to Dick Shern. I modify it abit */

$(document).ready(function () {
    loadDoc();

});
function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this);
        }
    };
    xhttp.open("GET", "data/car_catalogue.xml", true);
    xhttp.send();
}
function myFunction(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var table = "<tr><th>Car Catalogue </th></tr>";

    $(table).appendTo("#car_list").attr({id: "title"});
    var x = xmlDoc.getElementsByTagName("item");
    for (i = 0; i < x.length; i++) {
        AddItem(x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue,
            x[i].getElementsByTagName("price")[0].childNodes[0].nodeValue,
            x[i].getElementsByTagName("short_description")[0].childNodes[0].nodeValue,
            x[i].getElementsByTagName("dealer")[0].childNodes[0].nodeValue,
            $(x).find("details"),
            $(x).find("image"),
            i);
    }
}

function AddItem(name, price, short_description, dealer, details, imageSource, i) {
    var $list = $('#car_list');
    var litre;
    var gear;
    var type;
    var location;
    var count = 0;

    var setImg;

    $(details).each(function () {
        litre = $(this).find('litre').text();
        gear = $(this).find('gear').text();
        type = $(this).find('type').text();
        location = $(this).find('location').text();

        count++;
        if (count == i) {
            return false;
        }
    });
    count = 0;
    $(imageSource).each(function () {
        setImg = $(this).find('img').text();

        count++;
        if (count == i) {
            return false;
        }
    });

//Start of list item(car)
//Images column
    listElement = $('<div class="row">').appendTo($list);
    elementContainer = $('<div>').appendTo(listElement).attr("class", "listElement");

    column1 = $('<div>').appendTo(elementContainer).attr("class", "col-md-4");

    imagePart = $('<div>').appendTo(column1).attr({id: "imagePart"});

    //Add large image
    $('<img>').appendTo(imagePart).attr({src: setImg, id: "imageLarge"});
    $('</div>').appendTo(elementContainer);
//End of image column


//Description column
    column2 = $('<div>').appendTo(elementContainer).attr("class", "col-md-8");

    //Name
    row1 = $('<div>').appendTo(column2).attr("class", "row");
    titlePart = $('<div>').appendTo(row1).attr({id: "titlePart", "class": "col-md-12"});
    titlePart.append(name);
    $('</div>').appendTo(row1);

    //Price
    row2 = $('<div>').appendTo(column2).attr("class", "row");
    descriptionPart = $('<div>').appendTo(row2).attr({id: "pricePart", "class": "col-md-12"});
    descriptionPart.append(price);
    $('</div>').appendTo(row2);

    //Minor attributes
    row2 = $('<div>').appendTo(column2).attr("class", "row");
    descriptionPart = $('<div>').appendTo(row2).attr({id: "descriptionPart", "class": "col-md-12"});
    descriptionPart.append(litre + " | " + gear + " | " + type + " | " + location);
    $('</div>').appendTo(row2);

    //Comment
    row2 = $('<div>').appendTo(column2).attr("class", "row");
    descriptionPart = $('<div>').appendTo(row2).attr({id: "commentPart", "class": "col-md-12"});
    descriptionPart.append(short_description);
    $('</div>').appendTo(row2);

    //Dealer's name
    row2 = $('<div>').appendTo(column2).attr("class", "row");
    descriptionPart = $('<div>').appendTo(row2).attr({id: "dealerNamePart", "class": "col-md-12"});
    descriptionPart.append(dealer);
    $('</div>').appendTo(row2);


    $('<div>').appendTo(elementContainer);
//End of description column


    $('</div>').appendTo(listElement);
    $('</div>').appendTo($list);

//End of list item(car)
}