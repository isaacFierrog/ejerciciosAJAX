const d = document
    $main = d.querySelector(".main");

const getHTML = async({url, success, error}) => {
    try{
        const res = await fetch(url, {
            headers: {
                "Content-type": "text/html; charset=utf-8"
            }
        }),
            html = await res.text();
    
        if(!res.ok) throw {status: res.status, statusText: res.statusText};
    
        success(html);
    }catch(err){
        const mensaje = err.statusText || "Ocurrio un error";
        error(`Error ${err.status}: ${mensaje}`);
    }
};

const cargarContenido = () => {
    d.addEventListener("click", e => {
        if(e.target.matches(".menu a")){
            e.preventDefault();
            
            getHTML({
                url: e.target.getAttribute("href"),
                success: res => $main.innerHTML = res,
                error: err => $main.innerHTML = `<h1>${err}</h1>`
            });
        }
    });
}

d.addEventListener("DOMContentLoaded", e => {
    getHTML({
        url: "assets/home.html",
        success: res => $main.innerHTML = res,
        error: err => $main.innerHTML = `<h1>${err}</h1>`
    });
    cargarContenido();
});