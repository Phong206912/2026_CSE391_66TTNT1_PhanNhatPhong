const form = document.getElementById("orderForm")

const product = document.getElementById("product")
const quantity = document.getElementById("quantity")
const deliveryDate = document.getElementById("deliveryDate")
const address = document.getElementById("address")
const note = document.getElementById("note")

const noteCount = document.getElementById("noteCount")
const totalEl = document.getElementById("total")

const confirmBox = document.getElementById("confirmBox")
const summary = document.getElementById("summary")

const confirmBtn = document.getElementById("confirmBtn")
const cancelBtn = document.getElementById("cancelBtn")

const prices = {
    ao:150000,
    quan:200000,
    giay:300000
}

function showError(id,msg){
    document.getElementById(id).innerText = msg
}

function clearError(id){
    document.getElementById(id).innerText = ""
}

function validateProduct(){

    if(product.value===""){
        showError("productError","Vui lòng chọn sản phẩm")
        return false
    }

    clearError("productError")
    return true
}

function validateQuantity(){

    const value = Number(quantity.value)

    if(!value || value<1 || value>99){
        showError("quantityError","Số lượng từ 1 đến 99")
        return false
    }

    clearError("quantityError")
    return true
}

function validateDate(){

    const date = new Date(deliveryDate.value)
    const today = new Date()
    today.setHours(0,0,0,0)

    const max = new Date()
    max.setDate(max.getDate()+30)

    if(!deliveryDate.value){
        showError("dateError","Chọn ngày giao")
        return false
    }

    if(date < today){
        showError("dateError","Không chọn ngày quá khứ")
        return false
    }

    if(date > max){
        showError("dateError","Không quá 30 ngày")
        return false
    }

    clearError("dateError")
    return true
}

function validateAddress(){

    if(address.value.trim().length <10){
        showError("addressError","Địa chỉ tối thiểu 10 ký tự")
        return false
    }

    clearError("addressError")
    return true
}

function validateNote(){

    if(note.value.length>200){
        showError("noteError","Ghi chú tối đa 200 ký tự")
        return false
    }

    clearError("noteError")
    return true
}

function validatePayment(){

    const payment = document.querySelector("input[name='payment']:checked")

    if(!payment){
        showError("paymentError","Chọn phương thức thanh toán")
        return false
    }

    clearError("paymentError")
    return true
}

function calculateTotal(){

    const p = prices[product.value]
    const q = Number(quantity.value)

    if(p && q){
        const total = p*q
        totalEl.innerText = total.toLocaleString("vi-VN")
    }else{
        totalEl.innerText = "0"
    }

}

product.addEventListener("change",calculateTotal)
quantity.addEventListener("input",calculateTotal)

note.addEventListener("input",function(){

    const length = note.value.length

    noteCount.innerText = length+"/200"

    if(length>200){
        noteCount.style.color="red"
    }else{
        noteCount.style.color="black"
    }

})

product.addEventListener("blur",validateProduct)
quantity.addEventListener("blur",validateQuantity)
deliveryDate.addEventListener("blur",validateDate)
address.addEventListener("blur",validateAddress)

form.addEventListener("submit",function(e){

    e.preventDefault()

    const valid =
        validateProduct() &
        validateQuantity() &
        validateDate() &
        validateAddress() &
        validateNote() &
        validatePayment()

    if(valid){

        const pName = product.options[product.selectedIndex].text
        const q = quantity.value
        const date = deliveryDate.value
        const total = totalEl.innerText

        summary.innerHTML = `
        Sản phẩm: ${pName} <br>
        Số lượng: ${q} <br>
        Tổng tiền: ${total} VND <br>
        Ngày giao: ${date}
        `

        confirmBox.style.display="block"

    }

})

confirmBtn.onclick = function(){

    alert("Đặt hàng thành công!")

    confirmBox.style.display="none"
    form.reset()
    totalEl.innerText="0"
    noteCount.innerText="0/200"

}

cancelBtn.onclick = function(){
    confirmBox.style.display="none"
}