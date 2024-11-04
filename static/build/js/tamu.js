$(document).ready(function () {
    $('form').on('submit', function (e) {
        e.preventDefault(); // Evita la presentación del formulario
        var form = $(this);
        $.ajax({
            type: form.attr('method'),
            url: form.attr('action'),
            data: form.serialize(),
            success: function (data) {
                if (data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Guardado exitosamente',
                        confirmButtonColor: "#1ABB9C",
                        showConfirmButton: true,
                    }).then(() => {
                        window.location.reload(); // Opcional: recargar la página después de mostrar el Sweet Alert
                    });
                } else {
                    Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "!Algo salió mal!",
                    });
                }
            }
        });
    });
});

    /* Función para establecer el valor del campo oculto cuando se presiona un botón
    document.querySelectorAll('button[type="submit"]').forEach(button => {
        button.addEventListener('click', function() {
            document.getElementById('button_pressed').value = this.value;
        });
    });*/


function borrarRegistro(id){
    swal(
        {
          title: "Eliminar SKU?",
          text: "Esta acción no se puede revertir!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Confirmar!",
          cancelButtonText: "No, cancelar!",
          closeOnConfirm: false,
          closeOnCancel: false,
        },
        function (isConfirm) {
          if (isConfirm) {
            fetch(`deleteSku/?idSKU=${id}`)
              .then((response) => response.json())
              .then((orderResponse) => {
                if (orderResponse.success) {
                  swal("Confirmado!", "Registro Eliminado", "success");
                  setTimeout(20000);
                  location.reload();
                } else {
                  console.log("Respuesta del servidor:", orderResponse.error);
                  Swal.fire({
                    icon: "error",
                    title: "Error del Sistema",
                    text: "!Comunicar Incoveniente!",
                  });
                }
              });
          } else {
            swal("Cancelado", "Puede continuar", "error");
            return false;
          }
        }
      );
}

