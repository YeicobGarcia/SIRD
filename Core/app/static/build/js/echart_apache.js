
/* FETCHDATA */
function init_data(fechaActual, fechaActualFinal) {
    // Crear una instancia de URLSearchParams y agregar los parámetros
    /*
    const params = new URLSearchParams();
    params.append('fecha_actual', fechaActual);
    params.append('fecha_actual_final', fechaActualFinal);
*/
    // Hacer la solicitud fetch con los parámetros
    fetch(`EstadisticaL1/?fecha_actual=${fechaActual}&fecha_actual_final=${fechaActualFinal}`)
        .then(response => response.json())
        .then(dataAtom => {
          if(dataAtom.message == 'Success'){
            const options = {
                data: dataAtom.RegXday
            };
            optionEchart(options);
          }else{
            const options = {
              data: []
            }
            optionEchart(options)
            console.log("Nada", dataAtom)
          }
            
        })
        .catch(error => console.error('Error fetching data:', error));
}

function optionEchart(options){
  // Large scale area chart
  var dom = document.getElementById('chart-CorrienteAtmz');

  var optionAreaChart;

  var myChart = echarts.init(dom, null, {
  renderer: 'canvas',
  useDirtyRect: false
  });

  optionAreaChart = {
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
        return [pt[0], '10%'];
      }
    },
    title: {
      left: 'center',
      text: 'Corriente de Atomizador'
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: options.data.map(record => record.t_stamp)
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%']
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100,
      },
      {
        start: 0,
        end: 10
      }
    ],
    series: [
      {
        name: 'Amperaje',
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        itemStyle: {
          color: 'rgb(255, 70, 131)'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 158, 68)'
            },
            {
              offset: 1,
              color: 'rgb(255, 70, 131)'
            }
          ])
        },
        data: options.data.map(record => record.corrienteatomizador),
        label: {
            show: true,
            formatter: '{c} A'  // Agrega la letra al valor usando formatter
        }
      }
    ]
  };

  if (optionAreaChart && typeof optionAreaChart === 'object') {
    myChart.setOption(optionAreaChart);
  }

  window.addEventListener('resize', myChart.resize);

  //-----------------Chart Presiones------------------------------------

  var dom1 = document.getElementById('chart-Presiones');

  var myChart1 = echarts.init(dom1, null, {
  renderer: 'canvas',
  useDirtyRect: false
  });

  var optionLineChart;

  optionLineChart = {
    title: {
      text: 'Presiones'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['P.Intercambiador', 'P.Jabon', 'P.Jabon Atomizador']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: options.data.map(record => record.t_stamp)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'P.Intercambiador',
        type: 'line',
        stack: 'Total',
        data: options.data.map(record => record.presioninterc3_pic200_2),
      },
      {
        name: 'P.Jabon',
        type: 'line',
        stack: 'Total',
        data: options.data.map(record => record.presionjabon_pit200_1),
      },
      {
        name: 'P.Jabon Atomizador',
        type: 'line',
        stack: 'Total',
        data: options.data.map(record => record.presionjabonatm_pit200_3),
      }
    ]
  };

  // Crear un objeto para almacenar los datos del primer gráfico
 
/*
  optionLineChart = {
    title: {
      text: 'Income of Germany and France since 1950'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      nameLocation: 'middle'
    },
    yAxis: {
      name: 'Presion'
    },
    series: [
      {
        type: 'line',
        showSymbol: false,
        encode: {
          x: options.data.map(record => record.t_stamp),
          y: options.data.map(record => record.presioninterc3_pic200_2),
          itemName: options.data.map(record => record.t_stamp),
          tooltip: [options.data.map(record => record.presioninterc3_pic200_2)]
        }
      },
      {
        type: 'line',
        datasetId: 'dataset_raw',
        showSymbol: false,
        encode: {
          x: 't_stamp',
          y: 'presionjabon_pit200_1',
          itemName: 't_stamp',
          tooltip: ['presionjabon_pit200_1']
        }
      
    ]
  };}*/

  if (optionLineChart && typeof optionLineChart === 'object') {
    myChart1.setOption(optionLineChart);
  }

  window.addEventListener('resize', myChart1.resize);

}

moment.locale('es');

/* DATERANGEPICKER */

