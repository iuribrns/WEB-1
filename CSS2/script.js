
let filmes = [
    { titulo: "Homem-Aranha: Um Novo Dia", ano: 2026, genero: "Ação", nota: 8.0, poster: "https://www.impawards.com/2026/posters/spiderman_brand_new_day.jpg" },
    { titulo: "Obsessão", ano: 2026, genero: "Terror", nota: 7.8, poster: "https://www.impawards.com/2026/posters/obsession.jpg" },
    { titulo: "Sonic 3: O Filme", ano: 2024, genero: "Ação", nota: 7.6, poster: "https://image.tmdb.org/t/p/w500/d8Ryb8AunYAuycVKDp5HpdWPKgC.jpg" },
    { titulo: "Super Mario Galaxy: O Filme", ano: 2026, genero: "Infantil", nota: 6.2, poster: "Mario.jpg" },
    { titulo: "Oppenheimer", ano: 2023, genero: "Drama", nota: 8.6, poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg" },
    { titulo: "Sorria", ano: 2022, genero: "Terror", nota: 6.5, poster: "https://image.tmdb.org/t/p/w500/aPqcQwu4VGEewPhagWNncDbJ9Xp.jpg" },
    { titulo: "Invocação do Mal", ano: 2013, genero: "Terror", nota: 7.5, poster: "https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg" },
    { titulo: "Corra!", ano: 2017, genero: "Terror", nota: 7.8, poster: "corra.jpg" }
];

let favoritos = [];


function mostrarFilmes(lista) {
    let catalogo = document.getElementById("catalogo");
    catalogo.innerHTML = "";

    if (lista.length === 0) {
        catalogo.innerHTML = "<p>Nenhum filme encontrado</p>";
    }

    for (let filme of lista) {
        let indice = filmes.indexOf(filme);
        let selo = filme.nota >= 8 ? "<span class='recomendado'>⭐ Recomendado</span>" : "";

        catalogo.innerHTML += `
            <div class="card">
                <img src="${filme.poster}" alt="${filme.titulo}">
                <h3>${filme.titulo}</h3>
                <p>${filme.ano} | ${filme.genero}</p>
                <span>⭐ ${filme.nota.toFixed(1)}</span>
                ${selo}
                <button class="btn-favoritar" onclick="favoritar(${indice})">
                    ♥ Favoritar
                </button>
            </div>
        `;
    }

    document.getElementById("contador").innerText = lista.length;
}


function filtrarFilmes() {
    let busca = document.getElementById("busca").value.toLowerCase();
    let genero = document.getElementById("filtro-genero").value;
    let resultado = [];

    for (let filme of filmes) {
        if (filme.titulo.toLowerCase().includes(busca)) {
            if (genero === "Todos" || filme.genero === genero) {
                resultado.push(filme);
            }
        }
    }

    mostrarFilmes(resultado);
}

document.getElementById("busca").addEventListener("input", filtrarFilmes);
document.getElementById("filtro-genero").addEventListener("change", filtrarFilmes);


document.getElementById("btn-inverter").addEventListener("click", function() {
    filmes.reverse();
    filtrarFilmes();
});


function favoritar(indice) {
    let titulo = filmes[indice].titulo;

    if (!favoritos.includes(titulo)) {
        favoritos.push(titulo);
    }

    atualizarFavoritos();
}


function atualizarFavoritos() {
    let lista = document.getElementById("lista-favoritos");
    lista.innerHTML = "";

    for (let titulo of favoritos) {
        lista.innerHTML += `<li>♥ ${titulo}</li>`;
    }

    if (favoritos.length === 0) {
        lista.innerHTML = "<li>Nenhum filme favoritado.</li>";
    }

    document.getElementById("contador-favoritos").innerText = favoritos.length;
}

document.getElementById("btn-limpar").addEventListener("click", function() {
    favoritos = [];
    atualizarFavoritos();
});


function efeitoMouse(id) {
    let titulo = document.getElementById(id);

    titulo.addEventListener("mouseenter", function() {
        titulo.style.color = "white";
    });

    titulo.addEventListener("mouseout", function() {
        titulo.style.color = "#ff4d5a";
    });
}

efeitoMouse("titulo-catalogo");
efeitoMouse("titulo-destaque");

mostrarFilmes(filmes);
atualizarFavoritos();
