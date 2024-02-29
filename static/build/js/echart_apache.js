/* FETCHDATA */
function init_data(fechaActual, fechaActualFinal, FilterId) {
  var dataRegXFilter;
  // Hacer la solicitud fetch con los parámetros
  fetch(
    `${FilterId}/?fecha_actual=${fechaActual}&fecha_actual_final=${fechaActualFinal}`
  )
    .then((response) => response.json())
    .then((dataAtom) => {
      //console.log(dataAtom.RegXday);
      switch (dataAtom.message) {
        case "SuccessReg":
          dataRegXFilter = dataAtom.RegXday;
          update_datatable(dataRegXFilter, FilterId);
          console.log("aca data de la tabla REg");
          break;
        case "SuccessChart":
          dataRegXFilter = dataAtom.RegXday;
          optionEchart(dataRegXFilter);
          console.log("aca la data de Chart");
          break;
        default:
          console.log("Sin Accion definida en el switch del init_data");
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function update_datatable(dataRegXFilter, FilterId) {
  var tableId = $("table").attr("id");
  var table = $("#" + tableId).DataTable();

  switch (FilterId) {
    case "RegistroSecadorL1":
      if (dataRegXFilter) {
        table.clear().draw();

        dataRegXFilter.forEach(function (registro, index) {
          var FormatDateTime = moment(registro.t_stamp).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          var nuevasfilas = `
            <tr>
                <td>${index + 1}</td>
                <td>${FormatDateTime}</td>
                <td>${registro.corrienteatomizador}</td>
                <td>${registro.flujojabon_fic200_1}</td>
                <td>${registro.flujosilicato_fic203_1}</td>
                <td>${registro.lic200_1_porcent}</td>
                <td>${registro.porcentajesilicato}</td>
                <td>${registro.presioninterc3_pic200_2}</td>
                <td>${registro.presionjabon_pit200_1}</td>
                <td>${registro.presionjabonatm_pit200_3}</td>
                <td>${registro.sp_silicato}</td>
                <td>${registro.tempe_inter_tit100_1}</td>
                <td>${registro.tempe_inter_tit100_2}</td>
                <td>${registro.tempe_inter_tit200_1}</td>
                <td>${registro.vacioatmz_pit200_4}</td>
                <td>${registro.velocidad_p100_1}</td>
                <td>${registro.velocidad_p200_1}</td>
                <td>${registro.velocidad_pl204_1}</td>
            </tr>
                  `;
          table.row.add($(nuevasfilas)).draw();
        });
      } else {
        table.clear().draw();
      }
      break;
    case "RegistroSecadorL6":
      if (dataRegXFilter) {
        table.clear().draw();

        dataRegXFilter.forEach(function (registro, index) {
          var FormatDateTime = moment(registro.t_stamp).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          var nuevasfilas = `
            <tr>
                <td>${index + 1}</td>
                <td>${FormatDateTime}</td>
                <td>${registro.corrienteatomizador}</td>
                <td>${registro.flujojabon_fic200_1}</td>
                <td>${registro.flujosilicato_fic203_1}</td>
                <td>${registro.nivel_lit100_1}</td>
                <td>${registro.porcentajesilicato}</td>
                <td>${registro.presioninterc3_pic200_2}</td>
                <td>${registro.presionjabonatm_pit200_3}</td>
                <td>${registro.sp_silicato}</td>
                <td>${registro.tempinterc3_tit200_1}</td>
                <td>${registro.vacioatmz_pit200_4}</td>
                <td>${registro.velocidad_p100_1}</td>
            </tr>
                  `;
          table.row.add($(nuevasfilas)).draw();
        });
      } else {
        table.clear().draw();
      }
      break;
    case "RegistroSecadorL7":
      if (dataRegXFilter) {
        table.clear().draw();

        dataRegXFilter.forEach(function (registro, index) {
          var FormatDateTime = moment(registro.t_stamp).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          var nuevasfilas = `
            <tr>
                <td>${index + 1}</td>
                <td>${FormatDateTime}</td>
                <td>${registro.corrienteatomizador}</td>
                <td>${registro.flujojabon_fic200_1}</td>
                <td>${registro.flujosilicato_fic203_1}</td>
                <td>${registro.porcentajesilicato}</td>
                <td>${registro.presion_interc3_pic200_2}</td>
                <td>${registro.presionjabon_pit200_1}</td>
                <td>${registro.presionjabonatm_pit200_3}</td>
                <td>${registro.sp_silicato}</td>
                <td>${registro.tempe_inter_tit100_1}</td>
                <td>${registro.tempe_inter_tit100_2}</td>
                <td>${registro.tempe_inter_tit200_1}</td>
                <td>${registro.totalperfume}</td>
                <td>${registro.vacioatz_pit200_4}</td>
                <td>${registro.velocidad_p100_1}</td>
                <td>${registro.velocidad_p100_2}</td>
            </tr>
                  `;
          table.row.add($(nuevasfilas)).draw();
        });
      } else {
        table.clear().draw();
      }
      break;
    default:
      alert("Tabla no definia en Switch");
      table.clear().draw();
  }
}

function optionEchart(options) {
  //-----------------Chart TIT------------------------------------
  var dom = document.getElementById("chart-TIT");

  var optionAreaChart;

  var myChart = echarts.init(dom, null, {
    renderer: "canvas",
    useDirtyRect: false,
  });

  optionAreaChart = {
    tooltip: {
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    title: {
      text: "TIT",
      subtext: "Temperatura de Intercambiadores"
    },
    legend: {
      data: ["TIT-100.1", "TIT-100.2", "TIT-200.1"],
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        restore: {},
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: options ? options.map((record) => record.t_stamp) : [],
    },
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "TIT-100.2",
        type: "line",
        stack: "Total",
        symbol: "arrow",
        emphasis: {
          focus: "series",
        },
        itemStyle: {
          color: "rgb(255, 70, 131)",
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(255, 70, 131)",
            },
            {
              offset: 1,
              color: "rgb(255, 235, 59)",
            },
          ]),
        },
        data: Array.isArray(options)
        ? options.map((record) => Number(record.tempe_inter_tit100_2).toFixed(2))
        : [],
        label: {
          show: true,
          formatter: "{c} °C", // Agrega la letra al valor usando formatter
        },
      },
      {
        name: "TIT-200.1",
        type: "line",
        stack: "Total",
        symbol: "arrow",
        emphasis: {
          focus: "series",
        },
        itemStyle: {
          color: "rgb(255, 70, 131)",
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(255, 70, 131)",
            },
            {
              offset: 1,
              color: "rgb(255, 235, 59)",
            },
          ]),
        },
        data: Array.isArray(options)
        ? options.map((record) => Number(record.tempe_inter_tit200_1).toFixed(2))
        : [],
        label: {
          show: true,
          formatter: "{c} °C", // Agrega la letra al valor usando formatter
        },
      },
      {
        name: "TIT-100.1",
        type: "line",
        stack: "Total",
        symbol: "arrow",
        emphasis: {
          focus: "series",
        },
        itemStyle: {
          color: "rgb(255, 70, 131)",
        },
        label: {
          show: true,
          position: "top",
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(255, 70, 131)",
            },
            {
              offset: 1,
              color: "rgb(255, 235, 59)",
            },
          ]),
        },
        data: Array.isArray(options)
        ? options.map((record) => Number(record.tempe_inter_tit100_1).toFixed(2))
        : [],
        label: {
          show: true,
          formatter: "{c} °C", // Agrega la letra al valor usando formatter
        },
      },
    ],
  };

  if (optionAreaChart && typeof optionAreaChart === "object") {
    myChart.setOption(optionAreaChart);
  }

  window.addEventListener("resize", myChart.resize);


  //-----------------Chart Presiones------------------------------------

  var dom1 = document.getElementById("chart-Presiones");

  var myChart1 = echarts.init(dom1, null, {
    renderer: "canvas",
    useDirtyRect: false,
  });

  var optionLineChart;

  optionLineChart = {
    title: {
      text: "Presiones",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      data: ["P.Intercambiador", "P.Jabon", "P.Jabon Atomizador"],
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        restore: {},
        saveAsImage: {},
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: Array.isArray(options)
          ? options.map((record) => record.t_stamp)
          : [],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "P.Jabon Atomizador",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: Array.isArray(options)
          ? options.map((record) => Number(record.presionjabonatm_pit200_3).toFixed(2))
          : [],
      },
      {
        name: "P.Jabon",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: Array.isArray(options)
          ? options.map((record) => Number(record.presionjabon_pit200_1).toFixed(2))
          : [],
      },
      {
        name: "P.Intercambiador",
        type: "line",
        stack: "Total",
        label: {
          show: true,
          position: "top",
        },
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: Array.isArray(options)
          ? options.map((record) => Number(record.presioninterc3_pic200_2).toFixed(2))
          : [],
      },
    ],
  };

  myChart1.setOption(optionLineChart);

  window.addEventListener("resize", myChart1.resize);

   //-----------------Chart CorrienteAtomizador------------------------------------
   var dom2 = document.getElementById("chart-CorrienteAtmz");

   var optionAreaChart_C_ATM;
 
   var myChart2 = echarts.init(dom2, null, {
     renderer: "canvas",
     useDirtyRect: false,
   });
 
   optionAreaChart_C_ATM = {
     
    title: {
      left: "center",
      text: "Corriente de Atomizador",
    },
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '5%',
      right: '15%',
      bottom: '10%'
    },
    xAxis: {
      data: options ? options.map((record) => record.t_stamp) : [],
    },
    yAxis: {},
    toolbox: {
      right: 10,
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
      }
    },
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 100,
      },
      {
        start: 0,
        end: 10,
      },
    ],
    visualMap: {
      top: 50,
      right: 10,
      pieces: [
        {
          gt: 1,
          lte: 2,
          color: '#0EF7EE'
        },
        {
          gt: 2,
          lte: 3,
          color: '#1DF70E'
        },
        {
          gt: 3,
          lte: 4,
          color: '#F7EC0E'
        },
        {
          gt: 4,
          lte: 5,
          color: '#FB951C'
        },
        {
          gt: 5,
          lte: 7,
          color: '#F72E1B'
        },
        {
          gt: 7,
          color: '#CA0148'
        }
      ],
      outOfRange: {
        color: '#999'
      }
    },
    series: {
      name: 'Amperaje',
      type: 'line',
      data: options
      ? options.map((record) => record.corrienteatomizador)
      : [],
      markLine: {
        silent: true,
        lineStyle: {
          color: '#333'
        },
        data: [
          {
            yAxis: 1
          },
          {
            yAxis: 2
          },
          {
            yAxis: 3
          },
          {
            yAxis: 4
          },
          {
            yAxis: 5
          },
          {
            yAxis: 8
          }
        ]
      }
    }
   };
 
   if (optionAreaChart_C_ATM && typeof optionAreaChart_C_ATM === "object") {
     myChart2.setOption(optionAreaChart_C_ATM);
   }
 
   window.addEventListener("resize", myChart2.resize);
}

