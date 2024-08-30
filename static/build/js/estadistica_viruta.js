/* FETCHDATA */
function init_data(fechaActual, fechaActualFinal, FilterId) {
    console.log('init_data');
    var dataRegXFilter;
    fetch(
        `${FilterId}/?fecha_actual=${fechaActual}&fecha_actual_final=${fechaActualFinal}`
      )
        .then((response) => response.json())
        .then((dataAtom) => {
          if(dataAtom.message == 'Success_Chart'){
            dataRegXFilter = dataAtom.RegXday;
            init_highcharts(dataRegXFilter);
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
  moment.locale("es");
/* HIGHCHARTS   */
function init_highcharts(dataRegXFilter){

    if(typeof Highcharts == 'undefined'){
        return;
    }
    console.log('init_highcharts');
    // Datos de Tiempo
    var data_X = Array.isArray(dataRegXFilter)
    ? dataRegXFilter.map((record) => moment(record.t_stamp).format('MM-DD HH:mm'))
    : [];
    var t_stamp = Array.isArray(dataRegXFilter)
    ? dataRegXFilter.map((record) => moment(record.t_stamp).format('YYYY-MM-DD HH:mm'))
    : [];
    
    // Datos de Corriente y Vacio en ATZ
    var corriente = Array.isArray(dataRegXFilter)
    ? dataRegXFilter.map((record) =>
        Number(record.ji_204_101_corriente_atz)
        )
    : [];

    var vacio = Array.isArray(dataRegXFilter)
    ? dataRegXFilter.map((record) =>
        Number(record.pit_204_2_vacio_atz)
        )
    : [];

    // Datos de Presiones
    var presion_jabon_i_atz = Array.isArray(dataRegXFilter)
    ? dataRegXFilter.map((record) =>
        Number(record.pit_204_10_presion_jabon_y_entrada_atz)
      )
    : [];
    
    console.log('presion_jabon_i_atz:',presion_jabon_i_atz);

    var presion_extrusor = Array.isArray(dataRegXFilter)
    ? dataRegXFilter.map((record) =>
        Number(record.pit_204_50_presion_extrusor)
      )
    : [];

    var presion_reactor = Array.isArray(dataRegXFilter)
    ? dataRegXFilter.map((record) =>
        Number(record.pit_126_10_presion_reactor)
      )
    : [];

    // Datos de Densidad
    var densidad = Array.isArray(dataRegXFilter)
    ? dataRegXFilter.map((record) =>
        Number(record.dt_126_2_densidad_soda_c).toFixed(2)
      )
    : [];
    
    // Datos de Flujos
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

    // Datos de Temperaturas
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

    //var Flujos = [salmuera,less,pko,stearine,sebo,agua];
    // Crear encabezados (nombre de las columnas)
    var csvContent = "Time;Salmuera;Less;PKO;Stearine;sebo;agua\n";

    // Iterar sobre los datos para generar filas
    for (var i = 0; i < t_stamp.length; i++) {
        csvContent += `${t_stamp[i]};${salmuera[i]};${less[i]};${pko[i]};${stearine[i]};${sebo[i]};${agua[i]}\n`;
    }

    //console.log("csvContent",csvContent);
    /* -- GRAFICO DE FLUJOS -- */
    (function (H) {
        const animateSVGPath = (svgElem, animation, callback = void 0) => {
            if (!svgElem || !svgElem.element) {
                console.error('svgElem or svgElem.element is undefined');
                return;
            }
            const length = svgElem.element.getTotalLength();
            svgElem.attr({
                'stroke-dasharray': length,
                'stroke-dashoffset': length,
                opacity: 1
            });
            svgElem.animate({
                'stroke-dashoffset': 0
            }, animation, callback);
        };
    
        H.seriesTypes.line.prototype.animate = function (init) {
            const series = this,
                animation = H.animObject(series.options.animation);
            if (!init) {
                animateSVGPath(series.graph, animation);
            }
        };
    
        H.addEvent(H.Axis, 'afterRender', function () {
            const axis = this,
                chart = axis.chart,
                animation = H.animObject(chart.renderer.globalAnimation);
    
            axis.axisGroup
                // Init
                .attr({
                    opacity: 0,
                    rotation: -3,
                    scaleY: 0.9
                })
    
                // Animate
                .animate({
                    opacity: 1,
                    rotation: 0,
                    scaleY: 1
                }, animation);
            if (axis.horiz) {
                axis.labelGroup
                    // Init
                    .attr({
                        opacity: 0,
                        rotation: 3,
                        scaleY: 0.5
                    })
    
                    // Animate
                    .animate({
                        opacity: 1,
                        rotation: 0,
                        scaleY: 1
                    }, animation);
            } else {
                axis.labelGroup
                    // Init
                    .attr({
                        opacity: 0,
                        rotation: 3,
                        scaleX: -0.5
                    })
    
                    // Animate
                    .animate({
                        opacity: 1,
                        rotation: 0,
                        scaleX: 1
                    }, animation);
            }
    
            if (axis.plotLinesAndBands) {
                axis.plotLinesAndBands.forEach(plotLine => {
                    const animation = H.animObject(plotLine.options.animation);
    
                    // Init
                    plotLine.label.attr({
                        opacity: 0
                    });
    
                    // Animate
                    animateSVGPath(
                        plotLine.svgElem,
                        animation,
                        function () {
                            plotLine.label.animate({
                                opacity: 1
                            });
                        }
                    );
                });
            }
        });
    }(Highcharts));
    
    Highcharts.chart('chart-flujos', {
        chart: {
            type: 'spline'
        },
    
        title: {
            text: 'Niveles de Flujo en Materias Primas',
            align: 'left'
        },
    
        subtitle: {
            text: 'Registros recopilados cada 5 minutos',
            align: 'left'
        },
    
        data: {
            csv: csvContent
        },
    
        plotOptions: {
            series: {
                animation: {
                    duration: 3000
                },
                marker: {
                    enabled: false
                },
                lineWidth: 2
            }
        },

        exporting: {
            enabled: true  // Activa la funcionalidad de exportación
        },

        
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    yAxis: [{
                        tickAmount: 2,
                        title: {
                            x: 15,
                            reserveSpace: false
                        }
                    }, {
                        tickAmount: 2,
                        title: {
                            x: 20,
                            reserveSpace: false
                        }
                    }, {
                        tickAmount: 2,
                        title: {
                            x: -20,
                            reserveSpace: false
                        }
                    }, {
                        tickAmount: 2,
                        title: {
                            x: -20,
                            reserveSpace: false
                        }
                    }]
                }
            }]
        }
    });
    
    /* -- GRAFICO DE DENSIDAD(tipo linea con barra zoom) -- */
    
    const dataUTC = t_stamp.map((time, index) => {
    const [year, month, day, hour, minute] = time.split(/[- :]/).map(Number);
    const utcTime = Date.UTC(year, month - 1, day, hour, minute); // Month is 0-based
    return [
        utcTime,
        parseFloat(densidad[index]),
        parseFloat(vacio[index]),
        parseFloat(corriente[index]),
        parseFloat(presion_jabon_i_atz[index]),
    ];
    });

    console.log('dataUTC:',dataUTC.map(item => [item[0], item[1]]));

    Highcharts.setOptions({
        lang: {
            rangeSelectorZoom: 'Zoom', // Cambia el texto "Zoom"
            rangeSelectorFrom: 'Desde',
            rangeSelectorTo: 'Hasta',
            months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
        }
    });
    
        Highcharts.stockChart('chart-densidad', {
            chart: {
                type: 'area',
                zooming: {
                    type: 'x'
                },
            },
            title: {
                text: 'Densidad en la Soda Caustica',
                align: 'center'
            },
            // Configuración del tooltip
            tooltip: {
                split: true, // Separa el tooltip en varias partes, una por serie
                shared: true, // Comparte el tooltip entre todas las series
                crosshairs: true, // Muestra líneas cruzadas al pasar el cursor
                xDateFormat: '%A, %e %B %Y, %H:%M' // Formato completo: 'Lunes, 15 Agosto 2023, 06:00'
            },
            xAxis: {
                type: 'datetime',
            },
            yAxis: {
                title: {
                    text: 'kg/m³'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    color: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, 'rgb(199, 113, 243)'],
                            [0.7, 'rgb(76, 175, 254)']
                        ]
                    },
                    states: {
                        hover: {
                            lineWidth: 2
                        }
                    },
                    threshold: 0
                }
            },

            navigator: {
                maskInside: false,
                height: 30
            },

            
            // Configuración de la barra de desplazamiento
            scrollbar: {
                enabled: true, // Habilita la barra de desplazamiento
                height: 5
            },

            rangeSelector: {
                enabled: true, // Altura de la barra
                allButtonsEnabled: true,
                buttonTheme:{
                    width: 60
                },
                selected: 3, // Selecciona el primer botón por defecto
                buttons: [{
                    type: 'day',
                    count: 1,
                    text: 'Hora',
                    dataGrouping:{
                        forced: true,
                        units: [['hour', [1]]]
                    }
                },{
                    type: 'day',
                    count: 1,
                    text: 'Día',
                },{
                    type: 'month',
                    count: 1,
                    text: 'Semana',
                    dataGrouping:{
                        forced: true,
                        units: [['week', [1]]],
                    }
                },{
                    type: 'all',
                    text: 'Todo' // Botón para mostrar todo el rango de datos
                }],
                inputEnabled: false, // Desactiva los campos de entrada de fecha
                labelStyle: {
                    color: 'blue', // Estilo personalizado para las etiquetas
                    fontWeight: 'bold',
                }
            },
    
            series: [{
                type: 'area',
                name: 'Densidad',
                data: dataUTC
            }]
        });

        /* -- GRAFICO DE Corriente y Vacio del Atomizador -- */

        Highcharts.chart('chart-corriente-vacio-presion', {
            chart: {
                zooming: {
                    type: 'xy'
                }
            },
            title: {
                text: 'Analisis estadistico del Atomizador',
                align: 'center'
            },
            // Configuración del tooltip
            tooltip: {
                split: true, // Separa el tooltip en varias partes, una por serie
                shared: true, // Comparte el tooltip entre todas las series
                crosshairs: true, // Muestra líneas cruzadas al pasar el cursor
                xDateFormat: '%A, %e %B %Y, %H:%M' // Formato completo: 'Lunes, 15 Agosto 2023, 06:00'
            },
            xAxis: [{
                type: 'datetime',
                crosshair: true
            }],
            yAxis: [{ // Primary yAxis
                labels: {
                    format: '{value} Amp',
                    style: {
                        color: 'red'
                    }
                },
                title: {
                    text: 'Corriente',
                    style: {
                        color: 'red'
                    }
                }
            }, { // Secondary yAxis
                title: {
                    text: 'Vacio',
                    style: {
                        color: 'blue'
                    }
                },
                labels: {
                    format: '{value} mm/Hg',
                    style: {
                        color: 'blue'
                    }
                },
                opposite: true,
                //min: -25,
            }, { // Tertiary yAxis
                gridLineWidth: 0,
                title: {
                    text: 'Presion Jabon ATZ',
                    style: {
                        color: 'green'
                    }
                },
                labels: {
                    format: '{value} Bar',
                    style: {
                        color: 'green'
                    }
                },
                opposite: true,
                min: -25, // Permitir que los valores sean negativos (ajusta según lo necesites)
            }],
            tooltip: {
                shared: true
            },
            legend: {
                align: 'left',
                verticalAlign: 'top',
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || // theme
                    'rgba(255,255,255,0.25)'
            },
            series: [{
                name: 'Vacio',
                type: 'column',
                yAxis: 1,
                data: dataUTC.map(item => [item[0], item[2]]),
                tooltip: {
                    valueSuffix: ' mm/Hg'
                },
                color: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, 'blue'],   // Inicio del gradiente
                        [1, 'violet']  // Final del gradiente
                    ]
                }
            }, {
                name: 'Corriente',
                type: 'line',
                yAxis: 0,
                data: dataUTC.map(item => [item[0], item[3]]),
                tooltip: {
                    valueSuffix: ' Amp'
                },
                color: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, 'yellow'],  // Inicio del gradiente
                        [1, 'red']     // Final del gradiente
                    ]
                }
            }, {
                name: 'Presion Jabon ATZ',
                type: 'spline',
                yAxis: 2,
                marker: {
                    enabled: false
                },
                dashStyle: 'shortdot',
                data: dataUTC.map(item => [item[0], item[4]]),
                tooltip: {
                    valueSuffix: ' Bar'
                },
                color: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, 'skyblue'],  // Inicio del gradiente
                        [1, 'lightgreen']   // Final del gradiente
                    ]
                }
            }]
        });

        /* -- GRAFICO DE PRESIONES(tipo EchartApache) -- */

        var dom5 = document.getElementById("chart-presiones");

        var optionBarChart_Presiones;
    
        var myChart5 = echarts.init(dom5, null, {
        renderer: "canvas",
        useDirtyRect: false,
        });
    
        optionBarChart_Presiones = {
        title: {
            text: 'Presiones',
            subtext: 'Bares',
        },
        legend: {
            data: ['Extrusor','Reactor']
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
            name: 'Extrusor',
            type: 'bar',
            data: presion_extrusor,
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
            name: 'Reactor',
            type: 'bar',
            data: presion_reactor,
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
            data_X[Math.min(params.dataIndex + zoomSize2 / 2, presion_jabon_i_atz.length - 1)],
        });
        });
        
        if (optionBarChart_Presiones && typeof optionBarChart_Presiones === "object") {
        myChart5.setOption(optionBarChart_Presiones);
        }
    
        window.addEventListener("resize", myChart5.resize);
    
    //-----------------Chart Temperaturas------------------------------------

  var dom1 = document.getElementById("chart-temperaturas");

  var myChart1 = echarts.init(dom1, null, {
    renderer: "canvas",
    useDirtyRect: false,
  });

  var optionLineChart;

  optionLineChart = {
    title: {
      text: "Temperaturas",
      subtext: "°C",
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
      data: ["Soda, Agua e Inter", "Grasas_Intercambiador", "Reactor",
        "Salida_Turbo","Salida_Condensador","Entrada_Condensador",
        "Agua_Enfriamiento","Soda"
      ],
      orient: 'horizontal',
      bottom: '10',
      left: 'center',
      right: "center",
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
      left: "2%",
      right: "2%",
      bottom: "25%",
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
        end: 10, // Distancia desde el lado izquierdo del contenedor
        //right: '10%',   Distancia desde el lado derecho del contenedor
        bottom: '15%', // Distancia desde la parte inferior del contenedor
        //left: '25%' height: 30,    Altura del dataZoom
      },
    ],
    series: [
      {
        name: "Soda, Agua e Inter",
        type: "line",
        stack: "Total",
        label: {
          show: false,
          position: "top",
          formatter: "{c} bar",
        },
        smooth: true,
        lineStyle: {
            width: 1
        },
        showSymbol: false,
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
        data: Temp_SodaC_Agua_Intercambiador,
      },
      {
        name: "Grasas_Intercambiador",
        type: "line",
        stack: "Total",
        label: {
          show: false,
          position: "top",
          formatter: "{c} bar",
        },
        smooth: true,
        showSymbol: false,
        lineStyle: {
            width: 1
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
        data: Temp_Grasas_Intercambiador,
      },
      {
        name: "Reactor",
        type: "line",
        stack: "Total",
        label: {
          show: false,
          position: "top",
          formatter: "{c} bar",
        },
        smooth: true,
        showSymbol: false,
        lineStyle: {
            width: 1
        },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
                offset: 0,
                color: 'rgb(255, 0, 115)'
              },
              {
                offset: 1,
                color: 'rgb(224, 0, 70)'
              }
        ])
        },
        emphasis: {
          focus: "series",
        },
        data: Temp_Reactor,
      },
      {
        name: "Salida_Turbo",
        type: "line",
        stack: "Total",
        label: {
          show: false,
          position: "top",
          formatter: "{c} bar",
        },
        smooth: true,
        showSymbol: false,
        lineStyle: {
            width: 1
        },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
                offset: 0,
                color: 'rgb(255, 100, 255)'
              },
              {
                offset: 1,
                color: 'rgb(150, 0, 70)'
              }
        ])
        },
        emphasis: {
          focus: "series",
        },
        data: Temp_Salida_Turbo,
      },
      {
        name: "Salida_Condensador",
        type: "line",
        stack: "Total",
        label: {
          show: false,
          position: "top",
          formatter: "{c} bar",
        },
        smooth: true,
        showSymbol: false,
        lineStyle: {
            width: 1
        },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(255, 69, 0)'
          },
          {
            offset: 1,
            color: 'rgb(199, 0, 57)'
          }
        ])
        },
        emphasis: {
          focus: "series",
        },
        data: Temp_Salida_Condensador,
      },
      {
        name: "Entrada_Condensador",
        type: "line",
        stack: "Total",
        label: {
          show: false,
          position: "top",
          formatter: "{c} bar",
        },
        smooth: true,
        showSymbol: false,
        lineStyle: {
            width: 1
        },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(255, 155, 0)'
          },
          {
            offset: 1,
            color: 'rgb(199, 0, 57)'
          }
        ])
        },
        emphasis: {
          focus: "series",
        },
        data: Temp_Entrada_Condensador,
      },
      {
        name: "Agua_Enfriamiento",
        type: "line",
        stack: "Total",
        label: {
          show: false,
          position: "top",
          formatter: "{c} bar",
        },
        smooth: true,
        showSymbol: false,
        lineStyle: {
            width: 1
        },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(255, 255, 0)'
          },
          {
            offset: 1,
            color: 'rgb(255, 215, 0)'
          }
        ])
        },
        emphasis: {
          focus: "series",
        },
        data: Temp_Agua_Enfriamiento,
      },
      {
        name: "Soda",
        type: "line",
        stack: "Total",
        label: {
          show: false,
          position: "top",
          formatter: "{c} bar",
        },
        smooth: true,
        showSymbol: false,
        lineStyle: {
            width: 1
        },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(127, 255, 212)'
          },
          {
            offset: 1,
            color: 'rgb(255, 255, 0)'
          }
        ])
        },
        emphasis: {
          focus: "series",
        },
        data: scaustica,
      },
    ],
  };

  myChart1.setOption(optionLineChart);

  window.addEventListener("resize", myChart1.resize);
}

window.addEventListener("load", function(event){
    if(typeof Highcharts !== 'undefined'){
        $(".PathFilter > div").each(function (){
            var FilterId = $(this).attr("id");
            
            console.log("FilterId:", FilterId);

            init_daterangepickerL1(FilterId);

            console.log("data_from_day");
            
            data_from_day(FilterId);
        })
    }
});