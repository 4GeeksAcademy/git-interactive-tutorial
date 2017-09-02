var lecciones, config;
var oReq = new XMLHttpRequest();
oReq.onload = (e) => {
    lecciones = JSON.parse(e.target.responseText).lecciones;
    config = JSON.parse(e.target.responseText).config;
    loadPage();
};
oReq.onerror = function () {
    console.log("Error with JSON");
    sweetAlert({
        title: "Something happened!",
        text: "It seems we couldn't fetch the course data. <br> This page will be reload if 5 seconds.",
        type: "error",
        timer: 5000,
        showConfirmButton: false
    }, () => {
        location.reload();
    });
}
oReq.open("get", "https://s3.us-east-2.amazonaws.com/manten-files/config.json", true);
oReq.send();

function loadPage() {
    // var file = `{
    //     "config": {
    //         "repoName": "Octobox",
    //         "errorComando": "comand not found"
    //     },
    //     "lecciones": {
    //         "1": {
    //             "orden": "1.1",
    //             "titulo": "Got 15 minutes and want to learn Git?",
    //             "tareas": [
    //                 "Git allows groups of people to work on the same documents (often code) at the same time, and without stepping on each other's toes. It's a distributed version control system.", 
    //                 "Our terminal prompt below is currently in a directory we decided to name 'octobox'. To initialize a Git repository here, type the following command:"
    //             ],
    //             "comando": "git init",
    //             "errorMessages": [
    //                 "fatal: Not a git repository (or any of the parent directories): .git"
    //             ],
    //             "alert": "Did not create a Git repo",
    //             "successMessages": [
    //                 "Initialized empty Git repository in /.git/"
    //             ],
    //             "repoStatus": {}
    //         },
    //         "2": {
    //             "orden": "1.2",
    //             "titulo": "Checking the Status",
    //             "tareas": [
    //                 "Good job! As Git just told us, our 'octobox' directory now has an empty repository in /.git/. The repository is a hidden directory where Git operates.", 
    //                 "To save your progress as you go through this tutorial -- and earn a badge when you successfully complete it -- head over to create a free Code School account. We'll wait for you here.",
    //                 "Next up, let's type the git status command to see what the current state of our project is:"
    //             ],
    //             "comando": "git status",
    //             "errorMessages": [
    //                 "fatal: Not a git repository (or any of the parent directories): .git"
    //             ],
    //             "alert": "Did not use git status",
    //             "successMessages": [
    //                 "# On branch master",
    //                 "#",
    //                 "# Initial commit",
    //                 "#",
    //                 "nothing to commit (create/copy files and use 'git add' to track)"
    //             ],
    //             "repoStatus": {
    //                 "repoFolder": [
    //                     { ".git": [  ]  },
    //                     "octotext.txt"
    //                 ]
    //             }
    //         }
    //     }
    // }`;

    // =================================================
    //  GLOBAL VARIABLES
    // ==================================================

    // var lecciones = JSON.parse(file).lecciones;
    // var config = JSON.parse(file).config;

    var leccionActual = 1;
    var leccionesTotal = getObjLength(lecciones);
    var avanceActual = 0;
    var leccionPorcentaje = 100 / leccionesTotal;
    
    // User-introduced command history 
    var commandHist = [];
    var commandPos = 1;
    // General areas
    var consoleArea = document.querySelector('.console-area');
    var textarea = document.querySelector('#console-input');
    var areaTareas = document.querySelector('.tareas');
    var repoFolderArea = document.querySelector('#repository .repo-status .repo-folder');
    var repoStagedArea = document.querySelector('#repository .repo-status .staged');
    var repoCommitsArea = document.querySelector('#repository .repo-status .commits');

    // =================================================
    //  COURSE TASKS FUNCTIONS
    // ==================================================

    function actualizarInfoLeccion() {
        // Actualizar titulo y orden
        let titulo = document.querySelector('#instrucciones h3 .titulo');
        titulo.innerHTML = lecciones[leccionActual].titulo;
        let orden = document.querySelector('#instrucciones h3 .orden');
        orden.innerHTML = lecciones[leccionActual].orden;

        // Actualizar comando en boton
        let button = document.querySelector('#instrucciones button');
        button.innerHTML = lecciones[leccionActual].comando;

        // Limpiar areaTareas
        deleteAllChilds(areaTareas);
        // Agregar nuevas Tareas
        for (var i = 0; i < lecciones[leccionActual].tareas.length; i++) {
            let parrafo = createElementNode("p" ,lecciones[leccionActual].tareas[i]);
            areaTareas.appendChild(parrafo);     
        }

        // Actualizar Repo Folder
        deleteAllChilds(repoFolderArea, 'h3');
        if (lecciones[leccionActual].repoStatus.repoFolder !== undefined) {
            let folderStructure = createFolderStructure(lecciones[leccionActual].repoStatus.repoFolder);
            repoFolderArea.appendChild(folderStructure);
        } else {
            let ul = document.createElement('ul');
            let li = createElementNode("li", "No files in this folder");
            ul.appendChild(li).classList.add('info');
            repoFolderArea.appendChild(ul);
        }

        // Actualizar Staged
        deleteAllChilds(repoStagedArea, 'h3');
        if (lecciones[leccionActual].repoStatus.staged !== undefined) {
            let folderStructure = createFolderStructure(lecciones[leccionActual].repoStatus.staged);
            repoStagedArea.appendChild(folderStructure);
        } else {
            let ul = document.createElement('ul');
            let li = createElementNode("li", "No files to commit");
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
            let li = createElementNode("li", "Nothing commited yet");
            ul.appendChild(li).classList.add('commit');
            repoCommitsArea.appendChild(ul);
        }
    }

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
            let parrafo = createElementNode("p", "Success!");                                  
            parrafo.classList.add('success');                                    
            consoleArea.appendChild(parrafo);
            // Siguiente leccion
            leccionActual++;
        } else {
            // FAILED
            if (RegExp("(git)", "g").test(textarea.value.trim())) {
                for (var i = 0; i < lecciones[leccionActual].errorMessages.length; i++) {
                    let parrafo = createElementNode("p", lecciones[leccionActual].errorMessages[i]);  
                    consoleArea.appendChild(parrafo);
                }
            } else {
                let comandError = createElementNode("p", textarea.value + ": " + config.errorComando);
                comandError.style.marginTop                                  
                consoleArea.appendChild(comandError);
            }
            // Red error message
            let parrafo = createElementNode("p", lecciones[leccionActual].alert);
            parrafo.classList.add('error');                                    
            consoleArea.appendChild(parrafo);
        }
    }

    function cambiarLineaActual(passOrFail) {
        let lineaActual = document.querySelector('.current-line');
        let parrafo = createElementNode("p", textarea.value);
        let span = createElementNode("span", "満 ");
        parrafo.insertBefore(span, parrafo.firstChild).classList.add('line-marker');
        parrafo.style.marginTop  = "15px";
        parrafo.style.marginBottom  = "15px";
        consoleArea.removeChild(lineaActual);
        
        consoleArea.appendChild(parrafo);
        consoleArea.classList.remove('current-line');

        setTimeout(function() {
            mostrarResultado(passOrFail);
            let div = document.createElement("div");
            consoleArea.appendChild(div);
    
            consoleArea.lastElementChild.classList.add('current-line');
            consoleArea.lastElementChild.style.marginTop  = "15px";
            lineaActual = document.querySelector('.current-line');
            lineaActual.innerHTML = '<span class="line-marker">満 </span><textarea id="console-input" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"></textarea>';

            if (leccionActual > leccionesTotal) {
                sweetAlert({
                    title: "Congratulations!",
                    text: "<p>Good job! You have reached the end of this tutorial.</p> <p>This page will reload in 5 seconds.</p>",
                    type: "success",
                    timer: 5000,
                    showConfirmButton: false
                }, () => {
                    location.reload();
                });
            } else {
                actualizarInfoLeccion();
                // Ayudar listener para el textarea
                addTextareaListener();
                textarea.value = "";
                textarea.focus();
            }
        }, 1000);
        
    }

    function addTextareaListener() {
        textarea = document.querySelector('#console-input');
        textarea.addEventListener('keydown', (e) => {
            if (e.keyCode === 13) {
                if (textarea.value.trim() === lecciones[leccionActual].comando) {
                    e.preventDefault();
                    cambiarLineaActual("pass");
                } else {
                    e.preventDefault();
                    if (textarea.value !== "") {
                        commandHist.push(textarea.value);
                    }
                    // console.log(commandHist);
                    // textarea.value = "";
                    cambiarLineaActual();
                }
            }
            
            if (e.keyCode === 38 && commandPos <= commandHist.length  && commandHist.length > 0) {
                // Up presses
                textarea.value = "";
                textarea.value = commandHist[commandHist.length - commandPos];
                commandPos++;
                // console.log(commandPos);
            } 
            // else if (e.keyCode === 40 && commandPos > 1 && commandHist.length > 0) {
            //     // Down pressed
            //     textarea.value = "";
            //     commandPos--;
            //     textarea.value = commandHist[commandPos + 1];
            //     console.log(commandPos);
            // }
        });
    }
    
    // =================================================
    //  HELPER FUNCTIONS
    // ==================================================
    
    function createElementNode(elementTagAsString, texto) {
        let element = document.createElement(elementTagAsString);
        element.innerHTML = texto;
        return element;
    }

    function deleteAllChilds(parentElement, exceptionTagAsString) {
        while (parentElement.firstChild && parentElement.childElementCount > 1) {
            if (exceptionTagAsString !== undefined && parentElement.firstChild.tagName === exceptionTagAsString.toUpperCase()) {
                parentElement.removeChild(parentElement.firstChild.nextSibling);
            }  else {
                parentElement.removeChild(parentElement.firstChild);
            }
        }
    }

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

    document.querySelector('.comando').addEventListener('click', () => {
        textarea.value = "";
        textarea.classList.add("typed");
        textarea.value = lecciones[leccionActual].comando;        
        setTimeout(function() {
            textarea.classList.remove("typed");
            textarea.focus();
        }, 1000);
    });

    // Actualizar instrucciones al cargar
    actualizarInfoLeccion();
    // Ayudar listener para el textarea al cargar
    addTextareaListener();
    // Coloca nombre de Repo en header de folderArea
    document.querySelector('#repository .header .title').innerHTML = config.repoName;
    // Show body after half a second
    setTimeout(function() {
        document.body.style.opacity = 1;
    }, 1000);
};