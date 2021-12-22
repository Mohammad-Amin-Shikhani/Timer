/*============================================================================
=============================start the page functions==================================
==============================================================================*/

let bar_icon                = document.querySelector(".bar_icon");
let title                   = document.querySelector(".title");
let menu                    = document.querySelector(".menu");
let menu_btns               = document.querySelectorAll(".menu li a");
let overlay                 = document.querySelector(".overlay");
let sections                = document.querySelectorAll("section");

//this function is for show and hide the bar menu and the overlay
//and to change the bar menu icon
function toggle_bar_menu() {

    if(menu.clientWidth == 0) {
        menu.style.width = "70%";
        overlay.style.display = "block";
        bar_icon.firstElementChild.style.display = "none";
        bar_icon.lastElementChild.style.display = "block";
    } else {
        menu.style.width = "0";
        overlay.style.display = "none";
        bar_icon.firstElementChild.style.display = "block";
        bar_icon.lastElementChild.style.display = "none";
    }
};

bar_icon.addEventListener("click", ()=> {
    toggle_bar_menu();
    setter.style.display = "none";
});
overlay.addEventListener("click", ()=> {
    toggle_bar_menu();
});

//set a differnet color for the first item of menu
menu_btns[0].style.color  = "#04bf84";
//this function is to change the color of choosen item and to show the selected section
function change_section(clicked_item) {
    
    for(let i = 0; i < menu_btns.length; i++) {
            
        //reset the item's color and hide all sections
        menu_btns[i].style.color = "black";
        sections[i].style.display = "none"; 

        //show the selected section using the data-click of the menu items
        if(sections[i].getAttribute("class").includes(clicked_item.getAttribute("data-click"))) {
            sections[i].style.display = "flex";
        } else {
            sections[i].style.display = "none";
        } 
    }
};

menu_btns.forEach( el => {
    
    el.addEventListener("click", ()=> {

        toggle_bar_menu();
        title.innerHTML = el.innerHTML;
        change_section(el);
        el.style.color  = "#04bf84";

    })
});
/*============================================================================
=============================start the Timer==================================
==============================================================================*/

let timer_hours             = document.querySelector(".timer_hours");
let timer_minutes           = document.querySelector(".timer_minutes");
let timer_seconds           = document.querySelector(".timer_seconds");
let set_timer               = document.querySelector(".set_timer");
let pause_timer             = document.querySelector(".pause_timer");
let stop_timer              = document.querySelector(".stop_timer");
let resume_timer            = document.querySelector(".resume_timer");
let setter                  = document.querySelector(".setter");
let close_setter            = document.querySelector(".close_setter");
let choosen_timer_hours     = document.querySelector("#choosen_timer_hours");
let choosen_timer_minutes   = document.querySelector("#choosen_timer_minutes");
let choosen_timer_seconds   = document.querySelector("#choosen_timer_seconds");
let timer_reset             = document.querySelector(".timer_reset");
let timer_start             = document.querySelector(".timer_start");
let warrning_message        = document.createElement("p");
    warrning_message.innerHTML        = 'Please set a time to start the timer';
    warrning_message.style.color      = 'red';
    warrning_message.style.paddingTop = '1em';



set_timer.addEventListener("click", ()=> {
    setter.style.display = "flex";
});
close_setter.addEventListener("click", ()=> {
    setter.style.display = "none";
})

// create the value of hours, minutes and seconds
function create_values(index, element) {
    for(let i = 0; i < index; i++) {
        let option = document.createElement("option");
            option.innerHTML = i;
            option.value = i;
        element.appendChild(option)
    }
}
create_values(100,  choosen_timer_hours);
create_values(60, choosen_timer_minutes);
create_values(60, choosen_timer_seconds);

function reset_timer_values() {
    choosen_timer_hours.value   = 0;
    choosen_timer_minutes.value = 0;
    choosen_timer_seconds.value = 0;
}

