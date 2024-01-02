const imgSelect = document.getElementById("imgSelect");
const img = document.getElementById("img");
const url = "http://localhost:3000";
for (let i = 0; i < imgSelect.children.length; i++) {
  imgSelect.children[i].addEventListener("click", (e) => {
    const oldEle = document.getElementsByClassName("z-10");
    oldEle[0].classList.remove("z-10");
    const currEle = document.getElementById(`image${e.target.id}`);
    currEle.classList.add("z-10");
  });
}
const handleOpenRazorpay = (data) => {
  console.log(data);
  var options = {
    key: data.key_id, // Enter the Key ID generated from the Dashboard
    amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "Vikas expense Transaction",
    description: "Premium Transaction",
    image: "https://example.com/your_logo",
    order_id: data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    handler: function (response) {
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature);
    //   axios.post(`${url}/premium`, response).then((response) => {
    //     console.log(response);
    //     alert("You can read pdf now");
    //   });
      fetch(`${url}/premium`,{
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(response),
      })
      .then(res=>res.json())
      .then((response) => {
        console.log(response);
        alert("You can read pdf now");
      });
    },
    prefill: {
      name: "vikas kumar",
      email: "Vikas@gmail.com",
      contact: "9000090000",
    },
    notes: {
      address: "Vikas Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };
  var rzp1 = new Razorpay(options);
  rzp1.on("payment.failed", function (response) {
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.order_id);
    alert(response.error.metadata.payment_id);
  });
  rzp1.open();
};

const buyBtn = document.getElementById("buyBtn");

buyBtn.addEventListener("click", (e) => {
  e.preventDefault();
  fetch(`${url}/premium`,{
    mode: "cors",
  })
  .then(res=>res.json())
  .then((response) => {
    console.log(response);
    handleOpenRazorpay(response);
    alert("You can read pdf now");
  })
  .catch((err) => console.log(err))
//   axios
//     .get(`${url}/premium`)
//     .then((response) => {
//       console.log(response);
//       handleOpenRazorpay(response.data);
//     })
//     .catch((err) => console.log(err));
});
