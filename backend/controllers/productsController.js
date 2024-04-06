import products from '../models/product.js'
import ErrorHandler from '../utils/errorHandler.js';
import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import APIFilters from '../utils/apiFilters.js';
import { delete_file, upload_file } from "../utils/cloudinary.js";
import Order from "../models/order.js";
export const getProducts = catchAsyncErrors(async (req, res, next) => {
    const resPerPage = req.query.resPerPage || 4;
    const apiFilters = new APIFilters(products, req.query).search().filter();;
  
    let filteredProducts = await apiFilters.query;
    let filteredProductsCount = filteredProducts.length;
  
    apiFilters.pagination(resPerPage);
    filteredProducts = await apiFilters.query.clone();
  
    res.setHeader("Content-Type", "application/json");
  
    res.status(200).json({
      resPerPage,
      filteredProductsCount,
      filteredProducts,
    });
  });

// Create new Product => /api/v1/admin/products
export const newProduct = catchAsyncErrors(async (req, res) => {
    req.body.user = req.user._id;

    // Upload images to Cloudinary
    const uploader = async (image) => {
        const result = await upload_file(image, "lonicera/products");
        return result.public_id; // Extracting public_id from the Cloudinary response
    };

    const uploadPromises = req.body.images.map(uploader);

    try {
        // Wait for all uploads to finish
        const publicIds = await Promise.all(uploadPromises);

        // Construct image objects with URLs and public IDs
        const images = publicIds.map((public_id, index) => ({
            public_id,
            url: req.body.images[index], // Assuming req.body.images contains URLs of uploaded images
        }));

        // Add the array of image objects to the product data
        req.body.images = images;

        // Create the product with the updated product object
        const product = await products.create(req.body);

        res.status(200).json({
            product,
        });
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
});

  
//to fetch a product details by id 
export const getProductById = catchAsyncErrors( async (req,res,next)=>{
    
    const productById = await products.findById(req?.params?.id).populate(
        "reviews.user"
      );

    if(!productById){
        return next(new ErrorHandler("Product not found",404))
    }

    res.status(200).json({
        productById
    })
}
);

// Get products - ADMIN   =>  /api/v1/admin/products
export const getAdminProducts = catchAsyncErrors(async (req, res, next) => {
    const allProducts = await products.find();
  
    res.status(200).json({
      allProducts,
    });
  });
  
//to update a particular product
export const updateProductById = catchAsyncErrors( async (req,res)=>{
    
    let productById = await products.findById(req?.params?.id)

    if(!productById){
        return next(new ErrorHandler("Product not found",404))
    }

    productById = await products.findByIdAndUpdate(req?.params?.id, req.body, {new:true})

    res.status(200).json({
        productById
    })
});


// Upload product images   =>  /api/v1/admin/products/:id/upload_images
export const uploadProductImages = catchAsyncErrors(async (req, res) => {
    let product = await products.findById(req?.params?.id);
  
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    const uploader = async (image) => upload_file(image, "lonicera/products");
  
    const urls = await Promise.all((req?.body?.images).map(uploader));
  
    product?.images?.push(...urls);
    await product?.save();
  
    res.status(200).json({
      product,
    });
  });

// Delete product image   =>  /api/v1/admin/products/:id/delete_image
export const deleteProductImage = catchAsyncErrors(async (req, res) => {
    let product = await products.findById(req?.params?.id);
    console.log("delete controller", req.body);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    const isDeleted = await delete_file(req.body.imgId);
  
    if (isDeleted) {
      product.images = product?.images?.filter(
        (img) => img.public_id !== req.body.imgId
      );
       console.log("deleted"); 
      await product?.save();
    }
  
    res.status(200).json({
      product,
    });
  });
  

// Delete product   =>  /api/v1/admin/products/:id
export const deleteProduct = catchAsyncErrors(async (req, res) => {
    const product = await products.findById(req?.params?.id);
  
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    // Deleting image associated with product
    for (let i = 0; i < product?.images?.length; i++) {
      await delete_file(product?.images[i].public_id);
    }
  
    await product.deleteOne();
  
    res.status(200).json({
      message: "Product Deleted",
    });
  });
  
//Create/update product review => api/v1/reviews
export const createProductReview = catchAsyncErrors( async (req,res,next)=>{
    
    const {rating, comment, productId } = req.body;

    const review = {
        user: req?.user?._id,
        rating: Number(rating),
        comment
    }

    const product = await products.findById(productId)

    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }

    const isReviewed = product?.reviews?.find(
        (r) => r.user.toString() === req?.user?._id.toString()
    )

    if(isReviewed) {
        product.reviews.forEach((review)=>{
            if (review?.user?.toString()===req?.user?._id.toString()) {
                review.comment = comment;
                review.ratings = Number(rating);
            }
        })
    }else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    product.ratings = 
        product.reviews.reduce((acc, item)=> item.ratings+acc,0)/
        product.reviews.length;

    await product.save({validateBeforeSave: false})

    res.status(200).json({
        success:true
    })
}
);

//get product reviews => /api/v1/reviews
export const getProductReview = catchAsyncErrors( async (req,res,next)=>{
    const product = await products.findById(req.query.id)
    
    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }

    res.status(200).json({
        reviews:product.reviews
    })

});



//delete product review => api/v1/reviews
export const deleteReview = catchAsyncErrors( async (req,res,next)=>{
    

    let product = await products.findById(req.query.productId)

    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }

    const reviews = product?.reviews?.filter(
        (review)=> review._id.toString() !== req?.query?.id.toString()
    )

    const numOfReviews = reviews.length;

    const ratings = 
        numOfReviews ===0
        ? 0:
        product.reviews.reduce((acc, item)=> item.ratings+acc,0)/
        numOfReviews;

    product = await products.findByIdAndUpdate(
        req.query.productId,
        {reviews, numOfReviews, ratings},
        {new:true})

    res.status(200).json({
        success:true,
        product
    })
}
);

// Can user review   =>  /api/v1/can_review
export const canUserReview = catchAsyncErrors(async (req, res) => {
  const orders = await Order.find({
    user: req.user._id,
    "orderItems.product": req.query.productId,
  });

  if (orders.length === 0) {
    return res.status(200).json({ canReview: false });
  }

  res.status(200).json({
    canReview: true,
  });
});