function filter_data_django(fechaActual, fechaActualFinal){
  console.log('aca el filter_Data_django');
  document.getElementById('initdate').value = fechaActual;
  document.getElementById('endate').value = fechaActualFinal;
  document.getElementById('formFilterData').submit();// Envía el formulario
  $("#inidate").empty();
  $("#endate").empty();
}
/* csrf_token 
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Divide the cookie into a key/value pair
          const parts = cookie.split('=');
          if (parts.length === 2) {
              if (parts[0] === name) {
                  cookieValue = parts[1];
                  break;
              }
          }
      }
  }
  return cookieValue;
}
*/

/* FETCHDATA */
function init_data(fechaActual, fechaActualFinal, FilterId) {
  console.log('dentro del init_data');
  var dataRegXFilter;
  if(FilterId != 'RegistroSecadores'){
  fetch(
      `${FilterId}/?fecha_actual=${fechaActual}&fecha_actual_final=${fechaActualFinal}`
    )
      .then((response) => response.json())
      .then((dataAtom) => {
        if(dataAtom.message == 'SuccessChart'){
          dataRegXFilter = dataAtom.RegXday;
          optionEchart(dataRegXFilter, FilterId);
          //console.log(dataAtom.message);

        }else if(dataAtom.message == 'Success_Chart'){
          dataRegXFilter = dataAtom.RegXday;
          initializeChart(dataRegXFilter, FilterId);
          init_highcharts(dataRegXFilter, FilterId);
          
        }else{
          //optionEchart(dataRegXFilter, FilterId);
          new PNotify({
            title: "Sin Datos",
            text: "Consulte los Registros",
            styling: "bootstrap3",
          });
          //console.log(dataAtom.message);
          return false;
        }
            
      })
      .catch((error) => console.error("Error fetching data:", error));
  }else{
    filter_data_django(fechaActual, fechaActualFinal);
  }
  
}
/*
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
*/
function optionEchart(options, filterId) {
  var data_X = Array.isArray(options)
  ? options.map((record) => record.t_stamp)
  : [];
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
      subtext: "Temperatura en Intercambiadores / °C",
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "20%",
      containLabel: true,
    },
    legend: {
      data: ["Intercambiador-TIT-100.1", "Intercambiador-TIT-100.2", "Intercambiador-TIT-200.1"],
    },
    toolbox: {
      feature: {
        dataView: {},
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
      axisLabel: {
      labelOverlap: 'hide' // Oculta las etiquetas superpuestas
      },
      data: data_X,
    },
    yAxis: [
      {
        type: "value",
      },
    ],
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
    series: [
      {
        name: "Intercambiador-TIT-100.2",
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
          ? options.map((record) =>
              Number(record.tempe_inter_tit100_2).toFixed(2)
            )
          : [],
        label: {
          show: false,
          formatter: "{c} °C", // Agrega la letra al valor usando formatter
        },
      },
      {
        name: "Intercambiador-TIT-200.1",
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
          ? options.map((record) =>
              Number(record.tempe_inter_tit200_1).toFixed(2)
            )
          : [],
        label: {
          show: false,
          formatter: "{c} °C", // Agrega la letra al valor usando formatter
        },
      },
      {
        name: "Intercambiador-TIT-100.1",
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
          show: false,
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
          ? options.map((record) =>
              Number(record.tempe_inter_tit100_1).toFixed(2)
            )
          : [],
        label: {
          show: false,
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
      subtext: "Bar",
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
        dataView: {},
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
      bottom: "20%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: data_X,
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
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
    series: [
      {
        name: "P.Jabon Atomizador",
        type: "line",
        stack: "Total",
        label: {
          show: false,
          position: "top",
          formatter: "{c} psi",
        },
        areaStyle: {
          opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(55, 162, 255)'
          },
          {
            offset: 1,
            color: 'rgb(116, 21, 219)'
          }
        ])
        },
        emphasis: {
          focus: "series",
        },
        data: Array.isArray(options)
          ? options.map((record) =>
              Number(record.presionjabonatm_pit200_3).toFixed(2)
            )
          : [],
      },
      {
        name: "P.Jabon",
        type: "line",
        stack: "Total",
        label: {
          show: false,
          position: "top",
          formatter: "{c} psi",
        },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 0, 135)'
            },
            {
              offset: 1,
              color: 'rgb(135, 0, 157)'
            }
          ])
        },
        emphasis: {
          focus: "series",
        },
        data: Array.isArray(options)
          ? options.map((record) =>
              Number(record.presionjabon_pit200_1).toFixed(2)
            )
          : [],
      },
      {
        name: "P.Intercambiador",
        type: "line",
        stack: "Total",
        label: {
          show: false,
          position: "top",
          formatter: "{c} psi",
        },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(255, 191, 0)'
          },
          {
            offset: 1,
            color: 'rgb(224, 62, 76)'
          }
        ])
        },
        emphasis: {
          focus: "series",
        },
        data: Array.isArray(options)
          ? options.map((record) =>
              Number(record.presioninterc3_pic200_2).toFixed(2)
            )
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
      subtext: "(A) amperios",
    },
    tooltip: {
      trigger: "axis",
    },
    grid: {
      left: "5%",
      right: "10%",
      bottom: "25%",
    },
    xAxis: {
      data: data_X,
    },
    yAxis: {},
    toolbox: {
      right: 10,
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        restore: {},
        saveAsImage: {},
      },
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
          color: "#0EF7EE",
        },
        {
          gt: 2,
          lte: 3,
          color: "#1DF70E",
        },
        {
          gt: 3,
          lte: 4,
          color: "#F7EC0E",
        },
        {
          gt: 4,
          lte: 5,
          color: "#FB951C",
        },
        {
          gt: 5,
          lte: 7,
          color: "#F72E1B",
        },
        {
          gt: 7,
          color: "#CA0148",
        },
      ],
      outOfRange: {
        color: "#999",
      },
    },
    series: {
      name: "Amperaje",
      type: "line",
      data: options ? options.map((record) => record.corrienteatomizador) : [],
      markLine: {
        silent: true,
        lineStyle: {
          color: "#333",
        },
        data: [
          {
            yAxis: 1,
          },
          {
            yAxis: 2,
          },
          {
            yAxis: 3,
          },
          {
            yAxis: 4,
          },
          {
            yAxis: 5,
          },
          {
            yAxis: 8,
          },
        ],
      },
    },
  };

  if (optionAreaChart_C_ATM && typeof optionAreaChart_C_ATM === "object") {
    myChart2.setOption(optionAreaChart_C_ATM);
  }

  window.addEventListener("resize", myChart2.resize);

  //-----------------Chart VacioAtomizador------------------------------------
  var dom3 = document.getElementById("chart-VacioAtomizador");
  var data_V_ATM = Array.isArray(options)
  ? options.map((record) =>
      Number(record.vacioatmz_pit200_4).toFixed(2)
    )
  : [];
  var optionBarChart_V_ATM;

  var myChart3 = echarts.init(dom3, null, {
    renderer: "canvas",
    useDirtyRect: false,
  });

  optionBarChart_V_ATM = {
    title: {
      text: "Vacio de Atomizador",
      subtext: "mm/Hg",
      left: "center",
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "20%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: data_X,
      boundaryGap: false,
      axisLabel: {
        labelOverlap: 'hide' // Oculta las etiquetas superpuestas
        },
    },
    tooltip: {
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    toolbox: {
      feature: {
        restore: {},
        saveAsImage: {},
      },
    },
    yAxis: {
      type: "value",
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
    series: [
      {
        data: data_V_ATM,
        type: "bar",
        showBackground: true,
        stack: "Total",
        label: {
          show: false,
          position: "top",
          formatter: "{c} bar",
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#83bff6" },
            { offset: 0.5, color: "#188df0" },
            { offset: 1, color: "#188df0" },
          ]),
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#2378f7" },
              { offset: 0.7, color: "#2378f7" },
              { offset: 1, color: "#83bff6" },
            ]),
          },
        },
      },
    ],
  };
  // Enable data zoom when user click bar.
  const zoomSize = 6;
  myChart3.on("click", function (params) {
    console.log(data_X[Math.max(params.dataIndex - zoomSize / 2, 0)]);
    myChart3.dispatchAction({
      type: "dataZoom",
      startValue: data_X[Math.max(params.dataIndex - zoomSize / 2, 0)],
      endValue:
      data_X[Math.min(params.dataIndex + zoomSize / 2, data_V_ATM.length - 1)],
    });
  });

  if (optionBarChart_V_ATM && typeof optionBarChart_V_ATM === "object") {
    myChart3.setOption(optionBarChart_V_ATM);
  }

  window.addEventListener("resize", myChart3.resize);


    //-----------------Chart flujos------------------------------------
    var data_F_Jabon = Array.isArray(options)
    ? options.map((record) =>
      Number(record.flujojabon_fic200_1).toFixed(2)
    )
    : [];
    var data_F_Silicato = Array.isArray(options)
    ? options.map((record) =>
      Number(record.flujosilicato_fic203_1).toFixed(2)
    )
    : [];
    var dom4 = document.getElementById("chart-Flujos");

    var optionAreaChart_Flujos;
  
    var myChart4 = echarts.init(dom4, null, {
      renderer: "canvas",
      useDirtyRect: false,
    });
  
    optionAreaChart_Flujos = {
      color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
      title: {
        text: 'Flujos',
        subtext: 'Kg/min'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['Jabon-FIC200.1', 'Silicato-FIC203.1']
      },
      toolbox: {
        feature: {
          dataView: {},
          dataZoom: {
            yAxisIndex: "none",
          },
          restore: {},
          saveAsImage: {},
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '20%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: data_X,
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
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
      series: [
        {
          name: 'Jabon-FIC200.1',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(128, 255, 165)'
              },
              {
                offset: 1,
                color: 'rgb(1, 191, 236)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: data_F_Jabon,
        },
        {
          name: 'Silicato-FIC203.1',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(0, 221, 255)'
              },
              {
                offset: 1,
                color: 'rgb(77, 119, 255)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: data_F_Silicato,
        }
      ]     
    };
  
    if (optionAreaChart_Flujos && typeof optionAreaChart_Flujos === "object") {
      myChart4.setOption(optionAreaChart_Flujos);
    }
  
    window.addEventListener("resize", myChart4.resize);

    //-----------------Chart Velocidad Bomba------------------------------------
    // EL1
    var data_V_Bomba_P100_1 = Array.isArray(options)
    ? options.map((record) =>
      Number(record.velocidad_p100_1).toFixed(2)
    )
    : [];
    var data_V_Bomba_P200_1 = Array.isArray(options)
    ? options.map((record) =>
      Number(record.velocidad_p200_1).toFixed(2)
    )
    : [];
    var data_V_Bomba_PL204_1 = Array.isArray(options)
    ? options.map((record) =>
      Number(record.velocidad_pl204_1).toFixed(2)
    )
    : [];
    // EL3
    var data_V_Bomba_P100_2 = Array.isArray(options)
    ? options.map((record) =>
      Number(record.velocidad_p100_2).toFixed(2)
    )
    : [];

    var data_V_Bomba_P = filterId === 'EL1'
    ? data_V_Bomba_P200_1
    : data_V_Bomba_P100_2;

    var legend2 = filterId === 'EL1'
    ? 'Bomba-P200.1':'Bomba-P100.2';


    var legend3 = filterId === 'EL1'
    ? 'Bomba-PL204_1':'';

    console.log('filterId:',filterId);

    var dom5 = document.getElementById("chart-V_Bomba");

    var optionBarChart_Velocidades;
  
    var myChart5 = echarts.init(dom5, null, {
      renderer: "canvas",
      useDirtyRect: false,
    });
  
    optionBarChart_Velocidades = {
      title: {
        text: 'Velocidad en Bombas',
        subtext: '%',
      },
      legend: {
        data: ['Bomba-P100.1',legend2, legend3]
      },
      toolbox: {
        // y: 'bottom',
        feature: {
          magicType: {
            type: ['stack']
          },
          dataView: {},
          restore: {},
          saveAsImage: {
            pixelRatio: 2
          },
        }
      },
      tooltip: {
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      xAxis: {
        data: data_X,
        splitLine: {
          show: false
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '20%',
        containLabel: true,
      },
      yAxis: {},
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
      series: [
        {
          name: 'Bomba-P100.1',
          type: 'bar',
          data: data_V_Bomba_P100_1,
          emphasis: {
            focus: 'series',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#2378f7" },
                { offset: 0.7, color: "#2378f7" },
                { offset: 1, color: "#83bff6" },
              ]),
            },
          },
          animationDelay: function (idx) {
            return idx * 10;
          },
        },
        {
          name: legend2,
          type: 'bar',
          data: data_V_Bomba_P,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#1CE6CE" },
              { offset: 0.5, color: "#1CE65D" },
              { offset: 1, color: "#1CE65D" },
            ]),
          },
          emphasis: {
            focus: 'series',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#1DDD7D" },
                { offset: 0.7, color: "#1CE6B8" },
                { offset: 1, color: "#1CE6B8" },
              ]),
            },
          },
          animationDelay: function (idx) {
            return idx * 10 + 100;
          }
        },
        {
          name: legend3,
          type: 'bar',
          data: data_V_Bomba_PL204_1,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#FFA200" },
              { offset: 0.5, color: "#FFC300" },
              { offset: 1, color: "#FFC300" },
            ]),
          },
          emphasis: {
            focus: 'series',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#FFE400" },
                { offset: 0.7, color: "#FFB200" },
                { offset: 1, color: "#FFB200" },
              ]),
            },
          },
          animationDelay: function (idx) {
            return idx * 10 + 100;
          }
        }
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: function (idx) {
        return idx * 5;
      }
    };
  
    // Enable data zoom when user click bar.
    const zoomSize2 = 6;
    myChart5.on("click", function (params) {
      console.log(data_X[Math.max(params.dataIndex - zoomSize2 / 2, 0)]);
      myChart5.dispatchAction({
        type: "dataZoom",
        startValue: data_X[Math.max(params.dataIndex - zoomSize2 / 2, 0)],
        endValue:
        data_X[Math.min(params.dataIndex + zoomSize2 / 2, data_V_Bomba_P100_1.length - 1)],
      });
    });
    
    if (optionBarChart_Velocidades && typeof optionBarChart_Velocidades === "object") {
      myChart5.setOption(optionBarChart_Velocidades);
    }
  
    window.addEventListener("resize", myChart5.resize);
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
  //filter_data_django(fechActualFormt, fechFinalDiaForm);
}

