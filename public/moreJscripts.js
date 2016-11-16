function unHighlightOthers(zoneN)
{
	var zoneString = "zone" + zoneN;

	for(var j = 0; j < 3; j++)
	{
		for(var k = 0; k < 4; k++)
		{
			if(document.getElementById("zoneTable").rows[j].cells[k].innerHTML != zoneString) document.getElementById("zoneTable").rows[j].cells[k].bgColor = '#FFFFFF';
		}
	}

	//window.alert(document.getElementById("zoneTable").rows[0].cells[0].bgColor);
}

// ---------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------- //

function refreshPicSizes()
{
   var picWidth = (window.innerWidth - document.getElementById("leftColumnDiv").offsetWidth)*0.23;
   document.getElementById("zone1pic").style.width = picWidth.toString() + "px";
   document.getElementById("zone2pic").style.width = picWidth.toString() + "px";
   document.getElementById("zone3pic").style.width = picWidth.toString() + "px";
   document.getElementById("zone4pic").style.width = picWidth.toString() + "px";
   document.getElementById("zone5pic").style.width = picWidth.toString() + "px";
   document.getElementById("zone6pic").style.width = picWidth.toString() + "px";
   document.getElementById("zone7pic").style.width = picWidth.toString() + "px";
   document.getElementById("zone8pic").style.width = picWidth.toString() + "px";
   document.getElementById("zone9pic").style.width = picWidth.toString() + "px";
   document.getElementById("zone10pic").style.width = picWidth.toString() + "px";
   document.getElementById("zone11pic").style.width = picWidth.toString() + "px";
   document.getElementById("zone12pic").style.width = picWidth.toString() + "px";

   var picHeight = window.innerHeight*0.31;
   document.getElementById("zone1pic").style.height = picHeight.toString() + "px";
   document.getElementById("zone2pic").style.height = picHeight.toString() + "px";
   document.getElementById("zone3pic").style.height = picHeight.toString() + "px";
   document.getElementById("zone4pic").style.height = picHeight.toString() + "px";
   document.getElementById("zone5pic").style.height = picHeight.toString() + "px";
   document.getElementById("zone6pic").style.height = picHeight.toString() + "px";
   document.getElementById("zone7pic").style.height = picHeight.toString() + "px";
   document.getElementById("zone8pic").style.height = picHeight.toString() + "px";
   document.getElementById("zone9pic").style.height = picHeight.toString() + "px";
   document.getElementById("zone10pic").style.height = picHeight.toString() + "px";
   document.getElementById("zone11pic").style.height = picHeight.toString() + "px";
   document.getElementById("zone12pic").style.height = picHeight.toString() + "px";

   if(window.addEventListener)
   {
      window.addEventListener("resize", refreshSize);
   }
   else if(window.attachEvent)
   {
      window.attachEvent("onresize", refreshSize);
   }
}

// ---------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------- //

function refreshSize()
{
   var picWidth = (window.innerWidth - document.getElementById("leftColumnDiv").offsetWidth)*0.23;
   document.getElementById("zone1pic").style.width = picWidth.toString() + "px";
   document.getElementById("zone2pic").style.width = picWidth.toString() + "px";
   document.getElementById("zone3pic").style.width = picWidth.toString() + "px";
   document.getElementById("zone4pic").style.width = picWidth.toString() + "px";
   document.getElementById("zone5pic").style.width = picWidth.toString() + "px";
   document.getElementById("zone6pic").style.width = picWidth.toString() + "px";
   document.getElementById("zone7pic").style.width = picWidth.toString() + "px";
   document.getElementById("zone8pic").style.width = picWidth.toString() + "px";
   document.getElementById("zone9pic").style.width = picWidth.toString() + "px";
   document.getElementById("zone10pic").style.width = picWidth.toString() + "px";
   document.getElementById("zone11pic").style.width = picWidth.toString() + "px";
   document.getElementById("zone12pic").style.width = picWidth.toString() + "px";

   var picHeight = window.innerHeight*0.31;
   document.getElementById("zone1pic").style.height = picHeight.toString() + "px";
   document.getElementById("zone2pic").style.height = picHeight.toString() + "px";
   document.getElementById("zone3pic").style.height = picHeight.toString() + "px";
   document.getElementById("zone4pic").style.height = picHeight.toString() + "px";
   document.getElementById("zone5pic").style.height = picHeight.toString() + "px";
   document.getElementById("zone6pic").style.height = picHeight.toString() + "px";
   document.getElementById("zone7pic").style.height = picHeight.toString() + "px";
   document.getElementById("zone8pic").style.height = picHeight.toString() + "px";
   document.getElementById("zone9pic").style.height = picHeight.toString() + "px";
   document.getElementById("zone10pic").style.height = picHeight.toString() + "px";
   document.getElementById("zone11pic").style.height = picHeight.toString() + "px";
   document.getElementById("zone12pic").style.height = picHeight.toString() + "px";
}

// ---------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------- //

