// const overlay = $("#overlay");
const btnUpload = $("#btn-upload");
const dropzone = $("#drop-zone");
btnUpload.on("click", ()=>{
    alert("ok");
    overlay.removeClass("d-none");
});
// overlay.on('click',(evt) =>{
//    if(evt.target === overlay[0]) overlay.addClass('d-none');
// });
$(document).on("keydown", (evt)=>{
    if (evt.key === "Escape" && !overlay.hasClass("d-none")) overlay.addClass("d-none");
});

//# sourceMappingURL=index.8f0c9192.js.map
