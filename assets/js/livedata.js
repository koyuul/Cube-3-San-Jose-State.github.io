class TempUpdateList{ // manages each tempupdatenode
    constructor(){
        this.list = [];
        this.simulatedTimes = [];
        this.simulatedTemps = [];
        this.baseTemp = 50;
    }

    add(node){
        this.list.push(node);
        this.simulatedTimes.push(node.time);
        this.simulatedTemps.push(node.temp);

    }

    generateNewTemp(){
        let sign = (Math.random() > .5) ? 1 : -1;
        this.baseTemp += sign*((Math.random()*2)).toFixed(2);
        return this.baseTemp;
    }
}

class TempUpdateNode{
    constructor(time, temp){
        this.time = time;
        this.temp = temp;
    }
}

let simulatedTempNodes = new TempUpdateList();
let masterDate = new Date(2022, 2, 10, 9, 0); //masterDate is not used for any actual inputs, just to keep track of current (simulated) time

for (let i=0; i<10; i++){
    let oneMinuteLater = new Date(masterDate.getFullYear(), masterDate.getMonth(), masterDate.getDate(), 9, i)
    simulatedTempNodes.add(new TempUpdateNode(oneMinuteLater, simulatedTempNodes.generateNewTemp()));
    masterDate.setMinutes(masterDate.getMinutes()+1);
}

let startTime = new Date(masterDate.getFullYear(), masterDate.getMonth(), masterDate.getDate(), masterDate.getHours(), 0);
let endTime = new Date(masterDate.getFullYear(), masterDate.getMonth(), masterDate.getDate(), masterDate.getHours(), masterDate.getMinutes());

Plotly.newPlot(
    'chart',                        //id
    [{                              //data        
        x:[...simulatedTempNodes.simulatedTimes],
        y:[...simulatedTempNodes.simulatedTemps],

        mode:'lines+markers',
        name: 'Temperature over time',        
        marker: {
            color: '#E5A823'
        },
        yaxis: {
            range: [20, 90],
        },
        xaxis: {
            type: 'date',
            range:[masterDate, endTime]
        },

    }],
    {                               //layout
        title: {
            text: 'TEMPERATURE',
            font: {
                color: '#E5A823',
                family: "Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
                size: '30.333',
            },
            yref: "paper",
            y: 1,
            yanchor: "bottom",
            pad:{
                b: 38
            }
        },
        plot_bgcolor: '#00080F',
        paper_bgcolor: '#00080F',
        font: {
            color: '#ffffff'
        },
    },
    {                               //config
        responsive: true,
        scrollZoom: false,
        displayModeBar: false

    }
)

let demoTimer = 0;

let update = setInterval(function(){
    let node = new TempUpdateNode(new Date(endTime.getFullYear(), endTime.getMonth(), endTime.getDate(), endTime.getHours(), endTime.getMinutes()), simulatedTempNodes.generateNewTemp());
    simulatedTempNodes.add(node);

    endTime.setMinutes(endTime.getMinutes()+1);
    
    Plotly.relayout(
        'chart',
        {
            xaxis: {
                type: 'date',
                range: [startTime, endTime]
            }
        }
    )

    Plotly.extendTraces(
        'chart',
        {
            x:[[node.time]],
            y:[[node.temp]]
        },
        [0]
    )   

    demoTimer++;

    
    if(demoTimer > 250){
        clearInterval(update);
    }
}, 1000);


h