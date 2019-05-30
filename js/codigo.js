
// ordenar maps por keys
const sortStringKeys = (a, b) => a[0] > b[0] ? 1 : -1 

// ordenar maps por valor
const sortStringValues = (a, b) => a[1] === b[1] ? 0 : a[1] < b[1] ? 1 : -1;

var palabrasOriginal, palabrasResAuto, palabrasResManual;
var palabra = new Map();
var resumenAUTO = new Map();
var resumenMANUAL = new Map();
var stopwords = new Map();

var lematizadorPalabra = new Map(); 
var lematizadorPalabraTOTAL = new Map();
var lematizadorPalabraTOTALVariable = new Map();

var lematizadorResumenAUTO = new Map(); 
var lematizadorResumenAUTOTOTAL = new Map();
var lematizadorResumenAUTOTOTALVariable = new Map();

var lematizadorResumenMANUAL = new Map(); 
var lematizadorResumenMANUALTOTAL = new Map();
var lematizadorResumenMANUALTOTALVariable = new Map();

var contenidoORIGINAL, contenidoRESAUTO, cotenidoRESMANUAL;

var cantidad, igualesResAuto, igualesResManual = 0;

var arrayStopwords = ['a', 'acá', 'además', 'ademas', 'ahí', 'ajena', 'ajeno', 'ajenos', 'ajenas', 'al', 'algo', 'algún', 'alguna', 'alguno', 'algunas', 'algunos', 'allá', 'allí', 'ambos',
			    'ante', 'antes', 'aquel', 'aquella', 'aquello', 'aquellas', 'aquellos', 'aquí', 'arriba', 'así', 'atrás', 'aun', 'aunque', 'bajo', 'bastante', 'bien', 'cabe', 'cada',
			    'casi', 'cierto', 'cierta', 'ciertos', 'ciertas', 'como', 'cómo', 'con', 'conmigo', 'creo', 'conseguimos', 'conseguir', 'consigo', 'consigue', 'consiguen', 'consigues', 'contigo',
			    'contra', 'cual', 'cuales', 'cualquier', 'cualquiera', 'cualquieras', 'cuan', 'cuando', 'cuanto', 'cuanta', 'cuantos', 'cuantas', 'da', 'de', 'dejar', 'del', 'demás',
			    'demasiada', 'demasiado', 'demasiadas', 'demasiados', 'dentro', 'desde', 'donde', 'dos', 'e', 'el', 'él', 'ella', 'ello', 'ellas', 'ellos', 'empleáis', 'emplean', 'emplear',
			    'empleas', 'empleo', 'en', 'encima', 'entonces', 'entre', 'era', 'eras', 'eramos', 'eran', 'eres', 'es', 'esa', 'ese', 'eso', 'sas', 'eses', 'esos', 'esta', 'estas', 'estaba',
			    'estado', 'estáis', 'estamos', 'está', 'están', 'estar', 'este', 'esto', 'estes', 'estos', 'estoy', 'etc', 'fin', 'fue', 'fueron', 'fui', 'fuimos', 'gueno', 'ha', 'hay', 'han',
			    'he', 'hecho', 'hace', 'haces', 'hacéis' ,'hacemos' ,'hacen' ,'hacer' ,'hacia' ,'hago' ,'hasta' ,'incluso' ,'intenta' ,'intentas' ,'intentáis' ,'intentamos' ,'intentan' ,'intentar' ,'intento',
				'ir' ,'jamás' ,'junto' ,'juntos' ,'la' ,'lo' ,'le' ,'las' ,'los','les','largo','más','mas','me','menos','mi','mí','mis','mía','mías','mias','mientras','mío','mios','míos',
				'misma','mismo','mismas','mismos','modo','mucha','muchas','muchísima','muchísimo','muchísimas','muchísimos','mucho','muchos','muy','nada','ni','ningún','ninguna','ninguno',
				'ningunas','ningunos','no','nos','nosotras','nosotros','nuestra','nuestro','nuestras','nuestros','nunca','o','os','otra','otro','otras','otros','para','parecer','pero','poca',
				'poco','pocas','pocos','podéis','podemos','poder','podría','podrías','podríais','podríamos','podrían','por','porque','primero','puede','pueden','puedo','pues','que','qué','querer',
				'quién','quienes','quiénes','quienesquiera','quienquiera','quizá','quizás','sabe','sabes','saben','sabéis','sabemos','saber','se','sé','sea','según','ser','será','si','sido','sí','siempre',
				'siendo','sin','sino','so','son','sobre','sois','solamente','solo','sólo','somos','soy','sr','sra','sres','sta','su','sus','suya','suyo','suyas','suyos','tal','tales','también',
				'tampoco','tan','tanta','tanto','tantas','tantos','te','tenéis','tenemos','tener','tengo','ti','tiene','tienen','toda','todo','todas','todos','tomar','trabaja','trabajó','trabajáis',
				'trabajamos','trabajan','trabajar','trabajas','tras','tú','tu','tus','tuya','tuyo','tuyas','tuyos','último','ultimo','u','un','una','uno','unas','unos','usa','usas','usáis','usamos',
				'usan','usar','uso','usted','ustedes','va','van','vais','valor','vamos','varias','varios','vaya','verdadera','vosotras','vosotros','voy','vuestra','vuestro','vuestras','vuestros','y',
				'ya','yo','%','________________']


