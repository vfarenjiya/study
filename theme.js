(function(){
  var STORAGE_KEY = "itube-theme";
  var root = document.documentElement;
  function apply(theme){
    root.setAttribute("data-theme", theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch(e){}
  }
  document.addEventListener("DOMContentLoaded", function(){
    var btn = document.getElementById("theme-btn");
    if(!btn) return;
    btn.addEventListener("click", function(){
      var current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      apply(current === "dark" ? "light" : "dark");
    });
  });
})();