function timer_f(seconds_p, minutes_p, hours_p) {

    let start_interval = setInterval(()=>{

        if(seconds_p == 0 && minutes_p == 0 && hours_p == 0) {
            pause_timer.style.display = "none";
            stop_timer.style.display  = "none";
            set_timer.style.display   = "unset";
            clearInterval(start_interval);
            return false;
        } 
        if(seconds_p == 0 && minutes_p > 0) {
            minutes_p--;
            seconds_p = 60;
            if(minutes_p < 10) {
                minutes_p = '0' + minutes_p
            }
        } 
        if(minutes_p == 0 && hours_p > 0) {
            hours_p--;
            minutes_p = 59;
            if(hours_p < 10) {
                hours_p = '0' + hours_p
            }
        }
        if(seconds_p == 0) {
            seconds_p = 60;
        }
        seconds_p--
        if(seconds_p < 10) { 
            seconds_p = '0' + seconds_p;
        }
        
        timer_hours.innerHTML   = hours_p;
        timer_minutes.innerHTML = minutes_p;
        timer_seconds.innerHTML = seconds_p;

        pause_timer.addEventListener("click", ()=> {
            clearInterval(start_interval);
            pause_timer.style.display  = "none";
            resume_timer.style.display = "unset";
        })

        stop_timer.addEventListener("click", ()=> {
            clearInterval(start_interval)

            timer_hours.innerHTML   = '00';
            timer_minutes.innerHTML = '00';
            timer_seconds.innerHTML = '00';

            pause_timer.style.display = "none";
            stop_timer.style.display  = "none";
            set_timer.style.display   = "unset";
        })
    },1000 )
}
timer_start.addEventListener("click", ()=> {
    
    let remaining_h = choosen_timer_hours.value;
    let remaining_m = choosen_timer_minutes.value;
    let remaining_s = choosen_timer_seconds.value;

    
    if( choosen_timer_hours.value == 0 && choosen_timer_minutes.value == 0 && choosen_timer_seconds.value == 0 ) {
        timer_start.after(warrning_message);
        return false;
    }

    if (choosen_timer_hours.value < 10) { 
        remaining_h = "0" + choosen_timer_hours.value;
    } 
    if (choosen_timer_minutes.value < 10) { 
        remaining_m = '0' + choosen_timer_minutes.value;
    } 
    if (choosen_timer_seconds.value < 10) { 
        remaining_s = '0' + choosen_timer_seconds.value;
    } 
    
    timer_f(remaining_s, remaining_m, remaining_h)

    resume_timer.addEventListener("click", ()=> {
        timer_f(timer_seconds.innerHTML, timer_minutes.innerHTML, timer_hours.innerHTML);
        resume_timer.style.display = "none";
        pause_timer.style.display = "unset";
    })
                  
    reset_timer_values();

    setter.style.display      = "none";
    set_timer.style.display   = "none";
    pause_timer.style.display = "unset";
    stop_timer.style.display  = "unset"

})

//remove the error message if it is there
setter.querySelectorAll("select").forEach(el => {
    el.addEventListener("click", ()=> {
        warrning_message.remove();
    })
})

timer_reset.addEventListener("click", ()=> {
    reset_timer_values();
})


/*============================================================================
=============================start the Alarm==================================
==============================================================================*/
let alarm                   = document.querySelector(".alarm")
let currently_time          = document.querySelector(".alarm h1");
let alarm_time              = document.querySelector(".alarm h3");
let remaining_time          = document.querySelector(".alarm h2");
let choosen_alarm_hours     = document.querySelector("#choosen_alarm_hours");
let choosen_alarm_minutes   = document.querySelector("#choosen_alarm_minutes");
let start_alarm             = document.querySelector(".start_alarm");
let stop_alarm              = document.querySelector(".stop_alarm");
let ringtone                = new Audio('assets/audio/ringtone.mp3')
let choosen_minutes;
let choosen_hours;
let remaining_hours;
let remaining_minutes;
let remaining_seconds;

//show the current time
setInterval(()=> {
    
    let today           = new Date();
    let current_hour    = today.getHours();
    let current_minutes = today.getMinutes();
    let current_seconds = today.getSeconds();

    if(current_hour < 10) {
        current_hour = '0' + current_hour;
    }
    if(current_minutes < 10) {
        current_minutes = '0' + current_minutes;
    }
    if(current_seconds < 10) {
        current_seconds = '0' + current_seconds;
    }
    currently_time.innerHTML = `${current_hour}:${current_minutes}:${current_seconds}`;

    start_alarm.onclick = ()=> {
        
        if(choosen_alarm_hours.value == 0 && choosen_alarm_minutes.value == 0) {
            stop_alarm.after(warrning_message);
            warrning_message.innerHTML = 'please choose time to start the alarm';
            return false;
        }
        
        choosen_minutes = choosen_alarm_minutes.value;
        choosen_hours   = choosen_alarm_hours.value;
        
        choosen_alarm_hours.value = 0;
        choosen_alarm_minutes.value = 0;


        if(choosen_hours < 10) {
            choosen_hours = '0' + choosen_hours
        }
        if(choosen_minutes < 10) {
            choosen_minutes = '0' + choosen_minutes
        }

        alarm_time.innerHTML = `${choosen_hours}:${choosen_minutes}`;

        alarm_time.style.display            = "unset";
        choosen_alarm_hours.style.display   = "none";
        choosen_alarm_minutes.style.display = "none";
        start_alarm.style.display           = "none";
        stop_alarm.style.display            = "unset";

        setTimeout(()=> {
            remaining_time.style.display = "unset";
        },1000)

    }
    if(choosen_hours > current_hour) {
        remaining_hours = parseInt(choosen_hours) - parseInt(current_hour) -1
    } else if(choosen_hours == current_hour && choosen_minutes > current_minutes) {
        remaining_hours = 0
    } else if(choosen_hours == 0) {
        remaining_hours = 23 - parseInt(current_hour) + parseInt(choosen_hours)
    } else{
        remaining_hours = 23 - parseInt(current_hour) + parseInt(choosen_hours)
    }

    if(choosen_minutes > current_minutes) {
        current_minutes = parseInt(choosen_minutes) - parseInt(current_minutes)
    } else{
        remaining_minutes = 59 - parseInt(current_minutes) + parseInt(choosen_minutes)
    }
    
    remaining_seconds        = 60 - parseInt(current_seconds);
    remaining_time.innerHTML = `${remaining_hours}:${remaining_minutes}:${remaining_seconds}`
    
    stop_alarm.addEventListener("click", ()=> {

        alarm_time.style.display = "none"
        choosen_alarm_hours.style.display = "unset"
        choosen_alarm_minutes.style.display = "unset"
        start_alarm.style.display = "unset"
        stop_alarm.style.display = "none"
        remaining_time.style.display = "none"
    })

    if(choosen_hours == parseInt(current_hour) && choosen_minutes == parseInt(current_minutes)) { 
        ringtone.play()
    }

},1000)

