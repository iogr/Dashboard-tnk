var __data__ = null;

var getData = function() {
    if (__data__ != null) {
        return __data__;
    } else {
        $.getJSON('http://94.127.69.63:8080/data/5', function(data) {
        // $.getJSON('data/5', function(data) {
            __data__ = data;
            setDataToDom(data);
            return data;
        });
    }
};


// {"activities":[{"name":"Согласован доступ к газот...","planned":"2012-01-02 08:00:00 -0300","actual":"2012-01-02 08:00:00 -0300"},
//                {"name":"Заключены договоры с потр...","planned":"2012-04-02 08:00:00 -0300","actual":"2012-04-02 08:00:00 -0300"}
  var setDataToDom = function(data) {

    // monthArrayToTextArray(data['categories']);

    // for (index in data['categories']) {
    //     $('#table_header').append('<td style=\"background-color:#e0e0e0\"><b>' + data['categories'][index] + '</b></td>');
    // };

    var events = []
      // {dates: [new Date(2011, 2, 31)], title: "2011 Season Opener", section: 0},
      // {dates: [new Date(2012, 1, 29)], title: "Spring Training Begins", section: 0},
      // {dates: [new Date(2012, 3, 5)], title: "Atlanta Braves @ New York Mets Game 1", section: 0},
      // {dates: [new Date(2012, 3, 7)], title: "Atlanta Braves @ New York Mets Game 2", section: 0},
      // {dates: [new Date(2012, 3, 8)], title: "Atlanta Braves @ New York Mets Game 3", section: 0}];
      // // {dates: [new Date(2012, 3, 9), new Date(2012, 3, 11)], title: "Atlanta Braves @ Houston Astros", section: 1},
    var mindate;
    var maxdate;
    $.each(data['activities'], function(i, act) {
      // alert(Date.parse(act['planned']));
      var pl = new Date();
      pl.setTime(Date.parse(act['planned']));
      if (mindate == null) {mindate = pl};
      if (maxdate == null) {maxdate = pl};
      if (maxdate < pl) {maxdate = pl};
      if (mindate > pl) {mindate = pl};
        // alert(pl);
      var ac = new Date();
      ac.setTime(Date.parse(act['actual']));
      if (maxdate < ac) {maxdate = ac};
      if (mindate > ac) {mindate = ac};


      events.push({dates: [pl], title: act['name'], section: 0});
      events.push({dates: [ac], title: act['name'], section: 0});
    });

    var timeline = new Chronoline(document.getElementById("timeline"), events, {
      visibleSpan: DAY_IN_MILLISECONDS * 366,
      animated: true,
      tooltips: true,
      defaultStartDate: maxdate,
      labelInterval: isHalfMonth,
      hashInterval: isHalfMonth,
      scrollLeft: prevQuarter,
      scrollRight: nextQuarter,
      floatingSubLabels: false,
      // sections: [{dates: [new Date(2011, 2, 31), new Date(2013, 9, 28)], title: "2011 MLB Season", section: 0, attrs: {fill: "#d4e3fd"}}],
      sections: [{dates: [mindate, maxdate], title: "", section: 0, attrs: {fill: "#d4e3fd"}}],
      sectionLabelAttrs: {'fill': '#997e3d', 'font-weight': 'bold'},
      markToday: 'labelBox',
      draggable: true
      });

    // alert('succ');
  };


$(document).swipe({

swipeRight: function () {
window.location = "4.html";
    },
    threshold:400
});

jQuery.fn.synchronizeScroll = function() {

      var elements = this;
            if (elements.length <= 1) return;
 
        elements.scroll(
         function() {
              var left = $(this).scrollLeft();
              var top = $(this).scrollTop();
              elements.each(
               function() {
                  if ($(this).scrollLeft() != left) $(this).scrollLeft(left);
                  if ($(this).scrollTop() != top) $(this).scrollTop(top);
               }
              );
          });
       }

$(".scrollDiv").synchronizeScroll();

$(document).ready(function() {
  getData();
});