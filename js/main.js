let close = true
let slide = true
let left = $('.blackbar').innerWidth()
$('.menu-bars').click(function () {
    if (close == true && slide == true) {
        $('.bar').css("z-index", "8")
        $('.menu-bars').html(`<i class="fa-solid fa-xmark fa-2x"></i>`)
        $('.bar').animate({ left: 0 }, 1000)
        close = false
        slide = false
    }
    else {
        $('.menu-bars').html(`<i class="fa-solid fa-bars fa-2x"></i>`)
        $('.bar').animate({ left: `-${left}` }, 1000, function () {
            $('.bar').css("z-index", "0")
        })

        close = true
        slide = true
    }
})
function dataDisplay(arr) {
    let box = ``
    for (let i = 0; i < arr.length; i++) {
        box += `<div class="col-md-3">
    <div class="image">
        <img src="${arr[i].strMealThumb}" alt="" class="mealsimgs rounded">
        <div class="layer d-flex align-items-center rounded"><h2 class="text pl-4">${arr[i].strMeal}</h2></div>
    </div>

 </div>`}
    document.getElementById('meal').innerHTML = box
}
async function display(menuList) {

    if (menuList == "home") {
        let meal_name = ''
        let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal_name}`)
        let data = await respone.json()
        for (let i = 0; i < 25; i++) {
            document.getElementById('meal').innerHTML += `<div class="col-md-3">
        <div class="image">
            <img src="${data.meals[i].strMealThumb}" alt="" class="mealsimgs rounded">
            <div class="layer d-flex align-items-center rounded"><h2 class="text pl-4">${data.meals[i].strMeal}</h2></div>
        </div>

     </div>`
        }
    }
    if (menuList == "category") {
        let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
        let data = await respone.json()
        let box = ``
        for (let i = 0; i < data.categories.length; i++) {
            box += `<div class="col-md-3 ">
    <div class="image text-center">
        <img src="${data.categories[i].strCategoryThumb}" alt="" class="mealsimgs rounded">
        <div class="layer text-center rounded p-3"><h2 class="text">${data.categories[i].strCategory}</h2>
        <p class="text categoryText">${data.categories[i].strCategoryDescription}</p>
        </div>
    </div>

 </div>`
        }
        document.getElementById('meal').innerHTML = box
    }
    if (menuList == "area") {
        let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
        let data = await respone.json()
        let box = ``
        for (let i = 0; i < data.meals.length; i++) {
            box += `<div class="col-md-3 ">
     <div class="image text-center">
     <i class="fa-solid fa-house-laptop icon" style="color: #ffffff;"></i>
            <p class="text2">${data.meals[i].strArea}</p>
         </div>
     </div>

  </div>`
        }
        document.getElementById('meal').innerHTML = box
    }
    if (menuList == "ing") {
        let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
        let data = await respone.json()
        let modify
        let box = ``
        for (let i = 0; i < 20; i++) {
            let descLength = data.meals[i].strDescription.length
            if (descLength > 100) {
                modify = data.meals[i].strDescription.slice(0, 100)
            }
            else {
                modify = data.meals[i].strDescription
            }
            box += `<div class="col-md-3 ">
     <div class="image text-center">
     <i class="fa-solid fa-drumstick-bite icon" style="color: #ffffff;"></i>
            <p class="text2">${data.meals[i].strIngredient}</p>
            <p class="text-light">${modify}</p>

         </div>
     </div>
  </div>`
            console.log(modify);
        }
        document.getElementById('meal').innerHTML = box
    }
}
var x = ''
display("home")
async function displayDetails(wait = "") {
    if (wait == "") {
        await display("home")
    }
    let mealName
    $('.image').click(async function () {
        mealName = $(this).find(".text").html()
        let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        let mealData = await responce.json()
        document.getElementById('meal').innerHTML = `<div class="col-md-4 text-light">
        <img src="${mealData.meals[0].strMealThumb}" alt="" class="w-100 rounded">
        <h2>${mealData.meals[0].strMeal}</h2>
    </div>
    <div class="col-md-8 text-light" id="col">
        <h2>Instructions</h2>
        <p>${mealData.meals[0].strInstructions}</p>
        <h2 class="d-flex">Area :<span>
                <h2>${mealData.meals[0].strArea}</h2>
            </span></h2>
        <h2 class="d-flex">Category :<span>
                <h2>${mealData.meals[0].strCategory}</h2>
            </span></h2>
        <h2>Recipes :</h2>
        <div class="d-flex flex-wrap" id="rec">
        </div> 

        `
        let recipesArray = []
        let measure = []
        var cnt = 1
        let mCnt = 1
        while (mealData.meals[0][`strIngredient${cnt}`] !== "" && mealData.meals[0][`strIngredient${cnt}`] !== " ") {
            recipesArray.push(mealData.meals[0][`strIngredient${cnt}`])
            cnt++
            if (cnt > 20) {
                break
            }
        }
        while (mealData.meals[0][`strMeasure${mCnt}`] !== " " && mealData.meals[0][`strMeasure${mCnt}`] !== "") {
            measure.push(mealData.meals[0][`strMeasure${mCnt}`])
            mCnt++
            if (mCnt > 20) {
                break
            }
        }
        let box = ``
        for (let i = 0; i < recipesArray.length; i++) {
            box +=
                ` 

                    <div class="recipes rounded mr-3 px-2 mb-3">
                        <p>${measure[i]} ${recipesArray[i]}</p>
                    </div>

            `
        }
        let mealTag
        if (mealData.meals[0].strTags == null) {
            mealTag = ""
        }
        else {
            mealTag = mealData.meals[0].strTags
        }
        document.getElementById('rec').innerHTML += box
        document.getElementById('col').innerHTML += ` <h2>Tags :</h2>
        <div class="tags rounded mb-4">
            <p class="p-1" >${mealTag}</p>
        </div>
        <a href="${mealData.meals[0].strSource}" class="btn btn-success mb-5" >Source</a>
        <a href="${mealData.meals[0].strYoutube}" class="btn btn-danger mb-5">Youtube</a>
        </div>`
        document.getElementById('mm').innerHTML = ` `

    })
}
displayDetails()
$("#search").click(function () {
    $("#container").removeClass("contact")
    $("#meal").removeClass("contact")
    $('.menu-bars').html(`<i class="fa-solid fa-bars fa-2x"></i>`)
    $('.bar').animate({ left: `-${left}` }, 1000)
    close = true
    slide = true
    document.getElementById('meal').innerHTML = `<div class="container mb-5" id="ss">
    <div class="row d-flex justify-content-center">
        <div class="col-md-5"><input type="text" class="form-control bg-transparent" placeholder="Search By Name" id="searchByName" onkeyup="search('searchByNamee')"></div>
        <div class="col-md-5"><input type="text" class="form-control bg-transparent" placeholder="Search By First Letter" id="searchByLetter" maxlength="1" onkeyup="search ('searchByLetter')"></div>
    </div>
   </div>`
})
async function search(type) {
    let input = document.getElementById('searchByName').value
    let input2 = document.getElementById('searchByLetter').value
    console.log(input);
    if (type == "searchByNamee") {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
        let searchdata = await response.json()
        let box = ``
        for (let i = 0; i < searchdata.meals.length; i++) {
            box += `<div class="col-md-3">
        <div class="image">
            <img src="${searchdata.meals[i].strMealThumb}" alt="" class="mealsimgs rounded">
            <div class="layer d-flex align-items-center rounded"><h2 class="text pl-4">${searchdata.meals[i].strMeal}</h2></div>
        </div>

     </div>`
            document.getElementById('mm').innerHTML = box


        }
        displayDetails("s")


    }
    else if (type == "searchByLetter") {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${input2}`)
        let searchdata = await response.json()
        let box = ``
        for (let i = 0; i < searchdata.meals.length; i++) {
            box += `<div class="col-md-3">
        <div class="image">
            <img src="${searchdata.meals[i].strMealThumb}" alt="" class="mealsimgs rounded">
            <div class="layer d-flex align-items-center rounded"><h2 class="text pl-4">${searchdata.meals[i].strMeal}</h2></div>
        </div>

     </div>`
            document.getElementById('mm').innerHTML = box

        }
        displayDetails("s")
    }
}
$("#categories").click(async function () {
    $("#container").removeClass("contact")
    $("#meal").removeClass("contact")
    $('.menu-bars').html(`<i class="fa-solid fa-bars fa-2x"></i>`)
    $('.bar').animate({ left: `-${left}` }, 1000)
    close = true
    slide = true
    await display("category")
    $('.image').click(async function () {
        mealName = $(this).find(".text").html()
        let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealName}`)
        let mealData = await responce.json()
        dataDisplay(mealData.meals)
        displayDetails("s")

    })
})
$("#area").click(async function () {
    $("#container").removeClass("contact")
    $("#meal").removeClass("contact")
    $('.menu-bars').html(`<i class="fa-solid fa-bars fa-2x"></i>`)
    $('.bar').animate({ left: `-${left}` }, 1000, function () {
        $('.bar').css("z-index", "0")
    })
    close = true
    slide = true
    await display("area")
    $('.image').click(async function () {
        mealName = $(this).find(".text2").html()
        let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${mealName}`)
        let mealData = await responce.json()
        dataDisplay(mealData.meals)
        displayDetails("s")
    })
})
$("#ingredients").click(async function () {
    $("#container").removeClass("contact")
    $("#meal").removeClass("contact")
    $('.menu-bars').html(`<i class="fa-solid fa-bars fa-2x"></i>`)
    $('.bar').animate({ left: `-${left}` }, 1000, function () {
        $('.bar').css("z-index", "0")
    })
    close = true
    slide = true
    await display("ing")
    $('.image').click(async function () {
        mealName = $(this).find(".text2").html()
        let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealName}`)
        let mealData = await responce.json()
        dataDisplay(mealData.meals)
        displayDetails("s")
    })
})
var inputId;
function contact() {
    // var user
    let box = ` <div class="col-md-5 mb-4">
    <input type="text" class="form-control form bg-white mb-2 " onkeyup="typing()" placeholder="Enter Your Name" id="userName">
    <div class="text-center rounded validtext" >
        <p>Special characters and numbers not allowed</p>
    </div>
</div>
<div class="col-md-5 mb-4">
    <input type="text" class="form-control form bg-white mb-2" onkeyup="typing()" placeholder="Enter Your Email" id="userEmail" >
    <div class="text-center rounded validtext">
        <p>Email not valid *exemple@yyy.zzz</p>
    </div>
</div>
<div class="col-md-5 mb-4">
    <input type="text" class="form-control form bg-white mb-2" onkeyup="typing()" placeholder="Enter Your Phone" id="userPhone">
    <div class="text-center rounded validtext">
        <p>Enter valid Phone Number</p>
    </div>
</div>
<div class="col-md-5 mb-4">
    <input type="number" class="form-control form bg-white mb-2" placeholder="Enter Your Age" id="userAge">
    <div class="text-center rounded validtext">
        <p>Special characters and numbers not allowed</p>
    </div>
</div>
<div class="col-md-5 mb-4">
    <input type="password" class="form-control form bg-white mb-2" onkeyup="typing()" placeholder="Enter Your Password" id="userPassword">
    <div class="text-center rounded validtext">
        <p>Enter valid password *Minimum eight characters, at least one letter and one number:*</p>
    </div>
</div>
<div class="col-md-5 mb-4">
    <input type="password" class="form-control form bg-white mb-2" onkeyup="typing()" placeholder="Repassword" id="userRepassword">
    <div class="text-center rounded validtext">
        <p>Enter valid repassword</p>
    </div>
</div>
<div class="col-md-3 text-center"><button class="btn subBtn"disabled>submit</button></div>`

    $("#container").addClass("contact")
    $("#meal").addClass("contact")
    document.getElementById('meal').innerHTML = box
    $('.form').click(function () {
        inputId = this.id
    })
}
function typing() {
    var user = document.getElementById(inputId)

    if (check(user.value, inputId)) {
        $('#' + inputId).next().addClass('validtext')
        $('#' + inputId).next().removeClass("nonValid")
    }
    else {
        $('#' + inputId).next().removeClass("validtext")
        $('#' + inputId).next().addClass('nonValid')
    }
    if (check(document.getElementById("userName").value, "userName") && check(document.getElementById("userEmail").value, "userEmail") && check(document.getElementById("userPhone").value, "userPhone") && check(document.getElementById("userPassword").value, "userPassword") && check(document.getElementById("userRepassword").value, "userRepassword")) {
        $(".subBtn").removeAttr("disabled")
    }
}
function check(str, id) {
    if (id == "userName") {
        let valid = /^[a-z A-z]{1,}[a-z A-Z]{1,}$/
        return valid.test(str)
    }
    if (id == "userEmail") {
        let valid = /[a-z_0-9A-Z]{1,}@[a-z]{3,}.com$/
        return valid.test(str)
    }

    if (id == "userPhone") {
        let valid = /^(002)?01[1205][0-9]{8}$/
        return valid.test(str)
    }
    if (id == "userPassword") {
        let valid = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
        return valid.test(str)
    }
    if (id == "userRepassword") {
        if (document.getElementById('userPassword').value == str) {
            return true
        }
        else {
            return false
        }
    }
}
$("#contact").click(function () {
    $('.menu-bars').html(`<i class="fa-solid fa-bars fa-2x"></i>`)
    $('.bar').animate({ left: `-${left}` }, 1000, function () {
        $('.bar').css("z-index", "0")
    })
        contact()
    close = true
    slide = true
})
