const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview,updateReview} = require('../controllers/productController');
const {isAuthenticatedUser, authorizeRoles} = require('../middleware/auth');
const upload = require("../utils/multer.js");
const router = express.Router();

router
  .route("/admin/product/new")
  .post(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    upload.array("images", 5), // accept up to 5 files with field name "images"
    createProduct
  );

router.route('/products').get(getAllProducts);

router.route('/product/:id').get(getProductDetails);

router.route('/admin/product/:id')
.put(
  isAuthenticatedUser, 
  authorizeRoles("admin"), 
  upload.array("images", 5),
  updateProduct
);

router.route('/admin/product/:id').delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route('/review').put(isAuthenticatedUser, createProductReview);

router.route("/review/:id").put(isAuthenticatedUser, updateReview);

router.route('/reviews').get(getProductReviews);

router.route('/reviews').delete(isAuthenticatedUser, deleteReview);

module.exports = router;