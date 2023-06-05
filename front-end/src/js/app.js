const overlay = $("#overlay");
const btnUpload = $("#btn-upload");
const dropzoneElm = $("#drop-zone");
const mainElm = $("main");
const REST_API_URL = `http://localhost:8080/gallery`;
const cssLoaderHtml = `<div class="lds-facebook"><div></div><div></div><div></div></div>`;

loadAllImages();

btnUpload.on('click',()=>{
   overlay.removeClass('d-none')
});

overlay.on('click',(evt) =>{
   if(evt.target === overlay[0]) overlay.addClass('d-none');
});
$(document).on('keydown',(evt)=>{
   if(evt.key === 'Escape' && !overlay.hasClass('d-none')){
      overlay.addClass('d-none');
   }
});
overlay.on('drop',(evt)=>{evt.preventDefault()});
overlay.on('dragover',(evt)=>{evt.preventDefault()});


dropzoneElm.on('dragover',(evt)=>{
   evt.preventDefault();
});
dropzoneElm.on('drop',(evt)=>{
   evt.preventDefault();
   const dropFiles = evt.originalEvent.dataTransfer.files;
   const imageFiles = Array.from(droppedFiles).filter(file => file.type.startsWith("image/"));
   if(!imageFiles.length) return;
   overlay.add("d-none");
   uploadImages(imageFiles);
});

mainElm.on('click','.image:not(.loader)',(evt) =>{
   evt.target.requestFullscreen();
})

function uploadImages(imageFiles){
   imageFiles.forEach(imageFile =>{
      const divElm = $(`<div class="image loader"></div>div>`);
      divElm.append(cssLoaderHtml)
      mainElm.append(divElm);
   });
   $.ajax(`${REST_API_URL}/image`,{
      method: 'POST',
      data: formData,
      contentType: false,
      processData: false
   });

   jqxhr.done((imageUrlList)=>{
      imageUrlList.forEach(url => {
         const divElm = $(".image.loader").first();
         divElm.css('background-image',`url('${imageUrl}'`);
         divElm.empty();
         divElm.removeClass("loader");


      })
   });
   jqxhr.always(()=>{

   });
}
function loadAllImages(){
   const jqxhr = $.ajax(`${REST_API_URL}/images`);
   jqxhr.done((imageUrlList)=>{
      imageUrlList.forEach(imageUrl => {
         const divElm = $(`<div class='image'></div>`);
         divElm.css('background-image', `url(${imageUrl}`);
         $("main").append(divElm);
      });
   });
   jqxhr.fail(()=>{

   });
}