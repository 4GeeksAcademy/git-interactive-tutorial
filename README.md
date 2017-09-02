# Git Tutorial - 4Geeks #

## JSON Structure for Repo Folders ##

- img
    - picture.jpg
- dist
    - bundle
        - bundled_files.txt
    - style.css
- index.html
- favicon.ico

This is the JSON necessary to create that folder structure:

```JSON
"root-folder": [
    { "img": [ //folder
        "picture.jpg" 
    ] },
    { "dist": [ // folder
        { "bundle": [ // subfolder
            "bundled_files.txt"
        ] },
        "style.css"
    ] },
    "index.html", // file in root folder
    "favicon.ico"  // file in root folder
]
```