function stem(word) {

    var entreFor=false;
    var suf7 = new Array("bilidad","cultora");
    var suf6 = new Array("arquia","cardio","cardia","cracia","cultor","grafía","ificar","ístico","ística","latría","mancia","metría","miento");
    var suf5 = new Array("ación","algia","ancia","ativo","ativa","etiva","etivo","cidio","crata","demia","encia","fagia","filia","fobia","fonía","forme","gamia","genia","ginia","grafo","grafa",
                                        "grama","latra","lisis","logía","illos","manía","mante","mente","mento","metro","nomía","patía","pedia","polis","torio");
    var suf4 = new Array("áceo","ácea","amen","ando","ante","anza","ario","aria","arlo","aron","azgo","ción","dero","dera","dizo","diza","dora","ecer","edro",
                                        "ense","ería","esco","esca,","fago","faga","fero","fera","filo","fila","fito","fobo","foba","fono","fona","fugo","fuga","gamo",
                                        "gama","geno","gena","gino","gina","gono","iano","iana","ismo","ista","itis","irle","irlo","izar","lito","logo","loga","nomo",
                                        "noma","oide","óleo","opía","osis","pata","podo","teca","ucho","ucha","voro","vora");
    var suf3 = new Array("aba","aco","aca","ada","ado","aje","ano","ana","amo","ata","ato","are","avo","ava","azo","ble","dor","ear","eco","edo","eda","ego","ega","eno",
                                        "ena","era","ero","esa","eza","geo","ica","ido","ida","imo","ina","ína","ing","izo","iza","ita","nte","ona","oma","ope","oso",
                                        "osa","tud","udo","uda","ura");
    var suf2 = new Array("ad","an","ar","en","és","ez","ía","il","ín","ir","ón");
    var suf1 = new Array("a","e","é","i","í","o","ó","u");
  
    var len = word.length;

    if (len > 3) {
        
        //eliminamos los plurales
        if(word.endsWith("s")){
            word = word.substring(0, len - 1);
            len=word.length;
        }
        
        if(len == 4 || len == 5){ 
            
            //comprobamos para los sufijos de 2 letras
            for(var i=0;i<suf2.length && entreFor==false;i++){
                if(word.endsWith(suf2[i])){
                    word = word.substring(0, len - 2);
                    entreFor=true;
                    break;
                }
            }

            //comprobamos para los sufijos de 1 letras
            for(var i=0;i<suf1.length && entreFor==false;i++){
                if(word.endsWith(suf1[i])){
                    word = word.substring(0, len - 1);
                    break;
                }
            }
            
        }else{
            //comprobamos para los sufijos de 7 letras
            for(var i=0;i<suf7.length;i++){
                if(word.endsWith(suf7[i])){
                    word = word.substring(0, len - 7);
                    entreFor=true;
                    break;
                }
            }

            //comprobamos para los sufijos de 6 letras
            for(var i=0;i<suf6.length && entreFor==false;i++){
                if(word.endsWith(suf6[i])){
                    word = word.substring(0, len - 6);
                    entreFor=true;
                    break;
                }
            }

            //comprobamos para los sufijos de 5 letras
            for(var i=0;i<suf5.length && entreFor==false;i++){
                if(word.endsWith(suf5[i])){
                    word = word.substring(0, len - 5);
                    entreFor=true;
                    break;
                }
            }

            //comprobamos para los sufijos de 4 letras
            for(var i=0;i<suf4.length && entreFor==false;i++){
                if(word.endsWith(suf4[i])){
                    word = word.substring(0, len - 4);
                    entreFor=true;
                    break;
                }
            }

            //comprobamos para los sufijos de 3 letras
            for(var i=0;i<suf3.length && entreFor==false;i++){
                if(word.endsWith(suf3[i])){
                    word = word.substring(0, len - 3);
                    entreFor=true;
                    break;
                }
            }

            //comprobamos para los sufijos de 2 letras
            for(var i=0;i<suf2.length && entreFor==false;i++){
                if(word.endsWith(suf2[i])){
                    word = word.substring(0, len - 2);
                    entreFor=true;
                    break;
                }
            }

            //comprobamos para los sufijos de 1 letras
            for(var i=0;i<suf1.length && entreFor==false;i++){
                if(word.endsWith(suf1[i])){
                    word = word.substring(0, len - 1);
                    break;
                }
            }
        }
    }  
                
    return word;
}


function lematizador(lemamapahash, mapahash, lematotal){   
        
    var resul="";

    for (var [key, value] of mapahash) {
    	//key va a ser educación
    	//resul va a ser educ
      	resul=stem(key);
      	//comprobamos si existe la key en el mapa hash lematizaorOriginal
        //si educ ya esta en el mapa hash
      	if(lemamapahash.has(resul)==true){
      		var valor = lemamapahash.get(resul);

      		//comprobamos si educacion esta en el arrayList
            for(var i=0;i<valor.length;i++){
                if(valor.includes(key)){
                    break;
                }else{
                    valor.push(key);
                }                                      
            }
      	}else{
      		//si no existe
            var nuevo = new Array();
            lemamapahash.set(resul, nuevo);
            lemamapahash.get(resul).push(key);
      	}
    }
       
    //calculamos el total de palabras y las guardamos en un mapa hash
    for (var [key, value] of lemamapahash) {
    	var contador=0;
    	for(var i=0;i<lemamapahash.get(key).length;i++){
            //System.out.println(lema.get(key).get(i));
            if((i+1)==lemamapahash.get(key).length){                  
                contador = contador + mapahash.get(lemamapahash.get(key)[i]);
                lematotal.set(key, contador);
            }else{
               contador = contador + mapahash.get(lemamapahash.get(key)[i]); 
            }
        }
    }

}


function ordenarmapaHashLematizador(mapahash, lema, hash, cantidad){
    
    var contador=0;
    //ordenamos el mapa hash en orden descendente
    var mapahashOrdenado = new Map([...mapahash].sort(sortStringValues)); 

    var contenido="";  
    
    for (var [key, value] of mapahashOrdenado) {
    	if(contador < cantidad){
    		contador++;
    		//console.log(key + " => ");
            contenido = contenido + ("<span style='color: #64a19d;'>&#8226;</span>&nbsp"+"<b style='color:#4c5163;'>"+key+"</b>" + " &nbsp<i style='color: #64a19d;font-size: 12px;' class='fas fa-arrow-right'></i>&nbsp ");

    		//vamos a recorrer el mapa hash de lematizadorOriginal para identificar las palabras que pertenecen a esa palabra lematizada
		    var array = lema.get(key);
		    for(var i=0;i<array.length;i++){
		        if((i+1)==array.length){
		            contenido = contenido + (array[i] + "["+hash.get(array[i])+"] <b style='color: #64a19d;'>=</b> "+ "<b>"+mapahashOrdenado.get(key)+"</b><br>");	            
		        }else{
		            contenido = contenido + (array[i] + "["+hash.get(array[i])+"], ");	            
		        }
		    }
    	}
    }

    return contenido;     
}


