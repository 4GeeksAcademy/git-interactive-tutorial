// var lecciones;
// var oReq = new XMLHttpRequest();
// oReq.onload = (e) => {
//     lecciones = JSON.parse(e.target.responseText);
// };
// oReq.open("get", "https://s3.amazonaws.com/laraveltienda/config.json", true);
// oReq.send();

( () => {
    var file = `{
        "config": {
            "repoName": "Octobox",
            "errorComando": "comand not found"
        },
        "lecciones": {
            "1": {
                "orden": "1.1",
                "titulo": "Got 15 minutes and want to learn Git?",
                "tareas": [
                    "Git allows groups of people to work on the same documents (often code) at the same time, and without stepping on each other's toes. It's a distributed version control system.", 
                    "Our terminal prompt below is currently in a directory we decided to name 'octobox'. To initialize a Git repository here, type the following command:"
                ],
                "comando": "git init",
                "errorMessages": [
                    "fatal: Not a git repository (or any of the parent directories): .git"
                ],
                "alert": "Did not create a Git repo",
                "successMessages": [
                    "Initialized empty Git repository in /.git/"
                ],
                "repoStatus": {
                    "status": {
                        "_comment": "Only add the 'msg' key if there are no files or folders",
                        "msg": "No git repository"
                    }
                }
            },
            "2": {
                "orden": "1.2",
                "titulo": "Checking the Status",
                "tareas": [
                    "Good job! As Git just told us, our 'octobox' directory now has an empty repository in /.git/. The repository is a hidden directory where Git operates.", 
                    "To save your progress as you go through this tutorial -- and earn a badge when you successfully complete it -- head over to create a free Code School account. We'll wait for you here.",
                    "Next up, let's type the git status command to see what the current state of our project is:"
                ],
                "comando": "git status",
                "errorMessages": [
                    "fatal: Not a git repository (or any of the parent directories): .git"
                ],
                "alert": "Did not use git status",
                "successMessages": [
                    "# On branch master",
                    "#",
                    "# Initial commit",
                    "#",
                    "nothing to commit (create/copy files and use 'git add' to track)"
                ],
                "repoStatus": {
                    "status": {
                        "folder": [
                            ".git"
                        ]
                    },
                    "unstaged": [
                        "octotext.txt"
                    ]
                }
            }
        }
    }`;

    var lecciones = JSON.parse(file).lecciones;
    // console.log(lecciones);
    var config = JSON.parse(file).config;

    var leccionActual = 1;

    var consoleArea = document.querySelector('.console-area');
    var textarea = document.querySelector('#console-input');
    var commandHist = [];
    var commandPos = 1;

    var areaTareas = document.querySelector('.tareas');
    var repoStatusArea = document.querySelector('#repository .repo-status .status ul');
    var repoUnstagedArea = document.querySelector('#repository .repo-status .unstaged ul');
    var repoCommitsArea = document.querySelector('#repository .repo-status .commits ul');

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

        // Actualizar Repo Status
        deleteAllChilds(repoStatusArea);
        if (lecciones[leccionActual].repoStatus.status.folder !== undefined) {
            for (let i = 0; i < lecciones[leccionActual].repoStatus.status.folder.length; i++) {
                let li = createElementNode("li", lecciones[leccionActual].repoStatus.status.folder[i]);
                repoStatusArea.appendChild(li).classList.add('folder');
            }
        }
        if (lecciones[leccionActual].repoStatus.status.files !== undefined) {
            for (let i = 0; i < lecciones[leccionActual].repoStatus.status.files.length; i++) {
                let li = createElementNode("li", lecciones[leccionActual].repoStatus.status.files[i]);
                repoStatusArea.appendChild(li).classList.add('file');
            }
        }
        
        if (lecciones[leccionActual].repoStatus.status.msg !== undefined) {
            let li = createElementNode("li", "Nothing to commit");
            repoStatusArea.appendChild(li).classList.add('commit');
        }

        // Actualizar Repo Unstaged
        deleteAllChilds(repoUnstagedArea);
        if (lecciones[leccionActual].repoStatus.unstaged !== undefined) {
            for (let i = 0; i < lecciones[leccionActual].repoStatus.unstaged.length; i++) {
                let li = createElementNode("li", lecciones[leccionActual].repoStatus.unstaged[i]);
                repoUnstagedArea.appendChild(li);
            }
        } else {
            let li = createElementNode("li", "Nothing staged");
            repoUnstagedArea.appendChild(li);
        }

        // Actualizar Repo Commits
        deleteAllChilds(repoCommitsArea);
        if (lecciones[leccionActual].repoStatus.commits !== undefined) {
            for (let i = 0; i < lecciones[leccionActual].repoStatus.commits.length; i++) {
                let li = createElementNode("li", lecciones[leccionActual].repoStatus.commits[i]);
                repoCommitsArea.appendChild(li).classList.add('commit');
            }
        } else {
            let li = createElementNode("li", "Nothing commited yet");
            repoCommitsArea.appendChild(li).classList.add('commit');
        }
    }

    function mostrarResultado(passOrFail) {
        // Mostrar resultado
        if (passOrFail == 'pass') {
            // PASSED
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
            // Ayudar listener para el textarea
            addTextareaListener();
            actualizarInfoLeccion();
            textarea.value = "";
            textarea.focus();
        }, 1000);
        
    }

    function createElementNode(elementTagAsString, texto) {
        let element = document.createElement(elementTagAsString);
        let textNode = document.createTextNode(texto);
        element.appendChild(textNode);
        return element;
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

    function deleteAllChilds(parentElement) {
        while (parentElement.firstChild) {
            parentElement.removeChild(parentElement.firstChild);
        }
    }

    document.querySelector('.comando').addEventListener('click', () => {
        textarea.value = "";
        textarea.classList.add("typed");
        textarea.value = lecciones[leccionActual].comando;
        setTimeout(function() {
            textarea.classList.remove("typed");
        }, 1000);
    });

    // Actualizar instrucciones al cargar
    actualizarInfoLeccion();
    // Ayudar listener para el textarea al cargar
    addTextareaListener();
    // Coloca nombre de Repo en header de folderArea
    document.querySelector('#repository .header .title').innerHTML = config.repoName + " Repository";
})();
