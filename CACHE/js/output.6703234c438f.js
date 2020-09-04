$(".sideTab").on('click',(e)=>{$(e.target).children().click();});$(".content").on('click',()=>{$(".content").removeClass("show");$("#sidebar").removeClass("show");$(".hamburger").removeClass("is-active");});function toggleSidenav(){$(".hamburger").toggleClass("is-active");$(".content").toggleClass("show");$("#sidebar").toggleClass("show");}
fetchData("/api/notifs/",populateNotification);function populateNotification(notifs){if(notifs.data.length!=0){$("#notifDot").removeClass('d-none');for(var i=0;i<notifs.data.length;i++){var notifMsg=notifs.data[i].msg;var notifDate=notifs.data[i].created_at;var ele='<div class="dropdown-item notifDropDown-item small px-3"><p class="mb-1 text-wrap">'+
notifMsg+'</p><p class="mb-1 text-secondary small text-right">'+notifDate+'</p></div>';if(i==0){$("#notificationBox").html(ele);}else{$("#notificationBox").append(ele);}}}};var dataSem=null;var dataTable=null;var courseRegList=[];var deleteCourseRegList=[];$('#searchBox').on('keyup',function(){dataTable.search(this.value).draw();});$("#semSearch").on('change',function(){dataSem=this.value;populateTable(dataSem);});$(document).ready(()=>{dataSem=$("#semSearch")[0].value;populateRegTable();populateTable(dataSem);});function populateRegTable(){$("#reg-courses-table").DataTable({select:{style:'multi'},"paging":false,"language":{"emptyTable":"No courses registered.","lengthMenu":"Show _MENU_ entries","loadingRecords":"Loading...","processing":"Processing...","zeroRecords":"No courses registered."},"dom":"<'row'<'col-12'tr>>"+"<'row mt-1 small'<'col-12 col-lg-auto mr-auto v-center order-2 order-lg-1 mt-2 ml-1 ml-lg-0 mt-lg-0'l><'col-12 col-lg-auto order-1 order-lg-2'p>>","ajax":"/api/last-sem-courses/",'columnDefs':[{'targets':[0],'orderable':false,}],order:[[2,'asc']],"columns":[{"data":"slug","render":function(data,type,row){return'<input type="checkbox" onclick="toggleDeleteCourseReg(\''+data+'\')">';}},{"data":"course_code"},{"data":"course_name"},{"data":"instructor"},{"data":"course_credits"},{"data":"offered_to"},],});}
function populateTable(semester){if(semester){if(dataTable){dataTable.ajax.url("/api/reg-courses/?q="+semester).load();}else{dataTable=$("#courses-table").DataTable({select:{style:'multi'},"lengthMenu":[[10,25,50,-1],[10,25,50,"All"]],"language":{"emptyTable":"No courses found.","lengthMenu":"Show _MENU_ entries","loadingRecords":"Loading...","processing":"Processing...","zeroRecords":"No courses found."},"dom":"<'row'<'col-12'tr>>"+"<'row mt-1 small'<'col-12 col-lg-auto mr-auto v-center order-2 order-lg-1 mt-2 ml-1 ml-lg-0 mt-lg-0'l><'col-12 col-lg-auto order-1 order-lg-2'p>>","ajax":"/api/reg-courses/?q="+semester,'columnDefs':[{'targets':[0],'orderable':false,}],order:[[2,'asc']],"columns":[{"data":"slug","render":function(data,type,row){return'<input type="checkbox" onclick="toggleCourseReg(\''+data+'\')">';}},{"data":"course_code"},{"data":"course_name"},{"data":"instructor"},{"data":"course_credits"},{"data":"offered_to"},],});}}}
function toggleCourseReg(course){var coursePos=courseRegList.indexOf(course);if(coursePos>-1){courseRegList.splice(coursePos,1);}else{courseRegList.push(course);}}
function toggleDeleteCourseReg(course){var coursePos=deleteCourseRegList.indexOf(course);if(coursePos>-1){deleteCourseRegList.splice(coursePos,1);}else{deleteCourseRegList.push(course);}}
function actionComplete(msg){if(msg['msg']){$("#actionMsg").text(msg['msg']);$("#actionImg").attr("src","/static/images/tick-image.svg");}else if(msg['error']){$("#actionMsg").text(msg['error']);$("#actionImg").attr("src","/static/images/cross-image.svg");}
$('#courseMsgPopUp').modal('show');}
$('#courseMsgPopUp').on('hidden.bs.modal',function(e){location.reload(true);})
function saveRegCourses(event){event.preventDefault();if(courseRegList.length>=1){saveCourse={courses:courseRegList}
sendData("/save-courses/",saveCourse,actionComplete)}}
function deleteRegCourses(event){event.preventDefault();if(deleteCourseRegList.length>=1){deleteCourse={courses:deleteCourseRegList}
sendData("/delete-courses/",deleteCourse,actionComplete)}};