function obtenerRegistro(id) {
    if(id){
    fetch(`GetSKU/?idSKU=${id}`)
        .then((response) => response.json())
        .then((data) => {
            var dataSKU = data.RegSKU;
            console.log('La data SKU', dataSKU);
            // Cargar datos del registro en el formulario de edición según el boton presionado
            var btn_pressed = document.getElementById('btnEdit').value;
            console.log('aca el btn_presed', btn_pressed);
            if(btn_pressed == 'SKUEdit'){
                document.getElementById('registro_id').value = dataSKU.id;
                document.getElementById('codigoSKU').value = dataSKU.codigoSKU;
                document.getElementById('descripcion').value = dataSKU.descripcion;
                document.getElementById('humedad_objetiva').value = dataSKU.humedad_objetiva;
                document.getElementById('peso_objetivo').value = dataSKU.peso_objetivo;
                document.getElementById('temperatura_objetiva').value = dataSKU.temperatura_objetiva;
                if (dataSKU.areaId_id == 1) {
                    console.log('aca lavandería');
                    document.getElementById('lavanderia').checked = true;
                } else if (dataSKU.areaId_id == 2) {
                    console.log('aca tocador');
                    document.getElementById('tocador').checked = true;
                }
            }else if(btn_pressed == 'TamuEdit'){
                document.getElementById('registro_id').value = dataSKU.id;
                document.getElementById('humedad_objetiva').value = dataSKU.humedad_objetiva;
                document.getElementById('peso_objetivo').value = dataSKU.peso_objetivo;
                document.getElementById('temperatura_objetiva').value = dataSKU.temperatura_objetiva;
            }
            
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }else{
        var id_SKU = document.getElementById('id_SKU').value;
        if(id_SKU){
            obtenerRegistro(id_SKU);
        }else{
            new PNotify({
                title: "Sin Especificar",
                text: "No olvide seleccionar el Código",
                styling: "bootstrap3",
              });
              return false;
        }
        
    }
    
}

/* FETCHDATA */
function init_data(start_date, end_date) {

    $("input.flat").on("ifChecked", async function () {
      radioId = $(this).attr("id");
      getDataLine(radioId, start_date, end_date);
    });
  
    var radioId = $("input.flat:checked").attr("id");
    console.log('radioId:',radioId);
  
    if (radioId) {
      getDataLine(radioId, start_date, end_date);
    }
  
    function getDataLine(idLine, start_date, end_date){
    fetch(
      `EstadisticaFilter/?idLine=${idLine.toString()[0]}&idLado=${idLine.toString()[1]}&start_date=${start_date}&end_date=${end_date}`
      )
        .then((response) => response.json())
        .then((dataAtom) => {
          if(dataAtom.message == 'Success'){
            var dataRegXFilter = dataAtom.RegXlinea;
            echartTamu(dataRegXFilter);
            console.log(dataAtom.message);
          }else{
            echartTamu(dataRegXFilter);
            new PNotify({
              title: "Sin Datos",
              text: "Consulte los Registros",
              styling: "bootstrap3",
            });
            console.log(dataAtom.message);
            return false;
          }
              
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
    
  }
  
  /* ECHRTS TAMU*/
  
  function echartTamu(data){
    if (typeof echarts === "undefined") {
      return;
    }
    console.log("data:",data);

    var dataX = Array.isArray(data)
        ? data.map((record) =>moment(record.fecha_registro).format('MM-DD HH:mm:ss'))
        : [];

    var peso_objetivo = Array.isArray(data)
    ? data.map((record) =>
        Number(record.peso_objetivo).toFixed(2)
      )
    : [];

    var peso_obtenido = Array.isArray(data)
    ? data.map((record) =>
        Number(record.peso_obtenido).toFixed(2)
      )
    : [];
    /* -- GRAFICO DE PESOS(tipo EchartApache) -- */

    var dom5 = document.getElementById("pesEch");

    var optionBarChart_Pesos;

    var myChart5 = echarts.init(dom5, null, {
    renderer: "canvas",
    useDirtyRect: false,
    });

    optionBarChart_Pesos = {
    title: {
        text: 'Pesos',
        subtext: 'Kg',
    },
    legend: {
        data: ['P.Objetivo','P.Obtenido']
    },
    toolbox: {
        // y: 'bottom',
        feature: {
        magicType: {
            type: ['stack']
        },
        dataZoom: {
          yAxisIndex: "none",
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
        data: dataX,
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
        name: 'P.Objetivo',
        type: 'bar',
        data: peso_objetivo,
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
        name: 'P.Obtenido',
        type: 'bar',
        data: peso_obtenido,
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
    console.log(dataX[Math.max(params.dataIndex - zoomSize2 / 2, 0)]);
    myChart5.dispatchAction({
        type: "dataZoom",
        startValue: dataX[Math.max(params.dataIndex - zoomSize2 / 2, 0)],
        endValue:
        dataX[Math.min(params.dataIndex + zoomSize2 / 2, peso_obtenido.length - 1)],
    });
    });
    
    if (optionBarChart_Pesos && typeof optionBarChart_Pesos === "object") {
    myChart5.setOption(optionBarChart_Pesos);
    }

    window.addEventListener("resize", myChart5.resize);
    
    var temperatura_objetiva  = Array.isArray(data)
    ? data.map((record) =>
        Number(record.temperatura_objetiva)
      )
    : [];

    var temperatura_obtenida = Array.isArray(data)
    ? data.map((record) =>
        Number(record.temperatura_obtenida)
      )
    : [];
  
    //echart Bar Temperatura
    const dataUTC = dataX.map((time, index) => {
      const [year, month, day, hour, minute] = time.split(/[- :]/).map(Number);
      const utcTime = Date.UTC(year, month - 1, day, hour, minute); // Month is 0-based
      return [
          utcTime,
          parseFloat(temperatura_objetiva[index]),
          parseFloat(temperatura_obtenida[index]),
      ];
      });

        console.log('dataUTC:',dataUTC);

    Highcharts.chart('tempEch', {
      chart: {
          type: 'column',
          zoomType: 'xy', 
          
      },
      title: {
          text: 'Analisis Comparativo de Temperaturas',
          align: 'center'
      },
      xAxis: {
          categories: dataX,
          // minTickInterval: 60000, Intervalo mínimo de un minuto entre ticks
          // tickPixelInterval: 150 Ajusta el número de ticks para mejorar la legibilidad
      },
      yAxis: [{
          format: '{value} °C',
          min: 0,
          title: {
              text: 'Valor Objetivo'
          }
      }, {
          format: '{value} °C',
          title: {
              text: 'Valor Obtenido'
          },
          opposite: true,
      }],
      legend: {
          shadow: true
      },
      tooltip: {
        // split: true, Separa el tooltip en varias partes, una por serie
        shared: false, // Comparte el tooltip entre todas las series
        crosshairs: true, // Muestra líneas cruzadas al pasar el cursor
        // xDateFormat: '%A, %e %B %Y, %H:%M' Formato completo: 'Lunes, 15 Agosto 2023, 06:00'
      },
      plotOptions: {
          column: {
              grouping: false,
              shadow: false,
              borderWidth: 0
          }
      },
      series: [{
          name: 'T.Objetiva',
          yAxis: 0,
          color: 'rgba(248,161,63,1)',
          data: temperatura_objetiva,
          pointPadding: 0.3,
          tooltip: {
            valueSuffix: ' °C'
          },
          //pointPlacement: -0.2
          // connectNulls: true Conectar los puntos ignorando los nulos
      }, {
          name: 'T.Obtenida',
          yAxis: 1,
          color: 'rgba(186,60,61,.9)',
          data: temperatura_obtenida,
          pointPadding: 0.4,
          tooltip: {
            valueSuffix: ' °C'
        },
          //pointPlacement: -0.2
           //connectNulls: true Conectar los puntos ignorando los nulos
      }]
  });
    //echart Bar Humemdad
    var humedad_objetiva = Array.isArray(data)
              ? data.map((record) =>
                  Number(record.humedad_objetiva).toFixed(2)
                )
              : [];

    var humedad_obtenida = Array.isArray(data)
              ? data.map((record) =>
                  Number(record.humedad_obtenida).toFixed(2)
                )
              : [];

    var TamuName = Array.isArray(data)
              ? data.map((record) => record.quien_registra_username)
              : []; // Nombres de las personas
  
  // Function to get formatted data for the chart
  const getData = dataDate => dataDate.map(point => ({
      name: point[0],
      y: point[1],
      color: countries[point[0]].color
  }));
  
  Highcharts.chart('humEch', {
      chart: {
          type: 'column',
          zoomType: 'xy', 
      },
      title: {
          text: 'Analisis Comparativo de Humedades',
          align: 'center'
      },
      plotOptions: {
          series: {
              grouping: false, // Evita que las barras se agrupen una al lado de la otra
              borderWidth: 0
          }
      },
      xAxis: {
          categories: dataX,
      },
      yAxis: [{
        min: 0,
        title: {
          text: 'Humedad (%)'
        }
      }],
      tooltip: {
        shared: true,
        formatter: function() {
          let tooltipHtml = `<b>${this.x}</b><br/>`;
          
          this.points.forEach(point => {
            tooltipHtml += `<span style="color:${point.series.color}">\u25CF</span> 
                            ${point.series.name}: <b>${point.y}%</b><br/>`;
            
            // Si es la serie de "Humedad Obtenida", añadir el nombre del usuario
            if (point.series.name === 'Humedad Obtenida') {
              const index = point.point.index; // Índice del punto actual
              const usuario = TamuName[index]; // Nombre del usuario correspondiente
              tooltipHtml += `Registrado por: <b>${usuario}</b><br/>`;
            }
          });
  
          return tooltipHtml;
        }
      },
      series: [{
          color: 'rgba(158, 159, 163, 0.5)', // Color gris para la "sombra"
          pointPlacement: -0.2,
          data: humedad_objetiva.map(value => parseFloat(value)),// Convertir los valores a números
          name: 'Humedad Objetiva',
      }, {
          name: 'Humedad Obtenida',
          data: humedad_obtenida.map((value, index) => ({
            y: parseFloat(value),
            name: TamuName[index] // Asocia el nombre del usuario al punto de datos
          })),
      }]
  });
  
  /*
    var echartBar_H = echarts.init(
      document.getElementById('humEch'),
      theme
    );
  
    echartBar_H.setOption({
      title: {
        text: "Humedad",
        subtext: "g",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["H.Objetiva", "H.Obtenida"],
      },
      toolbox: {
        show: false,
      },
      calculable: false,
      xAxis: [
        {
          type: "category",
          data: dataX,
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "H.Objetiva",
          type: "bar",
          data: 
          markPoint: {
            data: [
              {
                type: "max",
                name: "maximo",
              },
              {
                type: "min",
                name: "minimo",
              },
            ],
          },
          markLine: {
            data: [
              {
                type: "average",
                name: "Promedio",
              },
            ],
          },
        },
        {
          name: "H.Obtenida",
          type: "bar",
          data: Array.isArray(data)
          ? data.map((record) =>
              Number(record.humedad_obtenida).toFixed(2)
            )
          : [],
          markPoint: {
            data: [
              {
                type: "max",
                name: "maximo",
              },
              {
                type: "min",
                name: "minimo",
              },
              /*
              {
                name: legend[0],
                value: 182.2,
                xAxis: 7,
                yAxis: 183,
              },
              {
                name: legend[1],
                value: 2.3,
                xAxis: 11,
                yAxis: 3,
              },
            ],
          },
          markLine: {
            data: [
              {
                type: "average",
                name: "Promedio",
              },
            ],
          },
        },
      ],
    });*/
  }

function data_from_day() {
    // Obtener la fecha actual
    var fechaActual = moment();
  
    var fechaInicialDia = moment(fechaActual).startOf("day");
    // Obtener la fecha al final del día
    var fechaFinalDia = moment(fechaActual).endOf("day");
  
    // Formatear las fechas en el formato deseado (YYYY-MM-DD HH:mm:ss)
    var formatoFecha = "YYYY-MM-DD HH:mm:ss";
  
    var fechActualFormt = fechaInicialDia.format(formatoFecha);
    var fechFinalDiaForm = fechaFinalDia.format(formatoFecha);
    init_data(fechActualFormt, fechFinalDiaForm);
    //AllCharts(fechActualFormt, fechFinalDiaForm, init_url);
    //filter_data_django(fechActualFormt, fechFinalDiaForm);
  }

/* DATERANGEPICKER */

moment.locale("es");

function init_daterangepicker() {
  if (typeof $.fn.daterangepicker === "undefined") {
    return;
  }
  console.log("init_daterangepicker");

  var cb = function (start, end, label) {
    console.log(start.toISOString(), end.toISOString(), label);
    $("#reportrange span").html(
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
  $("#reportrange span").html(
    moment().subtract(29, "days").format("MMMM D, YYYY") +
      " - " +
      moment().format("MMMM D, YYYY")
  );*/
  $("#reportrange").daterangepicker(optionSet1, cb);
  $("#reportrange").on("show.daterangepicker", function () {
    console.log("show event fired");
  });
  $("#reportrange").on("hide.daterangepicker", function () {
    console.log("hide event fired");
  });
  $("#reportrange").on("apply.daterangepicker", function (ev, picker) {
      var startDate = picker.startDate;
      var endDate = picker.endDate;

      var fechaInicialDia = moment(startDate).startOf("day");
      // Obtener la fecha al final del día
      var fechaFinalDia = moment(endDate).endOf("day");
      // Formatear las fechas en el formato deseado (YYYY-MM-DD HH:mm:ss)
      var formatoFecha = "YYYY-MM-DD HH:mm:ss";
      var fechActualFormt = fechaInicialDia.format(formatoFecha);
      var fechFinalDiaForm = fechaFinalDia.format(formatoFecha);
      console.log('reportange:', fechActualFormt, fechFinalDiaForm);
      init_data(fechActualFormt, fechFinalDiaForm);
      
  });
  $("#reportrange").on("cancel.daterangepicker", function (ev, picker) {
    console.log("cancel event fired");
    data_from_day();
  });
  $("#options1").click(function () {
    $("#reportrange").data("daterangepicker").setOptions(optionSet1, cb);
  });
  $("#options2").click(function () {
    $("#reportrange").data("daterangepicker").setOptions(optionSet2, cb);
  });
  $("#destroy").click(function () {
    $("#reportrange").data("daterangepicker").remove();
  });
}

$(document).ready(function () {
    if(typeof $.fn.daterangepicker !== "undefined") {
        init_daterangepicker();
      }
    //Iteracion para obtener id de echarts (graficos)
    if (typeof echarts != "undefined") {
        data_from_day();
      /*$(".Graphics > div").each(function () {
        var divId = $(this).attr("id");
      });*/
    }
  });