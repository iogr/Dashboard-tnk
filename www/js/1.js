//swipe-related



//getting data from service
var __data__ = null;



var getData = function() {
$.ajaxSetup({ cache: true });
    if (__data__ != null) {
        return __data__;
    } else {
        $.getJSON('http://94.127.69.63:8080/data/index', function(data) {
        // $.getJSON('data/index', function(data) {
            __data__ = data;
            setDataToDom(data);
            $("#cached").hide();
            return data;
	$.ajaxSetup({ cache: true });
        });
    }
};

var setDataToDom = function(data) {
    // $('#eps_name').html(data['name']);
    // var d = new Date();
    // d.setTime(Date.parse(data['sumbaselinestartdate']))
    // $('#eps_sumbaselinestartdate').html($.datepicker.formatDate('dd.mm.yy', d));
    // d.setTime(Date.parse(data['sumbaselinefinishdate']));
    // $('#eps_sumbaselinefinishdate').html($.datepicker.formatDate('dd.mm.yy', d));

    $('#eps_name').html(data['eps_name']);
    $('#eps_exec_dir').html(data['eps_exec_dir']);
    $('#eps_dir').html(data['eps_dir']);
    $('#start_date').html(data['start_date']);
    $('#end_date').html(data['end_date']);
    $('#reporter').html(data['reporter']);
    $('#report_date').html(data['report_date']);
    $('#est_end_date').html(data['est_end_date']);
    // $('#timelimits_text').html(data['timelimits_text']);
    // $('#cost').html(data['cost']);
    
    $('#risks_text').html('<a href="4.html" style="color: inherit">'+data['risks_text']+'</a>');
    $('#myModal3').html(data['risks_text' ]+ '<a class="close-reveal-modal">Закрыть</a>');
    if (data['risks_alert'] == "yellow") {
        $('#risks_alert').html('<a href="#" data-reveal-id="myModal3"><img src="img/yellow.png" height="22px" width="22px"></a>');
    } else if (data['risks_alert'] == "red") {
        $('#risks_alert').html('<a href="#" data-reveal-id="myModal3"><img src="img/red.png" height="22px" width="22px"></a>');
    } else {
        $('#risks_alert').html('<img src="img/green.png"  height="22px" width="22px">');
    };

    $('#timelimits_text').html('<a href="5.html" style="color: inherit">'+data['timelimits_text']+'</a>');
    $('#myModal').html(data['timelimits_text']);
    if (data['timelimits_alert'] == "yellow") {
        $('#timelimits_alert').html('<a href="#" data-reveal-id="myModal"><img src="img/yellow.png"  height="22px" width="22px"></a>');
    } else if (data['timelimits_alert'] == "red") {
        $('#timelimits_alert').html('<a href="#" data-reveal-id="myModal"><img src="img/red.png"  height="22px" width="22px"></a>');
    } else {
        $('#timelimits_alert').html('<img src="img/green.png"  height="22px" width="22px">');
    };

    $('#cost_text').html('<a href="3.html" style="color: inherit">'+data['cost_text']+'</a>');
    $('#myModal2').html(data['cost_text']);
    if (data['cost_alert'] == "yellow") {
        $('#cost_alert').html('<a href="#" data-reveal-id="myModal3"><img src="img/yellow.png" height="22px" width="22px"></a>');
    } else if (data['cost_alert'] == "red") {
        $('#cost_alert').html('<a href="#" data-reveal-id="myModal3"><img src="img/red.png" height="22px" width="22px"></a>');
    } else {
        $('#cost_alert').html('<img src="img/green.png" height="22px" width="22px">');
    };

    // alert(data['risks_text']);

    // plan_fact_gauge.series[0].points[0].update(parseFloat(data['gauge_percent_actual']));
    // plan_fact_gauge.series[0].points[1].update(parseFloat(data['gauge_percent_planned']));

    $('#planned').html(parseFloat(data['gauge_percent_planned']).toFixed(2) + '%');
    $('#actual').html(parseFloat(data['gauge_percent_actual']).toFixed(2) + '%');
    $('#planned2').html(parseFloat(data['gauge_percent_planned']).toFixed(2) + '%');
    $('#actual2').html(parseFloat(data['gauge_percent_actual']).toFixed(2) + '%');


    plan_fact_gauge = new Highcharts.Chart({

        chart: {
            renderTo: 'plan_fact_gauge',
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },

        title: {
            text: 'Шкала факт / план'
        },

plotOptions: {
gauge: {
                dial: {

                    backgroundColor: '#f46c5e',
                    borderColor: '#a5b4b9',
                    borderWidth: 1,
                    baseWidth: 13,
                    topWidth: 1,
                        baseLength: '20%', // of radius
                        rearLength: '0%'
                }
            
        },


                        series: {
                dataLabels: {
                    enabled: false,
borderRadius:0,
padding:10,
x:-100,
                    
                }
            }
        },

        pane: {
            startAngle: -90,
            endAngle: 90,
            background: [{
                backgroundColor: '#FFFFFF',
                borderWidth: 0,
                outerRadius: '109%'
            }, {
                backgroundColor: '#FFFFFF',
                borderWidth: 0,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#FFFFFF',
                borderWidth: 0,
                outerRadius: '108%',
                innerRadius: '9%'
            }]
        },


        // the value axis
        yAxis: {
            min: 0,
            max: 100,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 30,
            tickWidth: 1,
            tickPosition: 'inside',
            tickLength: 34,
            tickColor: '#666',
            labels: {
                step: 2,
                style: {fontSize: '15'},
            distance: -87,


         formatter: function() {
                        return this.value +'%';
                    }

            },
            title: {
                text: ''
            },
            plotBands: [{
                from: 0,
                to: 20,
                color: '#dde5f2', // green
            innerRadius: '67%',
 label: {
                    style: {
                        color: 'blue',
                        fontWeight: 'bold'
                    }
                } 
                
            }, {
                from: 20,
                to: 30,
                color: '#bacce4', // yellow
                innerRadius: '67%'
        }, {
                from: 30,
                to: 40,
                color: '#bacce4', // red
innerRadius: '67%'
            } , {
                from: 40,
                to: 50,
                color: '#96b3d5', // yellow
innerRadius: '67%'
            }, {
                from: 50,
                to: 60,
                color: '#96b3d5', // yellow
innerRadius: '67%'

            }, {
                from: 60,
                to: 70,
                color: '#5a8eca', // yellow
innerRadius: '67%'
            }, {
                from: 70,
                to: 80,
                color: '#5a8eca', // yellow
innerRadius: '67%'
            }, {
                from: 80,
                to: 100,
                color: '#376193', // yellow
innerRadius: '67%'
}]        
        },

        series: [ {
            name: 'План',
	  dial: {

                    backgroundColor: '#FFFFFF',
                    borderColor: 'gray',
      color: '#db241e',
      radius:'90%',
                    borderWidth: 2,
                    baseWidth: 12,
                    topWidth: 1,
                    baseLength: '20%', // of radius
                    rearLength: '0%'
                },
            data: [parseFloat(data['gauge_percent_planned'])],
            tooltip: {
                valueSuffix: '%'
            }}, {
            name: 'Факт',
            dial: {
	    radius:'90%',
		  },
		 
            data: [parseFloat(data['gauge_percent_actual'])],
            tooltip: {
                valueSuffix: '%'
            }
            
        }
       ]

    });

};

var plan_fact_gauge;

$(document).ready(function() {
    window.setInterval(function(){if (__data__ == null) {$("#cached").show();}}, 1000);
    setDataToDom({"gauge_percent_actual":"0.59294E1","gauge_percent_planned":"0.3215E1","eps_name":"ПРОГРАММА ГАЗ","start_date":"09.01.08","end_date":"01.03.17","est_end_date":"01.03.17","cost":"0.14597075172647446912638E13","report_date":"14.09.12","risks_text":"есть умеренные риски","risks_alert":"yellow","cost_alert":"green","cost_text":"сроки и бюджет соблюдены","timelimits_text":"сроки соблюдены","timelimits_alert":"green","eps_exec_dir":"А. М. Слепцов","eps_dir":"В. А. Благовещенский"});
    $.ajaxSetup({ cache: true });

    getData();
});