function quitarMayusculasyCaracteres(palabra){
        
        var res="";
        for(var i=0; i<palabra.length;i++){ 
            var c = palabra.charAt(i);
            switch(c){ 
                case '':
                case '¡':
                case '¿':
                case '?':
                case '!':
                case ',':
                case '@':
                case '-':
                case '"':
                case ':':
                case ';':
                case '(':
                case ')':
                case '[':
                case ']':
                case '—':
                case '{':
                case '«':
                case '»':
                case '}':        
                case '.': res=res+"";
                    break;
                default: res = res + c; 
            }                       
        }                      
        return res;
    }


    //Comprobamos si esa palabra existe en el mapa hash y si es asi incrementamos su valor, sino la añadimos por primera vez
    function comprobarExiste(p, mapahash){            
        if(mapahash.has(p)==true){
            //incrementar el valor
            mapahash.set(p, mapahash.get(p)+1);
        }else{
            //insertamos en el mapa hash 
            mapahash.set(p, 1);
        }
    }

function crearStopwords(){

    stopwords = new Map();

	for(var i=0; i<arrayStopwords.length;i++){
		comprobarExiste(arrayStopwords[i],stopwords);
	}
}

function eliminarStopwords(mapahash){

	//recorremos el map que le pasamos por parametro y vemos si en el map de stopwords existe esa clave y si es asi la borramos del map que le pasamos por parametro
	for (var [key, value] of mapahash) {
		if(stopwords.has(key)==true){
			mapahash.delete(key);
		}
	}
}


function crearMapsVariables(mapahash1,mapahash2,cant){
	var contador=0;

	var ordenado = new Map([...mapahash1].sort(sortStringValues));
	   
	for (var [key, value] of ordenado) {
		if(contador<cant){
	  		mapahash2.set(key,value);
	  		contador++;
		}else{
			break;
		}
	}				
}


function calcularMedida1(palvar, resvar,cantidad, tipoRes){
    var resultado=0;
    var iguales=0;

    //guardamos en dos vectores las palabras
    var vectorpal = new Array();
    var vectorres = new Array();    

    for (var [key, value] of palvar) {
        vectorpal.push(key);
    }

    for (var [key, value] of resvar) {
        vectorres.push(key);
    } 

    console.log(vectorpal.length);
    console.log(vectorres.length);
    
    var encontrado=false;

    //comprobamos en que posicion esta una palabra del texto original en el resumen
    for(var i=1;i<vectorpal.length+1;i++){
        for(var j=1;j<vectorres.length+1;j++){
            if(vectorpal[i]==vectorres[j]){
                resultado = resultado + (1/i);
            }           
        }
    }

    for (var [key, value] of palvar) {	
		if(resvar.has(key)==true){
			iguales++;
			//al estar incrementamos la variable en 1/i en este caso 1/contador, si no está no incrementará dicha variable
			//resultado=resultado+(1/contador);
		} 
		
	}

	if(tipoRes=="AUTO"){
        igualesResAuto=iguales;
    }else if(tipoRes=="MANUAL"){
        igualesResManual=iguales;
    }

    console.log(resultado);
    return resultado;       
}


function calcularMedida2(palvar,resvar){   
        
    var resultado=0;
    var pos=0;   
    
    //guardamos en dos vectores las palabras
    var vectorpal = new Array();
    var vectorres = new Array();    

    for (var [key, value] of palvar) {
    	vectorpal.push(key);
    }

    for (var [key, value] of resvar) {
    	vectorres.push(key);
    } 
    
    var encontrado=false;

    //comprobamos en que posicion esta una palabra del texto original en el resumen
    for(var i=0;i<vectorpal.length;i++){
        for(var j=0;j<vectorres.length;j++){
        	if(vectorpal[i]==vectorres[j]){
        		pos=j;
                encontrado=true;
                break;
        	}           
        }

        //si la ha encontrado, realizamos el calculo 1/i * 1/j
        if(encontrado==true){
            i++;
            pos++;

            resultado = resultado + ((1/i) * (1/pos));

            i--;
            pos--;
            encontrado=false;
        }

    } 

    return resultado;
}


function generarGraficaBars(tipo,calculo1,calculo2,minimo,maximo,escala){  

	var ctx = document.getElementById(tipo).getContext("2d");          
    var mybarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [''],
            datasets: [{
                label: ' Resumen automatico',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderWidth: 1,
                borderColor: 'rgba(255,99,132,1)',
                data: [calculo1]
            },                    
              {
                label: ' Resumen manual',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderWidth: 1,
                borderColor: 'rgba(54, 162, 235, 1)',
                data: [calculo2]
            }]
        },

        options: {                
            responsive: true,
            legend: {
              display: true,
              position: 'top',
              labels: {
                fontColor: "#ffffff",
                fontSize: 10,
                boxWidth: 20 
              }
            },
            scales: {
              yAxes: [{
                ticks: {
                  fontColor: "#ffffff",
                  max: maximo + escala,
                  min: minimo,
                  stepSize: escala,
                }
              }],
              xAxes: [{
                  categoryPercentage: 1.0,
                  barPercentage: 0.9                  
              }],
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem,data) {                    
                        if(tooltipItem.datasetIndex==0){
                            return " Resumen automático: "+ calculo1 + " %";
                        }else if(tooltipItem.datasetIndex==1){
                            return " Resumen manual: "+ calculo2 + " %";
                        }
                    }
                }   
            }
        },

        plugins: [{
            beforeInit: function(chart, options) {
              chart.legend.afterFit = function() {
                this.height = this.height + 10;
              };
            }
        }]


        });
}