function initializeChart(dataRegXFilter, FilterId){
  console.log('INIT_CHART');

  var data_X = Array.isArray(dataRegXFilter)
  ? dataRegXFilter.map((record) => moment(record.t_stamp).format('HH:MM'))
  : [];

  var ctx = document.getElementById(FilterId);

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: data_X,
      datasets: [{
        label: 'Densidad',
        data: Array.isArray(dataRegXFilter)
        ? dataRegXFilter.map((record) =>
            Number(record.dt_126_2_densidad_soda_c).toFixed(2)
          )
        : [],
        borderWidth: 2,
        backgroundColor: "rgba(3, 88, 106, 0.3)",
        borderColor: "rgba(3, 88, 106, 0.70)",
        pointStyle: 'rectRot',
        pointRadius: 5,
      }, {
        type: 'line',
        label: 'Flujo',
        backgroundColor: "rgba(38, 185, 154, 0.31)",
        borderColor: "rgba(38, 185, 154, 0.7)",
        fill: 'origin', // Propiedad para suavizar la línea
        borderWidth: 1,
        pointRadius: 5,
        cubicInterpolationMode: 'monotone',
        data: Array.isArray(dataRegXFilter)
        ? dataRegXFilter.map((record) =>
            Number(record.fit_126_2_flujo_soda_c).toFixed(2)
          )
        : []
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

    //-----------------Chart Presiones------------------------------------

var dom1 = document.getElementById("chart-PresionJ_ATZ");

var myChart1 = echarts.init(dom1, null, {
  renderer: "canvas",
  useDirtyRect: false,
});

var optionGaugeChart;

optionGaugeChart = {
  title: {
    text: "Presión Extrusor",
    subtext: "PIT 204_50",
    left: "center",
    top: "80%",
  },
  series: [
    {
      type: 'gauge',
      min: 0,
      max: 50,
      splitNumber: 10,
      radius: '70%',
      axisLine: {
        lineStyle: {
          color: [[1, '#f00']],
          width: 3,
        },
      },
      splitLine: {
        distance: -18,
        length: 18,
        lineStyle: {
          color: '#f00',
        },
      },
      axisTick: {
        distance: -12,
        length: 10,
        lineStyle: {
          color: '#f00',
        },
      },
      axisLabel: {
        distance: -45,
        color: '#f00',
        fontSize: 20,
      },
      anchor: {
        show: true,
        size: 20,
        itemStyle: {
          borderColor: '#000',
          borderWidth: 2,
        },
      },
      pointer: {
        offsetCenter: [0, '10%'],
        icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
        length: '115%',
        itemStyle: {
          color: '#000',
        },
      },
      detail: {
        valueAnimation: true,
        precision: 1,
      },
      title: {
        offsetCenter: [0, '-30%'],
        color: '#f00',
      },
      data: [
        {
          value: dataRegXFilter[dataRegXFilter.length - 1].pit_204_50_presion_extrusor,
          name: 'BAR',
          itemStyle: {
            color: '#f00', // Color del texto "PSI"
          },
        },
      ],
    },
    {
      type: 'gauge',
      min: 0,
      max: 725,
      radius: '65%',
      splitNumber: 5,
      axisLine: {
        lineStyle: {
          color: [[1, '#000']],
          width: 3,
        },
      },
      splitLine: {
        distance: -3,
        length: 18,
        lineStyle: {
          color: '#000',
        },
      },
      axisTick: {
        distance: 0,
        length: 10,
        lineStyle: {
          color: '#000',
        },
      },
      axisLabel: {
        distance: 10,
        fontSize: 15,
        color: '#000',
      },
      pointer: {
        show: false,
      },
      title: {
        show: false,
      },
      anchor: {
        show: true,
        size: 14,
        itemStyle: {
          color: '#000',
        },
      },
    },
  ],
};
/*
setInterval(function () {
  myChart1.setOption({
    series: [
      {
        type: 'gauge',
        data: [
          {
            value: +(Math.random() * 50).toFixed(2),
            name: 'PSI',
          },
        ],
      },
    ],
  });
}, 2000);*/

myChart1.setOption(optionGaugeChart);

window.addEventListener("resize", myChart1.resize);

/* -----------------------------------------------------------------*/

var dom2 = document.getElementById("chart-PresionExtrusor");

var myChart2 = echarts.init(dom2, null, {
  renderer: "canvas",
  useDirtyRect: false,
});

var optionGaugeChart2;

optionGaugeChart2 = {
  title: {
    text: "Presión Jabon",
    subtext: "Entrada Atomizador",
    left: "center",
    top: "80%",
  },
  series: [
    {
      type: 'gauge',
      min: 0,
      max: 50,
      splitNumber: 10,
      radius: '70%',
      axisLine: {
        lineStyle: {
          color: [[1, '#f00']],
          width: 3,
        },
      },
      splitLine: {
        distance: -18,
        length: 18,
        lineStyle: {
          color: '#f00',
        },
      },
      axisTick: {
        distance: -12,
        length: 10,
        lineStyle: {
          color: '#f00',
        },
      },
      axisLabel: {
        distance: -45,
        color: '#f00',
        fontSize: 20,
      },
      anchor: {
        show: true,
        size: 20,
        itemStyle: {
          borderColor: '#000',
          borderWidth: 2,
        },
      },
      pointer: {
        offsetCenter: [0, '10%'],
        icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
        length: '115%',
        itemStyle: {
          color: '#000',
        },
      },
      detail: {
        valueAnimation: true,
        precision: 1,
      },
      title: {
        offsetCenter: [0, '-30%'],
        color: '#f00',
      },
      data: [
        {
          value: dataRegXFilter[dataRegXFilter.length - 1].pit_204_10_presion_jabon_y_entrada_atz,
          name: 'BAR',
          itemStyle: {
            color: '#f00', // Color del texto "PSI"
          },
        },
      ],
    },
    {
      type: 'gauge',
      min: 0,
      max: 725,
      radius: '65%',
      splitNumber: 5,
      axisLine: {
        lineStyle: {
          color: [[1, '#000']],
          width: 3,
        },
      },
      splitLine: {
        distance: -3,
        length: 18,
        lineStyle: {
          color: '#000',
        },
      },
      axisTick: {
        distance: 0,
        length: 10,
        lineStyle: {
          color: '#000',
        },
      },
      axisLabel: {
        distance: 10,
        fontSize: 15,
        color: '#000',
      },
      pointer: {
        show: false,
      },
      title: {
        show: false,
      },
      anchor: {
        show: true,
        size: 14,
        itemStyle: {
          color: '#000',
        },
      },
    },
  ],
};
myChart2.setOption(optionGaugeChart2);

window.addEventListener("resize", myChart2.resize);

/* -----------------------------------------------------------------*/

var dom3 = document.getElementById("chart-PresionReactor");

var myChart3 = echarts.init(dom3, null, {
  renderer: "canvas",
  useDirtyRect: false,
});

var optionGaugeChart3;

optionGaugeChart3 = {
  title: {
    text: "Presión Reactor",
    subtext: "PIT 126_10",
    left: "center",
    top: "80%",
  },
  series: [
    {
      type: 'gauge',
      min: 0,
      max: 50,
      splitNumber: 10,
      radius: '70%',
      axisLine: {
        lineStyle: {
          color: [[1, '#f00']],
          width: 3,
        },
      },
      splitLine: {
        distance: -18,
        length: 18,
        lineStyle: {
          color: '#f00',
        },
      },
      axisTick: {
        distance: -12,
        length: 10,
        lineStyle: {
          color: '#f00',
        },
      },
      axisLabel: {
        distance: -45,
        color: '#f00',
        fontSize: 20,
      },
      anchor: {
        show: true,
        size: 20,
        itemStyle: {
          borderColor: '#000',
          borderWidth: 2,
        },
      },
      pointer: {
        offsetCenter: [0, '10%'],
        icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
        length: '115%',
        itemStyle: {
          color: '#000',
        },
      },
      detail: {
        valueAnimation: true,
        precision: 1,
      },
      title: {
        offsetCenter: [0, '-30%'],
        color: '#f00' // Color del título del medidor
      },
      data: [
        {
          value: dataRegXFilter[dataRegXFilter.length - 1].pit_126_10_presion_reactor,
          name: 'BAR',
          itemStyle: {
            color: '#f00', // Color del texto "PSI"
          },
        },
      ],
    },
    {
      type: 'gauge',
      min: 0,
      max: 725,
      radius: '65%',
      splitNumber: 5,
      axisLine: {
        lineStyle: {
          color: [[1, '#000']],
          width: 3,
        },
      },
      splitLine: {
        distance: -3,
        length: 18,
        lineStyle: {
          color: '#000',
        },
      },
      axisTick: {
        distance: 0,
        length: 10,
        lineStyle: {
          color: '#000',
        },
      },
      axisLabel: {
        distance: 10,
        fontSize: 15,
        color: '#000',
      },
      pointer: {
        show: false,
      },
      title: {
        show: false,
      },
      anchor: {
        show: true,
        size: 14,
        itemStyle: {
          color: '#000',
        },
      },
    },
  ],
};

myChart3.setOption(optionGaugeChart3);

window.addEventListener("resize", myChart3.resize);

 //-----------------Chart Line from Temperatures------------------------------------

var Temp_SodaC_Agua_Intercambiador = Array.isArray(dataRegXFilter)
? dataRegXFilter.map((record) =>
    Number(record.tt_126_5_temp_soda_c_agua_e_intercambiador).toFixed(2)
  )
: [];

var Temp_Grasas_Intercambiador = Array.isArray(dataRegXFilter)
? dataRegXFilter.map((record) =>
    Number(record.tt_126_6_temp_grasas_intercambiador).toFixed(2)
  )
: [];

var Temp_Reactor = Array.isArray(dataRegXFilter)
? dataRegXFilter.map((record) =>
    Number(record.tt_126_9_temp_reactor).toFixed(2)
  )
: [];

var Temp_Salida_Turbo = Array.isArray(dataRegXFilter)
? dataRegXFilter.map((record) =>
    Number(record.tt_126_18_temp_salida_turbo).toFixed(2)
  )
: [];

var Temp_Salida_Condensador = Array.isArray(dataRegXFilter)
? dataRegXFilter.map((record) =>
    Number(record.tt_206_1_temp_salida_condensador).toFixed(2)
  )
: [];

var Temp_Entrada_Condensador = Array.isArray(dataRegXFilter)
? dataRegXFilter.map((record) =>
    Number(record.tt_206_2_temp_entrada_condensador).toFixed(2)
  )
: [];

var Temp_Agua_Enfriamiento = Array.isArray(dataRegXFilter)
? dataRegXFilter.map((record) =>
    Number(record.tt_206_3_temp_agua_enfriamiento).toFixed(2)
  )
: [];

var scaustica = Array.isArray(dataRegXFilter)
        ? dataRegXFilter.map((record) =>
            Number(record.tt_126_2_temp_soda_caustica).toFixed(2)
          )
        : [];

var dom4 = document.getElementById("chart-TemperaturasViruta");

var myChart4 = echarts.init(dom4, null, {
  renderer: "canvas",
  useDirtyRect: false,
});

var optionLinesChart;

optionLinesChart = {
  title: {
    text: 'Temperaturas'
  },
  tooltip: {
    trigger: 'axis'
  },
  
  legend: {
    orient: 'horizontal',
    bottom: '10',
    left: 'center'
  },
  toolbox: {
    show: true,
    feature: {
      dataView: { readOnly: false },
      magicType: { type: ['line', 'bar'] },
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: data_X
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value} °C'
    }
  },
  series: [
    {
      name: 'Soda, Agua e Inter',
      type: 'line',
      smooth: true,
      data: Temp_SodaC_Agua_Intercambiador,
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg' }]
      }
    },
    {
      name: 'Grasas Intercambiador',
      type: 'line',
      smooth: true,
      data: Temp_Grasas_Intercambiador,
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      },
      markLine: {
        data: [
          { type: 'average', name: 'Avg' },
          [
            {
              symbol: 'none',
              x: '90%',
              yAxis: 'max'
            },
            {
              symbol: 'circle',
              label: {
                position: 'start',
                formatter: 'Max'
              },
              type: 'max',
              name: '最高点'
            }
          ]
        ]
      }
    },
    {
      name: 'Reactor',
      type: 'line',
      smooth: true,
      data: Temp_Reactor,
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg' }]
      }
    },
    {
      name: 'Salida_Turbo',
      type: 'line',
      data: Temp_Salida_Turbo,
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg' }]
      }
    },
    {
      name: 'Salida_Condensador',
      type: 'line',
      smooth: true,
      data: Temp_Salida_Condensador,
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg' }]
      }
    },
    {
      name: 'Entrada Condensador',
      type: 'line',
      smooth: true,
      data: Temp_Entrada_Condensador,
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg' }]
      }
    },
    {
      name: 'Agua_Enfriamiento',
      type: 'line',
      smooth: true,
      data: Temp_Agua_Enfriamiento,
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg' }]
      }
    }
  ]
};

