
var seriesOptions = [],
  seriesCounter = 0,
  names = ['nocollab', 'collab'];

/**
 * Create the chart when all data is loaded
 * @returns {undefined}
 */
function createChart() {

  Highcharts.stockChart('container', {

    rangeSelector: {
      selected: 4
    },

    yAxis: {
      title: {
        text: 'Number of Hit Songs'
      },
      plotLines: [{
        value: 0,
        width: 2,
        color: 'silver'
      }]
    },

    plotOptions: {
      series: {
        turboThreshold: 0,
        showInNavigator: true
      }
    },

    tooltip: {
      pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
      valueDecimals: 2,
      split: true,
      delayForDisplay: 10
    },

    series: seriesOptions
  });
}

$.each(names, function (i, name) {

  $.getJSON('hot100/' + name.toLowerCase() + '-c.json',  function (data) {

    seriesOptions[i] = {
      name: name,
      data: data
    };

    // As we're loading the data asynchronously, we don't know what order it will arrive. So
    // we keep a counter and create the chart when all the data is loaded.
    seriesCounter += 1;

    if (seriesCounter === names.length) {
      createChart();
    }
  });
});