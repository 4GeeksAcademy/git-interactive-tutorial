import {} from 'sweetalert';

// Loading JSON
var json;
var oReq = new XMLHttpRequest();
oReq.onload = (e) => {
    json = JSON.parse(e.target.responseText);
    loadPage();
};
oReq.onerror = function () {
    document.body.innerHTML = `<div class="container no-json">
                                    <h1 class="red animated pulse loop">Error loading course data :'(</h1>
                                    <p>Please check your internet connection and reload this page.</p>
                                </div>`;
    document.body.style.opacity = 1;
}
oReq.open("get", "https://s3.us-east-2.amazonaws.com/manten-files/test/config.json", true);
oReq.send();

function loadPage() {

    // =================================================
    //  GLOBAL VARIABLES
    // ==================================================

    var lang = document.querySelector('#lang').value;
    var lecciones = json.lecciones[lang];
    var config = json.config;
    var leccionActual = 1;
    var leccionesTotal = getObjLength(lecciones);
    var avanceActual = 0;
    var leccionPorcentaje = 100 / leccionesTotal;

    // User command history
    var commandHist = [];
    var commandPos = 1;
    // General areas
    var langSwitch = document.querySelector('#lang');
    var navbar = document.querySelector('nav');
    var consoleArea = document.querySelector('.console-area');
    var textarea = document.querySelector('#console-input');
    var areaTareas = document.querySelector('.tareas');
    var branchArea = document.querySelector('.branch');
    var repoFolderArea = document.querySelector('#repository .repo-status .repo-folder');
    var repoStagedArea = document.querySelector('#repository .repo-status .staged');
    var repoCommitsArea = document.querySelector('#repository .repo-status .commits');

    // =================================================
    //  COURSE TASKS FUNCTIONS
    // ==================================================
    // Updates every contentn area in the site
    function actualizarInfoLeccion() {
        // Actualizar titulo y orden
        let titulo = document.querySelector('#instrucciones .titulo');
        titulo.innerHTML = lecciones[leccionActual].titulo;
        let orden = document.querySelector('#instrucciones .orden');
        orden.innerHTML = lecciones[leccionActual].orden;

        // Actualizar comando en boton
        let button = document.querySelector('.comando');
        // Acortar el texto si es muy largo
        if (lecciones[leccionActual].comando.length > 50) {
            button.innerHTML = lecciones[leccionActual].comando.substring(0, 41) + "...";
        } else {
            button.innerHTML = lecciones[leccionActual].comando;
        }

        // Limpiar areaTareas
        deleteAllChilds(areaTareas);
        // Agregar nuevas Tareas
        for (var i = 0; i < lecciones[leccionActual].tareas.length; i++) {
            let parrafo = createElementNode("p" ,lecciones[leccionActual].tareas[i]);
            areaTareas.appendChild(parrafo);
        }

        // Actualizar Navbar
        deleteAllChilds(navbar, "a");
        navbar.appendChild(createNavbarLinks());

        // Actualizar Repo Folder
        deleteAllChilds(repoFolderArea, 'h3');
        if (lecciones[leccionActual].repoStatus.branch !== undefined) {
            if (lecciones[leccionActual].repoStatus.branch !== undefined) {
                branchArea.innerHTML = '(' + lecciones[leccionActual].repoStatus.branch + ')';
            }
            let folderStructure = createFolderStructure(lecciones[leccionActual].repoStatus.repoFolder);
            repoFolderArea.appendChild(folderStructure);
        } else {
            let ul = document.createElement('ul');
            let li = createElementNode("li", config.emptyFolderMessage);
            ul.appendChild(li).classList.add('info');
            repoFolderArea.appendChild(ul);
        }
    }

    // Evaluates command and shows a preddefined message from JSON
    function mostrarResultado(passOrFail) {
        // Mostrar resultado
        if (passOrFail == 'pass') {
            // PASSED
            // Actualizar barra de progreso
            avanceActual += leccionPorcentaje;
            document.querySelector('#myBar').style.width = avanceActual + "%";
            // Mensajes de exito
            for (var i = 0; i < lecciones[leccionActual].successMessages.length; i++) {
                let parrafo = createElementNode("p", lecciones[leccionActual].successMessages[i]);
                consoleArea.appendChild(parrafo);
            }
            let parrafo = createElementNode("p", config.success);
            parrafo.classList.add('success');
            consoleArea.appendChild(parrafo);
            // Actualizar Staged
            deleteAllChilds(repoStagedArea, 'h3');
            if (lecciones[leccionActual].repoStatus.staged !== undefined) {
                let folderStructure = createFolderStructure(lecciones[leccionActual].repoStatus.staged);
                repoStagedArea.appendChild(folderStructure);
            } else {
                let ul = document.createElement('ul');
                let li = createElementNode("li", config.emptyStageAreaMessage);
                ul.appendChild(li).classList.add('commit');
                repoStagedArea.appendChild(ul);
            }

            // Actualizar Repo Commits
            deleteAllChilds(repoCommitsArea, 'h3');
            if (lecciones[leccionActual].repoStatus.commits !== undefined) {
                let ul = document.createElement('ul');
                for (let i = 0; i < lecciones[leccionActual].repoStatus.commits.length; i++) {
                    let li = createElementNode("li", lecciones[leccionActual].repoStatus.commits[i]);
                    ul.appendChild(li).classList.add('commit');
                }
                repoCommitsArea.appendChild(ul)
            } else {
                let ul = document.createElement('ul');
                let li = createElementNode("li", config.emptyCommitsAreaMessage);
                ul.appendChild(li).classList.add('commit');
                repoCommitsArea.appendChild(ul);
            }
            // Siguiente leccion
            leccionActual++;
        } else {
            // FAILED
            let userCommand = textarea.value;
            let splitCommand = userCommand.match(/(git)\s(\w+)/g) !== null ? userCommand.match(/(git)\s(\w+)/g)[0] : undefined;
            let comando = lecciones[leccionActual].comando;
            if (splitCommand != undefined && comando.match(/(git)\s(\w+)/g)[0] == splitCommand) {
                let parrafo = createElementNode("p", "Used " + splitCommand);
                parrafo.classList.add('blue');
                consoleArea.appendChild(parrafo);
                parrafo = createElementNode("p", "Check your arguments");
                consoleArea.appendChild(parrafo);
            } else if (RegExp("(git)", "g").test(textarea.value.trim())) {
                for (var i = 0; i < config.errorMessages.length; i++) {
                    let parrafo = createElementNode("p", config.errorMessages[i]);
                    consoleArea.appendChild(parrafo);
                }
                // Red error message
                let parrafo = createElementNode("p", lecciones[leccionActual].alert);
                parrafo.classList.add('error');
                consoleArea.appendChild(parrafo);
            } else {
                let comandError = createElementNode("p", textarea.value + ": " + config.errorComando);
                comandError.style.marginTop
                consoleArea.appendChild(comandError);
                // Red error message
                let parrafo = createElementNode("p", lecciones[leccionActual].alert);
                parrafo.classList.add('error');
                consoleArea.appendChild(parrafo);
            }

        }
    }
    // Changes line and shows result every time the users presses Enter in console area
    function cambiarLineaActual(passOrFail) {
        let lineaActual = document.querySelector('.current-line');
        let div = document.createElement('div');
        div.classList.add('line');
        let parrafo = createElementNode("p", textarea.value);
        parrafo.style.marginTop  = "15px";
        parrafo.style.marginBottom  = "15px";

        let img = document.createElement('img');
        img.classList.add('line-marker');
        img.setAttribute('src', './img/logo-blue.png');

        consoleArea.removeChild(lineaActual);
        div.appendChild(img);
        div.appendChild(parrafo);
        consoleArea.appendChild(div);
        consoleArea.classList.remove('current-line');

        setTimeout(function() {
            mostrarResultado(passOrFail);
            let div = document.createElement("div");
            consoleArea.appendChild(div);

            consoleArea.lastElementChild.classList.add('current-line');
            consoleArea.lastElementChild.style.marginTop  = "15px";
            lineaActual = document.querySelector('.current-line');
            lineaActual.innerHTML = '<img class="line-marker" src="./img/logo-blue.png"></img><textarea id="console-input" autocomplete="off" autocorrect="off" autocapitalize="off" spellCheck="false"></textarea>';

            if (leccionActual > leccionesTotal) {
                // Mark navbar element as completed
                document.querySelector('.main-menu ul li:last-child a').classList.remove('learning');
                document.querySelector('.main-menu ul li:last-child a').classList.add('completed');

                setTimeout(function() {
                    sweetAlert({
                        title: "Congratulations!",
                        text: config.tutorialCompletedMessage,
                        html: true,
                        type: "success",
                        showConfirmButton: true
                    });
                }, 5000);
            } else {
                actualizarInfoLeccion();
                // Ayudar listener para el textarea
                addTextareaListener();
                textarea.value = "";
                textarea.focus();
            }
        }, 1000);

    }
    // Add listener to text area every time it's appended in the console area
    function addTextareaListener() {
        textarea = document.querySelector('#console-input');
        textarea.addEventListener('keydown', (e) => {

            if (e.keyCode === 13) {
                e.preventDefault();
                if (textarea.value.trim().length < 1) {
                    return;
                }

                if (textarea.value.trim() === 'clear') {
                    consoleArea.appendChild(clearTerminal());
                    addTextareaListener();
                    textarea.focus();
                    return;
                }

                if (textarea.value.trim() === 'clear') {
                    consoleArea.appendChild(clearTerminal());
                    addTextareaListener();
                    textarea.focus();
                    return;
                }

                if (textarea.value.trim() === lecciones[leccionActual].comando) {
                    commandHist.push(textarea.value);
                    cambiarLineaActual("pass");
                } else {
                    commandHist.push(textarea.value);
                    cambiarLineaActual();
                }
            }

            if (e.keyCode === 38 && commandPos <= commandHist.length  && commandHist.length > 0) {
                // Up presses
                textarea.value = "";
                textarea.value = commandHist[commandHist.length - commandPos];
                commandPos++;
            }
        });
    }
    // Every time a lesson changes the navbar is rebuilt based on current lesson
    function createNavbarLinks() {
        let ul = document.createElement('ul');
        for (let i = 1; i <= leccionesTotal; i++) {
            let li = document.createElement('li');
            let a = createElementNode('a', lecciones[i].orden + " - " + lecciones[i].tituloCorto);
            li.appendChild(a).classList.add('nav-text');
            // Add link icon class
            if (i < leccionActual) {
                li.appendChild(a).classList.add('completed');
            } else {
                li.appendChild(a).classList.add('learning');
            }
            li.addEventListener('click', (e) => {
                if (navbar.classList.contains('expanded')) {
                    e.stopPropagation();
                    navbar.scrollTop = 0;
                    consoleArea.appendChild(clearTerminal());
                    addTextareaListener();
                    leccionActual = i;
                    avanceActual = (leccionActual - 1)  * leccionPorcentaje;
                    document.querySelector('#myBar').style.width = avanceActual + "%";
                    actualizarInfoLeccion();
                    // Actualizar Staged
                    deleteAllChilds(repoStagedArea, 'h3');
                    let leccionPrevia = leccionActual - 1 < 1 ? 1 : leccionActual - 1;
                    if (lecciones[leccionPrevia].repoStatus.staged != undefined) {
                        let folderStructure = createFolderStructure(lecciones[leccionPrevia].repoStatus.staged);
                        repoStagedArea.appendChild(folderStructure);
                    } else {
                        let ul = document.createElement('ul');
                        let li = createElementNode("li", config.emptyStageAreaMessage);
                        ul.appendChild(li).classList.add('commit');
                        repoStagedArea.appendChild(ul);
                    }
                    // Actualizar Repo Commits
                    deleteAllChilds(repoCommitsArea, 'h3');
                    if (lecciones[leccionPrevia].repoStatus.commits != undefined) {
                        let ul = document.createElement('ul');
                        for (let i = 0; i < lecciones[leccionPrevia].repoStatus.commits.length; i++) {
                            let li = createElementNode("li", lecciones[leccionPrevia].repoStatus.commits[i]);
                            ul.appendChild(li).classList.add('commit');
                        }
                        repoCommitsArea.appendChild(ul)
                    } else {
                        let ul = document.createElement('ul');
                        let li = createElementNode("li", config.emptyCommitsAreaMessage);
                        ul.appendChild(li).classList.add('commit');
                        repoCommitsArea.appendChild(ul);
                    }
                    navbar.classList.remove('expanded');
                    // Ayudar listener para el textarea
                    textarea.value = "";
                    textarea.focus();
                }
            })
            ul.appendChild(li);
        }
        return ul;
    }
    // creates a new textarea for the console
    // If added to the consoleArea it can efectively clear it,
    function clearTerminal() {
        deleteAllChilds(consoleArea);
        let div = document.createElement('div');
        div.classList.add('current-line');
        let img = document.createElement('img');
        img.setAttribute('src', './img/logo-blue.png');
        let newTextarea = document.createElement('textarea');
        div.appendChild(img).classList.add('line-marker');
        newTextarea.id = 'console-input';
        newTextarea.setAttribute('autocomplete', "off");
        newTextarea.setAttribute('autocorrect', "off");
        newTextarea.setAttribute('autocapitalize', "off");
        newTextarea.setAttribute('spellcheck', "false");
        div.appendChild(newTextarea);
        return div;
    }

    // =================================================
    //  HELPER FUNCTIONS
    // ==================================================
    // Creates element tag with text
    function createElementNode(elementTagAsString, texto) {
        let element = document.createElement(elementTagAsString);
        element.innerHTML = texto;
        return element;
    }
    // Deletes every child elements but the one that matches the exception
    function deleteAllChilds(parentElement, exceptionTagAsString) {
        var target = 0;
        if (parentElement.childElementCount !== 0) {
            for (let i = 0; target < parentElement.childElementCount; i++) {
                if (exceptionTagAsString !== undefined &&
                    parentElement.children[i].tagName === exceptionTagAsString.toUpperCase()) {
                    target++;
                    continue;
                }
                parentElement.removeChild(parentElement.children[target]);
            }
        }
        return;
    }
    // Return object length
    function getObjLength(obj) {
        let count = 0;
        let i;

        for (i in obj) {
            if (obj.hasOwnProperty(i)) {
                count++;
            }
        }
        return count;
    }
    // Creates the entire folder structure based on the folder array in JSON
    function createFolderStructure(folderArray) {
        let ul = document.createElement('ul');
        for (var i = 0; i < folderArray.length; i++) {
            var element = folderArray[i];
            if (typeof(element) === 'object') {
                for (var key in element) {
                    let li = createElementNode('li', key);
                    li.addEventListener('click', (e) => {
                        e.target.nextSibling.classList.toggle('closed');
                    })
                    ul.appendChild(li).classList.add('folder');
                    if (element[key].length > 0) {
                        let liContainer = document.createElement('li');
                        let innerUl = createFolderStructure(element[key]);
                        liContainer.classList.add('closed');
                        liContainer.appendChild(innerUl);
                        ul.appendChild(liContainer);
                    } else if (key === ".git") {
                        let liContainer = document.createElement('li');
                        liContainer.classList.add('closed');
                        let innerUl = createElementNode('ul', '<li class="info">Too many files to show! LOL</li>');
                        liContainer.appendChild(innerUl);
                        ul.appendChild(liContainer);
                    } else {
                        let liContainer = document.createElement('li');
                        liContainer.classList.add('closed');
                        let innerUl = createElementNode('ul', '<li class="info">Empty folder</li>');
                        liContainer.appendChild(innerUl);
                        ul.appendChild(liContainer);
                    }
                }
            } else {
                let li = createElementNode('li', element);
                ul.appendChild(li).classList.add('file');
            }
        }

        return ul;
    }

    // ===================================================
    //  APLICATION FIRST START
    // ===================================================

    // Actualizar instrucciones al cargar
    actualizarInfoLeccion();
    // Ayudar listener para el textarea al cargar
    addTextareaListener();
    // Coloca nombre de Repo en header de folderArea
    document.querySelector('#repository .header .title').innerHTML = config.repoName;
    // Show body after one second
    setTimeout(function() {
        document.body.style.opacity = 1;
    }, 1000);
    // Click event for button that 'writes' commando in console
    document.querySelector('.comando').addEventListener('click', () => {
        textarea.value = "";
        textarea.classList.add("typed");
        textarea.value = lecciones[leccionActual].comando;
        setTimeout(function() {
            textarea.classList.remove("typed");
            textarea.focus();
        }, 1000);
    });

    // Cambiar lenguaje
    langSwitch.addEventListener('change', () => {
        lang = langSwitch.value;
        lecciones = json.lecciones[lang];

        consoleArea.appendChild(clearTerminal());
        addTextareaListener();
        actualizarInfoLeccion();
        // Actualizar Staged
        deleteAllChilds(repoStagedArea, 'h3');
        if (lecciones[leccionActual].repoStatus.staged != undefined) {
            let folderStructure = createFolderStructure(lecciones[leccionActual].repoStatus.staged);
            repoStagedArea.appendChild(folderStructure);
        } else {
            let ul = document.createElement('ul');
            let li = createElementNode("li", config.emptyStageAreaMessage);
            ul.appendChild(li).classList.add('commit');
            repoStagedArea.appendChild(ul);
        }
        // Actualizar Repo Commits
        deleteAllChilds(repoCommitsArea, 'h3');
        if (lecciones[leccionActual].repoStatus.commits != undefined) {
            let ul = document.createElement('ul');
            for (let i = 0; i < lecciones[leccionActual].repoStatus.commits.length; i++) {
                let li = createElementNode("li", lecciones[leccionActual].repoStatus.commits[i]);
                ul.appendChild(li).classList.add('commit');
            }
            repoCommitsArea.appendChild(ul)
        } else {
            let ul = document.createElement('ul');
            let li = createElementNode("li", config.emptyCommitsAreaMessage);
            ul.appendChild(li).classList.add('commit');
            repoCommitsArea.appendChild(ul);
        }
        // Ayudar listener para el textarea
        textarea.focus();
    });

    // Mostrar y ocultar Menu principal
    navbar.addEventListener('click', (e) => {
        if (navbar.classList.contains('expanded') === false) {
            navbar.classList.toggle('expanded');
        }
    });

    document.querySelector('main').addEventListener('click', () => {
        navbar.classList.remove('expanded');
        navbar.scrollTop = 0;
    });


    // Mostrar y ocultar Sidebar menu
    document.querySelector('#showNavbar').addEventListener('mouseover', () => {
        setTimeout(function() {
            navbar.classList.add('expanded');
        }, 100);
    });

    document.querySelector('#showNavbar').addEventListener('mouseleave', () => {
        navbar.classList.remove('expanded');
    });

    // Mostrar y ccultar columna del repositorio
    document.querySelector('.hide-repo').addEventListener('click', () => {
        let column1 = document.querySelector('.column-1');
        let column2 = document.querySelector('.column-2');
        document.querySelector('.show-repo').classList.toggle('hidden');
        column1.style.width = '100%';
        column1.style.flexDirection = 'row';
        column2.classList.toggle('hidden');

        // Reordenar columna 1
        let instrucciones = document.querySelector('#instrucciones');
        let terminal = document.querySelector('#terminal');
        instrucciones.style.flex = '2';
        instrucciones.style.height = '100%';
        consoleArea.style.height = '100%';
        terminal.style.flex = '3';
        terminal.style.height = '100%';
        terminal.style.marginTop = '38.39px';
    })

    document.querySelector('.show-repo').addEventListener('click', () => {
        let column1 = document.querySelector('.column-1');
        let column2 = document.querySelector('.column-2');
        // Reordenar columna 1
        let instrucciones = document.querySelector('#instrucciones');
        let terminal = document.querySelector('#terminal');
        column1.style.width = '70%';
        column1.style.flexDirection = 'column';
        instrucciones.style.flex = '3';
        instrucciones.style.height = 'auto';
        terminal.style.flex = '2';
        terminal.style.marginTop = '0';
        setTimeout(function() {
            column2.classList.toggle('hidden');
        }, 900);
        document.querySelector('.show-repo').classList.toggle('hidden');
    })
};