function generarGraficaPie(calculo,calculo2){

	  mensaje1=" Resumen automatico";
	  mensaje2=" Resumen manual";

	  var ctx2 = document.getElementById("graficoReduccion").getContext("2d");        

	  var data = {
	      labels: [" Original", mensaje1 ,mensaje2],
	        datasets: [
	          {
	              fill: true,
	              backgroundColor: [
                      'rgba(116, 217, 21, 0.5)',
	                  'rgba(255, 99, 132, 0.5)',
	                  'rgba(54, 162, 235, 0.5)'],
	              data: [(100-calculo), calculo, calculo2],	              
	              borderColor:  ['rgba(144,255,41,1)','rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)'],
	              borderWidth: [1,1,1]	             	              
	          }
	      ]
	  };

	  var options = { 
	  		  responsive: true,
	  		  tooltips: {						  
				filter: function (tooltipItem,data) {                   
					//esto es para borrar un label
					if(tooltipItem.index==1){
						return data.labels[1] + data.datasets[0].data[1];
					}else if(tooltipItem.index==2){
                        return data.labels[2] + data.datasets[0].data[2];
                    }			
				},

                callbacks: {
                    label: function (tooltipItem,data) {
                        if(tooltipItem.index==1){
                            return data.labels[1] +": "+ data.datasets[0].data[1] + " %";
                        }else if(tooltipItem.index==2){
                            return data.labels[2] +": "+ data.datasets[0].data[2] + " %";
                        }

                    }
                }					
			  },               
	          rotation: -0.7 * Math.PI,
	          legend: {	          	          	
	            display: true,
	            position: 'top',
	            labels: {
	              fontColor: "#ffffff",
                  fontSize: 10,
                  boxWidth: 20                            
	            }
	          }
	  };

	  var myBarChart = new Chart(ctx2, {
	      type: 'pie',
	      data: data,
	      options: options,
          plugins: [{
            beforeInit: function(chart, options) {
              chart.legend.afterFit = function() {
                this.height = this.height + 15;
              };
            }
          }]
	  });
}


function cloud(id,mapahash){

    var words=[];
    var contador=0;

    var mapahashOrdenado = new Map([...mapahash].sort(sortStringValues));

    for (var [key, value] of mapahashOrdenado) {
        if(contador<30){
            words.push({text: key,weight:value});
            contador++; 
        }else{
            break;
        }
          
    }  


      $(id).html('&nbsp;');
      $(id).jQCloud(words);

      $(id).css("width","100%");
      //setTimeout(cloud,30*100)       

}


function masFrecuentes(mapahash){
    var mapahashOrdenado = new Map([...mapahash].sort(sortStringValues));
    var masfrecuentes="";
    var contador=0;
    for (var [key, value] of mapahashOrdenado) {
        if(contador<5){
            if(contador==3){
                masfrecuentes=masfrecuentes+key+" y ";
                contador++; 
            }else if(contador==4){
                masfrecuentes=masfrecuentes+key;
                contador++;  
            }else{
                masfrecuentes=masfrecuentes+key+", ";
                contador++;   
            }                           
        }else{
            break;
        }        
    }

    return masfrecuentes;
}

