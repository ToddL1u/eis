$(function(){
  $('nav.nav').load('../include/nav.html');
  $('header.header').load('../include/header.html');
  $('#timeline').load('../include/timeline.html');
  $('#chLocation').load('../include/location.html');



  $('footer').load('../include/footer.html');
  $('.table-pagination').load('../include/pagination.html');

  var bt = document.createElement('script');
  bt.src = '../../assets/js/moment.js';
  document.head.appendChild(bt);


  // var bt = document.createElement('script');
  // bt.src = '../../assets/js/bootstrap/bootstrap.min.js';
  // document.head.appendChild(bt);



  var ts = document.createElement('script');
  ts.src = '../../assets/js/jquery.tablesorter.js';
  document.head.appendChild(ts);


  var zc = document.createElement('script');
  zc.src = '../../assets/js/jquery.tw-city-selector.min.js';
  document.head.appendChild(zc);

  $('input[type="number"]').attr('placeholder','0');


  // var imported2 = document.createElement('script');
  // imported2.src = '../../assets/js/bootstrap-datetimepicker.min.js';
  // document.head.appendChild(imported2);



});
var editorMD;

function loadMD(id, view){

  var component = (id == null || id == '')? 'contentEditormd': 'contentEditormd_'+id;
  if(component.length == 0) return;
  if(!view){
    editorMD = editormd(component, {
        width: "100%",
        height: 350,
        syncScrolling: "single",
        // autoHeight      : true,
        path: "../../assets/lib/",
        htmlDecode: "style,script,iframe",
        imageUpload : true,
        imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
        imageUploadURL : "../../assets/php/upload.php"
    });

    editormd.loadScript('../../assets/js/editormd/languages/en', function() {
        editormd.lang = editormd.defaults.lang;
        // testEditor.recreate();
    });
  }else{

    editorMD = editormd.markdownToHTML(component, {
        htmlDecode      : "style,script,iframe",  // you can filter tags decode
        emoji           : true,
        taskList        : true,
        tex             : true,  // 默认不解析
        flowChart       : true,  // 默认不解析
        sequenceDiagram : true,  // 默认不解析
    });

  }

  return editorMD;

}

var some_variable = '![](/upload/editorMD/hqdefault.jpg)\r\n\r\n這是豬\r\n**這是豬2**\r\n*這是豬3*\r\n# 這是豬4\r\n##### 這是豬5\r\n\r\n這是豬6\r\n\r\n    function demo(){\r\n    \talert(\"豬\");\r\n    }"';
function setContent(content, view){
  if($(view).siblings('.markdown-body').length == 0) $(view).before('<span class="markdown-body"></span>')
  if (content =='sample') content = some_variable;
  $(view).siblings('.markdown-body').html(marked(content));
  prettyPrint();
}

function mkEditSwitch(read, view){
  if(read){
    $(view).hide().siblings('.markdown-body').show();
  }else{
    loadMD();
    $(view).show().siblings('.markdown-body').hide();
  }
}





// main navigation
$('.nav').on('click','li',function(){
  $aClose = $(this).children('a').children('.arrow-close');
  $aOpen = $(this).children('a').children('.arrow-open');
  if($aClose.is(':visible')){
    $aClose.hide();
    $aOpen.show();
  }else{
    $aOpen.hide();
    $aClose.show();
  }

  // $(this).children('.dropdown').length == 0 ? $(this).children('.badge-parents').remove():
  $(this).children('.badge-parents').hide();
  $(this).siblings().children('.badge-parents').show();
  $(this).children('.dropdown').toggle('show');
  $(this).siblings('li').children('.dropdown').hide();
});


//table-clickabled
$('.content').on('click','tbody td',function(){
  if($(this).find('button').length >0){
    $href = $(this).find('button').data('href');
    if($href != null){
      window.location.href = $href;
    }
  }else{
    $href = $(this).parent().data('href');
    if($href != null){
      window.location.href = $href;
    }
  }
});

//search-in-table
$('#searchTable').keyup(function(){
  searchTable($(this).val());
});

function searchTable(inputVal){
  var table = $('#myTable');
  table.find('tbody>tr').each(function(index, row){
    var allCells = $(row).find('td');
    if(allCells.length > 0){
      var found = false;
      allCells.each(function(index, td){
        var regExp = new RegExp(inputVal, 'i');
        if(regExp.test($(td).text())){
          found = true;
          return false;
        }
      });
      if(found == true)$(row).show();else $(row).hide();
    }
  });
};

