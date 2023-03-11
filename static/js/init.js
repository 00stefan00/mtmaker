

function newClicked() {
    console.log(`newClicked`);
    buildEmptyMt()
}

function importClicked() {
    console.log(`importClicked`);
    openModal();
}

function exportClicked() {
    console.log(`exportClicked`);
}

function buildEmptyMt(){
    var contentElement = document.getElementById('content');

    var maxColumn = 5

    tree = createElement("div", "mission_tree")
    detailsform = createElement("div", "mission_form")

    contentElement.append(tree)
    contentElement.append(detailsform)

    for (var i = 0; i < maxColumn; i++) {
        mission_branch = createElement("div", "mission_branch", i)
        tree.append(mission_branch)

        mission_node = createElement("div", "mission_node", `${i}-${1}`)        
        mission_node.appendChild(getMissionIcon("mission_unknown_mission.png"))
        mission_node.onclick = function() { onMissionClicked(this) };
        mission_branch.append(mission_node)
    }
}

function getMissionNode(branch, mission){
    return document.getElementsByClassName("mission_node").namedItem(`${branch}-${mission}`)
}

function createElement(type, className=undefined, idName=undefined){
    element = document.createElement(type);
    if (className !== undefined) {
        element.setAttribute("class", className)
    }
    if (idName !== undefined) {
        element.setAttribute("id", idName)
    }
    return element
}

function getMissionIcon(filename) {
    var image = document.createElement("img");
    image.setAttribute("src", `../static/assets/missions/${filename}`);
    return image;
}

function onMissionClicked(mission_node){
    console.log(mission_node);
}