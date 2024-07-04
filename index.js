const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output:process.stdout
});


class Alarm {
    constructor(day, time ){
        this.day = day,
        this.alarmTime = time,
        this.snoozeCount = 0

    }    

    snooze(){
        if( this.snoozeCount < 3){
            let calculateTimeArr = [];
            let [hour, minutes] =   this.alarmTime.split(":").map(Number);
            minutes += 5
            if(minutes >= 60){
                minutes =  minutes - 60;
                hour += 1 
                if(hour >= 24){
                   hour = hour -24
                }    
            }
            calculateTimeArr.push(hour.toString().padStart(2,"0"));
            calculateTimeArr.push(minutes.toString().padStart(2,"0"))
            this.alarmTime =  calculateTimeArr.join(":");
            this.snoozeCount++
            console.log(`The alarm has been snooze until ${this.alarmTime}`)
        } else{
            console.log("Maximum snooze limit reach")
        }
    }
}

class AlarmClock{
    constructor(){
        this.alarms = [];
    }

    displayCurruntTime(){
        console.log(`Currunt Time: ${new Date().toTimeString()}`)
    }

    addAlarm(day, time){
        const newAlarm = new Alarm(day, time);
        this.alarms.push(newAlarm);
        console.log(`The new alarm added succussfully.`)
    }

    deleteAlarm(index){
        this.alarms.splice(index, 1);
        console.log("The alarm ")
    }

    snoozeAlarm(index){
        this.alarms[index].snooze();
    }

    displayAllAlarm(){
        this.alarms.forEach((item, index)=>{
            console.log(index+1, ".", item)
        })
    }
}

const newClock = new AlarmClock();

const menu = `Plese select the number below:
1. Display Currunt time
2. Add Alarm
3  Display all the alarm
4. Snooze an alarm
5. Delete an alarm
6. exit
`
rl.question(menu, (ans)=>{
    handleUserInput(ans)
})

const handleUserInput = (input) => {
    switch (input.trim()) {
      case '1':
        newClock.displayCurruntTime();
        rl.question(menu, (ans)=>{
            handleUserInput(ans);
        })
        break;
      case '2':
        setAlarm();
        break;
      case '3':
        newClock.displayAllAlarm();
        rl.question(menu, (ans)=>{
            handleUserInput(ans);
        })
        break;
      case '4':
        snoozeAlarm()
        break;
    case '5':
        deleteAlarm()
        break;
        case '6':
            console.log("Exiting................")
            rl.close();
         return;
    
      default:
        console.log('Invalid option, please choose a valid option.');
    }
};

const setAlarm = () => {
    rl.question('Please input the day for which the alarm has to be set:\n', (day) => {
      rl.question('Please input the time for which the alarm has to be set (in 24 hr format HH:mm):\n', (time) => {
        newClock.addAlarm(day, time);
        rl.question(menu, handleUserInput);
      });
    });
  };

const snoozeAlarm = ()=>{
    newClock.displayAllAlarm();
    rl.question(`Which alarm do you want to snooze?\n`, ((ans)=>{
            newClock.snoozeAlarm(parseInt(ans)-1)
            rl.question(menu, (ans)=>{
                handleUserInput(ans)
            })
    }))

}

const deleteAlarm = ()=>{
    newClock.displayAllAlarm();
    rl.question(`Which alarm do you want to snooze? \n 
        `, ((ans)=>{
        newClock.deleteAlarm(parseInt(ans)-1)
        rl.question(menu, (ans)=>{
            handleUserInput(ans)
        })
    }))

}