//select year, month, day, deps=================================================
var years = [];
// var months = ['一月', '二月', '三月', '四月', '五月', '六月','七月', '八月', '九月', '十月', '十一月', '十二月'];
var months = [];
var days = [];
var deps = ['設計部','研發部','企劃部','公關部','人事部','智慧財產部'];
var course_type = ['藝術設計','烘焙料理','生活手作','程式語言','其他'];
var time = ['0:00','1:00','2:00','3:00','4:00','5:00','6:00','7:00','8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'];
var interval = ['每日','每週一','每月一日'];

var c_year = new Date().getFullYear();

for(var year = c_year; year > 1966; year--){
  years.push(year);
}

for(var i =1; i <=12 ; i++){
  months.push(i);
}

for(var j =1; j <=31 ; j++){
  days.push(j);
}

years.forEach(function(value, index){
  $('.select-years').append($("<option></option>").attr("value", value).text(value));
});
months.forEach(function(value, index){
  $('.select-months').append($("<option></option>").attr("value", value).text(value));
});
days.forEach(function(value, index){
  $('.select-days').append($("<option></option>").attr("value", value).text(value));
});

deps.forEach(function(value, index){
  $('.select-deps').append($("<option></option>").attr("value", index+1).text(value));
});

course_type.forEach(function(value, index){
  $('.select-course').append($("<option></option>").attr("value", index+1).text(value));
});

interval.forEach(function(value, index){
  $('.select-interval').append($("<option></option>").attr("value", index+1).text(value));
});

time.forEach(function(value, index){
  $('.select-time').append($("<option></option>").attr("value", index+1).text(value));
});



// toolbar buttons==============================================================
$('body').on('click','.btn-edit' ,function(){
  $(this).toggleClass('toolbar-btn-hide');
  $(this).siblings().not('.btn-view').toggleClass('toolbar-btn-hide');

  $(this).parents('.form-block').find('input').attr('disabled', false).attr('readonly', false);
  $(this).parents('.form-block').find('textarea').attr('readonly', false);
  $(this).parents('.form-block').find('select').attr('disabled', false);
  $(this).parents('.form-block').find('input[type="checkbox"]').attr('disabled', false);
});

// $('.table-row .btn-edit').click(function(){
//   $(this).toggleClass('toolbar-btn-hide');
//   $(this).siblings().not('.btn-delete').not('.btn-view').toggleClass('toolbar-btn-hide');

//   $(this).parents('.table-row-group').find('input').attr('readonly', false);
// });

var $form_section;

$('body').on('click','.btn-cancel' ,function(){
  $form_section = $(this);
});

$('body').on('click','.btn-delete' ,function(){
  $form_section = $(this);
});

// $(document).on('hidden.bs.modal', '#modalCancel', function (event) {
//
// });

$('body').on('click','#modalReject .modal-btn-2',function(){
  if($(this).parents('.modal-body ').find('textarea').val() == ''){
    $(this).parents('.modal-body ').find('textarea').css({'border-color':'red','border-width':'1px','border-style':'solid'});
  }else{
    $('#modalReject').modal('hide');
  }
})

$('body').on('click','#modalCancel .modal-btn-2',function(){
  $form_section.toggleClass('toolbar-btn-hide');
  $form_section.siblings().not('.btn-view').toggleClass('toolbar-btn-hide');
  $form_section.parents('.form-block').find('input').attr('readonly', true);
  $form_section.parents('.form-block').find('textarea').attr('readonly', true);
  $form_section.parents('.form-block').find('select').attr('disabled', true);
  $form_section.parents('.form-block').find('.checkbox input, input[type="checkbox"]').attr('disabled', true);
})

$('body').on('click','.btn-confirm' ,function(){
  $(this).toggleClass('toolbar-btn-hide');
  $(this).siblings().not('.btn-view').toggleClass('toolbar-btn-hide');
  $(this).parents('.form-block').find('input').attr('disabled', true).attr('readonly', true);
  $(this).parents('.form-block').find('textarea').attr('readonly', true);
  $(this).parents('.form-block').find('select').attr('disabled', true);
  $(this).parents('.form-block').find('.checkbox input, input[type="checkbox"]').attr('disabled', true);
});

$('.toolbar').on('click','.btn-expand' ,function(){
  $(this).toggleClass('toolbar-btn-hide').siblings().toggleClass('toolbar-btn-hide');
  $('.subnav-search').css('display','flex');
  $('.wrap .content').toggleClass('on-search');
});

$('.toolbar').on('click','.btn-collapse' ,function(){
  $(this).toggleClass('toolbar-btn-hide').siblings().toggleClass('toolbar-btn-hide');
  $('.subnav-search').css('display','none');
  $('.wrap .content').toggleClass('on-search');
});