function evaluarFicheros(e){

    var porcentaje=0;
    var eleccion;
	
	if ($('input[id=bajo]:checked').length > 0) {
        porcentaje=1;
        eleccion="Bajo";
    }else if ($('input[id=medio]:checked').length > 0) {
        porcentaje=5;
        eleccion="Medio";
    }else if ($('input[id=alto]:checked').length > 0) {
        porcentaje=10;
        eleccion="Alto";
    } 

	if($('#ojo1').css('display') == 'none' || $('#ojo2').css('display') == 'none'	|| $('#ojo3').css('display') == 'none'){

		alert("AVISO: Falta por introducir algun fichero");

	}else{	

        igualesResAuto, igualesResManual = 0;	

		/*for (var [key, value] of palabra) {
		  console.log(key + " = " + value);
		}*/

		crearStopwords();

		cantidad=0;                      
        //calculamos que fichero tiene menos palabras para saber cual será nuestro maximo de palabras a mostrar cuando el usuario introduzca un 100% como porcentaje
        var menor=0;

        if(palabrasOriginal.length < palabrasResAuto.length && palabrasOriginal.length < palabrasResManual.length){
            menor=palabrasOriginal.length;
        }else{
            if(palabrasResAuto.length < palabrasOriginal.length && palabrasResAuto.length < palabrasResManual.length){
                menor=palabrasResAuto.length;
            }else{
                menor=palabrasResManual.length;
            }
        }

        //cantidad de palabras a mostrar según el porcentaje que el usuario ha introducido
        cantidad = Math.trunc(menor * (porcentaje/100));

        
        //Borramos las stopwords del ORIGINAL y escribimos un map nuevo segun el porcentaje que introdujo el usuario      
        eliminarStopwords(palabra);
        lematizadorPalabra = new Map();
        lematizadorPalabraTOTAL = new Map();
        lematizador(lematizadorPalabra,palabra,lematizadorPalabraTOTAL);
        lematizadorPalabraTOTALVariable = new Map();
        crearMapsVariables(lematizadorPalabraTOTAL,lematizadorPalabraTOTALVariable,cantidad);

        //Borramos las stopwords del RESUMEN AUTOMATICO y escribimos un map nuevo segun el porcentaje que introdujo el usuario       
        eliminarStopwords(resumenAUTO);
        lematizadorResumenAUTO = new Map();
        lematizadorResumenAUTOTOTAL = new Map(); 
        lematizador(lematizadorResumenAUTO,resumenAUTO,lematizadorResumenAUTOTOTAL);
        lematizadorResumenAUTOTOTALVariable = new Map();
        crearMapsVariables(lematizadorResumenAUTOTOTAL,lematizadorResumenAUTOTOTALVariable,cantidad);

        //Borramos las stopwords del RESUMEN MANUAL y escribimos un map nuevo segun el porcentaje que introdujo el usuario
        eliminarStopwords(resumenMANUAL);
        lematizadorResumenMANUAL = new Map();
        lematizadorResumenMANUALTOTAL = new Map();
        lematizador(lematizadorResumenMANUAL,resumenMANUAL,lematizadorResumenMANUALTOTAL);
        lematizadorResumenMANUALTOTALVariable = new Map();
        crearMapsVariables(lematizadorResumenMANUALTOTAL,lematizadorResumenMANUALTOTALVariable,cantidad);

        var res = calcularMedida1(lematizadorPalabraTOTALVariable,lematizadorResumenAUTOTOTALVariable,cantidad,"AUTO");
        var res2 = calcularMedida1(lematizadorPalabraTOTALVariable,lematizadorResumenMANUALTOTALVariable,cantidad,"MANUAL");
        var res3 = calcularMedida2(lematizadorPalabraTOTALVariable,lematizadorResumenAUTOTOTALVariable);
        var res4 = calcularMedida2(lematizadorPalabraTOTALVariable,lematizadorResumenMANUALTOTALVariable);

        var calculo=(palabrasResAuto.length*100)/palabrasOriginal.length;
        var calculo2=(palabrasResManual.length*100)/palabrasOriginal.length;
        var calculo3=(igualesResAuto*100)/cantidad;
        var calculo4=(igualesResManual*100)/cantidad;

        var cadenatotalpalabras = '<h4 class="punto text-white mb-4" style="text-align: left; padding: 20px; color: #64a19d!important;">Total de palabras</h4>'+
                                  '<div style="float:left; width: 32%;">'+
                                  '<h3 class="text-white mb-4" style="width:100%;text-align: center;color: white!important;text-decoration: underline;letter-spacing: 2px;margin-bottom: 25px !important;margin: 0 auto;">Original</h3>'+
                                  '<div style="position: relative;right: -50px;"><i class="far fa-file-alt text-primary" style="font-size: 200px;"></i>'+
                                  '<input class="rellenopalabras" type="text" name="original" value="'+palabrasOriginal.length+'" disabled></div></div>'+
                                  '<div style="float:left; width: 32%;">'+
                                  '<h3 class="text-white mb-4" style="width:100%;text-align: center;color: white!important;text-decoration: underline;letter-spacing: 2px;margin-bottom: 25px !important;margin: 0 auto;">Automático</h3>'+
                                  '<div style="position: relative;right: -50px;"><i class="far fa-file-alt text-primary" style="font-size: 200px;"></i>'+
                                  '<input class="rellenopalabras" type="text" name="automatico" value="'+palabrasResAuto.length+'" disabled></div></div>'+
                                  '<div style="float:left; width: 32%;">'+
                                  '<h3 class="text-white mb-4" style="width:100%;text-align: center;color: white!important;text-decoration: underline;letter-spacing: 2px;margin-bottom: 25px !important;margin: 0 auto;">Manual</h3>'+
                                  '<div style="position: relative;right: -50px;"><i class="far fa-file-alt text-primary" style="font-size: 200px;"></i>'+
                                  '<input class="rellenopalabras" type="text" name="manual" value="'+palabrasResManual.length+'" disabled></div></div>';


        var cadenareduccion = '<p style="font-size: 14px; margin-bottom: 10px;"> Porcentaje de reducción sobre resumen automatico: <span style="font-weight: 700; letter-spacing: 1.5px; color: #64a19d;"> ' + calculo.toFixed(2) + '%</p>'+ 
                              '<p style="font-size: 14px;"> Porcentaje de reducción sobre resumen manual: <span style="font-weight: 700; letter-spacing: 1.5px; color: #64a19d;"> ' + calculo2.toFixed(2) + '%</p>';

        var cadenafrecuencia = '<p></p>'+
                               '<p style="font-size: 14px; margin-bottom: 10px;"> Grado de coincidencia de vocabulario del resumen automatico respecto al original: <span style="font-weight: 700; letter-spacing: 1.5px; color: #64a19d;"> ' +calculo3.toFixed(2)+' % ('+igualesResAuto+'/'+cantidad+')'+
                               '<p style="font-size: 14px;"> Grado de coincidencia de vocabulario del resumen manual respecto al original: <span style="font-weight: 700; letter-spacing: 1.5px; color: #64a19d;"> ' +calculo4.toFixed(2)+' % ('+igualesResManual+'/'+cantidad+')';

        var cadenamedida1 = '<p style="font-size: 14px; margin-bottom: 10px;padding-left: 20px;"> Para el resumen automático: <span style="font-weight: 700; letter-spacing: 1.5px; color: #64a19d;"> ' + res.toFixed(2) +
                            '<p style="font-size: 14px;padding-left: 20px;"> Para el resumen manual: <span style="font-weight: 700; letter-spacing: 1.5px; color: #64a19d;"> ' + res2.toFixed(2);

        var cadenamedida2 = '<p style="font-size: 14px; margin-bottom: 10px;padding-left: 20px;"> Para el resumen automático: <span style="font-weight: 700; letter-spacing: 1.5px; color: #64a19d;"> ' + res3.toFixed(2) +
                            '<p style="font-size: 14px;padding-left: 20px;"> Para el resumen manual: <span style="font-weight: 700; letter-spacing: 1.5px; color: #64a19d;"> ' + res4.toFixed(2);


        $("#todoexaminar").hide(); 

        $("#resultados").show(); 
        location.href = "#page-top";        

        //generar nubes de palabras
        cloud("#nuberellena1",palabra);
        cloud("#nuberellena2",resumenAUTO);
        cloud("#nuberellena3",resumenMANUAL);

        var titulo1='<h4 class="punto text-white mb-4" style="text-align: left; padding: 20px; color: #64a19d!important;">Porcentajes de reducción</h4>';
        var titulo2='<h4 class="punto text-white mb-4" style="text-align: left; padding: 20px; color: #64a19d!important;">Grado de coincidencia de vocabulario</h4>';
        var titulo3='<h4 class="punto text-white mb-4" style="text-align: left; color: #64a19d!important;">Medidas de cobertura</h4>';

        
        var cadena2='<div style="width: 60%; margin-left: auto;margin-right: auto;">'+      			
              		'<canvas id="graficoReduccion" style="width:20px!important; height:20px; margin-top: 10px;"></canvas>'+
              		'</div>';

        var cadena4='<canvas id="graficoFrecuencia" style="width:20px!important; height:20px;"></canvas>';

        var datacontentmedida1 = "Para esta medida vamos a usar los conjuntos de lemas del fichero original y del automático o manual, y se va a tener en cuenta la posición en el conjunto de lemas del original donde se encuentra el lema que coincida con el conjunto del automático o manual. ";

        var datacontentmedida2 = "Para esta medida vamos a usar los conjuntos de lemas del fichero original y del automático o manual, y se va a tener en cuenta tanto la posición en el conjunto de lemas del original donde se encuentra el lema que coincida con el conjunto del automático o manual, como la propia posición donde se encuentra el lema del conjunto del automático o manual, que coincide con el lema del conjunto del original. ";

        var cadena5='<div style="width: 50%; float:left;">'+
                    '<span style="color:white;font-size: 18px;float:left;margin-right:5px;">-</span>'+
                    '<span style="color: #64a19d!important;font-size: 18px;float:left;">Uniposicional</span>'+
        			'<div class="icon" style="margin-bottom: 20px;"><img src="img/otrofondo.png" class="toggle" data-toggle="infomedida1" data-content="'+datacontentmedida1+'"></div>'+
              		'<div style="clear:both"></div>'+
                    '<div class="col-lg-8 mx-auto"><canvas id="graficoMedida11" style="width:20px!important; height:20px;"></canvas></div>'+cadenamedida1+
              		'</div>';


        var cadena6='<div style="width: 50%; float:left;">'+
                    '<span style="color:white;font-size: 18px;float:left;margin-right:5px;">-</span>'+
                    '<span style="color: #64a19d!important;font-size: 18px;float:left;">Multiposicional</span>'+
                    '<div class="icon" style="margin-bottom: 20px;"><img src="img/otrofondo.png" class="toggle" data-toggle="infomedida2" data-content="'+datacontentmedida2+'"></div>'+
                    '<div style="clear:both"></div>'+
                    '<div class="col-lg-8 mx-auto"><canvas id="graficoMedida12" style="width:20px!important; height:20px;"></canvas></div>'+cadenamedida2+
                    '</div>';

              
        var cadenatotal2=cadena5+cadena6;          		


        $("#graficos #totalpalabras").html(cadenatotalpalabras);

        $("#graficos #titulograficareduccion").html(titulo1);
        $("#graficos #rellenograficasreduccion").html(cadena2);
        $("#graficos #rellenadatosreduccion").html(cadenareduccion);
        generarGraficaPie(calculo.toFixed(2),calculo2.toFixed(2));        
        
        var maximo = Math.round(Math.max(calculo3.toFixed(2), calculo4.toFixed(2)));
        if(maximo > 10){
          maximo = maximo - (maximo % 10);   
        }                             

        $("#graficos #titulograficafrecuencia").html(titulo2);
        $("#graficos #rellenograficasfrecuencia").html(cadena4);
        $("#graficos #rellenadatosfrecuencia").html(cadenafrecuencia);                    
        generarGraficaBars("graficoFrecuencia",calculo3.toFixed(2),calculo4.toFixed(2),0,maximo,10);

        var maximo1 = Math.round(Math.max(res.toFixed(2), res2.toFixed(2)));        
        if(maximo1 > 10){
            maximo1 = maximo1 - (maximo1 % 10);
        }


        var maximo2 = Math.round(Math.max(res3.toFixed(2), res4.toFixed(2))); 
        if(maximo2 > 10){
            maximo2 = maximo2 - (maximo2 % 10);
        }

        $("#titulograficamedidas").html(titulo3);
        $("#rellenomedidas").html(cadenatotal2);
        generarGraficaBars("graficoMedida11",res.toFixed(2),res2.toFixed(2),0,maximo1,1);
        generarGraficaBars("graficoMedida12",res3.toFixed(2),res4.toFixed(2),0,maximo2,0.5);

        $('[data-toggle="infomedida1"]').popover();
        $('[data-toggle="infomedida2"]').popover();
        
        //generamos en un string las palabras mas frecuentes.
        var masfrecuentesOriginal = masFrecuentes(palabra);
        var masfrecuentesAuto = masFrecuentes(resumenAUTO);
        var masfrecuentesManual = masFrecuentes(resumenMANUAL);

        var d = new Date();

        var dia = d.getDate() + "/" +(d.getMonth()+1)+"/"+d.getFullYear();
        var minuto;

        if(d.getMinutes()<10){
            minuto="0"+d.getMinutes();
        }else{
            minuto=d.getMinutes();
        }

        var hora = d.getHours() + ":" + minuto;

        var nomFichero1 = document.getElementById("label1").textContent;
        var nomFichero2 = document.getElementById("label2").textContent;

        var nomFichero3 = document.getElementById("label3").textContent;

        //Generamos el PDF
        var doc = new jsPDF();

        var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
        var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

        doc.setProperties({
            title: 'Informe iSummary',
            subject: 'Informe de los ficheros',
            author: 'iSummary'                                     
        });

        //doc.setFontSize(10);
        doc.fromHTML('Generado por iSummary',pageWidth -60, 10);
        doc.fromHTML('el '+dia+ ' a las '+hora,pageWidth -60, 15);
        //doc.setFontSize(12);
        doc.fromHTML('Para este informe se han usados los ficheros:',20, 40);
        doc.fromHTML('<b>"'+ nomFichero1 + '"</b> para el fichero original.',25, 50);
        doc.fromHTML('<b>"'+ nomFichero2 + '"</b> para el resumen automático.',25, 60);
        doc.fromHTML('<b>"'+ nomFichero3 + '"</b> para el resumen manual.',25, 70);

        doc.fromHTML('El fichero original consta de <b>'+palabrasOriginal.length+'</b> palabras, el fichero resumen automático de <b>'+palabrasResAuto.length+'</b> y el resumen',20, 90);
        doc.fromHTML('manual de <b>'+palabrasResManual.length+'</b>.',20, 95);

        doc.fromHTML('Respecto a los porcentajes de reduccion sobre el original tenemos un <b>'+calculo.toFixed(2)+'%</b> para el resumen',20, 105);
        doc.fromHTML('automático y un <b>'+calculo2.toFixed(2)+'%</b> para el resumen manual.',20, 110);

        doc.fromHTML('Seguidamente tenemos el grado de coincidencia de vocabulario respecto al original, teniendo un',20, 120);
        doc.fromHTML('<b>'+calculo3.toFixed(2)+'%</b> para el resumen automático y un <b>'+calculo4.toFixed(2)+'%</b> para el resumen manual.',20, 125);
        doc.fromHTML('Según el porcentaje de palabras que usted introdujo (Bajo/Medio/Alto) en su caso, <b>'+eleccion+'</b>, se han',20, 130);
        doc.fromHTML('usado las <b>'+cantidad+'</b> palabras mas frecuentes del fichero original, donde coinciden <b>'+igualesResAuto+'</b> para el resumen',20, 135);
        doc.fromHTML('automático y <b>'+igualesResManual+'</b> para el resumen manual.',20, 140);

        doc.fromHTML('Las palabras más frecuentes son: ',20, 150);
        doc.fromHTML('- Para el original: <b>'+masfrecuentesOriginal+'</b>.',25,155);
        doc.fromHTML('- Para el resumen automatico: <b>'+masfrecuentesAuto+'</b>.',25, 160);
        doc.fromHTML('- Para el resumen manual: <b>'+masfrecuentesManual+'</b>.',25, 165); 

        doc.fromHTML('En cuanto a las medidas de cobertura, para la <b>medida de cobertura uniposicional</b> en el caso del',20, 175);    
        doc.fromHTML('automático tenemos una puntuación de <b>'+res.toFixed(2)+'</b> y para el manual una puntuación de <b>'+res2.toFixed(2)+'</b>.',20, 180);

        doc.fromHTML('Para la <b>medida de cobertura multiposicional</b> en el caso del automático tenemos una puntuación',20, 190);    
        doc.fromHTML('de <b>'+res3.toFixed(2)+'</b> y para el manual una puntuación de <b>'+res4.toFixed(2)+'</b>.',20, 195);

        doc.setFontSize(10);
        doc.text(pageWidth -20,pageHeight -20, 'Si desea ponerse en contacto con nosotros, envia un email a contact@isummary.com','right');
        doc.setFontSize(8);
        doc.text(pageWidth /2,pageHeight -10, '1');
        
        var string = doc.output('datauristring');               
        $('#preview-pane').attr('src', string);
                                         	
    }	
}


