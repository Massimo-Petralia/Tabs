var data = [
    {
        id: 0,
        title: 'Tokio',
        text: 'txt/tokyo.txt',
    },
    {
        id: 1,
        title: 'Roma',
        text: 'txt/roma.txt',
    },
    {
        id: 2,
        title: 'Berlino',
        text: 'txt/berlino.txt',
    }
]

function buildTabs() {
    var prevControll = document.createElement('span');
    prevControll.setAttribute('id', 'myPrev');
    prevControll.setAttribute('class', 'myControls');
    prevControll.setAttribute('onclick', 'myScrollPrev()');

    prevControll.innerHTML = '<';
    document.getElementById('parentBox').appendChild(prevControll);
    var tabBox = document.createElement('div');
    tabBox.setAttribute('id', 'listenItem');

    data.forEach((obj, index) => {
        document.getElementById('tab').appendChild(tabBox);
        var button = document.createElement('button');
        button.setAttribute('class', 'tablinks');
        button.setAttribute('onclick', 'openCity(' + 'event, ' + "'" + data[index].title + "'" + ')');
        button.innerHTML = data[index].title;
        document.getElementById('listenItem').appendChild(button);
        var closeButton = document.createElement('div');
        closeButton.setAttribute('class', 'myCloseButton');
        closeButton.innerHTML = 'x';
        button.appendChild(closeButton);
    })


    var nextControll = document.createElement('span');
    nextControll.setAttribute('id', 'myNext');
    nextControll.setAttribute('class', 'myControls');
    nextControll.setAttribute('onclick', 'myScrollNext()');
    nextControll.innerHTML = '>';
    document.getElementById('parentBox').appendChild(nextControll);
}

function buildContent() {
    data.forEach((obj, index) => {
        var city = document.createElement('div');
        city.setAttribute('id', data[index].title);
        city.setAttribute('class', 'tabContent');
        var title = document.createElement('h3');
        title.innerHTML = data[index].title;
        var text = document.createElement('object');
        text.setAttribute('class', 'myText');
        text.setAttribute('data', data[index].text);
        document.getElementById('container').appendChild(city);
        city.appendChild(title);
        city.appendChild(text);
        var close = document.createElement('span');
        close.setAttribute('class', 'myClose');
        close.setAttribute('onclick', 'closeTab(event)')
        close.innerHTML = 'x';
        city.appendChild(close);

    })
}

function openCity(evt, cityName) {
    var tabContent = document.getElementsByClassName('tabContent');
    var arrayTabContent = Array.from(tabContent);
    arrayTabContent.forEach((city, index) => {
        city.style.display = 'none';
        var tabs = document.getElementsByClassName('tablinks');
        tabs[index].classList.remove('active')
        city.classList.remove('animation')
    })
    document.getElementById(cityName).style.display = 'block';
    document.getElementById(cityName).classList.add('animation')
    evt.currentTarget.classList.add('active');
}

function defaultTab() {
    document.getElementsByClassName('tabContent')[0].style.display = 'block';
    document.getElementsByClassName('tablinks')[0].classList.add('active');
}

function closeTab(evt) {
    evt.currentTarget.parentNode.style.display = 'none';
}

function newTab() {
    var titleValue = document.getElementById('titleImput').value;
    var textValue = document.getElementById('textImput').value;

    var city = {
        title: titleValue,
        text: textValue
    }

    data.push(city);

    var button = document.createElement('button');
    var title = document.createElement('h3');
    button.setAttribute('class', 'tablinks');
    var newContent = document.createElement('div');
    newContent.setAttribute('class', 'tabContent');
    var text = document.createElement('object');
    text.setAttribute('class', 'myText');
    data.forEach((obj, index) => {
        button.innerHTML = data[index].title;
        button.setAttribute('onclick', 'openCity(' + 'event, ' + "'" + data[index].title + "'" + ')');
        newContent.setAttribute('id', data[index].title);
        title.innerHTML = data[index].title;
        text.setAttribute('data', data[index].text);
    })
    var closeButton = document.createElement('div');
    closeButton.setAttribute('class', 'myCloseButton');
    closeButton.innerHTML = 'x';
    button.appendChild(closeButton);
    document.getElementById('listenItem').appendChild(button);
    document.getElementById('container').appendChild(newContent);
    newContent.appendChild(title);
    newContent.appendChild(text);
    var close = document.createElement('span');
    close.setAttribute('class', 'myClose');
    close.setAttribute('onclick', 'closeTab(event)')
    close.innerHTML = 'x';
    newContent.appendChild(close);
}

/*--------------------------------------------------------------------------------*/

function my_intersectionObserver() {

    var options = {
        root: document.getElementById('tab'),
        rootMargin: '0px',
        threshold: [1],
    }
   
    var observer = new IntersectionObserver(callback1, options);
    var target = document.getElementById('listenItem');
    console.log(target);
    observer.observe(target);



    function callback1(entries) {
        entries.forEach(entry => {
            var ratio = entry.intersectionRatio;
            if (ratio < options.threshold) {// se il ratio è minore della soglia vuol dire che l'elemento non è del tutto visibile
                console.log(ratio, 'la soglia è superata', 'Attivare controlli scroll');
                var controls = document.getElementsByClassName('myControls');
                var arrayControls = Array.from(controls);
                arrayControls.forEach(control => {
                    control.classList.add('dispalyBlockClass');
                })
            } else {
                console.log('la soglia non è superata', 'disattivare controlli scroll');
            }

        });
    }
   
}
/*--------------------------------------------------------------------------------------------------------*/


function myScrollNext() {
    var tabsBox = document.getElementById('tab');
    tabsBox.scrollLeft += 150;
}
function myScrollPrev() {
    var tabsBox = document.getElementById('tab');
    tabsBox.scrollLeft -= 150;
}