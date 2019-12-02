var filter=document.getElementById('filter');
var inputDiv=document.getElementById('inputDiv');
var inputText=document.getElementById('input');
var output=document.getElementById('output');
var str='';
var array={};
//after the page is fully loaded
document.addEventListener('DOMContentLoaded',function(){
	filter.addEventListener('click',show);
	//recent();
	chrome.history.search({text:'',maxResults:300},function(arr){array=arr;recent(arr);});
	inputText.addEventListener('keyup',temp);
});
//temp function 
function temp(){
	chrome.history.search({text:'',maxResults:300},function(arr){filterFunction(arr);});
}
//filtering the result
function filterFunction(arrayOfHistory){
	output.style.height='370px';
	str=inputText.value;
	let regex=new RegExp(str,'i');
	output.innerHTML='';
	for(i=0;i<arrayOfHistory.length;i++){
		console.log('filter');
		if(arrayOfHistory[i].title.search(regex)>-1){
			output.innerHTML+='<li><a href='+arrayOfHistory[i].url+' target=_blank>'+arrayOfHistory[i].title+'</a></li>';
		}
	}
	if(output.innerHTML==='') output.innerHTML="No Results Found!!!";
}
//To display Recent pages
function recent(arrayOfHistory){
	console.log(arrayOfHistory);
	output.innerHTML='';
	for(i=0;i<arrayOfHistory.length;i++){
		output.innerHTML+='<li><a href='+(arrayOfHistory[i].url)+' target=_blank>'+(arrayOfHistory[i].title)+'</a></li>';
	}
	if(output.innerHTML==='') output.innerHTML='No recent Browsing !';
	return false;
}
//show input element for filtering the results or hiding it
function show(){
	(inputDiv.style.display==='block')?(inputDiv.style.display='none',inputText.value='',recent(array)):(inputDiv.style.display='block');
}