myChart4.setOption(optionLinesChart);

window.addEventListener("resize", myChart4.resize);
//---------------------------------------------------
 var dom = document.getElementById("chart-temperatura-soda");

 var optionAreaChart;

 var myChart = echarts.init(dom, null, {
   renderer: "canvas",
   useDirtyRect: false,
 });

 optionAreaChart = {
   tooltip: {
    trigger: 'axis',
     axisPointer: {
       type: "cross",
       label: {
         backgroundColor: "#6a7985",
       },
     },
   },
   title: {
     text: "Temperatura",
     left: "center",
     textStyle: {
      fontSize: 14,
      color: '#73879C',
     }
   },
   grid: {
     left: "0%",
     right: "0%",
     bottom: "0%",
     containLabel: true,
   },
   toolbox: {
     feature: {
       dataView: {},
       saveAsImage: {},
     },
   },
   xAxis: {
     type: "category",
     boundaryGap: false,
     data: data_X,
   },
   yAxis: [
     {
       type: "value",
     },
   ],
   series: [
     {
       name: "Temp_Soda",
       type: "line",
       stack: "Total",
       symbol: "arrow",
       smooth: true,
       lineStyle: {
        width: 0
      },
      showSymbol: false,
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
       data: scaustica,
       label: {
         show: false,
         formatter: "{c} °C", // Agrega la letra al valor usando formatter
       },
     },
   ],
 };

 if (optionAreaChart && typeof optionAreaChart === "object") {
   myChart.setOption(optionAreaChart);
 }

 window.addEventListener("resize", myChart.resize);
}

