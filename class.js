class Course {
    constructor(id, language, price, image){
        this.id = id,
        this.language = language,
        this.price = price,
        this.image = image
    }
    showInfo(){
        console.log(`El curso ${this.language} tiene un precio de ${this.price}`)
    }  
}


const course1 = new Course(1,"Ingles", 17000, "english-course.jpg")
const course2 = new Course(2,"Aleman", 20000, "german-course.jpg")
const course3 = new Course(3,"Frances", 18000, "french-course.png")
const course4 = new Course(4,"Italiano", 16000, "italian-course.png")



let courseList = []
if(localStorage.getItem("courseList")){
    courseList = JSON.parse(localStorage.getItem("courseList"))
}else{
    //Entra por primera -- setear el array el original
    console.log("Seteando el array carrito por primera vez")
    courseList.push(course1, course2, course3, course4)
    localStorage.setItem("courseList", JSON.stringify(courseList))
}