//borramos los campos tanto de nuevo cuestionario como de nuevas preguntas
function clear(){	
	var inputs=document.getElementsByTagName('input');
	for(var i=0;i<inputs.length;i++){
		if(inputs[i].getAttribute('type')=="text" || inputs[i].getAttribute('type')=="url"){
			inputs[i].value="";
		}		
	}
}


function readFile(event) {

	var param = event.target.myParam;
  	var file = event.target.files[0];

  	if (file) {
    	new Promise(function(resolve, reject) {
      	var reader = new FileReader();
      	reader.onload = function (evt) {
        	resolve(evt.target.result);
      	};
      	reader.readAsText(file,'ISO-8859-1');
      	reader.onerror = reject;
    	})
    	.then(processFileContent.bind(null,param))
    	.catch(function(err) {
      	console.log(err)
    	});
  	}
}

function processFileContent(parametro,data) {   

	if(parametro==1){
		contenidoORIGINAL=data;
		palabra = new Map();
		palabrasOriginal = data.split(' ');

		for(var i = 0; i<palabrasOriginal.length ; i++){
			var palabraBien = quitarMayusculasyCaracteres(palabrasOriginal[i].toLowerCase());
			comprobarExiste(palabraBien,palabra);		
		}
				
	}else if(parametro==2){
		contenidoRESAUTO=data;
		resumenAUTO = new Map();
		palabrasResAuto = data.split(' ');

		for(var i = 0; i<palabrasResAuto.length ; i++){
			var palabraBien = quitarMayusculasyCaracteres(palabrasResAuto[i].toLowerCase());
			comprobarExiste(palabraBien,resumenAUTO);		
		}
		
	}else if(parametro==3){
		cotenidoRESMANUAL=data;
		resumenMANUAL = new Map();
		palabrasResManual = data.split(' ');
		for(var i = 0; i<palabrasResManual.length ; i++){
			var palabraBien = quitarMayusculasyCaracteres(palabrasResManual[i].toLowerCase());
			comprobarExiste(palabraBien,resumenMANUAL);		
		}
		
	}
}

