import express from 'express';
import { createProductReview, deleteProduct, deleteReview, getProductById, getProductReview, getProducts, newProduct, updateProductById,getAdminProducts,uploadProductImages,deleteProductImage } from '../controllers/productsController.js';
import { isAuthenticateUser } from '../middlewares/auth.js';
import { authorizeRoles } from '../middlewares/auth.js';
const router = express.Router();

router.route('/products').get(getProducts);
router.route('/admin/products')
.post(isAuthenticateUser,authorizeRoles("admin"),newProduct)
.get(isAuthenticateUser, authorizeRoles("admin"), getAdminProducts);
router
  .route("/admin/products/:id/upload_images")
  .put(isAuthenticateUser, authorizeRoles("admin"), uploadProductImages);
  router
  .route("/admin/products/:id/delete_image")
  .put(isAuthenticateUser, authorizeRoles("admin"), deleteProductImage);
router.route('/products/:id').get(getProductById);
router.route('/admin/products/:id').put(isAuthenticateUser, authorizeRoles("admin"), updateProductById);
router.route('/admin/products/:id').delete(isAuthenticateUser, authorizeRoles("admin"), deleteProduct);
router.route('/reviews')
.get(getProductReview)
.put(isAuthenticateUser, createProductReview);
router.route('/admin/reviews').delete(isAuthenticateUser, authorizeRoles("admin"), deleteReview);

export default router;
