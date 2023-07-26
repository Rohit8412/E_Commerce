const Cart = require('../models/Cart.js');
const { verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('./verifyToken.js');

const router = require('express').Router();

router.post('/', verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try{
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  }
  catch(err){
    res.status(500).json(err);
  }
})

router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {new:true})
    res.status(200).json(updatedCart);
  } catch (err) {
    console.log("updating product error")
    res.status(500).json(err); 
  }
});

router.delete("/:id", verifyTokenAndAdmin, async (req, res)=>{
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.status(200).json("Product has been deleted...")
  }
  catch(err){
    res.status(500).json(err)
  }
})

router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({userId: req.params.id});
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL PRODUCTS
router.get('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;