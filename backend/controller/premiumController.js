const Razorpay = require("razorpay");
const Order = require("./../model/order-model");
const crypto = require("crypto");

// create an instance of razorpay in which we pass keyid and secertkey
// 2. then create an options object
// ----> amount and  currency important hota hai --> because frontend pe bharosh nhi kar sakte hai ham wo koi v data send kar sakta hai
// 3. we create order for that instance and pass options and a callback function
// 4. callback  funtion takes 2 args 1st one is err and 2nd one is order
//   ----> if not any err occur then we send order as a response

module.exports.getPremiumController = async (req, res) => {
  let instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });
  let options = {
    amount: 2500,
    currency: "INR",
  };
  instance.orders.create(options, async (err, order) => {
    if (err) {
      return res.status(500).json({ message: "error occur" });
    } else {
      const newOrder = await Order.create({
        order_id: order.id,
        payment_status: "PENDING",
      }); //yaha UserId ko hard code kar diya hai mujhe yaha pe token se id extract kar ke yaha userid dalna padega
      return res.status(201).json({ message: "succesful", order ,key_id: process.env.KEY_ID });
    }
  });
};

module.exports.postPremiumController = async (req, res) => {
  try {
    console.log(req.body);
    // STEP 1: Receive Payment Data
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    // Pass yours key_secret here
    const key_secret = process.env.KEY_SECRET;

    // STEP 2: Verification & Send Response to User

    // Creating hmac object
    let hmac = crypto.createHmac("sha256", key_secret);

    // Passing the data to be hashed
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);

    // Creating the hmac in the required format
    const generated_signature = hmac.digest("hex");

    console.log(generated_signature);
    if (razorpay_signature === generated_signature) {
      const paymentStatus = await Order.findOneAndUpdate(
        {
          order_id: razorpay_order_id,
        },
        {
          $set: { payment_status: "Successfull" },
        }
      );
      return res.json({ message:"send Successful" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Payment verification failed" });
  }
};