moment.locale("es");

/* DATERANGEPICKER */

function init_daterangepickerL1(FilterId) {
  /*
  if (typeof $.fn.daterangepicker === "undefined") {
    return;
  }*/
  console.log("init_daterangepicker en Secador1");

  var cb = function (start, end, label) {
    console.log(start.toISOString(), end.toISOString(), label);
    $("#" + FilterId + " span").html(
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
  /*
  $("#"+ FilterId +" span").html(
    moment().subtract(0, "days").format("MMMM D, YYYY") +
      " - " +
      moment().format("MMMM D, YYYY")
  );*/
  $("#" + FilterId + " span").daterangepicker(optionSet1, cb);
  $("#" + FilterId + " span").on("show.daterangepicker", function () {
    console.log("show event fired");
  });
  $("#" + FilterId + " span").on("hide.daterangepicker", function () {
    console.log("hide event fired");
  });

  $("#" + FilterId + " span").on(
    "apply.daterangepicker",
    function (ev, picker) {
      var startDate = picker.startDate;
      var endDate = picker.endDate;

      var fechaInicialDia = moment(startDate).startOf("day");
      // Obtener la fecha al final del día
      var fechaFinalDia = moment(endDate).endOf("day");
      // Formatear las fechas en el formato deseado (YYYY-MM-DD HH:mm:ss)
      var formatoFecha = "YYYY-MM-DD HH:mm:ss";
      var fechActualFormt = fechaInicialDia.format(formatoFecha);
      var fechFinalDiaForm = fechaFinalDia.format(formatoFecha);
      init_data(fechActualFormt, fechFinalDiaForm, FilterId);
    }
  );

  $("#" + FilterId).on("cancel.daterangepicker", function (ev, picker) {
    console.log("cancel event fired");
    data_from_day(FilterId);
  });
  $("#options1").click(function () {
    $("#" + FilterId)
      .data("daterangepicker")
      .setOptions(optionSet1, cb);
  });
  $("#options2").click(function () {
    $("#" + FilterId)
      .data("daterangepicker")
      .setOptions(optionSet2, cb);
  });
  $("#destroy").click(function () {
    $("#" + FilterId)
      .data("daterangepicker")
      .remove();
  });
}

function data_from_day(init_url) {
  // Obtener la fecha actual
  var fechaActual = moment();

  var fechaInicialDia = moment(fechaActual).startOf("day");
  // Obtener la fecha al final del día
  var fechaFinalDia = moment(fechaActual).endOf("day");

  // Formatear las fechas en el formato deseado (YYYY-MM-DD HH:mm:ss)
  var formatoFecha = "YYYY-MM-DD HH:mm:ss";

  var fechActualFormt = fechaInicialDia.format(formatoFecha);
  var fechFinalDiaForm = fechaFinalDia.format(formatoFecha);

  init_data(fechActualFormt, fechFinalDiaForm, init_url);
}

window.addEventListener("load", function (event) {
  if (typeof $.fn.DataTable !== "undefined") {
    var tableId = $("table").attr("id");
    console.log("tableId sin for", tableId);
  }

  if (typeof $.fn.daterangepicker !== "undefined") {
    $(".PathFilter > div").each(function () {
      var FilterId = $(this).attr("id");
      console.log("Aca llego en el window load", FilterId);

      init_daterangepickerL1(FilterId);

      if (typeof echarts !== "undefined") {
        console.log("Init Echarts Apache");
        data_from_day(FilterId);
      }
    });
  }
});