function changePic(dirName, name)
{
	var activeZone;

	var counter = 0;
	for(var j = 0; j < 3; j++)
	{
		for(var k = 0; k < 4; k++)
		{
			counter++;
			if(document.getElementById("zoneTable").rows[j].cells[k].bgColor == "#FF0000")
			{
				activeZone = counter;
				break;
			}
		}
	}

	var zonePicId = "zone" + activeZone + "pic";

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
	    document.getElementById(zonePicId).src = this.responseText;
	  }
	};

	var urlString = "/plot2base64img?dirName=" + dirName + "&name=" + name;
	xhttp.open("GET", urlString, true);
	xhttp.send();
}

// ---------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------- //

function buildDirTable()
{
	// delete rows from existing table (so the table doesn't get duplicated when selecting new files)
	var Nrows_initial = document.getElementById("directoryTable").rows.length;
	for(var k = 0; k < Nrows_initial; k++) document.getElementById("directoryTable").deleteRow(0);

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {

	  if (this.readyState == 4 && this.status == 200) {
	    var fullDirString = this.responseText;
	    // temporarily hardcoding this new string format - ask gagik to provide this format with .toString() or some similar method:
	    fullDirString = "12\n" + 
                       "dir dir1\n" +
                       "obj dir1/h1\n" +
                       "obj dir1/hh1\n" +
                       "dir dir1/dir1a\n" +
                       "obj dir1/dir1a/h1a\n" +
                       "dir dir2\n" +
                       "obj dir2/h2\n" +
                       "dir dir2/dir2a\n" +
                       "obj dir2/dir2a/h2a\n" +
                       "dir dir2/dir2b\n" +
                       "obj dir2/dir2b/h2b\n" +
                       "obj dir2/dir2b/hh2b\n";

	    var NtableRows = fullDirString.substring(0, fullDirString.indexOf("\n"));
	    fullDirString = fullDirString.substring(fullDirString.indexOf("\n") + 1, fullDirString.length);

	    var table = document.getElementById("directoryTable");

	    for(var k = 0; k < NtableRows; k++)
       {
		   var dirOrObj = fullDirString.substring(0, 3);
		   var path = fullDirString.substring(4, fullDirString.indexOf("\n"));
		   var depth = (path.match(/\//g) || []).length; // count the number of forward slashes (which is equal to the depth)

		   var truncatedPath;
		   if(depth == 0) truncatedPath = "";
		   else truncatedPath = path.substring(0, path.lastIndexOf("/"));

		   var finalName;
		   if(depth == 0) finalName = path;
		   else finalName = path.substring(path.lastIndexOf("/") + 1, path.length);

		   fullDirString = fullDirString.substring(fullDirString.indexOf("\n") + 1, fullDirString.length);


		   var row = table.insertRow(table.rows.length);
		   row.className = "collapse level" + depth.toString();
		   row.setAttribute('data-depth', depth.toString());
		   var cell = row.insertCell(0);

		   if(dirOrObj == "dir")
		   {
		     cell.innerHTML = '<span class="toggle"></span>' + finalName;
		   }
		   else if(dirOrObj == "obj")
		   {
		     cell.innerHTML = finalName;
		     cell.onmouseover = changeColorRed;
		     cell.onmouseout = changeColorWhite;
		     //cell.onclick = function () { changePic(truncatedPath, finalName); }; // does not work correctly
		     cell.onclick = (function(val1, val2) { return function(){ changePic(val1, val2); }})(truncatedPath, finalName); // this is a function closure
		   }
       }

	    function changeColorRed(){
	    	this.style.backgroundColor = "#FF0000";
	    }

	    function changeColorWhite(){
	    	this.style.backgroundColor = "#FFFFFF";
	    }
	  }
	};

	xhttp.open("GET", "/getDirStructureString", true);
	xhttp.send();
}

// ---------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------- //

function buildFileList()
{
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {

	  if (this.readyState == 4 && this.status == 200) {
		 var fullList = this.responseText;
		 var Nfiles = (fullList.match(/\,/g) || []).length; // count the number of commas
		 for(var k = 0; k < Nfiles; k++)
       {
		   var singleFile = fullList.substring(0, fullList.indexOf(","));
		   var noPathFilename = singleFile.substring(singleFile.lastIndexOf("/") + 1, singleFile.length);
		   fullList = fullList.substring(fullList.indexOf(",") + 1, fullList.length);
		   var fSelector = document.getElementById("fileList");
		   var newOption = document.createElement("option");
		   newOption.text = noPathFilename;
		   newOption.value = singleFile;
		   fSelector.add(newOption);
       }
	  }
	};

	xhttp.open("GET", "/getListOfFiles", true);
	xhttp.send();
}

// ---------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------- //

function selectFile()
{
	document.getElementById("selectedFile").innerHTML = document.getElementById("fileList").value; // only gives one value even if multiple selected..........

	var xhttp = new XMLHttpRequest();
	var urlString = "/setFile?fullPath=" + document.getElementById("fileList").value;
	xhttp.open("GET", urlString, true);
	xhttp.send();
}

