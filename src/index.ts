window.addEventListener("DOMContentLoaded", (e) => {
   const l = console.log;
   const $previewer = document.getElementById("previewer");
   const $uploader = document.getElementById("uploader");
   const $progress = document.getElementById("progress");
   const $form = document.getElementById("form");

   const CLOUDINARY_URL =
      "https://api.cloudinary.com/v1_1/dhoqooz6c/image/upload";
   const CLOUDINARY_PRESET = "dhfaerrx";

   function handleUpload(e: Event) {
      const file = (e.target as any).files[0];
      const url = URL.createObjectURL(file);
      $previewer.setAttribute("src", url);
   }

   function handleSubmit(e: Event) {
      e.preventDefault();

      const formData = new FormData(e.target);
      formData.append("upload_preset", CLOUDINARY_PRESET);

      axios
         .post(CLOUDINARY_URL, formData, {
            headers: {
               "Content-Type": "multipart/form-data",
            },
            onUploadProgress(e) {
               const value = Math.round(e.loaded * 100) / e.total;

               $progress.setAttribute("value", value.toString());
            },
         })
         .then((res) => {
            l(res);
            $progress.setAttribute("value", "0");
         })
         .catch((err) => l(err.response.data));
   }

   $uploader.addEventListener("change", handleUpload);
   $form.addEventListener("submit", handleSubmit);
});