function previsualizacionFicheros(e){
	
	var id=e.target.id;
	var idmodal, nombreArchivo, texto, idhtml, numero;
	if(id=="ojo1"){
		idmodal="myModal1";
		texto=contenidoORIGINAL;
		idhtml="#previsualizacion1";
		numero="1";
		nombreArchivo=document.getElementById("label1").textContent;
	}else if(id=="ojo2"){
		idmodal="myModal2";		
		texto=contenidoRESAUTO;
		idhtml="#previsualizacion2";
		numero="2";
		nombreArchivo=document.getElementById("label2").textContent;
	}else if(id=="ojo3"){
		idmodal="myModal3";
		texto=cotenidoRESMANUAL;
		idhtml="#previsualizacion3";
		numero="3";
		nombreArchivo=document.getElementById("label3").textContent;
	}

	var modal = document.getElementById(idmodal);

	var id=e.target.id;
  	var archivo=$('#'+id).text();

  	if(archivo!="Ningún archivo seleccionado"){
  		var contenido= '<p>'+nombreArchivo+'<span id="cruz'+numero+'" class="close" style="text-align: right;">&times;</span></p>'+'<br><br/>'
  		+'<p style="padding-left:30px; padding-right:30px; text-align: justify; line-height: 30px;">'+texto+'</p>';
  		$(idhtml).html(contenido);
  		
  		modal.style.display = "block";
  		var cruz = document.getElementById("cruz"+numero);
  		//cuando e usuario ahce click en la 'x'
		cruz.onclick = function() {
		  modal.style.display = "none";
		}

		//cuando el usuario hace click fuera
		window.onclick = function(event) {
		  if (event.target == modal) {
		    modal.style.display = "none";
		  }
		}
  	}	  	
}


