console.log(document.getElementById("search-input-box"));
// $("#search-input-box").attr("placeholder", "testing");
$(function() {
    $("#search-form").change(
        ()=>{
            console.log("Fire");    
        }
    );    
});
