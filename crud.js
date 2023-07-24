let data = [
    {firstname: "Adrian", lastname: "Huarte"},
    {firstname: "Jose", lastname: "Perez"},
    {firstname: "Antonio", lastname: "Garcia"},
    {firstname: "Manuel", lastname: "Llorente"},
];

let el, i;  //Consulta de seleccion
let panel = document.querySelector("#panel");

function clearForm() {
    document.querySelector("#fname").value = "";
    document.querySelector("#lname").value = "";
}

function renderItem() {
    panel.textContent = "";
    data.forEach(x => {
        //Crea el elemento option
        el = document.createElement("option");
        //Recoge los campos de firstname y lastname
        el.innerText = `${x.firstname} ${x.lastname}`; // (``) apostrofe
        //Agrega la entrada al (el)
        panel.append(el);
    })
}

function create() {
    let fn = document.querySelector("#fname").value;
    let ln = document.querySelector("#lname").value;
    //Grabar los datos en el panel
    data = [...data, {firstname: fn, lastname: ln}]
    clearForm();
    console.log(data);
    renderItem();
}

function panelClick() {
    i = panel.selectedIndex;
    document.querySelector("#fname").value = data[i].firstname;
    document.querySelector("#lname").value = data[i].lastname;
}

function deleteItem() {
    data.splice(i,1);
    renderItem();
}

function update() {
    data[i].firstname = document.querySelector("#fname").value;
    data[i].lastname = document.querySelector("#lname").value;
    renderItem();
}

renderItem();

