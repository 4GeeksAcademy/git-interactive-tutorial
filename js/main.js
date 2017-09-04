// var lecciones, config;
// var oReq = new XMLHttpRequest();
// oReq.onload = (e) => {
//     lecciones = JSON.parse(e.target.responseText).lecciones;
//     config = JSON.parse(e.target.responseText).config;
//     loadPage();
// };
// oReq.onerror = function () {
//     console.log("Error with JSON");
//     sweetAlert({
//         title: "Something happened!",
//         text: "<p>It seems we couldn't fetch the course data.</p><p>This page will be reload if 5 seconds.</p>",
//         html: true,
//         type: "error",
//         timer: 5000,
//         showConfirmButton: false
//     }, () => {
//         location.reload();
//     });
// }
// oReq.open("get", "https://s3.us-east-2.amazonaws.com/manten-files/config.json", true);
// oReq.send();

// function loadPage() {
    var file = `{
        "config": {
            "repoName": "Octobox",
            "_comment": "errorComando, in case no command match",
            "errorComando": "comand not found",
            "_comment": "if user writes git show following error",
            "errorMessages": [
                "usage: git [--version] [--exec-path[=&lt;path&gt;]] [--html-path] [--man-path] [--info-path]",
                "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[-p|--paginate|--no-pager] [--no-replace-objects] [--bare]",
                "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[--git-dir=&lt;path>] [--work-tree=&lt;path&gt;] [--namespace=&lt;name&gt;]",
                "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[-c name=value] [--help]",
                "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;command> [&lt;args&gt;]",
                "&nbsp;"
            ]
        },
        "lecciones": {
            "1": {
                "orden": "1.1",
                "titulo": "Got 15 minutes and want to learn Git?",
                "tituloCorto": "Learn Git?",
                "tareas": [
                    "Git allows groups of people to work on the same documents (often code) at the same time, and without stepping on each other's toes. It's a distributed version control system.", 
                    "Our terminal prompt below is currently in a directory we decided to name \\"octobox\\". To initialize a Git repository here, type the following command:"
                ],
                "comando": "git init",
                "alert": "Did not create a Git repo",
                "successMessages": [
                    "Initialized empty Git repository in /.git/"
                ],
                "repoStatus": {}
            },
            "2": {
                "orden": "1.2",
                "titulo": "Checking the Status",
                "tituloCorto": "Checking the Status",
                "tareas": [
                    "Good job! As Git just told us, our 'octobox' directory now has an empty repository in /.git/. The repository is a hidden directory where Git operates.",
                    "Next up, let's type the git status command to see what the current state of our project is:"
                ],
                "comando": "git status",
                "alert": "Did not use git status",
                "successMessages": [
                    "# On branch master",
                    "#",
                    "# Initial commit",
                    "#",
                    "nothing to commit (create/copy files and use \\"git add\\" to track)"
                ],
                "repoStatus": {
                    "repoFolder": [
                        { ".git": [  ]  },
                        "octotext.txt"
                    ]
                }
            },
            "3": {
                "orden": "1.3",
                "titulo": "Adding & Committing",
                "tituloCorto": "Adding & Committing",
                "tareas": [
                    "I created a file called octocat.txt in the octobox repository for you (as you can see in the browser below).", 
                    "You should run the git status command again to see how the repository status has changed:"
                ],
                "comando": "git status",
                "alert": "Did not use git status",
                "successMessages": [
                    "# On branch master",
                    "#",
                    "# Initial commit",
                    "#",
                    "# Untracked files:",
                    "#   (use \\"git add <file>...\\" to include in what will be committed)",
                    "#",
                    "#   <strong class=\\"red\\">octocat.txt</strong>",
                    "nothing added to commit but untracked files present (use 'git add' to track)"
                ],
                "repoStatus": {
                    "repoFolder": [
                        { ".git": [  ]  },
                        "octotext.txt"
                    ]
                }
            },
            "4": {
                "orden": "1.4",
                "titulo": "Adding Changes",
                "tituloCorto": "Adding Changes",
                "tareas": [
                    "Good, it looks like our Git repository is working properly. Notice how Git says octocat.txt is \\"untracked\\"? That means Git sees that  octocat.txt is a new file.", 
                    "To tell Git to start tracking changes made to octocat.txt, we first need to add it to the staging area by using git add."
                ],
                "comando": "git add octocat.txt",
                "alert": "Did not add octocat.txt",
                "successMessages": [
                    "<span class=\\"success\\">Nice job, you've added octocat.txt to the Staging Area!</span>"
                ],
                "repoStatus": {
                    "repoFolder": [
                        { ".git": [  ]  },
                        "octotext.txt"
                    ],
                    "staged": [
                        "octotext.txt"
                    ]
                }
            },
            "5": {
                "orden": "1.5",
                "titulo": "Checking for Changes",
                "tituloCorto": "Checking for Changes",
                "tareas": [
                    "Good job! Git is now tracking our octocat.txt file. Let's run git status again to see where we stand:"
                ],
                "comando": "git status",
                "alert": "Did not use git status",
                "successMessages": [
                    "# On branch master",
                    "#",
                    "# Initial commit",
                    "#",
                    "# Changes to be committed:",
                    "#   (use \\"git rm --cached <file>...\\" to unstage)",
                    "#",
                    "#   <span class=\\"success\\">new file:   octocat.txt</span>",
                    "#"
                ],
                "repoStatus": {
                    "repoFolder": [
                        { ".git": [  ]  },
                        "octotext.txt"
                    ],
                    "staged": [
                        "octotext.txt"
                    ]
                }
            },
            "6": {
                "orden": "1.6",
                "titulo": "Committing",
                "tituloCorto": "Committing",
                "tareas": [
                    "Notice how Git says changes to be committed? The files listed here are in the Staging Area, and they are not in our repository yet. We could add or remove files from the stage before we store them in the repository.",
                    "To store our staged changes we run the commit command with a message describing what we've changed. Let's do that now by typing:"
                ],
                "comando": "git commit -m \\"Add cute octocat story\\"",
                "alert": "Did not use git commit",
                "successMessages": [
                    "[master (root-commit) 20b5ccd] Add cute octocat story",
                    "1 file changed, 1 insertion(+)",
                    "create mode 100644 octocat.txt",
                    "&nbsp;"
                ],
                "repoStatus": {
                    "repoFolder": [
                        { ".git": [  ]  },
                        "octotext.txt"
                    ],
                    "commits": [
                        "100644 - Add cute octocat story"
                    ]
                }
            }
        }
    }`;

    // =================================================
    //  GLOBAL VARIABLES
    // ==================================================

    var lecciones = JSON.parse(file).lecciones;
    var config = JSON.parse(file).config;

    var leccionActual = 1;
    var leccionesTotal = getObjLength(lecciones);
    var avanceActual = 0;
    var leccionPorcentaje = 100 / leccionesTotal;
    
    // User-introduced command history 
    var commandHist = [];
    var commandPos = 1;
    // General areas
    var navbar = document.querySelector('nav');
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

        // Actualizar Navbar 
        deleteAllChilds(navbar, "a");
        navbar.appendChild(createNavbarLinks());

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
            // Siguiente leccion
            leccionActual++;
        } else {
            // FAILED
            if (RegExp("(git)", "g").test(textarea.value.trim())) {
                for (var i = 0; i < config.errorMessages.length; i++) {
                    let parrafo = createElementNode("p", config.errorMessages[i]);  
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
                setTimeout(function() {
                    sweetAlert({
                        title: "Congratulations!",
                        text: "<p>Good job! You have reached the end of this tutorial.</p><p>This page will reload in 5 seconds.</p>",
                        html: true,
                        type: "success",
                        timer: 5000,
                        showConfirmButton: false
                    }, () => {
                        location.reload();
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
            li.addEventListener('click', () => {
                navbar.classList.remove('expanded');
                consoleArea.appendChild(clearTerminal());
                addTextareaListener();
                leccionActual = i;
                avanceActual = (leccionActual - 1)  * leccionPorcentaje;
                document.querySelector('#myBar').style.width = avanceActual + "%";
                actualizarInfoLeccion();
                // Ayudar listener para el textarea
                textarea.value = "";
                textarea.focus();
            })
            ul.appendChild(li);
        }
        return ul;
    }

    function clearTerminal() {
        deleteAllChilds(consoleArea, 'p');
        let div = document.createElement('div');
        div.classList.add('current-line');
        let span = createElementNode('span', "満 ");
        let newTextarea = document.createElement('textarea');
        // <span class="line-marker">満 </span>
        // <textarea id="console-input" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"></textarea>
        div.appendChild(span).classList.add('line-marker');
        newTextarea.id = 'console-input';
        newTextarea.setAttribute('autoComplete', "off");
        newTextarea.setAttribute('autoCorrect', "off");
        newTextarea.setAttribute('autoCapitalize', "off");
        newTextarea.setAttribute('spellCheck', "off");
        div.appendChild(newTextarea);
        return div;
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

    document.querySelector('.comando').addEventListener('click', () => {
        textarea.value = "";
        textarea.classList.add("typed");
        textarea.value = lecciones[leccionActual].comando;        
        setTimeout(function() {
            textarea.classList.remove("typed");
            textarea.focus();
        }, 1000);
    });

    document.querySelector('#showNavbar').addEventListener('click', () => {
        navbar.classList.toggle('expanded');
    });
// };