create_values(24, choosen_alarm_hours);
create_values(60, choosen_alarm_minutes);

alarm.querySelectorAll("select").forEach(el => {
    el.addEventListener("click", ()=> {
        warrning_message.remove();
    })
})

//remove the error message if it is there
alarm.querySelectorAll("select").forEach(el => {
    el.addEventListener("click", ()=> {
        warrning_message.remove();
    })
})

/*============================================================================
=============================start the Stop Watch==================================
==============================================================================*/

let stop_watch          = document.querySelector(".stop_watch");
let stop_watch_time     = document.querySelector(".stop_watch h1");
let stop_watch_rounds   = document.querySelector(".stop_watch ul");
let start_stop_watch    = document.querySelector(".start_stop_watch");
let resume_Stop_watch   = document.querySelector(".resume_stop_watch");
let pause_Stop_watch    = document.querySelector(".pause_stop_watch");
let round               = document.querySelector(".round");
let stop_stop_watch     = document.querySelector(".stop_stop_watch");
let nubmer_of_round     = 1;

let stop_watch_hours        = 0;
let stop_watch_minutes      = 0;
let stop_watch_seconds      = 0;
let stop_watch_milliseconds = 0;

function stop_watch_f() {

    let stop_watch_interval = setInterval(() => {

        stop_watch_milliseconds++
        if(stop_watch_milliseconds < 10) {
            stop_watch_milliseconds = '0' + parseInt(stop_watch_milliseconds)
        }
        if(stop_watch_milliseconds == 100) {
            stop_watch_milliseconds = 0;
            stop_watch_seconds++;
        }
    


        if(stop_watch_seconds < 10) {
            stop_watch_seconds = '0' + parseInt(stop_watch_seconds);
        } else if(stop_watch_seconds == 60) {
            stop_watch_seconds = 0;
            stop_watch_minutes++;
        } else {
            stop_watch_seconds = stop_watch_seconds;
        }

        if(stop_watch_minutes < 10) {
            stop_watch_minutes = '0' + parseInt(stop_watch_minutes);
        } else if(stop_watch_minutes == 60) {
            stop_watch_minutes = 0;
            stop_watch_hours++;
        }
        if(stop_watch_hours < 10) {
            stop_watch_hours = '0' + parseInt(stop_watch_hours);
        }

        if(stop_watch_hours == 99 && stop_watch_minutes == 59 && stop_watch_seconds == 60 && stop_watch_milliseconds == 99) {
            clearInterval(stop_watch_interval);
        }
        
        stop_watch_time.innerHTML = `${stop_watch_hours}:${stop_watch_minutes}:${stop_watch_seconds}:${stop_watch_milliseconds}`;
            
    }, 10);


    pause_Stop_watch.addEventListener("click", ()=> {
        pause_Stop_watch.style.display  = 'none';
        resume_Stop_watch.style.display = 'unset';
        clearInterval(stop_watch_interval);
    })

    stop_stop_watch.addEventListener("click", ()=> {
        start_stop_watch.style.display  = 'unset';
        round.style.display             = 'none';
        resume_Stop_watch.style.display = 'none';
        pause_Stop_watch.style.display  = 'none';
        stop_stop_watch.style.display   = 'none'
        stop_watch_rounds.innerHTML     = '';
        nubmer_of_round                 = 1;
        clearInterval(stop_watch_interval)
        stop_watch_hours          = 0;
        stop_watch_minutes        = 0;
        stop_watch_seconds        = 0;
        stop_watch_milliseconds   = 0;
        stop_watch_time.innerHTML = `00:00:00`;
    })
    
}
start_stop_watch.addEventListener("click", ()=> {

    start_stop_watch.style.display  = 'none';
    round.style.display             = 'unset';
    pause_Stop_watch.style.display  = 'unset';
    stop_stop_watch.style.display   = 'unset'
    stop_watch_f();
    
})

resume_Stop_watch.addEventListener("click", ()=> {
    pause_Stop_watch.style.display  = 'unset';
    resume_Stop_watch.style.display = 'none';
    stop_watch_f()
})
round.addEventListener("click", ()=> {
    
    
    let li = document.createElement("li");
    li.innerHTML = `<b>${nubmer_of_round}.</b> ${stop_watch_hours}:${stop_watch_minutes}:${stop_watch_seconds}`;
    
    stop_watch_rounds.appendChild(li);
    nubmer_of_round++;

})