function init_highcharts(dataRegXFilter){
  if(typeof Highcharts == 'undefined'){
   return;
  }
  console.log('init_highcharts');
  var data_X = Array.isArray(dataRegXFilter)
  ? dataRegXFilter.map((record) => moment(record.t_stamp).format('HH:MM'))
  : [];

  var salmuera = Array.isArray(dataRegXFilter)
        ? dataRegXFilter.map((record) =>
            Number(record.fic_126_104_flujo_salmuera).toFixed(2)
          )
        : [];
  var less = Array.isArray(dataRegXFilter)
        ? dataRegXFilter.map((record) =>
            Number(record.fit_104_101_flujo_less).toFixed(2)
          )
        : [];
  var pko = Array.isArray(dataRegXFilter)
        ? dataRegXFilter.map((record) =>
            Number(record.fit_126_1a_flujo_pko).toFixed(2)
          )
        : [];
  var stearine = Array.isArray(dataRegXFilter)
        ? dataRegXFilter.map((record) =>
            Number(record.fit_126_1b_flujo_stearine).toFixed(2)
          )
        : [];
  var sebo = Array.isArray(dataRegXFilter)
        ? dataRegXFilter.map((record) =>
            Number(record.fit_126_1c_flujo_sebo).toFixed(2)
          )
        : [];
  var agua = Array.isArray(dataRegXFilter)
        ? dataRegXFilter.map((record) =>
            Number(record.fit_126_3_flujo_agua).toFixed(2)
          )
        : [];

  var Flujos = [salmuera,less,pko,stearine,sebo,agua];
  /* Combina los tiempos y valores en un solo array
  var combinedData = data_X.map((time, index) => [time, parseFloat(fic_126_104_flujo_salmuera[index])]);
  console.log('combinedData:',combinedData);
*/
$(".container_highchart > div").each(function (index) {
      var H_chartID = $(this).attr("id");
      console.log("Chart X ID:",H_chartID);
      console.log("index:",index);

  Highcharts.chart(H_chartID, {

    chart: {
        type: 'area',
        zooming: {
            type: 'x'
        },
        panning: true,
        panKey: 'shift',
        height: 90,
        scrollablePlotArea: {
            minWidth:  5
        },
        margin: 0,
    },

    exporting: {
      buttons: {
          contextButton: {
              align: 'right',    // Cambia la posición horizontal ('left', 'center', 'right')
              verticalAlign: 'top', // Cambia la posición vertical ('top', 'middle', 'bottom')
              x: 0,            // Ajusta el desplazamiento horizontal
              y: -15,            // Ajusta el desplazamiento vertical
              symbolStrokeWidth: 0, // Minimiza el botón cambiando el grosor del borde
              symbolSize: 15       // Cambia el tamaño del ícono
          }
      }
    },

    title: {
        text: H_chartID,
        align: 'left',
        style: {
          fontSize: '12px',
        }
    },
    credits: {
        enabled: false
    },
    xAxis: {
      visible: false,
      categories: data_X,
        labels: {
            rotation: -45,
            format: '{value}'
        },
        minRange: 5,/*
        accessibility: {
            rangeDescription: 'Range: 0 to 187.8km.'
        }*/
    },

    yAxis: {
        visible: false
    },

    tooltip: {
        headerFormat: 'Hora: {point.x} min<br>',
        pointFormat: '{point.y} Kg/h',
        shared: true
    },

    legend: {
        enabled: false
    },

    series: [{
        data: Flujos[index].map((value, index) => parseFloat(value)),
        lineColor: Highcharts.getOptions().colors[1],
        color: Highcharts.getOptions().colors[2],
        fillOpacity: 0.5,
        name: 'Elevation',
        marker: {
            enabled: false
        },
        threshold: 0,
        negativeColor: Highcharts.getOptions().colors[0]
    }]

  });
    });

}


window.addEventListener("load", function (event) {
  /*if (typeof $.fn.DataTable !== "undefined") {
    var tableId = $("table").attr("id");
  }*/

  if (typeof Chart !== "undefined") {
    $(".PathFilter > canvas").each(function () {
      var URL_Id = $(this).attr("id");
      console.log("URL_Id = ", URL_Id);
      data_from_day(URL_Id);
    });
  }

  if (typeof $.fn.daterangepicker !== "undefined") {
    $(".PathFilter > div").each(function () {
      var FilterId = $(this).attr("id");
      console.log("Aca llego en el window load", FilterId);

      init_daterangepickerL1(FilterId);
      //filter_data_django(FilterId);

      if (typeof echarts !== "undefined") {
        console.log("Init Echarts Apache");
        data_from_day(FilterId);
      }
    });
  }
});
