! function (e) {
   var t = {};

   function o(a) {
      if (t[a]) return t[a].exports;
      var s = t[a] = {
         i: a,
         l: !1,
         exports: {}
      };
      return e[a].call(s.exports, s, s.exports, o), s.l = !0, s.exports
   }
   o.m = e, o.c = t, o.d = function (e, t, a) {
      o.o(e, t) || Object.defineProperty(e, t, {
         enumerable: !0,
         get: a
      })
   }, o.r = function (e) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
         value: "Module"
      }), Object.defineProperty(e, "__esModule", {
         value: !0
      })
   }, o.t = function (e, t) {
      if (1 & t && (e = o(e)), 8 & t) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var a = Object.create(null);
      if (o.r(a), Object.defineProperty(a, "default", {
            enumerable: !0,
            value: e
         }), 2 & t && "string" != typeof e)
         for (var s in e) o.d(a, s, function (t) {
            return e[t]
         }.bind(null, s));
      return a
   }, o.n = function (e) {
      var t = e && e.__esModule ? function () {
         return e.default
      } : function () {
         return e
      };
      return o.d(t, "a", t), t
   }, o.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
   }, o.p = "", o(o.s = 5)
}([function (e, t, o) {
   "use strict";
   Object.defineProperty(t, "__esModule", {
      value: !0
   });
   var a = function (e, t) {
         return new RegExp(" " + t + " ").test(" " + e.className + " ")
      },
      s = function (e) {
         e.style.opacity = "", e.style.display = "block"
      },
      r = function (e) {
         e.style.opacity = "", e.style.display = "none"
      };
   t.hasClass = a, t.addClass = function (e, t) {
      a(e, t) || (e.className += " " + t)
   }, t.removeClass = function (e, t) {
      var o = " " + e.className.replace(/[\t\r\n]/g, " ") + " ";
      if (a(e, t)) {
         for (; o.indexOf(" " + t + " ") >= 0;) o = o.replace(" " + t + " ", " ");
         e.className = o.replace(/^\s+|\s+$/g, "")
      }
   }, t.escapeHtml = function (e) {
      var t = document.createElement("div");
      return t.appendChild(document.createTextNode(e)), t.innerHTML
   }, t._show = s, t.show = function (e) {
      if (e && !e.length) return s(e);
      for (var t = 0; t < e.length; ++t) s(e[t])
   }, t._hide = r, t.hide = function (e) {
      if (e && !e.length) return r(e);
      for (var t = 0; t < e.length; ++t) r(e[t])
   }, t.isDescendant = function (e, t) {
      for (var o = t.parentNode; null !== o;) {
         if (o === e) return !0;
         o = o.parentNode
      }
      return !1
   }, t.getTopMargin = function (e) {
      e.style.left = "-9999px", e.style.display = "block";
      var t, o = e.clientHeight;
      return t = "undefined" != typeof getComputedStyle ? parseInt(getComputedStyle(e).getPropertyValue("padding-top"), 10) : parseInt(e.currentStyle.padding), e.style.left = "", e.style.display = "none", "-" + parseInt((o + t) / 2) + "px"
   }, t.fadeIn = function (e, t) {
      if (+e.style.opacity < 1) {
         t = t || 16, e.style.opacity = 0, e.style.display = "block";
         var o = +new Date,
            a = function (e) {
               function t() {
                  return e.apply(this, arguments)
               }
               return t.toString = function () {
                  return e.toString()
               }, t
            }(function () {
               e.style.opacity = +e.style.opacity + (new Date - o) / 100, o = +new Date, +e.style.opacity < 1 && setTimeout(a, t)
            });
         a()
      }
      e.style.display = "block"
   }, t.fadeOut = function (e, t) {
      t = t || 16, e.style.opacity = 1;
      var o = +new Date,
         a = function (e) {
            function t() {
               return e.apply(this, arguments)
            }
            return t.toString = function () {
               return e.toString()
            }, t
         }(function () {
            e.style.opacity = +e.style.opacity - (new Date - o) / 100, o = +new Date, +e.style.opacity > 0 ? setTimeout(a, t) : e.style.display = "none"
         });
      a()
   }, t.fireClick = function (e) {
      if ("function" == typeof MouseEvent) {
         var t = new MouseEvent("click", {
            view: window,
            bubbles: !1,
            cancelable: !0
         });
         e.dispatchEvent(t)
      } else if (document.createEvent) {
         var o = document.createEvent("MouseEvents");
         o.initEvent("click", !1, !1), e.dispatchEvent(o)
      } else document.createEventObject ? e.fireEvent("onclick") : "function" == typeof e.onclick && e.onclick()
   }, t.stopEventPropagation = function (e) {
      "function" == typeof e.stopPropagation ? (e.stopPropagation(), e.preventDefault()) : window.event && window.event.hasOwnProperty("cancelBubble") && (window.event.cancelBubble = !0)
   }
}, function (e, t, o) {
   "use strict";
   Object.defineProperty(t, "__esModule", {
      value: !0
   });
   t.extend = function (e, t) {
      for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
      return e
   }, t.hexToRgb = function (e) {
      var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
      return t ? parseInt(t[1], 16) + ", " + parseInt(t[2], 16) + ", " + parseInt(t[3], 16) : null
   }, t.isIE8 = function () {
      return window.attachEvent && !window.addEventListener
   }, t.logStr = function (e) {
      window.console && window.console.log("SweetAlert: " + e)
   }, t.colorLuminance = function (e, t) {
      (e = String(e).replace(/[^0-9a-f]/gi, "")).length < 6 && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]), t = t || 0;
      var o, a, s = "#";
      for (a = 0; a < 3; a++) o = parseInt(e.substr(2 * a, 2), 16), s += ("00" + (o = Math.round(Math.min(Math.max(0, o + o * t), 255)).toString(16))).substr(o.length);
      return s
   }
}, function (e, t, o) {
   "use strict";
   var a = function (e) {
      return e && e.__esModule ? e : {
         default: e
      }
   };
   Object.defineProperty(t, "__esModule", {
      value: !0
   });
   var s = o(1),
      r = o(0),
      n = a(o(4)),
      i = a(o(7)),
      l = function () {
         var e = document.createElement("div");
         for (e.innerHTML = i.default; e.firstChild;) document.body.appendChild(e.firstChild)
      },
      d = function (e) {
         function t() {
            return e.apply(this, arguments)
         }
         return t.toString = function () {
            return e.toString()
         }, t
      }(function () {
         var e = document.querySelector(".sweet-alert");
         return e || (l(), e = d()), e
      }),
      c = function () {
         var e = d();
         if (e) return e.querySelector("input")
      },
      u = function () {
         return document.querySelector(".sweet-overlay")
      },
      m = function (e) {
         if (e && 13 === e.keyCode) return !1;
         var t = d(),
            o = t.querySelector(".sa-input-error");
         r.removeClass(o, "show");
         var a = t.querySelector(".sa-error-container");
         r.removeClass(a, "show")
      };
   t.sweetAlertInitialize = l, t.getModal = d, t.getOverlay = u, t.getInput = c, t.setFocusStyle = function (e, t) {
      var o = s.hexToRgb(t);
      e.style.boxShadow = "0 0 2px rgba(" + o + ", 0.8), inset 0 0 0 1px rgba(0, 0, 0, 0.05)"
   }, t.openModal = function (e) {
      var t = d();
      r.fadeIn(u(), 10), r.show(t), r.addClass(t, "showSweetAlert"), r.removeClass(t, "hideSweetAlert"), window.previousActiveElement = document.activeElement, t.querySelector("button.confirm").focus(), setTimeout(function () {
         r.addClass(t, "visible")
      }, 500);
      var o = t.getAttribute("data-timer");
      if ("null" !== o && "" !== o) {
         var a = e;
         t.timeout = setTimeout(function () {
            a && "true" === t.getAttribute("data-has-done-function") ? a(null) : sweetAlert.close()
         }, o)
      }
   }, t.resetInput = function () {
      var e = d(),
         t = c();
      r.removeClass(e, "show-input"), t.value = n.default.inputValue, t.setAttribute("type", n.default.inputType), t.setAttribute("placeholder", n.default.inputPlaceholder), m()
   }, t.resetInputError = m, t.fixVerticalPosition = function () {
      d().style.marginTop = r.getTopMargin(d())
   }
}, function (e) {
   e.exports = {
      config: {
         repoName: "my_project",
         _comment: "errorComando, in case of no command match",
         errorComando: "command not found",
         success: "Success!",
         emptyFolderMessage: "No files in this folder yet",
         emptyStageAreaMessage: "No files to commit",
         emptyCommitsAreaMessage: "Nothing commited yet",
         _comment2: "if user writes 'git', show following error",
         errorMessages: ["usage: git [--version] [--exec-path[=<path>]]", "            [-p|--paginate|--no-pager]", "            [--git-dir=<path>] [--work-tree=<path>]", "            [-c name=value] [--help]", "            <command> [<args>]", " "],
         _comment3: "the following field must have the paragraph tag to work properly. You can add as many as you need.",
         tutorialCompletedMessage: "<p>Well done!</p>"
      },
      lecciones: {
         es: {
            1: {
               orden: "1",
               titulo: "¿Quieres aprender a usar Git?",
               tituloCorto: "¿Quieres aprender Git?",
               tareas: ["Git es un <em>sistema de control de versiones distribuido</em> que permite a equipos de trabajo tratar con un mismo documento o código al mismo tiempo, evitando choques entre los miembros.", "En la terminal que puedes ver en pantalla hemos creado un <em>repositorio</em>, un contendor de archivos. Para inicializar un repositorio en Git debes escribir el siguiente comando: <strong>git init</strong>."],
               comando: "git init",
               alert: "Did not create a Git repo",
               successMessages: ["Initialized empty Git repository in /.git/"],
               repoStatus: {}
            },
            2: {
               orden: "2",
               titulo: "Revisando el status del repositorio",
               tituloCorto: "Revisando el status",
               tareas: ["Bien hecho. Has logrado crear tu primer repositorio. Ahora en nuestro repositorio se ha creado una carpeta llamada <strong>/.git/</strong>. Si creas un repositorio en tu equipo, esta carpeta estará oculta. En ella se encuentran una serie de subdirectorios con archivos que contienen referencias a todos los cambios que han ocurrido en tu repositorio.", "Ahora, usando el comando <strong>git status</strong> veamos cuál es el estado actual de nuestro repositorio."],
               comando: "git status",
               alert: "Did not use git status",
               successMessages: ["# On branch master", "#", "# Initial commit", "#", "nothing to commit", '(create/copy files and use "git add" to track)'],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }
            },
            3: {
               orden: "3",
               titulo: "Agregar archivos y hacer commit",
               tituloCorto: "Primer uso del repositorio",
               tareas: ["Si a lo largo de este tutorial sientes que en tu terminal hay demasiado texto, puedes usar el comando <strong>clear</strong> para limpiar todo el contenido de ella.", "Sigamos. Imagina que agregas un nuevo archivo llamado <strong>mi_plan.txt</strong> a tu repositorio.", "Ahora, si usamos de nuevo el comando <strong>git status</strong> podrás notar que el estado de tu repositorio ha cambiado."],
               comando: "git status",
               alert: "Did not use git status",
               successMessages: ["# On branch master", "#", "# Initial commit", "#", "# Untracked files:", '#   (use "git add <file>..." to include files)', "#", '#   <strong class="red">mi_plan.txt</strong>', "nothing added to commit", "but untracked files present", "(use 'git add' to track)"],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, "mi_plan.txt"]
               }
            },
            4: {
               orden: "4",
               titulo: "Haciendo cambios",
               tituloCorto: "Haciendo cambios",
               tareas: ["¿Notaste cómo el archivo <strong>mi_plan.txt</strong> apareció como <strong>untracked</strong> en la terminal?", "Eso significa que el archivo es nuevo y Git aún no está siguiendo sus cambios.", "Para que Git pueda seguir todos los cambios que se realicen en el archivo, primero debemos agregarlo a la zona de preparación o <strong>Stage</strong> con el comando <strong>git add [nombre del archivo]</strong>."],
               comando: "git add mi_plan.txt",
               alert: "Did not add mi_plan.txt",
               successMessages: ['<span class="success">¡Bien hecho! mi_plan.txt ha sido agregado al <strong>Stage</strong></span>'],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, "mi_plan.txt"],
                  staged: ["mi_plan.txt"]
               }
            },
            5: {
               orden: "5",
               titulo: "Revisando los cambios",
               tituloCorto: "Revisando los cambios",
               tareas: ["¡Excelente! Ahora que git ya está pendiente de los cambios de nuestro archivo, podemos usar de nuevo el comando <strong>git status</strong> para asegurarnos de que todo está bien."],
               comando: "git status",
               alert: "Did not use git status",
               successMessages: ["# On branch master", "#", "# Initial commit", "#", "# Changes to be committed:", '#   (use "git rm --cached <file>..." to unstage)', "#", '#   <span class="green">new file:   mi_plan.txt</span>', "#"],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, "mi_plan.txt"],
                  staged: ["mi_plan.txt"]
               }
            },
            6: {
               orden: "6",
               titulo: "Haciendo commit",
               tituloCorto: "Haciendo commit",
               tareas: ["Ahora con tu archivo preparado y en el <strong>Stage</strong> podemos seguir con el siguiente paso, hacer <strong>commit</strong>.", "Hacer <strong>commit</strong> es simplemente enviar nuestros cambios desde el <strong>Stage</strong> a nuestro repositorio. Si así quisieras, podrías agregar y quitar archivos del <strong>Stage</strong> antes de hacer commit.", "Para guardar tus cambios en el repositorio usamos el comando <strong>git commit -m</strong> seguido de un mensaje que describa los cambios que hemos realizado. En este caso, solo hemos agregado un nuevo archivo, así que solo escribiremos <i>Agregar mi_plan.txt</i> entre comillas."],
               comando: 'git commit -m "Agregar mi_plan.txt"',
               alert: "Did not use git commit",
               successMessages: ["[master (root-commit) 20b5ccd] Agregar mi_plan.txt", "1 file changed, 1 insertion(+)", "create mode 100644 mi_plan.txt", " "],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, "mi_plan.txt"],
                  commits: ["20b5ccd - Agregar mi_plan.txt"]
               }
            },
            7: {
               orden: "7",
               titulo: "Agregando varios archivos",
               tituloCorto: "Agregando varios archivos",
               tareas: ["Nuestro repositorio ya tiene un commit. Pero ahora, imagina que has estado trabajando todo el día en tu proyecto y has terminado creando varios archivos de texto. Usar el comando <strong>git add</strong> para agregarlos uno a uno es bastante fastidioso, ¿verdad? Pues Git nos ofrece un metodo un poco más comodo.", 'Para ello usaremos el comando <strong>git add "*.txt"</strong> el cual agregará todos los archivos de texto que hayan sido editados en nuestro repositorio.'],
               comando: 'git add "*.txt"',
               alert: "Did not use git add",
               successMessages: ['<span class="success">Archivos agregados</span>'],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, {
                     planes_septiembre: ["desarrollo.txt"]
                  }, {
                     planes_octubre: ["maquetado.txt"]
                  }, "reuniones_del_mes.txt", "mi_plan.txt"],
                  staged: [{
                     planes_septiembre: ["desarrollo.txt"]
                  }, {
                     planes_octubre: ["maquetado.txt"]
                  }, "reuniones_del_mes.txt"],
                  commits: ["20b5ccd - Agregar mi_plan.txt"]
               }
            },
            8: {
               orden: "8",
               titulo: "Revertir el Stage",
               tituloCorto: "Git reset",
               tareas: ["Así como <strong>git add</strong> envía tus archivos editados al <strong>Stage</strong>, existe el comando <strong>git reset</strong> que hace todo lo contrario. Retira los archivos del <strong>Stage</strong>.", "Este comando puede recibir los mismos argumentos que hemos visto hasta ahora con <strong>git add</strong>.", "Probemos retirando los archivos de texto que acabamos de agregar al <strong>Stage</strong>."],
               comando: "git reset",
               alert: "Did not use git reset",
               successMessages: ['<span class="success">Los archivos de texto ya no están en el <strong>Stage</strong></span>'],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, {
                     planes_septiembre: ["desarrollo.txt"]
                  }, {
                     planes_octubre: ["maquetado.txt"]
                  }, "reuniones_del_mes.txt", "mi_plan.txt"],
                  commits: ["20b5ccd - Agregar mi_plan.txt"]
               }
            },
            9: {
               orden: "9",
               titulo: "Agregando archivos de nuevo",
               tituloCorto: "Git add #2",
               tareas: ["Como podrás notar nuestros archivos de texto ya no están en en la zona de preparación.", "Ahora, volvamos a agregarlos."],
               comando: 'git add "*.txt"',
               alert: "Did not use git add",
               successMessages: ['<span class="success">Archivos agregados</span>'],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, {
                     planes_septiembre: ["desarrollo.txt"]
                  }, {
                     planes_octubre: ["maquetado.txt"]
                  }, "reuniones_del_mes.txt", "mi_plan.txt"],
                  staged: [{
                     planes_septiembre: ["desarrollo.txt"]
                  }, {
                     planes_octubre: ["maquetado.txt"]
                  }, "reuniones_del_mes.txt"],
                  commits: ["20b5ccd - Agregar mi_plan.txt"]
               }
            },
            10: {
               orden: "10",
               titulo: "Volviendo a hacer commit",
               tituloCorto: "Haciendo commit #2",
               tareas: ["Hagamos un commit con los nuevos cambios.", "¿Qué te parece usar el mensaje <em>Agregar todos los archivos de texto</em>?"],
               comando: 'git commit -m "Agregar todos los archivos de texto"',
               alert: "Did not use git commit",
               successMessages: ["[master (root-commit) 3852b4d]", "'Agregar todos los archivos de texto'", "3 file changed, 3 insertion(+)", "create mode 100644 desarrollo.txt", "create mode 100644 maquetado.txt", "create mode 100644 reuniones_del_mes.txt", " "],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, {
                     planes_septiembre: ["desarrollo.txt"]
                  }, {
                     planes_octubre: ["maquetado.txt"]
                  }, "reuniones_del_mes.txt", "mi_plan.txt"],
                  commits: ["20b5ccd - Agregar mi_plan.txt", "3852b4d - Agregar todos los archivos de texto"]
               }
            },
            11: {
               orden: "11",
               titulo: "Revisando el historial con git log",
               tituloCorto: "Usado git log",
               tareas: ["¿Qué tal? Ya llevamos dos commits hasta ahora.", "Git nos ofrece un comando que permite revisar un historial con todos los commits que hemos hecho hasta el momento en orden cronológico. Este comando es <strong>git log</strong>"],
               comando: "git log",
               alert: "Did not use git log",
               successMessages: ['<span class="yellow">commit: 3852b4db1634463d0bb4d267edb7b3f9cd02ace1</span>', "Author: 4Geeks Student <student@4geeksacademy.co>", "Date: Fri Sep 19 18:30:00 2017 -0400", "    Agregar mi_plan.txt", " ", '<span class="yellow">commit: b652edfd888cd3d5e7fcb857d0dabc5a0fcb5e28</span>', "Author: 4Geeks Student <student@4geeksacademy.co>", "Date: Thu Sep 18 18:00:32 2017 -0400", "    Agregar todos los archivos de texto"],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, {
                     planes_septiembre: ["desarrollo.txt"]
                  }, {
                     planes_octubre: ["maquetado.txt"]
                  }, "reuniones_del_mes.txt", "mi_plan.txt"],
                  commits: ["20b5ccd - Agregar mi_plan.txt", "3852b4d - Agregar todos los archivos de texto"]
               }
            },
            12: {
               orden: "12",
               titulo: "Manejando repositorios remotos",
               tituloCorto: "Git remote",
               tareas: ["Bien, ya hemos aprendido los comandos más básicos de Git. Ahora veamos su utilidad práctica. Imagina que quieres que otras personas tengan acceso a tu repositorio. Para lograr debes subir nuestro repositorio a una plataforma como <strong><a href='https://github.com/' target='_blank'>GitHub</a></strong> que se encarga resguardar repositorios publicos y privados en sus servidores.", "Ahora, una vez creado un repositorio en GitHub tendremos que asociarlo a nuestro repositorio local, para ello usamos <strong>git remote add</strong> seguido del nombre con el cual queremos asociar el repositorio remoto que deseamos agregar y de su URL. Se acostumbra llamar al repositorio remoto principal <strong>origin</strong>, así que haremos eso. Y su URL es <strong>https://github.com/4geeksAcademy/project.git</strong>. Esta vez no son necesarias las comillas."],
               comando: "git remote add origin https://github.com/4geeksAcademy/project.git",
               alert: "Did not use git remote add",
               successMessages: ['<span class="success">Repositorio agregado con éxito</span>'],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, {
                     planes_septiembre: ["desarrollo.txt"]
                  }, {
                     planes_octubre: ["maquetado.txt"]
                  }, "reuniones_del_mes.txt", "mi_plan.txt"],
                  commits: ["20b5ccd - Agregar mi_plan.txt", "3852b4d - Agregar todos los archivos de texto"]
               }
            },
            13: {
               orden: "13",
               titulo: "Usando git push",
               tituloCorto: "Git push",
               tareas: ["Una vez asociado nuestro repositorio local solo tenemos que subir nuestros archivos locales a ese repositorio en línea, a esto se le llama hacer un <strong>push</strong>.", "Para hacerlo usamos el comando <strong>git push -u</strong> seguido del nombre del repositorio remoto a donde queremos hacer el push (origin) y luego el nombre de la <em>rama</em> del repositorio local donde están nuestros archivos. Por defecto, al inicializar un repositorio se crea una rama local llamada <strong>master</strong>, allí están nuestros documentos.", "¿Qué tal si lo intentas?"],
               comando: "git push -u origin master",
               alert: "Did not use git push",
               successMessages: ["Branch master set up to track remote branch"],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, {
                     planes_septiembre: ["desarrollo.txt"]
                  }, {
                     planes_octubre: ["maquetado.txt"]
                  }, "reuniones_del_mes.txt", "mi_plan.txt"],
                  commits: ["20b5ccd - Agregar mi_plan.txt", "3852b4d - Agregar todos los archivos de texto"]
               }
            },
            14: {
               orden: "14",
               titulo: "Usando git pull",
               tituloCorto: "Git pull",
               tareas: ["Es bueno que siempre trabajes con la versión más actual de tu repositorio, es por ello que antes de hacer cualquier cosa siempre actualices tu repositorio local porque tal vez algún miembro de tu equipo ha realizado algún cambio importante", "Para actualizar nuestro repositorio local usamos <strong>git pull</strong> seguido del nombre del repositorio en línea de donde copiaremos los archivos (origin) y luego el nombre de la rama de nuestro repositorio local donde deseamos que se copien (master)."],
               comando: "git pull origin master",
               alert: "Did not use git pull",
               successMessages: ["Updating 3852b4d..3e70b0f", "Fast-forward", '  resumen_mensual.txt | <span class="green">1+</span>', "  1 file changed, 1 insertion(+)", "  create mode 100644 resumen_mensual.txt"],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, {
                     planes_septiembre: ["desarrollo.txt"]
                  }, {
                     planes_octubre: ["maquetado.txt"]
                  }, "reuniones_del_mes.txt", "mi_plan.txt"],
                  commits: ["20b5ccd - Agregar mi_plan.txt", "3852b4d - Agregar todos los archivos de texto", "7d8d808 - Editar frecuencia de reuniones en mi_plan.txt"]
               }
            },
            15: {
               orden: "15",
               titulo: "Observando las ediciones con git diff",
               tituloCorto: "Git diff",
               tareas: ["¿Notas algo diferente en la carpeta de tu repositorio?", "Parece que un miembro de tu equipo ha editado nuestro archivo mi_plan.txt y ha hecho un push al repositorio en GitHub. Antes de comenzar a trabajar creo que mejor revisamos qué cambios realizó nuestro compañero.", "Para ello podemos usar el comando <strong>git diff HEAD</strong> donde HEAD es una referencia al commit más reciente."],
               comando: "git diff HEAD",
               alert: "Did not use git diff",
               successMessages: ["diff --git a/mi_plan.txt b/mi_plan.txt", "index 7d8d808..e725ef6 100644", "--- a/mi_plan.txt", "+++ b/mi_plan.txt", '<span class="blue">@@ -1 +1 @@</span>', '<span class="red">-Realizar reuniones mensuales</span>', '<span class="green">+Realizar reuniones quincenales</span>'],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, {
                     planes_septiembre: ["desarrollo.txt"]
                  }, {
                     planes_octubre: ["maquetado.txt"]
                  }, "reuniones_del_mes.txt", "mi_plan.txt"],
                  commits: ["20b5ccd - Agregar mi_plan.txt", "3852b4d - Agregar todos los archivos de texto", "7d8d808 - Editar frecuencia de reuniones en mi_plan.txt"]
               }
            },
            16: {
               orden: "16",
               titulo: "Eliminando cambios",
               tituloCorto: "Git checkout",
               tareas: ["Bien, ya podemos ver las diferencias. Ahora, imagina que luego de unos minutos de trabajo has realizado un par de cambios en <strong>reuniones_del_mes.txt</strong>, pero resulta que has cometido un error. Podemos deshacer estos cambios con un comando de Git.", "Para ello, usamos el comando <strong>git checkout</strong> seguido del nombre del archivo al cual deseas eliminarle los cambios."],
               comando: 'git checkout "reuniones_del_mes.txt"',
               alert: "Did not use git checkout",
               successMessages: ['<span class="green">Cambios eliminados</span>'],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, {
                     planes_septiembre: ["desarrollo.txt"]
                  }, {
                     planes_octubre: ["maquetado.txt"]
                  }, "reuniones_del_mes.txt", "mi_plan.txt"],
                  commits: ["20b5ccd - Agregar mi_plan.txt", "3852b4d - Agregar todos los archivos de texto", "7d8d808 - Editar frecuencia de reuniones en mi_plan.txt"]
               }
            },
            17: {
               orden: "17",
               titulo: "Trabajando con ramas",
               tituloCorto: "Ramificación",
               tareas: ["¿Recuerdas que dijimos que Git permitía a un equipo de trabajo tratar con un mismo código sin problemas? Bueno, esto es posible gracias a la ramificación del código.", "Git permite crear <strong>ramas</strong> o <strong>branches</strong>. Estas son copias de tu código en las que puedes trabajar sin afectar la versión original.", "¿Por qué no creamos una? Para ello usa el comando <strong>git branch</strong> seguido del nombre de la rama. Llamaremos a la nuestra <strong>mi_version</strong>."],
               comando: "git branch mi_version",
               alert: "Did not use git branch",
               successMessages: ['<span class="green">Rama creada</span>'],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, {
                     planes_septiembre: ["desarrollo.txt"]
                  }, {
                     planes_octubre: ["maquetado.txt"]
                  }, "reuniones_del_mes.txt", "mi_plan.txt"],
                  commits: ["20b5ccd - Agregar mi_plan.txt", "3852b4d - Agregar todos los archivos de texto", "7d8d808 - Editar frecuencia de reuniones en mi_plan.txt"]
               }
            },
            18: {
               orden: "18",
               titulo: "Cambiando de ramas",
               tituloCorto: "Ramificación #2",
               tareas: ["Bien, hemos creado una nueva rama. Pero como puedes ver a tu derecha en la sección <strong>Root folder</strong> aún seguimos en la rama principal <strong>master</strong>. Si queremos trabajar con nuestra copia debemos cambiar de <strong>rama</strong>.", "Para hacerlo usamos el comando <strong>git checkout</strong> seguido del nombre de la rama."],
               comando: "git checkout mi_version",
               alert: "Did not use git checkout",
               successMessages: ["Switched to branch 'mi_version'"],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, {
                     planes_septiembre: ["desarrollo.txt"]
                  }, {
                     planes_octubre: ["maquetado.txt"]
                  }, "reuniones_del_mes.txt", "mi_plan.txt"],
                  commits: ["20b5ccd - Agregar mi_plan.txt", "3852b4d - Agregar todos los archivos de texto", "7d8d808 - Editar frecuencia de reuniones en mi_plan.txt"]
               }
            },
            19: {
               orden: "19",
               titulo: "Realizando cambios en nuestra rama",
               tituloCorto: "Ramificación #3",
               tareas: ["Como podrás notar, ya estamos en nuestra rama. Ahora, ¿qué tal si organizamos un poco mejor nuestro proyecto? Hemos creado una carpeta llamada <strong>tareas</strong> y allí moveremos los archivos que están en <strong>planes_septiembre</strong> y <strong>planes_octubre</strong>.", "Hemos hecho esto por ti, como puedes ver en <strong>Root folder</strong>. Ahora, a veces es algo tedioso tener que agregar los archivos al <strong>Stage</strong> y luego hacer commit. Es por ello que Git nos permie agregar <strong>-a</strong> al comando <strong>git commit</strong> el cual se hará cargo de agregar todos los archivos editados al <strong>Stage</strong> e inmediatamente hacer commit.", "Bien, ejecuta el comando correspodiente y agrega el mensaje: <em>Reorganizar el proyecto</em>."],
               comando: 'git commit -a -m "Reorganizar el proyecto"',
               alert: "Did not use git commit",
               successMessages: ["[mi_version a5cd2f1] Reorganizar proyecto", "  2 files changed, 0 insertions(+), 0 deletions(-)", "  rename {1 => tareas}/desarrollo.txt", "  rename {1 => tareas}/maquetado.txt"],
               repoStatus: {
                  branch: "mi_version",
                  repoFolder: [{
                     ".git": []
                  }, {
                     tareas: ["desarrollo.txt", "maquetado.txt"]
                  }, "reuniones_del_mes.txt", "mi_plan.txt"],
                  commits: ["20b5ccd - Agregar mi_plan.txt", "3852b4d - Agregar todos los archivos de texto", "7d8d808 - Editar frecuencia de reuniones en mi_plan.txt", "a5cd2f1 - Reorganizar el proyecto"]
               }
            },
            20: {
               orden: "20",
               titulo: "Regresando a la rama principal",
               tituloCorto: "Ramificación #4",
               tareas: ["Ahora que ya hemos hecho un commit de nuestros cambios, debemos unirlo a la rama principal para que todo nuestro equipo trabaje con la misma estructura. Para ello primero debemos regresar a la rama principal usando el comando <strong>git checkout master</strong>."],
               comando: "git checkout master",
               alert: "Did not use git checkout",
               successMessages: ["Switched to branch 'master'"],
               repoStatus: {
                  branch: "mi_version",
                  repoFolder: [{
                     ".git": []
                  }, {
                     tareas: ["desarrollo.txt", "maquetado.txt"]
                  }, "reuniones_del_mes.txt", "mi_plan.txt"],
                  commits: ["20b5ccd - Agregar mi_plan.txt", "3852b4d - Agregar todos los archivos de texto", "7d8d808 - Editar frecuencia de reuniones en mi_plan.txt"]
               }
            },
            21: {
               orden: "21",
               titulo: "Uniendo nuestros cambios a Master",
               tituloCorto: "Git merge",
               tareas: ["Como podrás ver la rama <strong>master</strong> no ha sido alternada y todavía tiene la versión anterior de la estructura de nuestras carpetas. ¿Qué tal si aplicamos los cambios que hicimos en nuestra versión a la rama principal?", "Para ello usa el comando <strong>git merge</strong>. Esto lo que hará será tomar los cambios realizados en <strong>mi_version</strong> y unirlos a <strong>master</strong>."],
               comando: "git merge mi_version",
               alert: "Did not use git merge",
               successMessages: ["Updating 7d8d808..ec6888b", "Fast-forward", "   {1 => tareas}/desarrollo.txt | 0", "   {1 => tareas}/maquetado.txt | 0", "  2 files changed, 0 insertions(+), 0 deletions(-)", "  rename {1 => tareas}/desarrollo.txt", "  rename {1 => tareas}/maquetado.txt"],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, {
                     planes_septiembre: ["desarrollo.txt"]
                  }, {
                     planes_octubre: ["maquetado.txt"]
                  }, "reuniones_del_mes.txt", "mi_plan.txt"],
                  commits: ["20b5ccd - Agregar mi_plan.txt", "3852b4d - Agregar todos los archivos de texto", "7d8d808 - Editar frecuencia de reuniones en mi_plan.txt"]
               }
            },
            22: {
               orden: "22",
               titulo: "Eliminando ramas en desuso",
               tituloCorto: "Eliminan ramas",
               tareas: ["Ya que hemos unido nuestros cambios a la rama principal y ya no usaremos más <strong>mi_vesion</strong>, ¿por qué no eliminamos esa rama?", "Siempre es bueno eliminar ramas en desuso, ya que a lo largo de un proyecto pueden generarse muchas ramas y debemos evitar que nuestros compañeros se confundan al usar ramas desactualizadas.", "Para ello usamos el comando <strong>git branch -d</strong> seguido del nombre de la rama a eliminar: <strong>mi_version</strong>."],
               comando: "git branch -d mi_version",
               alert: "Did not use git branch",
               successMessages: ["Deleted branch mi_version (was a5cd2f1)."],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, {
                     tareas: ["desarrollo.txt", "maquetado.txt"]
                  }, "reuniones_del_mes.txt", "mi_plan.txt"],
                  commits: ["20b5ccd - Agregar mi_plan.txt", "3852b4d - Agregar todos los archivos de texto", "7d8d808 - Editar frecuencia de reuniones en mi_plan.txt", "a5cd2f1 - Reorganizar el proyecto"]
               }
            },
            23: {
               orden: "23",
               titulo: "Compartiendo nuestro proyecto",
               tituloCorto: "Git push #2",
               tareas: ["Ya habiendo realizado todos los cambios necesarios es hora de que nuestro equipo comience a trabajar con nuestro repositorio.", "Así que subamoslo a GitHub para ponernos en marcha."],
               comando: "git push",
               alert: "Did not use git push",
               successMessages: ["To https://github.com/4geeksAcademy/project.git", "a5cd2f1..a629e2a  master -> master"],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, {
                     tareas: ["desarrollo.txt", "maquetado.txt"]
                  }, "reuniones_del_mes.txt", "mi_plan.txt"],
                  commits: ["20b5ccd - Agregar mi_plan.txt", "3852b4d - Agregar todos los archivos de texto", "7d8d808 - Editar frecuencia de reuniones en mi_plan.txt", "a5cd2f1 - Reorganizar el proyecto"]
               }
            }
         },
         en: {
            1: {
               orden: "1",
               titulo: "Want to learn some Git?",
               tituloCorto: "Learn Git",
               tareas: ["Git is a <em>distributed version control system</em> that allows people and teams to collaborate, editing the same document or code at the same time, without conflicts,", "In the terminal displayed on the lower part of your screen, we have created a <em>repository</em>, a container of files. To initialize the repository, type the following command: <strong>git init</strong>."],
               comando: "git init",
               alert: "Did not create a Git repo",
               successMessages: ["Initialized empty Git repository in /.git/"],
               repoStatus: {}
            },
            2: {
               orden: "2",
               titulo: "Checking your repo",
               tituloCorto: "Repo status",
               tareas: ["Well done. You have created your first repository. The <strong>git init</strong> command adds a hidden subfolder within the existing directory named <strong>/.git/</strong>. If you create a git repository in your computer, this folder will be hidden. This hidden folder contains subfolders and files that reference every change you did in your repository after initializing it.", "Now let's check the current status of our repository with the command: <strong>git status</strong>."],
               comando: "git status",
               alert: "Did not use git status",
               successMessages: ["# On branch master", "#", "# Initial commit", "#", "nothing to commit", '(create/copy files and use "git add" to track)'],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, "my_plan.txt"]
               }
            },
            3: {
               orden: "3",
               titulo: "Start working on the new repo",
               tituloCorto: "Getting started",
               tareas: ["If at any point during this tutorial you feel your terminal is too cluttered with text, you can clear its contents with the <strong>clear</strong> command.", "Let's continue. Let's imagine we added a new file called <strong>my_plan.txt</strong> in the repository.", "Use again the command <strong>git status</strong> now. You will notice that the status of the repository has changed."],
               comando: "git status",
               alert: "Did not use git status",
               successMessages: ["# On branch master", "#", "# Initial commit", "#", "# Untracked files:", '#   (use "git add &lt;file&gt;..." to include files)', "#", '#   <strong class="red">my_plan.txt</strong>', "nothing added to commit", "but untracked files present", "(use 'git add' to track)"],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, "my_plan.txt"]
               }
            },
            4: {
               orden: "4",
               titulo: "Adding and updating files",
               tituloCorto: "Adding and updating files",
               tareas: ["The output of the <strong>git status</strong> command is telling us that <strong>my_plan.txt</strong> is <strong>untracked</strong>.", "This means that the new file has not yet been added to the Git tracking process.", "To have Git track this file, type the command <strong>git add [file name]</strong>. This process is called <strong>Staging</strong>, or moving files to the <strong>Staging index tree</strong>, meaning our changes are ready to be committed."],
               comando: "git add my_plan.txt",
               alert: "Did not add my_plan.txt",
               successMessages: ['<span class="success">Well done! my_plan.txt has been <strong>Staged</strong></span>'],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, "my_plan.txt"],
                  staged: ["my_plan.txt"]
               }
            },
            5: {
               orden: "5",
               titulo: "Reviewing changes",
               tituloCorto: "Reviewing changes",
               tareas: ["Excellent! Now that we made Git aware of the changes in our file, let's check again the status with the <strong>git status</strong> command to make sure everything is good."],
               comando: "git status",
               alert: "Did not use git status",
               successMessages: ["# On branch master", "#", "# Initial commit", "#", "# Changes to be committed:", '#   (use "git rm --cached &lt;file&gt;..." to unstage)', "#", '#   <span class="green">new file:   my_plan.txt</span>', "#"],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, "my_plan.txt"],
                  staged: ["my_plan.txt"]
               }
            },
            6: {
               orden: "6",
               titulo: "Committing your staged changes",
               tituloCorto: "Committing changes",
               tareas: ["Now that our changes are <strong>Staged</strong>, we are ready to <strong>commit</strong> the changes.", "To <strong>Commit</strong> means simply that our <strong>Staged</strong> changes are ready to be added to our repository. If you wish, you can add or remove files and add them to the <strong>Staging index</strong> as necessary before committing the changes", "To save the changes in our repository, use the command <strong>git commit -m</strong> followed by a commit message that briefly states what exactly happened in between the last version and this. In this case, we added a new file in an empty repository, so the commit message will be simple: <i>Added my_plan.txt</i> (enclosed in double quotes)."],
               comando: 'git commit -m "Added my_plan.txt"',
               alert: "Did not use git commit",
               successMessages: ["[master (root-commit) 20b5ccd] Added my_plan.txt", "1 file changed, 1 insertion(+)", "create mode 100644 my_plan.txt", " "],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, "my_plan.txt"],
                  commits: ["20b5ccd - Added my_plan.txt"]
               }
            },
            7: {
               orden: "7",
               titulo: "Adding multiple files",
               tituloCorto: "Adding multiple files",
               tareas: ["Our repository already has one commit. But what if you have been working all day in this project, and now you have a few new text files to commit? Adding them one by one with the <strong>git add</strong> command is quite tedious, right? No worries, Git has a better method to add multiple files.", 'Type the command <strong>git add "*.txt"</strong>, in order to add all the text files that have been added or edited in our repository.'],
               comando: 'git add "*.txt"',
               alert: "Did not use git add",
               successMessages: ['<span class="success">Added files</span>'],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, {
                     september_plans: ["development.txt"]
                  }, {
                     october_plans: ["mockup.txt"]
                  }, "monthly_meetings.txt", "my_plan.txt"],
                  staged: [{
                     september_plans: ["development.txt"]
                  }, {
                     october_plans: ["mockup.txt"]
                  }, "monthly_meetings.txt"],
                  commits: ["20b5ccd - Added my_plan.txt"]
               }
            },
            8: {
               orden: "8",
               titulo: "Revert to Stage",
               tituloCorto: "Git reset",
               tareas: ["We know that the <strong>git add</strong> command sends edited files to the <strong>Staging index</strong>. The command <strong>git reset</strong> does the the exact opposite: It reverts to the previous state of <strong>Stage</strong>.", "This command accepts the same arguments as <strong>git add</strong>.", "Let's try to reset the last files we added to <strong>Stage</strong>."],
               comando: "git reset",
               alert: "Did not use git reset",
               successMessages: ['<span class="success">Text files were removed from <strong>Stage</strong></span>'],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, {
                     september_plans: ["development.txt"]
                  }, {
                     october_plans: ["mockup.txt"]
                  }, "monthly_meetings.txt", "my_plan.txt"],
                  commits: ["20b5ccd - Added my_plan.txt"]
               }
            },
            9: {
               orden: "9",
               titulo: "Adding files again",
               tituloCorto: "Git add #2",
               tareas: ["As you see on the right panel, our files are not anymore on the <strong>Staging index</strong>.", "Let's add them again."],
               comando: 'git add "*.txt"',
               alert: "Did not use git add",
               successMessages: ['<span class="success">Added files</span>'],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, {
                     september_plans: ["development.txt"]
                  }, {
                     october_plans: ["mockup.txt"]
                  }, "monthly_meetings.txt", "my_plan.txt"],
                  staged: [{
                     september_plans: ["development.txt"]
                  }, {
                     october_plans: ["mockup.txt"]
                  }, "monthly_meetings.txt"],
                  commits: ["20b5ccd - Added my_plan.txt"]
               }
            },
            10: {
               orden: "10",
               titulo: "Committing newly staged changes",
               tituloCorto: "Committing files #2",
               tareas: ["Let's commit our newly staged changes.", "How about adding a more descriptive commit message, such as <em>Added all text files</em>?"],
               comando: 'git commit -m "Added all text files"',
               alert: "Did not use git commit",
               successMessages: ["[master (root-commit) 3852b4d] Added all text files", "3 files changed, 3 insertions(+)", "create mode 100644 development.txt", "create mode 100644 mockup.txt", "create mode 100644 monthly_meetings.txt", " "],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, {
                     september_plans: ["development.txt"]
                  }, {
                     october_plans: ["mockup.txt"]
                  }, "monthly_meetings.txt", "my_plan.txt"],
                  commits: ["20b5ccd - Added my_plan.txt", "3852b4d - Added all text files"]
               }
            },
            11: {
               orden: "11",
               titulo: "Reviewing history of changes with git log",
               tituloCorto: "Using git log",
               tareas: ["How about it? We have already done two commits.", "Git has a command that allows us to review a log of all of our commits in chronological order. Type <strong>git log</strong> on the terminal:"],
               comando: "git log",
               alert: "Did not use git log",
               successMessages: ['<span class="yellow">commit: 3852b4db1634463d0bb4d267edb7b3f9cd02ace1</span>', "Author: 4Geeks Student &lt;student@4geeksacademy.co&gt;", "Date: Fri Sep 19 18:30:00 2017 -0400", "    Added all text files", " ", '<span class="yellow">commit: b652edfd888cd3d5e7fcb857d0dabc5a0fcb5e28</span>', "Author: 4Geeks Student &lt;student@4geeksacademy.co&gt;", "Date: Thu Sep 18 18:00:32 2017 -0400", "    Added my_plan.txt"],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, {
                     september_plans: ["development.txt"]
                  }, {
                     october_plans: ["mockup.txt"]
                  }, "monthly_meetings.txt", "my_plan.txt"],
                  commits: ["20b5ccd - Added my_plan.txt", "3852b4d - Added all text files"]
               }
            },
            12: {
               orden: "12",
               titulo: "Managing remote repositories",
               tituloCorto: "Git remote",
               tareas: ["Great, we have now learned the most basic Git commands. Let's put our knowledge to practice. Imagine that you need other people to access your repository. To do this, you have to upload the repository to a platform such as <strong><a href='https://github.com/' target='_blank'>GitHub</a></strong>, a service that hosts public and private repositories.", "Once our GitHub repository is created, we have to associate it with our local repository. For this, we will use the <strong>git remote add</strong> command, followed by the name and the URL of the remote repository. Usually, the main remote repository is named <strong>origin</strong>. The URL of the remote repository should be <strong>https://github.com/4geeksAcademy/project.git</strong> (double quotes are not needed)."],
               comando: "git remote add origin https://github.com/4geeksAcademy/project.git",
               alert: "Did not use git remote add",
               successMessages: ['<span class="success">Successfully added repository</span>'],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, {
                     september_plans: ["development.txt"]
                  }, {
                     october_plans: ["mockup.txt"]
                  }, "monthly_meetings.txt", "my_plan.txt"],
                  commits: ["20b5ccd - Added my_plan.txt", "3852b4d - Added all text files"]
               }
            },
            13: {
               orden: "13",
               titulo: "Using git push",
               tituloCorto: "Git push",
               tareas: ["After associating our local repository with the remote, we will upload our files to the remote, or <strong>push</strong> our local repository.", "Type <strong>git push -u</strong> followed by the name of the remote repository (origin) and then the name of the local <em>branch</em> we want to push. When we initialize a repository, a local branch called <strong>master</strong> is created automatically, and contains our files.", "Let's try it..."],
               comando: "git push -u origin master",
               alert: "Did not use git push",
               successMessages: ["Branch master set up to track remote branch"],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, {
                     september_plans: ["development.txt"]
                  }, {
                     october_plans: ["mockup.txt"]
                  }, "monthly_meetings.txt", "my_plan.txt"],
                  commits: ["20b5ccd - Added my_plan.txt", "3852b4d - Added all text files"]
               }
            },
            14: {
               orden: "14",
               titulo: "Using git pull",
               tituloCorto: "Git pull",
               tareas: ["It is a good practice to always work with the most recent version of your repository, to make sure that you are not ignoring possible important changes by a team member. This is easily done with Git, as we can update our local repository to match the content of the remote repository.", "To update your local repository, type <strong>git pull</strong>, followed by the name of the remote repository (origin) and the name of the local branch where that will get updated (master)."],
               comando: "git pull origin master",
               alert: "Did not use git pull",
               successMessages: ["Updating 3852b4d..3e70b0f", "Fast-forward", '  monthly_summary.txt | <span class="green">1+</span>', "  1 file changed, 1 insertion(+)", "  create mode 100644 monthly_summary.txt"],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, {
                     september_plans: ["development.txt"]
                  }, {
                     october_plans: ["mockup.txt"]
                  }, "monthly_meetings.txt", "my_plan.txt"],
                  commits: ["20b5ccd - Added my_plan.txt", "3852b4d - Added all text files", "7d8d808 - Edited meetings frequency in my_plan.txt"]
               }
            },
            15: {
               orden: "15",
               titulo: "Comparing different versions with git diff",
               tituloCorto: "Git diff",
               tareas: ["Did you notice something different in your repository?", "Looks like a team member has edited our my_plan.txt file and pushed the changes to the GitHub repository. Let's review the edits from our teammate before starting work.", "Let's use the command <strong>git diff HEAD</strong>, where HEAD refers to the most recent commit."],
               comando: "git diff HEAD",
               alert: "Did not use git diff",
               successMessages: ["diff --git a/my_plan.txt b/my_plan.txt", "index 7d8d808..e725ef6 100644", "--- a/my_plan.txt", "+++ b/my_plan.txt", '<span class="blue">@@ -1 +1 @@</span>', '<span class="red">-Monthly meetings</span>', '<span class="green">+Meetings twice a month</span>'],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, {
                     september_plans: ["development.txt"]
                  }, {
                     october_plans: ["mockup.txt"]
                  }, "monthly_meetings.txt", "my_plan.txt"],
                  commits: ["20b5ccd - Added my_plan.txt", "3852b4d - Added all text files", "7d8d808 - Edited meetings frequency in my_plan.txt"]
               }
            },
            16: {
               orden: "16",
               titulo: "Reverting changes",
               tituloCorto: "Git checkout",
               tareas: ["So we now know how to review changes. Now, imagine that, after working for a few minutes updating the content of <strong>monthly_meetings.txt</strong>, you realize that you made a mistake. Not to worry; we can revert these changes with a Git command.", "Type <strong>git checkout</strong>, followed by the name of the file that you need to revert your changes to."],
               comando: 'git checkout "monthly_meetings.txt"',
               alert: "Did not use git checkout",
               successMessages: ['<span class="green">Reverted changes</span>'],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, {
                     september_plans: ["development.txt"]
                  }, {
                     october_plans: ["mockup.txt"]
                  }, "monthly_meetings.txt", "my_plan.txt"],
                  commits: ["20b5ccd - Added my_plan.txt", "3852b4d - Added all text files", "7d8d808 - Edited meetings frequency in my_plan.txt"]
               }
            },
            17: {
               orden: "17",
               titulo: "Working with branches",
               tituloCorto: "Branching",
               tareas: ["Remember we said that Git allows a work team to work on the same code simultaneously without conflicts? This is made possible with the Git branching model.", "Git allows the creation of <strong>branches</strong>. <strong>Branches</strong> are complete copies of the code that can be used to work on, independently of the original version.", "How about creating a branch? Type the command <strong>git branch</strong>, followed by the branch name. Let's name our branch <strong>my_version</strong>."],
               comando: "git branch my_version",
               alert: "Did not use git branch",
               successMessages: ['<span class="green">Created branch</span>'],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, {
                     september_plans: ["development.txt"]
                  }, {
                     october_plans: ["mockup.txt"]
                  }, "monthly_meetings.txt", "my_plan.txt"],
                  commits: ["20b5ccd - Added my_plan.txt", "3852b4d - Added all text files", "7d8d808 - Edited meetings frequency in my_plan.txt"]
               }
            },
            18: {
               orden: "18",
               titulo: "Switching branches",
               tituloCorto: "Branching #2",
               tareas: ["We have created a new branch. As you can see at the right panel, in the <strong>Root folder</strong> section, we are still working on the main, or <strong>master</strong> branch. To use our newly created <strong>branch</strong>, we have to switch to it.", "Type <strong>git checkout</strong>, followed by the branch name"],
               comando: "git checkout my_version",
               alert: "Did not use git checkout",
               successMessages: ["Switched to branch 'my_version'"],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, {
                     september_plans: ["development.txt"]
                  }, {
                     october_plans: ["mockup.txt"]
                  }, "monthly_meetings.txt", "my_plan.txt"],
                  commits: ["20b5ccd - Added my_plan.txt", "3852b4d - Added all text files", "7d8d808 - Edited meetings frequency in my_plan.txt"]
               }
            },
            19: {
               orden: "19",
               titulo: "Committing changes to our branch",
               tituloCorto: "Branching #3",
               tareas: ["As you can see, now we are working in our own branch. How about improving the structure of our project? We have created a folder named <strong>tasks</strong>, where we can move the files that are currently located in <strong>september_plans</strong> and <strong>october_plans</strong>.", "As you can see on the <strong>Root folder</strong> section, we have already done this. Now, instead of adding the files to the <strong>Stage</strong> and then committing them, Git allows us to use the  <strong>-a</strong> argument for the <strong>git commit</strong> command, which will add all the changed files to <strong>Stage</strong> and then commit the changes.", "Commit the changes using the <strong>-a</strong> option and the message: <em>Reorganized project</em>."],
               comando: 'git commit -a -m "Reorganized project"',
               alert: "Did not use git commit",
               successMessages: ["[my_version a5cd2f1] Reorganized project", "  2 files changed, 0 insertions(+), 0 deletions(-)", "  rename {1 => tasks}/development.txt", "  rename {1 => tasks}/mockup.txt"],
               repoStatus: {
                  branch: "my_version",
                  repoFolder: [{
                     ".git": []
                  }, {
                     tasks: ["development.txt", "mockup.txt"]
                  }, "monthly_meetings.txt", "my_plan.txt"],
                  commits: ["20b5ccd - Added my_plan.txt", "3852b4d - Added all text files", "7d8d808 - Edited meetings frequency in my_plan.txt", "a5cd2f1 - Reorganized project"]
               }
            },
            20: {
               orden: "20",
               titulo: "Switching to master branch",
               tituloCorto: "Branching #4",
               tareas: ["After committing our changes to our branch, we should merge it with the main branch, so that the rest of our team all have the same project structure. Let's switch to the main branch with the command <strong>git checkout master</strong>."],
               comando: "git checkout master",
               alert: "Did not use git checkout",
               successMessages: ["Switched to branch 'master'"],
               repoStatus: {
                  branch: "my_version",
                  repoFolder: [{
                     ".git": []
                  }, {
                     tasks: ["development.txt", "mockup.txt"]
                  }, "monthly_meetings.txt", "my_plan.txt"],
                  commits: ["20b5ccd - Added my_plan.txt", "3852b4d - Added all text files", "7d8d808 - Edited meetings frequency in my_plan.txt"]
               }
            },
            21: {
               orden: "21",
               titulo: "Merging changes to the Master branch",
               tituloCorto: "Git merge",
               tareas: ["As you can see, the branch <strong>master</strong> has not been altered, so the changes we did in our own branch are not reflected to the master's branch folder structure.  Let's apply our changes to the master branch!", "Type <strong>git merge</strong>. With this command, the changes in the branch <strong>my_version</strong> will be merged with the <strong>master</strong>. branch"],
               comando: "git merge my_version",
               alert: "Did not use git merge",
               successMessages: ["Updating 7d8d808..ec6888b", "Fast-forward", "   {1 => tasks}/development.txt | 0", "   {1 => tasks}/mockup.txt | 0", "  2 files changed, 0 insertions(+), 0 deletions(-)", "  rename {1 => tasks}/development.txt", "  rename {1 => tasks}/mockup.txt"],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, {
                     september_plans: ["development.txt"]
                  }, {
                     october_plans: ["mockup.txt"]
                  }, "monthly_meetings.txt", "my_plan.txt"],
                  commits: ["20b5ccd - Added my_plan.txt", "3852b4d - Added all text files", "7d8d808 - Edited meetings frequency in my_plan.txt", "a5cd2f1 - Reorganized project"]
               }
            },
            22: {
               orden: "22",
               titulo: "Deleting unused branches",
               tituloCorto: "Deleting branches",
               tareas: ["We have merged our changes with the main branch, so we won't be using <strong>my_version</strong> anymore. Let's remove this branch.", "It is a good practice to delete unused branches as our project increases, having many branches can be hard to maintain and many of the older branches can be left behind in updates.", "Type <strong>git branch -d</strong>, followed by the name of the branch we want to delete: <strong>my_version</strong>."],
               comando: "git branch -d my_version",
               alert: "Did not use git branch",
               successMessages: ["Deleted branch my_version (was a5cd2f1)."],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, {
                     tasks: ["development.txt", "mockup.txt"]
                  }, "monthly_meetings.txt", "my_plan.txt"],
                  commits: ["20b5ccd - Added my_plan.txt", "3852b4d - Added all text files", "7d8d808 - Edited meetings frequency in my_plan.txt", "a5cd2f1 - Reorganized project"]
               }
            },
            23: {
               orden: "23",
               titulo: "Sharing our project",
               tituloCorto: "Git push #2",
               tareas: ["We have now made all the necessary changes to our project, so it is time to share the repository with our team so that we can all work in it.", "Let's upload our repository to GitHub."],
               comando: "git push",
               alert: "Did not use git push",
               successMessages: ["To https://github.com/4geeksAcademy/project.git", "a5cd2f1..a629e2a  master -> master"],
               repoStatus: {
                  branch: "master",
                  repoFolder: [{
                     ".git": []
                  }, {
                     tasks: ["development.txt", "mockup.txt"]
                  }, "monthly_meetings.txt", "my_plan.txt"],
                  commits: ["20b5ccd - Added my_plan.txt", "3852b4d - Added all text files", "7d8d808 - Edited meetings frequency in my_plan.txt", "a5cd2f1 - Reorganized project"]
               }
            }
         }
      }
   }
}, function (e, t, o) {
   "use strict";
   Object.defineProperty(t, "__esModule", {
      value: !0
   });
   t.default = {
      title: "",
      text: "",
      type: null,
      allowOutsideClick: !1,
      showConfirmButton: !0,
      showCancelButton: !1,
      closeOnConfirm: !0,
      closeOnCancel: !0,
      confirmButtonText: "OK",
      confirmButtonColor: "#8CD4F5",
      cancelButtonText: "Cancel",
      imageUrl: null,
      imageSize: null,
      timer: null,
      customClass: "",
      html: !1,
      animation: !0,
      allowEscapeKey: !0,
      inputType: "text",
      inputPlaceholder: "",
      inputValue: "",
      showLoaderOnConfirm: !1
   }, e.exports = t.default
}, function (e, t, o) {
   "use strict";
   o.r(t);
   o(6);
   var a = o(3);
   window.onload = (() => (function () {
      var e = document.querySelector("#lang").value,
         t = a.lecciones[e],
         o = a.config,
         s = 1,
         r = function (e) {
            let t, o = 0;
            for (t in e) e.hasOwnProperty(t) && o++;
            return o
         }(t),
         n = 0,
         i = 100 / r,
         l = [],
         d = 1,
         c = document.querySelector("#lang"),
         u = document.querySelector("nav"),
         m = document.querySelector(".console-area"),
         p = document.querySelector("#console-input"),
         g = document.querySelector(".tareas"),
         h = document.querySelector(".branch"),
         b = document.querySelector("#repository .repo-status .repo-folder"),
         f = document.querySelector("#repository .repo-status .staged"),
         y = document.querySelector("#repository .repo-status .commits");

      function v() {
         let e = document.querySelector("#instrucciones .titulo");
         e.innerHTML = t[s].titulo;
         let a = document.querySelector("#instrucciones .orden");
         a.innerHTML = t[s].orden;
         let l = document.querySelector(".comando");
         t[s].comando.length > 50 ? l.innerHTML = t[s].comando.substring(0, 41) + "..." : l.innerHTML = t[s].comando, C(g);
         for (var d = 0; d < t[s].tareas.length; d++) {
            let e = S("p", t[s].tareas[d]);
            g.appendChild(e)
         }
         if (C(u, "a"), u.appendChild(function () {
               let e = document.createElement("ul");
               for (let a = 1; a <= r; a++) {
                  let r = document.createElement("li"),
                     l = S("a", t[a].orden + " - " + t[a].tituloCorto);
                  r.appendChild(l).classList.add("nav-text"), a < s ? r.appendChild(l).classList.add("completed") : r.appendChild(l).classList.add("learning"), r.addEventListener("click", e => {
                     if (u.classList.contains("expanded")) {
                        e.stopPropagation(), u.scrollTop = 0, m.appendChild(w()), _(), n = ((s = a) - 1) * i, document.querySelector("#myBar").style.width = n + "%", v(), C(f, "h3");
                        let r = s - 1 < 1 ? 1 : s - 1;
                        if (void 0 != t[r].repoStatus.staged) {
                           let e = q(t[r].repoStatus.staged);
                           f.appendChild(e)
                        } else {
                           let e = document.createElement("ul"),
                              t = S("li", o.emptyStageAreaMessage);
                           e.appendChild(t).classList.add("commit"), f.appendChild(e)
                        }
                        if (C(y, "h3"), void 0 != t[r].repoStatus.commits) {
                           let e = document.createElement("ul");
                           for (let o = 0; o < t[r].repoStatus.commits.length; o++) {
                              let a = S("li", t[r].repoStatus.commits[o]);
                              e.appendChild(a).classList.add("commit")
                           }
                           y.appendChild(e)
                        } else {
                           let e = document.createElement("ul"),
                              t = S("li", o.emptyCommitsAreaMessage);
                           e.appendChild(t).classList.add("commit"), y.appendChild(e)
                        }
                        u.classList.remove("expanded"), p.value = "", p.focus()
                     }
                  }), e.appendChild(r)
               }
               return e
            }()), C(b, "h3"), void 0 !== t[s].repoStatus.branch) {
            void 0 !== t[s].repoStatus.branch && (h.innerHTML = "(" + t[s].repoStatus.branch + ")");
            let e = q(t[s].repoStatus.repoFolder);
            b.appendChild(e)
         } else {
            let e = document.createElement("ul"),
               t = S("li", o.emptyFolderMessage);
            e.appendChild(t).classList.add("info"), b.appendChild(e)
         }
      }

      function x(e) {
         let a = document.querySelector(".current-line"),
            l = document.createElement("div");
         l.classList.add("line");
         let d = S("p", p.value);
         d.style.marginTop = "15px", d.style.marginBottom = "15px";
         let c = document.createElement("img");
         c.classList.add("line-marker"), c.setAttribute("src", "./img/logo-blue.png"), m.removeChild(a), l.appendChild(c), l.appendChild(d), m.appendChild(l), m.classList.remove("current-line"), setTimeout(function () {
            ! function (e) {
               if ("pass" == e) {
                  n += i, document.querySelector("#myBar").style.width = n + "%";
                  for (var a = 0; a < t[s].successMessages.length; a++) {
                     let e = S("p", t[s].successMessages[a]);
                     m.appendChild(e)
                  }
                  let e = S("p", o.success);
                  if (e.classList.add("success"), m.appendChild(e), C(f, "h3"), void 0 !== t[s].repoStatus.staged) {
                     let e = q(t[s].repoStatus.staged);
                     f.appendChild(e)
                  } else {
                     let e = document.createElement("ul"),
                        t = S("li", o.emptyStageAreaMessage);
                     e.appendChild(t).classList.add("commit"), f.appendChild(e)
                  }
                  if (C(y, "h3"), void 0 !== t[s].repoStatus.commits) {
                     let e = document.createElement("ul");
                     for (let o = 0; o < t[s].repoStatus.commits.length; o++) {
                        let a = S("li", t[s].repoStatus.commits[o]);
                        e.appendChild(a).classList.add("commit")
                     }
                     y.appendChild(e)
                  } else {
                     let e = document.createElement("ul"),
                        t = S("li", o.emptyCommitsAreaMessage);
                     e.appendChild(t).classList.add("commit"), y.appendChild(e)
                  }
                  s++
               } else {
                  let e = p.value,
                     r = null !== e.match(/(git)\s(\w+)/g) ? e.match(/(git)\s(\w+)/g)[0] : void 0,
                     n = t[s].comando;
                  if (void 0 != r && n.match(/(git)\s(\w+)/g)[0] == r) {
                     let e = S("p", "Used " + r);
                     e.classList.add("blue"), m.appendChild(e), e = S("p", "Check your arguments"), m.appendChild(e)
                  } else if (RegExp("(git)", "g").test(p.value.trim())) {
                     for (var a = 0; a < o.errorMessages.length; a++) {
                        let e = S("p", o.errorMessages[a]);
                        m.appendChild(e)
                     }
                     let e = S("p", t[s].alert);
                     e.classList.add("error"), m.appendChild(e)
                  } else {
                     let e = S("p", p.value + ": " + o.errorComando);
                     e.style.marginTop, m.appendChild(e);
                     let a = S("p", t[s].alert);
                     a.classList.add("error"), m.appendChild(a)
                  }
               }
            }(e);
            let l = document.createElement("div");
            m.appendChild(l), m.lastElementChild.classList.add("current-line"), m.lastElementChild.style.marginTop = "15px", (a = document.querySelector(".current-line")).innerHTML = '<img class="line-marker" src="./img/logo-blue.png"></img><textarea id="console-input" autocomplete="off" autocorrect="off" autocapitalize="off" spellCheck="false"></textarea>', s > r ? (document.querySelector(".main-menu ul li:last-child a").classList.remove("learning"), document.querySelector(".main-menu ul li:last-child a").classList.add("completed"), setTimeout(function () {
               sweetAlert({
                  title: "Congratulations!",
                  text: o.tutorialCompletedMessage,
                  html: !0,
                  type: "success",
                  showConfirmButton: !0
               })
            }, 5e3)) : (v(), _(), p.value = "", p.focus())
         }, 1e3)
      }

      function _() {
         (p = document.querySelector("#console-input")).addEventListener("keydown", e => {
            if (13 === e.keyCode) {
               if (e.preventDefault(), p.value.trim().length < 1) return;
               if ("clear" === p.value.trim()) return m.appendChild(w()), _(), void p.focus();
               if ("clear" === p.value.trim()) return m.appendChild(w()), _(), void p.focus();
               p.value.trim() === t[s].comando ? (l.push(p.value), x("pass")) : (l.push(p.value), x())
            }
            38 === e.keyCode && d <= l.length && l.length > 0 && (p.value = "", p.value = l[l.length - d], d++)
         })
      }

      function w() {
         C(m);
         let e = document.createElement("div");
         e.classList.add("current-line");
         let t = document.createElement("img");
         t.setAttribute("src", "./img/logo-blue.png");
         let o = document.createElement("textarea");
         return e.appendChild(t).classList.add("line-marker"), o.id = "console-input", o.setAttribute("autocomplete", "off"), o.setAttribute("autocorrect", "off"), o.setAttribute("autocapitalize", "off"), o.setAttribute("spellcheck", "false"), e.appendChild(o), e
      }

      function S(e, t) {
         let o = document.createElement(e);
         return o.innerHTML = t, o
      }

      function C(e, t) {
         var o = 0;
         if (0 !== e.childElementCount)
            for (let a = 0; o < e.childElementCount; a++) void 0 === t || e.children[a].tagName !== t.toUpperCase() ? e.removeChild(e.children[o]) : o++
      }

      function q(e) {
         let t = document.createElement("ul");
         for (var o = 0; o < e.length; o++) {
            var a = e[o];
            if ("object" == typeof a)
               for (var s in a) {
                  let e = S("li", s);
                  if (e.addEventListener("click", e => {
                        e.target.nextSibling.classList.toggle("closed")
                     }), t.appendChild(e).classList.add("folder"), a[s].length > 0) {
                     let e = document.createElement("li"),
                        o = q(a[s]);
                     e.classList.add("closed"), e.appendChild(o), t.appendChild(e)
                  } else if (".git" === s) {
                     let e = document.createElement("li");
                     e.classList.add("closed");
                     let o = S("ul", '<li class="info">Too many files to show! LOL</li>');
                     e.appendChild(o), t.appendChild(e)
                  } else {
                     let e = document.createElement("li");
                     e.classList.add("closed");
                     let o = S("ul", '<li class="info">Empty folder</li>');
                     e.appendChild(o), t.appendChild(e)
                  }
               } else {
                  let e = S("li", a);
                  t.appendChild(e).classList.add("file")
               }
         }
         return t
      }
      v(), _(), document.querySelector("#repository .header .title").innerHTML = o.repoName, setTimeout(function () {
         document.body.style.opacity = 1
      }, 1e3), document.querySelector(".comando").addEventListener("click", () => {
         p.value = "", p.classList.add("typed"), p.value = t[s].comando, setTimeout(function () {
            p.classList.remove("typed"), p.focus()
         }, 1e3)
      }), c.addEventListener("change", () => {
         if (e = c.value, t = a.lecciones[e], m.appendChild(w()), _(), v(), C(f, "h3"), void 0 != t[s].repoStatus.staged) {
            let e = q(t[s].repoStatus.staged);
            f.appendChild(e)
         } else {
            let e = document.createElement("ul"),
               t = S("li", o.emptyStageAreaMessage);
            e.appendChild(t).classList.add("commit"), f.appendChild(e)
         }
         if (C(y, "h3"), void 0 != t[s].repoStatus.commits) {
            let e = document.createElement("ul");
            for (let o = 0; o < t[s].repoStatus.commits.length; o++) {
               let a = S("li", t[s].repoStatus.commits[o]);
               e.appendChild(a).classList.add("commit")
            }
            y.appendChild(e)
         } else {
            let e = document.createElement("ul"),
               t = S("li", o.emptyCommitsAreaMessage);
            e.appendChild(t).classList.add("commit"), y.appendChild(e)
         }
         p.focus()
      }), u.addEventListener("click", e => {
         !1 === u.classList.contains("expanded") && u.classList.toggle("expanded")
      }), document.querySelector("main").addEventListener("click", () => {
         u.classList.remove("expanded"), u.scrollTop = 0
      }), document.querySelector("#showNavbar").addEventListener("mouseover", () => {
         setTimeout(function () {
            u.classList.add("expanded")
         }, 100)
      }), document.querySelector("#showNavbar").addEventListener("mouseleave", () => {
         u.classList.remove("expanded")
      }), document.querySelector(".hide-repo").addEventListener("click", () => {
         let e = document.querySelector(".column-1"),
            t = document.querySelector(".column-2");
         document.querySelector(".show-repo").classList.toggle("hidden"), e.style.width = "100%", e.style.flexDirection = "row", t.classList.toggle("hidden");
         let o = document.querySelector("#instrucciones"),
            a = document.querySelector("#terminal");
         o.style.flex = "2", o.style.height = "100%", m.style.height = "100%", a.style.flex = "3", a.style.height = "100%", a.style.marginTop = "38.39px"
      }), document.querySelector(".show-repo").addEventListener("click", () => {
         let e = document.querySelector(".column-1"),
            t = document.querySelector(".column-2"),
            o = document.querySelector("#instrucciones"),
            a = document.querySelector("#terminal");
         e.style.width = "70%", e.style.flexDirection = "column", o.style.flex = "3", o.style.height = "auto", a.style.flex = "2", a.style.marginTop = "0", setTimeout(function () {
            t.classList.toggle("hidden")
         }, 900), document.querySelector(".show-repo").classList.toggle("hidden")
      })
   })())
}, function (e, t, o) {
   "use strict";
   var a = function (e) {
      return e && e.__esModule ? e : {
         default: e
      }
   };
   Object.defineProperty(t, "__esModule", {
      value: !0
   });
   var s, r, n, i, l = o(0),
      d = o(1),
      c = o(2),
      u = o(8),
      m = a(o(9)),
      p = a(o(4)),
      g = a(o(10));
   t.default = n = i = function () {
      var e = arguments[0];

      function t(t) {
         var o = e;
         return void 0 === o[t] ? p.default[t] : o[t]
      }
      if (l.addClass(document.body, "stop-scrolling"), c.resetInput(), void 0 === e) return d.logStr("SweetAlert expects at least 1 attribute!"), !1;
      var o = d.extend({}, p.default);
      switch (typeof e) {
         case "string":
            o.title = e, o.text = arguments[1] || "", o.type = arguments[2] || "";
            break;
         case "object":
            if (void 0 === e.title) return d.logStr('Missing "title" argument!'), !1;
            for (var a in o.title = e.title, p.default) o[a] = t(a);
            o.confirmButtonText = o.showCancelButton ? "Confirm" : p.default.confirmButtonText, o.confirmButtonText = t("confirmButtonText"), o.doneFunction = arguments[1] || null;
            break;
         default:
            return d.logStr('Unexpected type of argument! Expected "string" or "object", got ' + typeof e), !1
      }
      g.default(o), c.fixVerticalPosition(), c.openModal(arguments[1]);
      for (var n = c.getModal(), h = n.querySelectorAll("button"), b = ["onclick", "onmouseover", "onmouseout", "onmousedown", "onmouseup", "onfocus"], f = function (e) {
            return u.handleButton(e, o, n)
         }, y = 0; y < h.length; y++)
         for (var v = 0; v < b.length; v++) {
            var x = b[v];
            h[y][x] = f
         }
      c.getOverlay().onclick = f, s = window.onkeydown;
      window.onkeydown = function (e) {
         return m.default(e, o, n)
      }, window.onfocus = function () {
         setTimeout(function () {
            void 0 !== r && (r.focus(), r = void 0)
         }, 0)
      }, i.enableButtons()
   }, n.setDefaults = i.setDefaults = function (e) {
      if (!e) throw new Error("userParams is required");
      if ("object" != typeof e) throw new Error("userParams has to be a object");
      d.extend(p.default, e)
   }, n.close = i.close = function () {
      var e = c.getModal();
      l.fadeOut(c.getOverlay(), 5), l.fadeOut(e, 5), l.removeClass(e, "showSweetAlert"), l.addClass(e, "hideSweetAlert"), l.removeClass(e, "visible");
      var t = e.querySelector(".sa-icon.sa-success");
      l.removeClass(t, "animate"), l.removeClass(t.querySelector(".sa-tip"), "animateSuccessTip"), l.removeClass(t.querySelector(".sa-long"), "animateSuccessLong");
      var o = e.querySelector(".sa-icon.sa-error");
      l.removeClass(o, "animateErrorIcon"), l.removeClass(o.querySelector(".sa-x-mark"), "animateXMark");
      var a = e.querySelector(".sa-icon.sa-warning");
      return l.removeClass(a, "pulseWarning"), l.removeClass(a.querySelector(".sa-body"), "pulseWarningIns"), l.removeClass(a.querySelector(".sa-dot"), "pulseWarningIns"), setTimeout(function () {
         var t = e.getAttribute("data-custom-class");
         l.removeClass(e, t)
      }, 300), l.removeClass(document.body, "stop-scrolling"), window.onkeydown = s, window.previousActiveElement && window.previousActiveElement.focus(), r = void 0, clearTimeout(e.timeout), !0
   }, n.showInputError = i.showInputError = function (e) {
      var t = c.getModal(),
         o = t.querySelector(".sa-input-error");
      l.addClass(o, "show");
      var a = t.querySelector(".sa-error-container");
      l.addClass(a, "show"), a.querySelector("p").innerHTML = e, setTimeout(function () {
         n.enableButtons()
      }, 1), t.querySelector("input").focus()
   }, n.resetInputError = i.resetInputError = function (e) {
      if (e && 13 === e.keyCode) return !1;
      var t = c.getModal(),
         o = t.querySelector(".sa-input-error");
      l.removeClass(o, "show");
      var a = t.querySelector(".sa-error-container");
      l.removeClass(a, "show")
   }, n.disableButtons = i.disableButtons = function (e) {
      var t = c.getModal(),
         o = t.querySelector("button.confirm"),
         a = t.querySelector("button.cancel");
      o.disabled = !0, a.disabled = !0
   }, n.enableButtons = i.enableButtons = function (e) {
      var t = c.getModal(),
         o = t.querySelector("button.confirm"),
         a = t.querySelector("button.cancel");
      o.disabled = !1, a.disabled = !1
   }, "undefined" != typeof window ? window.sweetAlert = window.swal = n : d.logStr("SweetAlert is a frontend module!"), e.exports = t.default
}, function (e, t, o) {
   "use strict";
   Object.defineProperty(t, "__esModule", {
      value: !0
   });
   t.default = '<div class="sweet-overlay" tabIndex="-1"></div><div class="sweet-alert"><div class="sa-icon sa-error">\n      <span class="sa-x-mark">\n        <span class="sa-line sa-left"></span>\n        <span class="sa-line sa-right"></span>\n      </span>\n    </div><div class="sa-icon sa-warning">\n      <span class="sa-body"></span>\n      <span class="sa-dot"></span>\n    </div><div class="sa-icon sa-info"></div><div class="sa-icon sa-success">\n      <span class="sa-line sa-tip"></span>\n      <span class="sa-line sa-long"></span>\n\n      <div class="sa-placeholder"></div>\n      <div class="sa-fix"></div>\n    </div><div class="sa-icon sa-custom"></div><h2>Title</h2>\n    <p>Text</p>\n    <fieldset>\n      <input type="text" tabIndex="3" />\n      <div class="sa-input-error"></div>\n    </fieldset><div class="sa-error-container">\n      <div class="icon">!</div>\n      <p>Not valid!</p>\n    </div><div class="sa-button-container">\n      <button class="cancel" tabIndex="2">Cancel</button>\n      <div class="sa-confirm-button-container">\n        <button class="confirm" tabIndex="1">OK</button><div class="la-ball-fall">\n          <div></div>\n          <div></div>\n          <div></div>\n        </div>\n      </div>\n    </div></div>', e.exports = t.default
}, function (e, t, o) {
   "use strict";
   Object.defineProperty(t, "__esModule", {
      value: !0
   });
   var a = o(1),
      s = (o(2), o(0)),
      r = function (e, t) {
         var o = !0;
         s.hasClass(e, "show-input") && ((o = e.querySelector("input").value) || (o = "")), t.doneFunction(o), t.closeOnConfirm && sweetAlert.close(), t.showLoaderOnConfirm && sweetAlert.disableButtons()
      },
      n = function (e, t) {
         var o = String(t.doneFunction).replace(/\s/g, "");
         "function(" === o.substring(0, 9) && ")" !== o.substring(9, 10) && t.doneFunction(!1), t.closeOnCancel && sweetAlert.close()
      };
   t.default = {
      handleButton: function (e, t, o) {
         var i, l, d, c = e || window.event,
            u = c.target || c.srcElement,
            m = -1 !== u.className.indexOf("confirm"),
            p = -1 !== u.className.indexOf("sweet-overlay"),
            g = s.hasClass(o, "visible"),
            h = t.doneFunction && "true" === o.getAttribute("data-has-done-function");

         function b(e) {
            m && t.confirmButtonColor && (u.style.backgroundColor = e)
         }
         switch (m && t.confirmButtonColor && (i = t.confirmButtonColor, l = a.colorLuminance(i, -.04), d = a.colorLuminance(i, -.14)), c.type) {
            case "mouseover":
               b(l);
               break;
            case "mouseout":
               b(i);
               break;
            case "mousedown":
               b(d);
               break;
            case "mouseup":
               b(l);
               break;
            case "focus":
               var f = o.querySelector("button.confirm"),
                  y = o.querySelector("button.cancel");
               m ? y.style.boxShadow = "none" : f.style.boxShadow = "none";
               break;
            case "click":
               var v = o === u,
                  x = s.isDescendant(o, u);
               if (!v && !x && g && !t.allowOutsideClick) break;
               m && h && g ? r(o, t) : h && g || p ? n(o, t) : s.isDescendant(o, u) && "BUTTON" === u.tagName && sweetAlert.close()
         }
      },
      handleConfirm: r,
      handleCancel: n
   }, e.exports = t.default
}, function (e, t, o) {
   "use strict";
   Object.defineProperty(t, "__esModule", {
      value: !0
   });
   var a = o(0),
      s = o(2);
   t.default = function (e, t, o) {
      var r = e || window.event,
         n = r.keyCode || r.which,
         i = o.querySelector("button.confirm"),
         l = o.querySelector("button.cancel"),
         d = o.querySelectorAll("button[tabindex]");
      if (-1 !== [9, 13, 32, 27].indexOf(n)) {
         for (var c = r.target || r.srcElement, u = -1, m = 0; m < d.length; m++)
            if (c === d[m]) {
               u = m;
               break
            } 9 === n ? (c = -1 === u ? i : u === d.length - 1 ? d[0] : d[u + 1], a.stopEventPropagation(r), c.focus(), t.confirmButtonColor && s.setFocusStyle(c, t.confirmButtonColor)) : 13 === n ? ("INPUT" === c.tagName && (c = i, i.focus()), c = -1 === u ? i : void 0) : 27 === n && !0 === t.allowEscapeKey ? (c = l, a.fireClick(c, r)) : c = void 0
      }
   }, e.exports = t.default
}, function (e, t, o) {
   "use strict";
   Object.defineProperty(t, "__esModule", {
      value: !0
   });
   var a = o(1),
      s = o(2),
      r = o(0),
      n = ["error", "warning", "info", "success", "input", "prompt"];
   t.default = function (e) {
      var t = s.getModal(),
         o = t.querySelector("h2"),
         i = t.querySelector("p"),
         l = t.querySelector("button.cancel"),
         d = t.querySelector("button.confirm");
      if (o.innerHTML = e.html ? e.title : r.escapeHtml(e.title).split("\n").join("<br>"), i.innerHTML = e.html ? e.text : r.escapeHtml(e.text || "").split("\n").join("<br>"), e.text && r.show(i), e.customClass) r.addClass(t, e.customClass), t.setAttribute("data-custom-class", e.customClass);
      else {
         var c = t.getAttribute("data-custom-class");
         r.removeClass(t, c), t.setAttribute("data-custom-class", "")
      }
      if (r.hide(t.querySelectorAll(".sa-icon")), e.type && !a.isIE8()) {
         var u = function () {
            for (var o = !1, a = 0; a < n.length; a++)
               if (e.type === n[a]) {
                  o = !0;
                  break
               } if (!o) return logStr("Unknown alert type: " + e.type), {
               v: !1
            };
            var i = void 0; - 1 !== ["success", "error", "warning", "info"].indexOf(e.type) && (i = t.querySelector(".sa-icon.sa-" + e.type), r.show(i));
            var l = s.getInput();
            switch (e.type) {
               case "success":
                  r.addClass(i, "animate"), r.addClass(i.querySelector(".sa-tip"), "animateSuccessTip"), r.addClass(i.querySelector(".sa-long"), "animateSuccessLong");
                  break;
               case "error":
                  r.addClass(i, "animateErrorIcon"), r.addClass(i.querySelector(".sa-x-mark"), "animateXMark");
                  break;
               case "warning":
                  r.addClass(i, "pulseWarning"), r.addClass(i.querySelector(".sa-body"), "pulseWarningIns"), r.addClass(i.querySelector(".sa-dot"), "pulseWarningIns");
                  break;
               case "input":
               case "prompt":
                  l.setAttribute("type", e.inputType), l.value = e.inputValue, l.setAttribute("placeholder", e.inputPlaceholder), r.addClass(t, "show-input"), setTimeout(function () {
                     l.focus(), l.addEventListener("keyup", swal.resetInputError)
                  }, 400)
            }
         }();
         if ("object" == typeof u) return u.v
      }
      if (e.imageUrl) {
         var m = t.querySelector(".sa-icon.sa-custom");
         m.style.backgroundImage = "url(" + e.imageUrl + ")", r.show(m);
         var p = 80,
            g = 80;
         if (e.imageSize) {
            var h = e.imageSize.toString().split("x"),
               b = h[0],
               f = h[1];
            b && f ? (p = b, g = f) : logStr("Parameter imageSize expects value with format WIDTHxHEIGHT, got " + e.imageSize)
         }
         m.setAttribute("style", m.getAttribute("style") + "width:" + p + "px; height:" + g + "px")
      }
      t.setAttribute("data-has-cancel-button", e.showCancelButton), e.showCancelButton ? l.style.display = "inline-block" : r.hide(l), t.setAttribute("data-has-confirm-button", e.showConfirmButton), e.showConfirmButton ? d.style.display = "inline-block" : r.hide(d), e.cancelButtonText && (l.innerHTML = r.escapeHtml(e.cancelButtonText)), e.confirmButtonText && (d.innerHTML = r.escapeHtml(e.confirmButtonText)), e.confirmButtonColor && (d.style.backgroundColor = e.confirmButtonColor, d.style.borderLeftColor = e.confirmLoadingButtonColor, d.style.borderRightColor = e.confirmLoadingButtonColor, s.setFocusStyle(d, e.confirmButtonColor)), t.setAttribute("data-allow-outside-click", e.allowOutsideClick);
      var y = !!e.doneFunction;
      t.setAttribute("data-has-done-function", y), e.animation ? "string" == typeof e.animation ? t.setAttribute("data-animation", e.animation) : t.setAttribute("data-animation", "pop") : t.setAttribute("data-animation", "none"), t.setAttribute("data-timer", e.timer)
   }, e.exports = t.default
}]);
//# sourceMappingURL=bundle.js.map
