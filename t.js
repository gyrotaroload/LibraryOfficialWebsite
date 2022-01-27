/*var sharp =require('sharp');
sharp('wtf.svg')
  .toFile('output.png', function(err) {
    // output.jpg is a 300 pixels wide and 200 pixels high image
    // containing a scaled and cropped version of input.jpg
    console.log(err);
  });*/
  var token = require('token');
  var randomstring = require("randomstring");
  process.env.token_defaults_secret=randomstring.generate();
token.defaults.secret = process.env.token_defaults_secret;
token.defaults.timeStep =60*60; // 60seconds
var ts=`
<!DOCTYPE html>
<!-- xlsx.js (C) 2013-present  SheetJS http://sheetjs.com -->
<!-- vim: set ts=2: -->
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>SheetJS Live Demo</title>
<style>
#b64data{
	width:100%;
}
a { text-decoration: none }
#drop-zone{
	background: white;
	position: fixed;
	top: 0px;
	left: 0px;
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
	z-index: -1;
}
#drop-zone p, #drop-zone svg { pointer-events: none }
#drop-zone svg { margin-right: 5px }
</style>
</head>
<body>
<pre><b><a href="http://sheetjs.com">SheetJS Data Preview Live Demo</a></b>
(Base64 text works back to IE6; drag and drop works back to IE10)

<a href="https://github.com/SheetJS/js-xlsx">Source Code Repo</a>
<a href="https://github.com/SheetJS/js-xlsx/issues">Issues?  Something look weird?  Click here and report an issue</a>
Output Format: <select name="format" onchange="setfmt()">
<option value="csv" selected> CSV</option>
<option value="json"> JSON</option>
<option value="form"> FORMULAE</option>
<option value="html"> HTML</option>
<option value="xlsx"> XLSX</option>
</select><br />
<input type="file" name="xlfile" id="xlf" />

<textarea id="b64data">... or paste a base64-encoding here</textarea>
<input type="button" id="dotext" value="Click here to process the base64 text" onclick="b64it();"/><br />
<b>Advanced Demo Options:</b>
Use Web Workers: (when available) <input type="checkbox" name="useworker" checked>
Use readAsBinaryString: (when available) <input type="checkbox" name="userabs" checked>
</pre>
<pre id="out"></pre>
<div id="htmlout"></div>
<div id="drop-zone">
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17 13h-10v-1h10v1zm0-4h-10v1h10v-1zm0-3h-10v1h10v-1zm-15-1v-5h6v2h-4v3h-2zm8-5v2h4v-2h-4zm6 2h4v3h2v-5h-6v2zm6 5h-2v4h2v-4zm-20 10h2v-4h-2v4zm18-4v.543c0 4.107-6 2.457-6 2.457s1.518 6-2.638 6h-1.362v2h2.189c3.163 0 9.811-7.223 9.811-9.614v-1.386h-2zm-18-2h2v-4h-2v4zm2 11v-3h-2v5h6v-2h-4z"/></svg>
	<p>Drop a spreadsheet file here to see sheet data</p>
</div>
<br />
<script src="shim.js"></script>
<script src="xlsx.full.min.js"></script>
<script>
/*jshint browser:true */
/* eslint-env browser */
/* eslint no-use-before-define:0 */
/*global Uint8Array, Uint16Array, ArrayBuffer */
/*global XLSX */
var X = XLSX;
var XW = {
	/* worker message */
	msg: 'xlsx',
	/* worker scripts */
	worker: './xlsxworker.js'
};

var global_wb;

var process_wb = (function() {
	var OUT = document.getElementById('out');
	var HTMLOUT = document.getElementById('htmlout');

	var get_format = (function() {
		var radios = document.getElementsByName( "format" );
		return function() {
			for(var i = 0; i < radios.length; ++i) if(radios[i].checked || radios.length === 1) return radios[i].value;
		};
	})();

	var to_json = function to_json(workbook) {
		var result = {};
		workbook.SheetNames.forEach(function(sheetName) {
			var roa = X.utils.sheet_to_json(workbook.Sheets[sheetName], {header:1});
			if(roa.length) result[sheetName] = roa;
		});
		return JSON.stringify(result, 2, 2);
	};

	var to_csv = function to_csv(workbook) {
		var result = [];
		workbook.SheetNames.forEach(function(sheetName) {
			var csv = X.utils.sheet_to_csv(workbook.Sheets[sheetName]);
			if(csv.length){
				result.push("SHEET: " + sheetName);
				result.push("");
				result.push(csv);
			}
		});
		return result.join("\n");
	};

	var to_fmla = function to_fmla(workbook) {
		var result = [];
		workbook.SheetNames.forEach(function(sheetName) {
			var formulae = X.utils.get_formulae(workbook.Sheets[sheetName]);
			if(formulae.length){
				result.push("SHEET: " + sheetName);
				result.push("");
				result.push(formulae.join("\n"));
			}
		});
		return result.join("\n");
	};

	var to_html = function to_html(workbook) {
		HTMLOUT.innerHTML = "";
		workbook.SheetNames.forEach(function(sheetName) {
			var htmlstr = X.write(workbook, {sheet:sheetName, type:'string', bookType:'html'});
			HTMLOUT.innerHTML += htmlstr;
		});
		return "";
	};

	var to_xlsx = function to_xlsx(workbook) {
		HTMLOUT.innerHTML = "";
		XLSX.writeFile(workbook, "SheetJSTest.xlsx");
		return "";
	};

	return function process_wb(wb) {
		global_wb = wb;
		var output = "";
		switch(get_format()) {
			case "form": output = to_fmla(wb); break;
			case "html": output = to_html(wb); break;
			case "json": output = to_json(wb); break;
			case "xlsx": output = to_xlsx(wb); break;
			default: output = to_csv(wb);
		}
		if(OUT.innerText === undefined) OUT.textContent = output;
		else OUT.innerText = output;
		if(typeof console !== 'undefined') console.log("output", new Date());
	};
})();

var setfmt = window.setfmt = function setfmt() { if(global_wb) process_wb(global_wb); };

var b64it = window.b64it = (function() {
	var tarea = document.getElementById('b64data');
	return function b64it() {
		if(typeof console !== 'undefined') console.log("onload", new Date());
		var wb = X.read(tarea.value, {type:'base64', WTF:false});
		process_wb(wb);
	};
})();

var do_file = (function() {
	var rABS = typeof FileReader !== "undefined" && (FileReader.prototype||{}).readAsBinaryString;
	var domrabs = document.getElementsByName("userabs")[0];
	if(!rABS) domrabs.disabled = !(domrabs.checked = false);

	var use_worker = typeof Worker !== 'undefined';
	var domwork = document.getElementsByName("useworker")[0];
	if(!use_worker) domwork.disabled = !(domwork.checked = false);

	var xw = function xw(data, cb) {
		var worker = new Worker(XW.worker);
		worker.onmessage = function(e) {
			switch(e.data.t) {
				case 'ready': break;
				case 'e': console.error(e.data.d); break;
				case XW.msg: cb(JSON.parse(e.data.d)); break;
			}
		};
		worker.postMessage({d:data,b:rABS?'binary':'array'});
	};

	return function do_file(files) {
		rABS = domrabs.checked;
		use_worker = domwork.checked;
		var f = files[0];
		var reader = new FileReader();
		reader.onload = function(e) {
			if(typeof console !== 'undefined') console.log("onload", new Date(), rABS, use_worker);
			var data = e.target.result;
			if(!rABS) data = new Uint8Array(data);
			if(use_worker) xw(data, process_wb);
			else process_wb(X.read(data, {type: rABS ? 'binary' : 'array'}));
		};
		if(rABS) reader.readAsBinaryString(f);
		else reader.readAsArrayBuffer(f);
	};
})();

(function() {
	var dropZone = document.getElementById('drop-zone')
	if(!dropZone.addEventListener && !window.addEventListener) return;

	function handleDrop(e) {
		dropZoneDisplay(e, false);
		do_file(e.dataTransfer.files);
	}

	function handleDragover(e) {
		e.stopPropagation();
		e.preventDefault();
		e.dataTransfer.dropEffect = 'copy';
	}

	function dropZoneDisplay(e, show){
		e.stopPropagation();
		e.preventDefault();

		var opacity = show ? '1' : '0';
		var zIndex  = show ? '1' : '-1';

		dropZone.style.opacity = opacity;
		dropZone.style.zIndex = zIndex;
	}

	window.addEventListener('drop' , handleDrop)
	window.addEventListener('dragover' , handleDragover)
	window.addEventListener('dragenter' , function(e){
		dropZoneDisplay(e, true);
	})

	dropZone.addEventListener('dragleave' , function(e){
		dropZoneDisplay(e, false);
	})
})();

(function() {
	var xlf = document.getElementById('xlf');
	if(!xlf.addEventListener) return;
	function handleFile(e) { do_file(e.target.files); }
	xlf.addEventListener('change', handleFile, false);
})();
	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-36810333-1']);
	_gaq.push(['_trackPageview']);

	(function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();
</script>
</body>
</html>


`;
var t1=JSON.stringify( { id: "ewgrrrrrrrvr214325ehsgfn", role: ts, auth: token.generate(`ewgrrrr+rrrvr2143.(25eh)sgfn|${ts}`) });
function isValid(json) {
  return token.verify(json.id+'|'+json.role, json.auth);
}
console.log(t1);
console.log( isValid(JSON.parse( t1)) );