function dropHandler(ev) {

  console.log(ev);
  var id=ev.target.id;
  var param;

  if(id=="file1"){
  	param=1;
  }else if(id=="file2"){
  	param=2;
  }else{
  	param=3;
  }

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();

  if (ev.dataTransfer.items) { 	 	
    // Use DataTransferItemList interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.items.length; i++) {
      // If dropped items aren't files, reject them
      if (ev.dataTransfer.items[i].kind === 'file') {
        var file = ev.dataTransfer.items[i].getAsFile();

        if (file) {
        	$("#ojo"+param).show()
        	$("#label"+param).text(file.name)       	
	    	new Promise(function(resolve, reject) {
	      	var reader = new FileReader();
	      	reader.onload = function (evt) {
	        	resolve(evt.target.result);
	      	};
	      	reader.readAsText(file,'ISO-8859-1');
	      	reader.onerror = reject;
	    	})
	    	.then(processFileContent.bind(null,param))
	    	.catch(function(err) {
	      	console.log(err)
	    	});
	  	}
     
        
      }
    }

  } else {
    // Use DataTransfer interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.files.length; i++) {
      console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
    }
  } 
  
}

function readURL(input,param) {

	var file = input.files[0];

  	if (file) {
    	new Promise(function(resolve, reject) {
      	var reader = new FileReader();
      	reader.onload = function (evt) {
        	resolve(evt.target.result);
      	};
      	reader.readAsText(file,'ISO-8859-1');
      	reader.onerror = reject;
    	})
    	.then(processFileContent.bind(null,param))
    	.catch(function(err) {
      	console.log(err)
    	});
  	}    
  
}

function previsualizacionNubePalabras(e){
    var id= e.target.id;
    var param = id[11];
    
    var idmodal,texto,idhtml,nombreArchivo,numero;

    if(param=="1"){
        idmodal="myModal4";
        texto = ordenarmapaHashLematizador(lematizadorPalabraTOTALVariable,lematizadorPalabra,palabra,cantidad);
        idhtml="#previsualizacion4";
        numero="4";
        nombreArchivo="Lemas para el fichero original";
    }else if(param=="2"){
        idmodal="myModal5";
        texto = ordenarmapaHashLematizador(lematizadorResumenAUTOTOTALVariable,lematizadorResumenAUTO,resumenAUTO,cantidad);
        idhtml="#previsualizacion5";
        numero="5";
        nombreArchivo="Lemas para el fichero resumen automático";
    }else if(param=="3"){
        idmodal="myModal6";
        texto = ordenarmapaHashLematizador(lematizadorResumenMANUALTOTALVariable,lematizadorResumenMANUAL,resumenMANUAL,cantidad);
        idhtml="#previsualizacion6";
        numero="6";
        nombreArchivo="Lemas para el fichero resumen manual";
    }

    var modal = document.getElementById(idmodal);


    var contenido= '<p style="color:black;">'+nombreArchivo+'<span id="cruz'+numero+'" class="close" style="text-align: right;">&times;</span></p>'+'<br><br/>'
    +'<p style="padding-left:30px; padding-right:30px; text-align: justify; line-height: 30px;color:black;">'+texto+'</p>';
    $(idhtml).html(contenido);
    
    modal.style.display = "block";
    var cruz = document.getElementById("cruz"+numero);
    //cuando e usuario ahce click en la 'x'
    cruz.onclick = function() {
      modal.style.display = "none";
    }

    //cuando el usuario hace click fuera
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }


}

function mostrarExaminar(){
    $("#todoexaminar").show();
    location.href = "#page-top";
}


//ejecuta todo su interior cuando la pagina carga
function init(){	
	$('#mostrarresultados p').remove(); 
	$('#mostrarresultados hr').remove();

	//obtenemos el span de cada nombre de fichero
	var visuOriginal = document.getElementById("ojo1");
	var visuResAuto = document.getElementById("ojo2");
	var visuResManual = document.getElementById("ojo3");

	//creamos los eventos para cada uno
	visuOriginal.addEventListener("click",previsualizacionFicheros);
	visuResAuto.addEventListener("click",previsualizacionFicheros);
	visuResManual.addEventListener("click",previsualizacionFicheros);

    var nube1 = document.getElementById("nuberellena1");
    var nube2 = document.getElementById("nuberellena2");
    var nube3 = document.getElementById("nuberellena3");

    nube1.addEventListener("click",previsualizacionNubePalabras);
    nube1.myParam = 1;
    nube2.addEventListener("click",previsualizacionNubePalabras);
    nube2.myParam = 2;
    nube3.addEventListener("click",previsualizacionNubePalabras);
    nube3.myParam = 3;

	  	  
	//obtenemos el boton
	var botonEvaluar=document.getElementById('botonevaluar');
	//boton para añadir cuestionario
	botonEvaluar.addEventListener("click",evaluarFicheros);

//nuevo
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight){
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        } 
      });
    }

}

// ejecutamos la funcion init cuando cargue la pagina
window.onload = init;
