//getting data from service
var __data__ = null;

var getData = function() {
    if (__data__ != null) {
        return __data__;
    } else {
        $.getJSON('http://94.127.69.63:8080/data/4', function(data) {
        // $.getJSON('data/4', function(data) {
            __data__ = data;
            setDataToDom(data);
            return data;
        });
    }
};

var setDataToDom = function(data) {
// {"works":[{"name":"ВУ УКПГ","planned":"0.24355E1","actual":"0.24325E1"},
//           {"name":"НУ УКПГ","planned":"0.27695E1","actual":"0.27741E1"},
//           {"name":"Газопровод внешнего транспорта","planned":"0.4156E0","actual":"0.3084E1"},
//           {"name":"Межпромысловые конденсато и газпроводы","planned":"0.1271201E3","actual":"0.48872E1"},
//           {"name":"Строительство ЖД терминала","planned":"0.14519E1","actual":"0.1397E1"},
//           {"name":"Обустройство ВУ и НУ","planned":"0.103869E2","actual":"0.101799E2"}],
//  "risks":[{"name":"Задержка поставки материалов","response":"План реагирования","responsible":"Сварщик + монтажники"},
//           {"name":"Новый риск","response":null,"responsible":null},
//           {"name":"Новый риск","response":null,"responsible":"Сварщик + монтажники"}],
//   "documents":[{"title":"(Новый документ)","revision_date":"2012-08-09 00:00:00 -0400","status":"Approved"}]}
  
  var work_categories = [];
  var planned_data = [];
  var actual_data = [];

  $.each(data['works'], function(i, work) {
    $('#works_table').append('<tr><td align="left">' + work['name'] + '</td>'
                                +'<td>' + parseFloat(work['planned']).toFixed(2) + '</td>'
                                +'<td>' + parseFloat(work['actual']).toFixed(2) + '</td></tr>');

    work_categories.push(work['name']);
    planned_data.push(parseFloat(work['planned']));
    actual_data.push(parseFloat(work['actual']));
  });

  $.each(data['risks'], function(i, risk) {
    $('#risks_table').append('<tr><td width=5%>1' + '</td>'
				+ '<td align="left">' + risk['name'] + '</td>'
                                +'<td >' + (risk['response'] == null ? "" : risk['response']) + '</td>'
                                +'<td>' + (risk['responsible'] == null ? "" : risk['responsible']) + '</td></tr>');
  });

  $.each(data['documents'], function(i, doc) {
    $('#documents_table').append('<tr><td width=5%>1' + '</td>'
				+ '<td align="left">' + doc['title'] + '</td>'
                                +'<td>' + (doc['revision_date'] == null ? "" : doc['revision_date'].substring(0,10)) + '</td>'
                                +'<td>' + (doc['status'] == null ? "" : doc['status']) + '</td></tr>');
  });




  window.chart = new Highcharts.Chart({
            
    chart: {
        renderTo: 'spider',
        polar: true,
        type: 'line'
    },
    
    title: {
        text: '',
        x: -40
    },
    
    pane: {
      size: '80%'
    },
    
    xAxis: {
        categories: work_categories,
        tickmarkPlacement: 'on',
        lineWidth: 0
    },
        
    yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0
    },
    
    tooltip: {
      shared: true
    },
    
    legend: {
        align: 'right',
        verticalAlign: 'top',
  	floating: true,
	x:-40,
        y: 20,
  	borderColor: '#FFFFFF',
        layout: 'vertical'
    },
    
    series: [{
        name: 'План, %',
        data: planned_data,
        pointPlacement: 'on'
    }, {
        name: 'Факт, %',
        data: actual_data,
        pointPlacement: 'on'
    }]
  
  });
};



// function forward () {
// $("div").delay(1).animate({
//                 right: "-=560px",
//                 opacity: "0.2"
//             }, 200, function() {
//                 window.location = "3.html";
//             });

// }

// function backward () {
// $("div").delay(1).animate({
//                 right: "+=560px",
//                 opacity: "0.2"
//             }, 200, function() {
//                 window.location = "5.html";
//             });

// }

// $(document).addSwipeEvents().
//   bind('swipeleft', function(evt, touch) {
//     // triggered for swipe events
// forward ();


// });


// $(document).addSwipeEvents().
//   bind('swiperight', function(evt, touch) {
//     // triggered for swipe events
// backward ();


// });

$(document).swipe({
swipeLeft: function () {
window.location = "5.html";
$(next).show();
    },

swipeRight: function () {
window.location = "3.html";
$(previous).show(); 
   },
fingers:1,
});

$(document).ready(function() {
  getData();
});