function init_daterangepickerL1() {
  if (typeof $.fn.daterangepicker === "undefined") {
    return;
  }
  console.log("init_daterangepicker");

  var cb = function (start, end, label) {
    console.log(start.toISOString(), end.toISOString(), label);
    $("#reportrangeL1 span").html(
      start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY")
    );
  };

  var optionSet1 = {
    startDate: moment().subtract(0, "days"),
    endDate: moment(),
    minDate: "01/01/2023",
    maxDate: "31/12/2040",
    dateLimit: {
      days: 365,
    },
    showDropdowns: true,
    showWeekNumbers: true,
    timePicker: false,
    timePickerIncrement: 1,
    timePicker12Hour: true,
    ranges: {
      Hoy: [moment(), moment()],
      Ayer: [moment().subtract(1, "days"), moment().subtract(1, "days")],
      "Hace 7 Dias": [moment().subtract(6, "days"), moment()],
      "Hace 30 Dias": [moment().subtract(29, "days"), moment()],
      "Este Mes": [moment().startOf("month"), moment().endOf("month")],
      "Ultimo Mes": [
        moment().subtract(1, "month").startOf("month"),
        moment().subtract(1, "month").endOf("month"),
      ],
    },
    opens: "left",
    buttonClasses: ["btn btn-default"],
    applyClass: "btn-sm btn-outline-info",
    cancelClass: "btn-sm",
    format: "DD/MM/YYYY",
    separator: " to ",
    locale: {
      applyLabel: "Aplicar",
      cancelLabel: "Cancelar",
      fromLabel: "Desde",
      toLabel: "Hasta",
      customRangeLabel: "Personalizado",
      daysOfWeek: ["Dom", "Lun", "Mar", "Mar", "Jue", "Vie", "Sab"],
      monthNames: [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
      ],
      firstDay: 1,
    },
  };

  $("#reportrangeL1 span").html(
    moment().subtract(0, "days").format("MMMM D, YYYY") +
      " - " +
      moment().format("MMMM D, YYYY")
  );
  $("#reportrangeL1").daterangepicker(optionSet1, cb);
  $("#reportrangeL1").on("show.daterangepicker", function () {
    console.log("show event fired");
    
  });
  $("#reportrangeL1").on("hide.daterangepicker", function () {
    console.log("hide event fired");
  });

  $("#reportrangeL1").on("apply.daterangepicker", function (ev, picker) {
    var startDate = picker.startDate;
    var endDate = picker.endDate;

    var fechaInicialDia = moment(startDate).startOf('day');
    // Obtener la fecha al final del día
    var fechaFinalDia = moment(endDate).endOf('day');

    // Formatear las fechas en el formato deseado (YYYY-MM-DD HH:mm:ss)
    var formatoFecha = 'YYYY-MM-DD HH:mm:ss';

    var fechActualFormt = fechaInicialDia.format(formatoFecha);
    var fechFinalDiaForm = fechaFinalDia.format(formatoFecha);

    init_data(fechActualFormt, fechFinalDiaForm);

  });

  $("#reportrangeL1").on("cancel.daterangepicker", function (ev, picker) {
    console.log("cancel event fired");
  });
  $("#options1").click(function () {
    $("#reportrangeL1").data("daterangepicker").setOptions(optionSet1, cb);
  });
  $("#options2").click(function () {
    $("#reportrangeL1").data("daterangepicker").setOptions(optionSet2, cb);
  });
  $("#destroy").click(function () {
    $("#reportrangeL1").data("daterangepicker").remove();
  });
}



window.addEventListener('load', function  (event){
  
  // Obtener la fecha actual
  var fechaActual = moment();

  var fechaInicialDia = moment(fechaActual).startOf('day');
  // Obtener la fecha al final del día
  var fechaFinalDia = moment(fechaActual).endOf('day');

  // Formatear las fechas en el formato deseado (YYYY-MM-DD HH:mm:ss)
  var formatoFecha = 'YYYY-MM-DD HH:mm:ss';

  var fechActualFormt = fechaInicialDia.format(formatoFecha);
  var fechFinalDiaForm = fechaFinalDia.format(formatoFecha);

  init_data(fechActualFormt, fechFinalDiaForm);
  init_daterangepickerL1();
})