document.addEventListener("DOMContentLoaded", e => {
    const includeHTML = async(el, url) => {
        try{
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "text/html; charset=utf-8"
                }
            }),
                html = await res.text();
    
            if(!res.ok) throw {status: res.status, statusText: res.statusText};

            el.outerHTML = html;
        }catch(err){
            const mensaje = err.statusText || "Ocurrio un error";
            el.outerHTML = `<div><p>Error ${err.status}: ${mensaje}</p></div>`;
        }
    };

    document.querySelectorAll("[data-include]").forEach(el => includeHTML(el, el.getAttribute("data-include")));
});