$('.toolbar').on('click','.btn-view' ,function(){
  $('.content').toggleClass('version-mode');
  $('.section-history').hide();
  $('.nav-version li').removeClass('version-is-active');
  $('a[title="watch"]').trigger('click');

  setTimeout(function(){
    editorMD.unwatch();
    editorMD.watch();
  },500);


});

$('.toolbar').on('click','.btn-print' ,function(){
  window.print();
});


function goBack(){
  window.history.back();
}

$('.toolbar').on('click','.btn-export' ,function(){
  $('#modalExport').modal('show');
});

// pagination=====================================================

$('.table-pagination').on('click','a',function(){
  $(this).not('.page-front').not('.page-end').addClass('page-active').parents('li').siblings().children('a').removeClass('page-active');
});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

//image popup
$('.pop').on('click', function() {
	$('.imagepreview').attr('src', $(this).find('img').attr('src'));
	$('#imagemodal').modal('show');
});


//table sorter
function init() {
  $('.table-list-pay').tablesorter();
  $("#myTable").tablesorter();
  $("#myTable2").tablesorter();
  $("#myTable3").tablesorter();
  $("#myTable4").tablesorter();
  $("#myTable5").tablesorter();
  $("#myTable6").tablesorter();
  $("#myTable7").tablesorter();
}
window.onload = init;

// admin section  ==============================================================
// function loadHeader(){
//   var $header = $('.header-base').parents('header');
//   $header.width($header.width() - 300);
// }
// loadHeader();

$('.nav-version li').click(function(){
  $(this).addClass('version-is-active').siblings('li').removeClass('version-is-active');
});

$('.btn-notification').click(function(event){
  $('.badge-notification').hide();
});

$('body').on('click','.profile',function(){
  $('#modalAvatar').modal("show");
  var btnCust = '<button type="button" class="btn btn-info" title="Add picture tags" ' +
    'onclick="alert(\'Call your custom code here.\')">' +
    '<i class="glyphicon glyphicon-tag"></i>' +
    '</button>';
  $("#avatar-2").fileinput({
      overwriteInitial: true,
      maxFileSize: 1500,
      showClose: false,
      showCaption: false,
      showZoom: false,
      showBrowse: false,
      browseOnZoneClick: true,
      removeLabel: '',
      removeIcon: '<i class="glyphicon glyphicon-remove"></i>',
      removeTitle: 'Cancel or reset changes',
      btnDefault: '<button type="{type}" tabindex="500" title="{title}" style="background: gray;" class="{css}"{status}>{icon}{label}</button>',
      elErrorContainer: '#kv-avatar-errors-2',
      msgErrorClass: 'alert alert-block alert-danger',
      defaultPreviewContent: '<img src="//www.fillmurray.com/160/160" alt="Your Avatar" style="width:160px; height:160px margin:0 auto;"><h6 class="text-muted">Click to select</h6>',
      layoutTemplates: {main2: '{preview} ' +  ' {remove} {browse}'},
      allowedFileExtensions: ["jpg", "png", "gif"]
  });
});



// employee section ============================================================

//sum of work HR
$(document).on('change','.hr',function(){
  var sum = 0;
  $('.hr').each(function(){
      sum += +$(this).val();
  });
  $('#total').val(sum);
});


//remove datetimpepicker icon
$(".date :input[readonly='readonly']").attr('readonly',function(){
  $(this).parents('.form-group').find('span').hide();
});

//date-time-picker
$('#startDate').datetimepicker({
  format: 'YYYY/MM/DD HH:mm',
  allowInputToggle:true
});

$('#endDate').datetimepicker({
  format: 'YYYY/MM/DD HH:mm',
  allowInputToggle:true,
  useCurrent: false //Important! See issue #1075
});

$('#reportStart').datetimepicker({
  format: 'YYYY/MM/DD HH:mm',
  allowInputToggle:true,
  useCurrent: false //Important! See issue #1075
});

$('.reportStart').datetimepicker({
  format: 'YYYY/MM/DD',
  allowInputToggle:true,
  useCurrent: false //Important! See issue #1075
});

$('#startDate').on('dp.change', function (e) {
  $('#endDate').data('DateTimePicker').minDate(e.date);
});

$('#endDate').on('dp.change', function (e) {
  $('#startDate').data('DateTimePicker').maxDate(e.date);
});

$('#selectDate').datetimepicker({
  format: 'YYYY/MM/DD',
  allowInputToggle:true
});

$('#selectDate2').datetimepicker({
  format: 'YYYY/MM/DD',
  allowInputToggle:true
});
